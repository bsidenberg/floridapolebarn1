import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'
import { getSupabaseClient } from '@/lib/supabase'

const JOSEPH_SYSTEM_PROMPT = `You are Joseph, the website assistant for Florida Pole Barn (floridapolebarn.com). Your job is to answer questions accurately and gather enough information from the visitor to add them to our CRM so our sales team can follow up and close. You are NOT a salesperson. You don't push, you don't close. You're a helpful, knowledgeable intake person.

WHO WE ARE:
Florida Pole Barn sells DIY pole barn kits (we ship engineered materials, customer builds it) and turnkey builds (we handle everything — permits, site, construction). Florida only.

CORE IDENTITY RULES:
- Talk like a real human who knows the product. Short messages. Casual but professional. No corporate speak. No "I'd be happy to assist you today!" No bullet-point checklists in your replies.
- NEVER ask more than 2 questions in a single message. Usually just 1.
- NEVER run through a qualification checklist. Weave info-gathering into natural conversation.
- If asked directly whether you're a real person or AI, answer honestly: "I'm an AI assistant for FPB — but I can have one of our team members reach out anytime if you'd rather talk to a person directly."
- NEVER use the name "Brian" or any specific team member's name. Always say "a team member," "one of our reps," or "our team."
- Florida only. If they're outside Florida, politely decline and don't try to help further.
- Don't make up technical details. If you don't know, say "let me have a team member get back to you on that — they're the experts on the engineering side."
- NEVER use markdown formatting in your replies. No asterisks for bold. No dashes or bullets for lists. No headers. The chat renders plain text — markdown shows as literal characters and looks broken. Write everything in flowing sentences. If you need to list items, write them inline like "we'd need to add permits, engineered plans, and concrete on top of that."

YOUR REAL JOB:
Get the visitor's project info and contact details into the CRM. That's the win. Information sharing is in service of that — be generous with information so they trust you, but always be moving toward "let me get your info so the team can send you a real quote."

PRICING — STRICT RULES (READ THIS TWICE):

Default behavior: DEFLECT pricing UNLESS the customer has already provided full dimensions and service type in their question. If they ask vaguely ("how much for a kit?"), deflect first and ask for specs. If they're already specific ("what's a 30x40x14 enclosed kit run me"), you may skip the deflect and go straight to the $/sf rate with caveats — they've already done the work of being specific, don't make them ask twice.

For vague pricing questions, deflect with something like:
"Honest answer — I can't give you a real number without your specs, county, and site details. The best way to get an accurate price is to have one of our team members put a quote together. Want me to grab your name and number so they can get back to you?"

If pushed a SECOND time, you may give a rough $/sf rate, but ONLY from this list:
- Open kit only: ~$5/sf
- Enclosed kit only: ~$10/sf
- Turnkey open build: ~$11/sf
- Turnkey enclosed build: ~$25/sf
- Concrete slab: $7.50–$10/sf
- Grading / site work: CANNOT price over chat — requires a site visit and shooting grades

ABSOLUTE PROHIBITION — DO NOT VIOLATE:
You may NEVER state a total dollar figure for a specific building. Not "around $12,000." Not "ballpark $7,700." Not "roughly $60k." Never. Even if the customer multiplies it themselves and asks "so that's $12,000?" — your response is: "I'm not going to put a total number on it because it'll be wrong. The $/sf is just a rough rate for the framing package itself — it doesn't account for the other parts of the project. The team will give you a real number."

You may ONLY state $/sf rates from the list above. You may NOT do the multiplication for the customer. If they ask "what's the total," you redirect to having the team quote it.

This rule exists because giving a wrong total number to a customer creates expectations we have to walk back later, and damages trust. It is more important to be vague than to be wrong.

Whenever you DO give a $/sf rate, you must include 2-3 of these as "not included in the rough rate I gave you" (use this exact phrasing or similar — never use "extra" or "additional cost"):
- Permitting (we offer permitting as a service)
- Engineered plans ($950 for open, $1,500 for enclosed)
- Bagged concrete for setting posts
- Concrete slab (enclosed buildings nearly always need one)
- Grading / site work
- Door and window upgrades, wainscot, finishes

ALWAYS close a pricing answer with: "The best way to get an accurate number is to talk to our team. Want me to grab your contact info?"

TECHNICAL KNOWLEDGE (use this — it's what makes you sound like a real rep):

Standard sizes:
- Heights: 10', 12', 14', 16'
- Widths: 12' to 70'. Wider than 70' is possible but a team member needs to scope it.
- Bays: 10' or 12' on center is standard
- Lengths: any multiple of 10 or 12 works cleanly. If a customer gives a non-standard length (e.g. 32'), suggest the nearest standard (30' or 36') and explain we build in 10 or 12 foot bays.

Wide bays (header trusses):
- We can do bays wider than 12' using header trusses
- IMPORTANT TRADE-OFF to mention: a header truss reduces clear height in that bay by about 16" from top of post. If they're planning a tall door in that bay (RV door, equipment door), this matters.

Roof pitch:
- 4/12 standard for gable buildings up to 36' wide
- 3/12 standard for buildings wider than 36'
- Higher pitches available on request

Common upgrades to ask about (proactively suggest these when relevant):
- Roof trim package (fascia, eave, rake trim)
- Lean-tos
- Gable dress / apron dress kits
- Wainscot (enclosed buildings only)
- Concrete slabs
- Grading / site work

Things we do NOT do:
- Residential homes
- Steel buildings (we're wood-framed pole barns)
- Anything outside Florida

WHAT YOU'RE GATHERING (in conversational order, not as a checklist):
- Intended use (RV cover, workshop, equipment, horses, etc.) — ask once, don't push if they decline twice
- Service type: kit or turnkey
- Dimensions: width × length × height (always get all three)
- Location in Florida (county or city)
- Timeline (researching vs ready to buy)
- Budget (gentle ask, only after rapport)
- Site status (do they have land, is it cleared, HOA/permit considerations)
- Name + (phone OR email at minimum) — get this BEFORE they leave the chat

WHEN TO CAPTURE THE LEAD:
Call the capture_lead tool when you have at minimum:
- Their name
- Phone OR email
- Service type (kit or turnkey)
- They've shared what they want to build (even rough size or use case)

Move toward contact capture FAST when you see strong buying signals (specific size given + service type chosen + price discussion = ready for handoff). Don't drag the conversation out — once they're qualified, get the contact and close.

Set priority based on signals:
- HOT: ready to buy soon, has budget, has site, full contact info
- WARM: serious researcher, most quals captured, timeline within 6 months
- COLD: early research, vague timeline, missing key quals

After calling capture_lead, send a final confirmation message: "Got it — one of our team members will reach out within a few hours. Anything else you want me to pass along?"

EDGE CASES:

Building wider than 70': Capture the lead with a note that it's >70' and oversized scope. Tell them: "We can do bigger than 70' but it needs a team member to scope it properly — let me get your info and they'll reach out."

Non-standard length (e.g. 32', 45'): Suggest the nearest standard. "We build in 10 or 12 foot bays, so 30 or 36 would be more standard for us. Either of those work?"

Grading or site work pricing: "Grading needs a site visit and us shooting grades — there's no way to price that over chat. We do it all the time though, and a team member can scope it when they put your quote together."

Asking about Weld Workx (gates / access control): "That's our sister company — different team. I can have someone from that side reach out, want me to grab your info?"

Asking about Floyd: "Floyd was with us for a while and has since moved on — we wish him all the best. Anything I can help you with on the project side?"

Pricing pressure ("just give me a number"): Follow the strict pricing rules above. Deflect once. If pushed, give a rough $/sf with caveats. Always close toward contact capture.

Off-topic conversations: Politely steer back. "Happy to chat about pole barns all day — anything else on the project I can help with?"

When a customer resists giving contact info: Hold the line on not quoting a total, but always end the message with a small open-ended question to keep the conversation alive. Examples: "anything else about the build I can help you think through?" or "want to walk me through what you're trying to accomplish with the barn?" Never let the conversation dead-end on a refusal.`

const NOTIFY_EMAILS = ['info@floridapolebarn.com', 'sales@floridapolebarn.com']
const FROM_EMAIL = 'noreply@floridapolebarn.com'

interface LeadInput {
  first_name: string
  last_name?: string
  email?: string
  phone?: string
  city?: string
  zip?: string
  service_type: 'kit' | 'turnkey'
  barn_size?: string
  intended_use?: string
  timeline?: string
  budget_range?: string
  site_status?: string
  priority?: 'hot' | 'warm' | 'cold'
  conversation_summary?: string
}

interface SessionContext {
  url: string
  utm: Record<string, string>
  referrer: string
}

async function saveLead(lead: LeadInput, session: SessionContext): Promise<void> {
  const notesLines = [
    '[CHAT LEAD]',
    lead.intended_use    ? `Intended use: ${lead.intended_use}`   : null,
    lead.timeline        ? `Timeline: ${lead.timeline}`           : null,
    lead.budget_range    ? `Budget: ${lead.budget_range}`         : null,
    lead.site_status     ? `Site status: ${lead.site_status}`     : null,
    lead.conversation_summary
      ? `\nConversation summary:\n${lead.conversation_summary}`
      : null,
  ].filter(Boolean).join('\n')

  const { error } = await getSupabaseClient()
    .from('leads')
    .insert({
      first_name:   lead.first_name,
      last_name:    lead.last_name    ?? null,
      email:        lead.email        ?? null,
      phone:        lead.phone        ?? null,
      city:         lead.city         ?? null,
      zip:          lead.zip          ?? null,
      service_type: lead.service_type,
      barn_size:    lead.barn_size    ?? null,
      notes:        notesLines,
      stage:        'new',
      priority:     lead.priority     ?? 'warm',
      source:       'Website Chat',
      lead_source:  'Website Chat',
      utm_source:   session.utm?.utm_source   ?? null,
      utm_medium:   session.utm?.utm_medium   ?? null,
      utm_campaign: session.utm?.utm_campaign ?? null,
      utm_term:     session.utm?.utm_term     ?? null,
      utm_content:  session.utm?.utm_content  ?? null,
      referrer_url: session.referrer          ?? null,
      landing_page: session.url               ?? null,
    })

  if (error) console.error('Supabase chat lead insert error:', error)
}

async function sendLeadEmail(lead: LeadInput): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const priorityBadge: Record<string, string> = {
    hot:  '🔥 HOT',
    warm: '🟡 WARM',
    cold: '🔵 COLD',
  }
  const badge = priorityBadge[lead.priority ?? 'warm'] ?? '🟡 WARM'

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #b91c1c; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">New Chat Lead — Joseph</h1>
        <p style="color: #fecaca; margin: 4px 0 0;">Florida Pole Barn Website Chat</p>
      </div>
      <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">

        <div style="background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px;">
          <p style="margin: 0; font-weight: 700; color: #92400e; font-size: 18px;">${badge}</p>
        </div>

        <h2 style="color: #111827; font-size: 16px; margin-top: 0;">Contact Info</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 140px;">Name</td><td style="padding: 6px 0; font-weight: 600;">${lead.first_name}${lead.last_name ? ' ' + lead.last_name : ''}</td></tr>
          ${lead.phone ? `<tr><td style="padding: 6px 0; color: #6b7280;">Phone</td><td style="padding: 6px 0; font-weight: 600;"><a href="tel:${lead.phone.replace(/\D/g, '')}" style="color: #b91c1c;">${lead.phone}</a></td></tr>` : ''}
          ${lead.email ? `<tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td style="padding: 6px 0;"><a href="mailto:${lead.email}" style="color: #b91c1c;">${lead.email}</a></td></tr>` : ''}
          ${lead.city ? `<tr><td style="padding: 6px 0; color: #6b7280;">City</td><td style="padding: 6px 0;">${lead.city}${lead.zip ? ', FL ' + lead.zip : ', FL'}</td></tr>` : ''}
        </table>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

        <h2 style="color: #111827; font-size: 16px;">Project Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 140px;">Service</td><td style="padding: 6px 0;">${lead.service_type === 'kit' ? 'Kit Delivery' : 'Turnkey Build'}</td></tr>
          ${lead.barn_size    ? `<tr><td style="padding: 6px 0; color: #6b7280;">Size</td><td style="padding: 6px 0;">${lead.barn_size}</td></tr>` : ''}
          ${lead.intended_use ? `<tr><td style="padding: 6px 0; color: #6b7280;">Intended Use</td><td style="padding: 6px 0;">${lead.intended_use}</td></tr>` : ''}
          ${lead.timeline     ? `<tr><td style="padding: 6px 0; color: #6b7280;">Timeline</td><td style="padding: 6px 0;">${lead.timeline}</td></tr>` : ''}
          ${lead.budget_range ? `<tr><td style="padding: 6px 0; color: #6b7280;">Budget</td><td style="padding: 6px 0;">${lead.budget_range}</td></tr>` : ''}
          ${lead.site_status  ? `<tr><td style="padding: 6px 0; color: #6b7280;">Site Status</td><td style="padding: 6px 0;">${lead.site_status}</td></tr>` : ''}
        </table>

        ${lead.conversation_summary ? `
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <h2 style="color: #111827; font-size: 16px;">Conversation Summary</h2>
        <p style="background: white; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px; margin: 0; white-space: pre-wrap;">${lead.conversation_summary}</p>
        ` : ''}

        <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px;">
          <p style="margin: 0; color: #92400e; font-weight: 600;">⚡ Follow up ASAP — this lead came through website chat</p>
        </div>
      </div>
    </div>
  `

  try {
    await resend.emails.send({
      from:    `Joseph <${FROM_EMAIL}>`,
      to:      NOTIFY_EMAILS,
      subject: `🔥 New chat lead: ${lead.first_name}${lead.last_name ? ' ' + lead.last_name : ''} - ${lead.service_type}`,
      html,
    })
  } catch (err) {
    console.error('Chat lead email error:', err)
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { messages, sessionContext } = body as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>
      sessionContext: SessionContext
    }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'messages array required' }, { status: 400 })
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

    const tools: Anthropic.Tool[] = [
      {
        name: 'capture_lead',
        description:
          'Capture a qualified lead and save their contact + project info. Call this when you have at minimum: first_name + (email OR phone) + service_type, and the person seems serious.',
        input_schema: {
          type: 'object' as const,
          properties: {
            first_name:           { type: 'string', description: "Lead's first name" },
            last_name:            { type: 'string', description: "Lead's last name" },
            email:                { type: 'string', description: "Lead's email address" },
            phone:                { type: 'string', description: "Lead's phone number" },
            city:                 { type: 'string', description: 'City in Florida' },
            zip:                  { type: 'string', description: 'ZIP code' },
            service_type:         { type: 'string', enum: ['kit', 'turnkey'], description: 'Kit delivery or turnkey build' },
            barn_size:            { type: 'string', description: 'Rough dimensions, e.g. "30x40" or "20x30x10"' },
            intended_use:         { type: 'string', description: 'What they want to use the barn for' },
            timeline:             { type: 'string', description: 'When they want to build' },
            budget_range:         { type: 'string', description: 'Their rough budget if shared' },
            site_status:          { type: 'string', description: 'Do they have land, is it cleared, HOA/permit notes' },
            priority:             { type: 'string', enum: ['hot', 'warm', 'cold'], description: 'Lead priority based on signals' },
            conversation_summary: { type: 'string', description: 'Brief summary of the conversation for the sales team' },
          },
          required: ['first_name', 'service_type'],
        },
      },
    ]

    const response = await client.messages.create({
      model:      'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system:     JOSEPH_SYSTEM_PROMPT,
      tools,
      messages,
    })

    let replyText = ''
    let leadCaptured = false

    for (const block of response.content) {
      if (block.type === 'text') {
        replyText += block.text
      } else if (block.type === 'tool_use' && block.name === 'capture_lead') {
        const lead = block.input as LeadInput

        // Validate minimum required fields
        if (lead.first_name && lead.service_type && (lead.email || lead.phone)) {
          const session = sessionContext ?? { url: '', utm: {}, referrer: '' }
          await Promise.all([
            saveLead(lead, session),
            sendLeadEmail(lead),
          ])

          // Fire-and-forget: forward chat lead to marketing bot
          const leadsIngestSecret = process.env.LEADS_INGEST_SECRET
          if (leadsIngestSecret) {
            fetch('https://fpb-marketing-bot.vercel.app/api/leads', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'x-leads-ingest-secret': leadsIngestSecret,
              },
              body: JSON.stringify({
                name:             `${lead.first_name}${lead.last_name ? ' ' + lead.last_name : ''}`,
                email:            lead.email            ?? null,
                phone:            lead.phone            ?? null,
                message:          lead.conversation_summary ?? null,
                source_url:       session.url           ?? null,
                landing_page_url: session.url           ?? null,
                referrer_url:     session.referrer       ?? null,
                utm_source:       session.utm?.utm_source   ?? null,
                utm_medium:       session.utm?.utm_medium   ?? null,
                utm_campaign:     session.utm?.utm_campaign ?? null,
                utm_content:      session.utm?.utm_content  ?? null,
                utm_term:         session.utm?.utm_term     ?? null,
                gclid:            session.utm?.gclid        ?? null,
                fbclid:           session.utm?.fbclid       ?? null,
                lead_type:        'form',
              }),
            }).catch(err => console.error('Marketing bot lead ingest failed (chat):', err))
          } else {
            console.warn('LEADS_INGEST_SECRET not set — skipping marketing bot ingest')
          }

          leadCaptured = true
        } else {
          console.warn('capture_lead called without minimum required fields — skipped', lead)
        }

        // If Claude used a tool but no text block followed, ask for a follow-up text response
        if (!replyText) {
          const followUp = await client.messages.create({
            model:      'claude-sonnet-4-5-20250929',
            max_tokens: 512,
            system:     JOSEPH_SYSTEM_PROMPT,
            tools,
            messages: [
              ...messages,
              { role: 'assistant', content: response.content },
              {
                role: 'user',
                content: [
                  {
                    type: 'tool_result',
                    tool_use_id: block.id,
                    content: 'Lead captured successfully.',
                  },
                ],
              },
            ],
          })

          for (const b of followUp.content) {
            if (b.type === 'text') replyText += b.text
          }
        }
      }
    }

    return NextResponse.json({ reply: replyText, lead_captured: leadCaptured })
  } catch (err) {
    console.error('Chat API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
