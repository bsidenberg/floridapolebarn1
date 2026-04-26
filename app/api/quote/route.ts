import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendQuoteNotification, sendCrmSyncFailureAlert } from '@/lib/email'
import { getSupabaseClient } from '@/lib/supabase'

function mapServiceTypeToCRM(slug: string | undefined | null): string | null {
  if (!slug) return null
  const map: Record<string, string> = {
    'kit-only':    'Kit Delivery Only',
    'kit-install': 'Kit + Installation',
    // Legacy safety — in case older values slip through
    'turnkey':     'Kit + Installation',
  }
  return map[slug] ?? null  // unknown slug becomes null, which is a valid CRM value
}

const schema = z.object({
  serviceType: z.enum(['kit-only', 'kit-install']),
  buildingType: z.enum(['open', 'enclosed', 'unsure']),
  size: z.string().min(1),
  primaryUses: z.array(z.string()).min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipCode: z.string().min(5).max(10),
  timeline: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/),
  email: z.string().email(),
  notes: z.string().optional(),
  engineeringOption: z.enum(['plans-only', 'plans-and-permits']).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const {
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      gclid, fbclid,
      lead_source, referrer_url, landing_page,
    } = body

    const result = await sendQuoteNotification(data)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    // Build enriched notes: prepend structured form data so no collected info is lost
    const SERVICE_LABELS: Record<string, string> = {
      'kit-only':    'Kit Delivery Only',
      'kit-install': 'Kit + Installation',
    }
    const BUILDING_LABELS: Record<string, string> = {
      open:     'Open Pole Barn',
      enclosed: 'Enclosed Pole Barn',
      unsure:   'Not Sure Yet',
    }
    const TIMELINE_LABELS: Record<string, string> = {
      'asap':     'As Soon As Possible',
      '1-3mo':    '1–3 Months',
      '3-6mo':    '3–6 Months',
      '6mo+':     '6+ Months Out',
      'planning': 'Just Planning / Getting Info',
    }
    const ENGINEERING_LABELS: Record<string, string> = {
      'plans-only':        'Stamped Plans Only',
      'plans-and-permits': 'Plans + Permit Assistance',
    }
    const USE_LABELS: Record<string, string> = {
      'equipment-storage': 'Equipment Storage',
      'horse-barn':        'Horse Barn',
      'rv-boat-storage':   'RV / Boat Storage',
      'workshop-garage':   'Workshop / Garage',
      'agricultural':      'Agricultural / Farming',
      'man-cave':          'Man Cave / Recreation',
      'commercial':        'Commercial Use',
      'other':             'Other',
    }

    const formLines = [
      `[Website Form]`,
      `Service:  ${SERVICE_LABELS[data.serviceType] ?? data.serviceType}`,
      `Building: ${BUILDING_LABELS[data.buildingType] ?? data.buildingType}`,
      `Size:     ${data.size}`,
      `Uses:     ${data.primaryUses.map(u => USE_LABELS[u] ?? u).join(', ')}`,
      `State:    ${data.state}`,
      `Timeline: ${TIMELINE_LABELS[data.timeline] ?? data.timeline}`,
      data.engineeringOption
        ? `Engineering: ${ENGINEERING_LABELS[data.engineeringOption] ?? data.engineeringOption}`
        : null,
    ].filter(Boolean).join('\n')

    const enrichedNotes = data.notes?.trim()
      ? `${formLines}\n\nCustomer notes: ${data.notes.trim()}`
      : formLines

    const leadPayload = {
      service_type: mapServiceTypeToCRM(data.serviceType),
      lead_source:  lead_source ?? null,
      first_name:   data.firstName,
      last_name:    data.lastName,
      email:        data.email,
      phone:        data.phone,
      city:         data.city,
      zip:          data.zipCode ?? null,
      barn_size:    data.size,
      notes:        enrichedNotes,
      stage:        'new',
      priority:     'cold',
      source:       lead_source ?? 'Website Form',
      utm_source:   utm_source   ?? null,
      utm_medium:   utm_medium   ?? null,
      utm_campaign: utm_campaign ?? null,
      utm_term:     utm_term     ?? null,
      utm_content:  utm_content  ?? null,
      referrer_url: referrer_url ?? null,
      landing_page: landing_page ?? null,
    }

    // Fire-and-forget: forward lead to marketing bot (never blocks the form response)
    const leadsIngestSecret = process.env.LEADS_INGEST_SECRET
    if (leadsIngestSecret) {
      fetch('https://fpb-marketing-bot.vercel.app/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-leads-ingest-secret': leadsIngestSecret,
        },
        body: JSON.stringify({
          name:             `${data.firstName} ${data.lastName}`.trim(),
          email:            data.email,
          phone:            data.phone,
          message:          enrichedNotes,
          source_url:       landing_page   ?? null,
          landing_page_url: landing_page   ?? null,
          referrer_url:     referrer_url   ?? null,
          utm_source:       utm_source     ?? null,
          utm_medium:       utm_medium     ?? null,
          utm_campaign:     utm_campaign   ?? null,
          utm_content:      utm_content    ?? null,
          utm_term:         utm_term       ?? null,
          gclid:            gclid          ?? null,
          fbclid:           fbclid         ?? null,
          lead_type:        'form',
        }),
      }).catch(err => console.error('Marketing bot lead ingest failed (quote form):', err))
    } else {
      console.warn('LEADS_INGEST_SECRET not set — skipping marketing bot ingest')
    }

    const { error: supabaseError } = await getSupabaseClient()
      .from('leads')
      .insert(leadPayload)

    if (supabaseError) {
      console.error('Supabase lead insert error:', supabaseError)

      // Layer 2: alert email (fire-and-forget)
      sendCrmSyncFailureAlert({
        leadPayload,
        error: { message: supabaseError.message, code: supabaseError.code },
      }).catch(alertErr => console.error('CRM sync alert email failed:', alertErr))

      // Layer 3: audit table (fire-and-forget)
      getSupabaseClient()
        .from('failed_lead_writes')
        .insert({
          source: 'website_quote_form',
          payload: leadPayload,
          error_code: supabaseError.code ?? null,
          error_message: supabaseError.message ?? null,
        })
        .then(({ error: auditErr }) => {
          if (auditErr) {
            console.error('Failed to write to failed_lead_writes audit table:', auditErr)
          }
        })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid form data', details: err.issues }, { status: 400 })
    }

    console.error('Quote API error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
