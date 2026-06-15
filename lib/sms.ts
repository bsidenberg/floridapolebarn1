/**
 * Sends the customer-facing quote confirmation SMS via Twilio's REST API.
 *
 * Uses plain fetch + Basic auth (no twilio npm package). Never throws — all
 * failure modes are returned as { sent: false, reason } so the caller's
 * email-driven success path is never affected.
 */
export async function sendQuoteConfirmationSms(params: {
  phone: string | null | undefined
  firstName: string
}): Promise<{ sent: boolean; reason?: string }> {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_FROM_NUMBER

  // 1. Twilio not configured — skip silently (info log), never throw.
  if (!sid || !token || !from) {
    console.info('[sms] skipped: Twilio not configured')
    return { sent: false, reason: 'twilio_not_configured' }
  }

  // 2. No phone number to text.
  const raw = (params.phone ?? '').trim()
  if (!raw) {
    return { sent: false, reason: 'no_phone' }
  }

  // 3. Normalize to E.164.
  const to = normalizeToE164(raw)
  if (!to) {
    console.error('[sms] invalid phone, cannot normalize to E.164:', params.phone)
    return { sent: false, reason: 'invalid_phone' }
  }

  const body =
    "Florida Pole Barn: We received your quote request! Our team is on it - you'll hear from us within 48 hours. Reply STOP to opt out."

  // 4. Send via Twilio REST API.
  const endpoint = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`
  const auth = 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64')

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        To: to,
        From: from,
        Body: body,
      }).toString(),
    })

    // 5. Non-2xx — log status + body, do not throw.
    if (!res.ok) {
      const text = await res.text().catch(() => '(unreadable response body)')
      console.error(`[sms] Twilio send failed: HTTP ${res.status} ${res.statusText} — ${text}`)
      return { sent: false, reason: 'twilio_error' }
    }

    return { sent: true }
  } catch (err) {
    console.error('[sms] Twilio request failed:', err)
    return { sent: false, reason: 'twilio_error' }
  }
}

/**
 * Strips to digits (preserving a single leading '+') and resolves to E.164.
 * Returns null if the input cannot be confidently normalized.
 */
function normalizeToE164(input: string): string | null {
  const hasPlus = input.trim().startsWith('+')
  const digits = input.replace(/[^\d]/g, '')

  // Already E.164-style (caller supplied a country code with '+').
  if (hasPlus) {
    return digits ? `+${digits}` : null
  }

  // US 10-digit local number.
  if (digits.length === 10) {
    return `+1${digits}`
  }

  // US 11-digit number with leading country code 1.
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`
  }

  return null
}
