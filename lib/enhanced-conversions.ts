/**
 * Google Ads Enhanced conversions for web — user-provided data.
 *
 * Shape matches Google's documented `user_data` object (unhashed). GTM hashes
 * before the hit leaves the browser. Do not log this object: it contains email
 * and phone.
 *
 * https://support.google.com/google-ads/answer/13258081
 */

export type EnhancedConversionAddress = {
  first_name?: string
  last_name?: string
  city?: string
  region?: string
  postal_code?: string
  country: 'US'
}

export type EnhancedConversionUserData = {
  email: string
  phone_number?: string
  address: EnhancedConversionAddress
}

export type EnhancedConversionContact = {
  email: string
  phone: string
  firstName: string
  lastName: string
  city: string
  state: string
  zipCode: string
}

/**
 * US phone → E.164 (`+1` and 10 digits). Accepts `###-###-####` and other
 * punctuation. Returns undefined when the value is not a 10-digit US number.
 */
export function normalizeUsPhoneE164(phone: string): string | undefined {
  const digits = phone.replace(/\D/g, '')
  const national = digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits
  if (national.length !== 10) return undefined
  return `+1${national}`
}

function lowerTrim(value: string): string {
  return value.trim().toLowerCase()
}

/**
 * Build the Enhanced conversions `user_data` payload. Phone is E.164 here only;
 * callers must keep the CRM/API phone in its original format.
 * Returns undefined when email is missing so we never push an empty object.
 */
export function buildEnhancedConversionUserData(
  contact: EnhancedConversionContact,
): EnhancedConversionUserData | undefined {
  const email = lowerTrim(contact.email)
  if (!email) return undefined

  const address: EnhancedConversionAddress = { country: 'US' }
  const first_name = lowerTrim(contact.firstName)
  const last_name = lowerTrim(contact.lastName)
  const city = lowerTrim(contact.city)
  const region = contact.state.trim().toUpperCase()
  const postal_code = contact.zipCode.trim()

  if (first_name) address.first_name = first_name
  if (last_name) address.last_name = last_name
  if (city) address.city = city
  if (region) address.region = region
  if (postal_code) address.postal_code = postal_code

  const phone_number = normalizeUsPhoneE164(contact.phone)
  return phone_number ? { email, phone_number, address } : { email, address }
}
