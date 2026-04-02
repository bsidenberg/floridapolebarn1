import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendQuoteNotification } from '@/lib/email'
import { getSupabaseClient } from '@/lib/supabase'

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
  phone: z.string().min(10),
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
      lead_source, referrer_url, landing_page,
    } = body

    const result = await sendQuoteNotification(data)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    const { error: supabaseError } = await getSupabaseClient()
      .from('leads')
      .insert({
        first_name:   data.firstName,
        last_name:    data.lastName,
        email:        data.email,
        phone:        data.phone,
        notes:        data.notes ?? null,
        zip:          data.zipCode ?? null,
        stage:        'new',
        source:       lead_source ?? null,
        utm_source:   utm_source   ?? null,
        utm_medium:   utm_medium   ?? null,
        utm_campaign: utm_campaign ?? null,
        utm_term:     utm_term     ?? null,
        utm_content:  utm_content  ?? null,
        lead_source:  lead_source  ?? null,
        referrer_url: referrer_url ?? null,
        landing_page: landing_page ?? null,
      })

    if (supabaseError) console.error('Supabase lead insert error:', supabaseError)

    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid form data', details: err.issues }, { status: 400 })
    }

    console.error('Quote API error:', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
