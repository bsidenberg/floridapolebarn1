import { Resend } from 'resend'
import type { QuoteFormData } from './types'

const resend = new Resend(process.env.RESEND_API_KEY)

const NOTIFY_EMAILS = ['info@floridapolebarn.com', 'sales@floridapolebarn.com', 'paul@floridapolebarn.com']
const FROM_EMAIL = 'onboarding@resend.dev'

export async function sendQuoteNotification(data: QuoteFormData): Promise<{ success: boolean; error?: string }> {
  const serviceTypeLabels: Record<string, string> = {
    'kit-only': 'Kit Delivery Only',
    'kit-install': 'Kit + Installation',
  }
  const serviceTypeLabel = serviceTypeLabels[data.serviceType] ?? data.serviceType

  const buildingTypeLabel = {
    open: 'Open Pole Barn',
    enclosed: 'Enclosed Pole Barn',
    unsure: 'Not Sure Yet',
  }[data.buildingType]

  const timelineLabel = {
    asap: 'As Soon As Possible',
    '1-3mo': '1–3 Months',
    '3-6mo': '3–6 Months',
    '6mo+': '6+ Months',
    planning: 'Just Planning',
  }[data.timeline] ?? data.timeline

  const notifyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #b91c1c; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">New Quote Request</h1>
        <p style="color: #fecaca; margin: 4px 0 0;">Florida Pole Barn Website</p>
      </div>
      <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">

        <h2 style="color: #111827; font-size: 16px; margin-top: 0;">Contact Info</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 140px;">Name</td><td style="padding: 6px 0; font-weight: 600;">${data.firstName} ${data.lastName}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Phone</td><td style="padding: 6px 0; font-weight: 600;"><a href="tel:${data.phone.replace(/\D/g, '')}" style="color: #b91c1c;">${data.phone}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Email</td><td style="padding: 6px 0;"><a href="mailto:${data.email}" style="color: #b91c1c;">${data.email}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Zip Code</td><td style="padding: 6px 0;">${data.zipCode}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">

        <h2 style="color: #111827; font-size: 16px;">Project Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 6px 0; color: #6b7280; width: 140px;">Service</td><td style="padding: 6px 0;">${serviceTypeLabel}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280; width: 140px;">Building Type</td><td style="padding: 6px 0;">${buildingTypeLabel}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Size</td><td style="padding: 6px 0;">${data.size}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Primary Uses</td><td style="padding: 6px 0;">${data.primaryUses.join(', ')}</td></tr>
          <tr><td style="padding: 6px 0; color: #6b7280;">Timeline</td><td style="padding: 6px 0;">${timelineLabel}</td></tr>
        </table>

        ${
          data.notes
            ? `
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <h2 style="color: #111827; font-size: 16px;">Additional Notes</h2>
        <p style="background: white; padding: 12px; border: 1px solid #e5e7eb; border-radius: 6px; margin: 0;">${data.notes}</p>
        `
            : ''
        }

        <div style="margin-top: 24px; padding: 16px; background: #fef3c7; border: 1px solid #fcd34d; border-radius: 6px;">
          <p style="margin: 0; color: #92400e; font-weight: 600;">⚡ Follow up within 1 business day</p>
        </div>
      </div>
    </div>
  `

  const confirmHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #b91c1c; padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 22px;">We Got Your Quote Request!</h1>
        <p style="color: #fecaca; margin: 4px 0 0;">Florida Pole Barn</p>
      </div>
      <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
        <p style="color: #111827;">Hi ${data.firstName},</p>
        <p style="color: #374151;">Thanks for reaching out! We received your request for a <strong>${buildingTypeLabel}</strong>${data.size !== 'custom' ? ` (${data.size})` : ''} and will be in touch within <strong>1 business day</strong>.</p>

        <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <p style="margin: 0 0 8px; font-weight: 600; color: #111827;">Your Request Summary</p>
          <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">Building Type: ${buildingTypeLabel}</p>
          <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">Size: ${data.size}</p>
          <p style="margin: 4px 0; color: #6b7280; font-size: 14px;">Primary Use: ${data.primaryUses.join(', ')}</p>
        </div>

        <p style="color: #374151;">In the meantime, feel free to call us directly:</p>
        <p style="font-size: 22px; font-weight: 700; color: #b91c1c; margin: 8px 0;">
          <a href="tel:3523400822" style="color: #b91c1c; text-decoration: none;">(352) 340-0822</a>
        </p>

        <p style="color: #6b7280; font-size: 13px; margin-top: 24px; border-top: 1px solid #e5e7eb; padding-top: 16px;">
          Florida Pole Barn<br>
          Florida Highway 50, Clermont, FL 34711<br>
          <a href="https://floridapolebarn.com" style="color: #b91c1c;">floridapolebarn.com</a>
        </p>
      </div>
    </div>
  `

  try {
    await Promise.all([
      resend.emails.send({
        from: `Florida Pole Barn <${FROM_EMAIL}>`,
        to: NOTIFY_EMAILS,
        subject: `New Quote Request — ${data.firstName} ${data.lastName} (${data.zipCode})`,
        html: notifyHtml,
        reply_to: data.email,
      }),
      resend.emails.send({
        from: `Florida Pole Barn <${FROM_EMAIL}>`,
        to: [data.email],
        subject: 'We received your pole barn quote request',
        html: confirmHtml,
      }),
    ])

    return { success: true }
  } catch (err) {
    console.error('Email send error:', err)
    return { success: false, error: 'Failed to send email' }
  }
}
