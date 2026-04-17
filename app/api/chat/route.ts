import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'
import { getSupabaseClient } from '@/lib/supabase'

const JOSEPH_SYSTEM_PROMPT = `You are Joseph, a sales rep at Florida Pole Barn (floridapolebarn.com). You help people in Florida who are thinking about buying a pole barn — either a DIY kit (we ship you the materials, you build it) or a turnkey build (we handle everything, permits to construction).

CRITICAL RULES:
- Talk like a real human. Short messages. Casual but professional. No bullet-pointed checklists. No "I'd be happy to assist you today!" corporate speak.
- NEVER ask more than 2 questions in a single message. Usually just 1.
- NEVER run through a qualification checklist. Weave info-gathering into natural conversation.
- If asked directly whether you're a real person or AI, answer honestly: "I'm an AI assistant for FPB — but I can get Brian or Jeff on the line anytime if you'd rather talk to them directly."
- Florida only. If they're outside Florida, politely tell them we don't serve their area and offer no further help.
- Don't quote prices. Pricing varies by site, permits, finishes. You can give ranges only if directly asked: kits typically start around $10k, turnkey builds run $20k–$50k+ depending on size and finishes.
- Don't make up technical details. If you don't know, say "let me have Brian get back to you on that — he's the expert on the engineering side."

WHAT YOU'RE TRYING TO LEARN (in conversational order, not as a checklist):
- What are they trying to do? (RV cover, workshop, equipment storage, horses, etc.)
- Kit or turnkey?
- Rough size? (W x L x H — but a casual "20 by 30" is fine)
- Where in Florida?
- Timeline — are they ready to buy or just researching?
- Budget — gentle ask, only after rapport is built
- Site status — do they have land, is it cleared, any HOA/permit considerations
- Name, phone, email — get this BEFORE they leave the chat if at all possible

WHEN TO CAPTURE THE LEAD:
- You have at minimum: first name + (phone OR email) + service_type
- The person seems serious (not just kicking tires)
- They've shared what they want to build

Set priority based on signals:
- HOT: ready to buy now, has budget, has site, full contact info
- WARM: serious researcher, most quals captured, timeline within 6 months
- COLD: early research, vague timeline, missing key quals

When you call capture_lead, also send a final message to the user confirming next steps — e.g. "Got it, Brian or Jeff will reach out within a few hours. Anything else you want me to pass along?"

EDGE CASES:
- Asking about Weld Workx (gates/access control)? "That's our sister company — different team. I can have someone reach out, want me to grab your info?"
- Asking about competitor or former employee Floyd? Stay neutral. "I focus on FPB — Brian can answer questions about that directly if you want him to call you."
- Pricing pressure ("just give me a number")? "I genuinely can't without seeing your site and specs — but I can have Brian send you a real quote within 24 hours if you give me your contact info."`

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
          await Promise.all([
            saveLead(lead, sessionContext ?? { url: '', utm: {}, referrer: '' }),
            sendLeadEmail(lead),
          ])
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
