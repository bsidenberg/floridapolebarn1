import { readFileSync } from 'fs'
import { join } from 'path'

// Manually load .env.local before anything else — dotenv isn't installed in this project
const envPath = join(process.cwd(), '.env.local')
try {
  const envFile = readFileSync(envPath, 'utf-8')
  for (const line of envFile.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = val
  }
  console.log('Loaded .env.local')
} catch {
  console.warn('Could not read .env.local — falling back to existing process.env')
}

// Lazy-load the email module AFTER env is populated
async function main() {
  const { sendCrmSyncFailureAlert } = await import('../lib/email')

  const mockLeadPayload = {
    service_type: 'Kit Delivery Only',
    first_name: 'ALERT',
    last_name: 'TEST',
    email: 'alert-test@example.com',
    phone: '555-000-0000',
    city: 'Test City',
    zip: '00000',
    barn_size: '30x40x12',
    notes: 'This is a test of the CRM sync failure alert path. If you received this email, the alerting works.',
    stage: 'new',
    priority: 'cold',
    source: 'Website Form',
  }

  const mockError = {
    message: 'TEST: Simulated failure — new row for relation "leads" violates check constraint',
    code: '23514',
  }

  console.log('Calling sendCrmSyncFailureAlert...')
  const result = await sendCrmSyncFailureAlert({ leadPayload: mockLeadPayload, error: mockError })
  console.log('Result:', JSON.stringify(result, null, 2))

  if (result.success) {
    console.log('\n✅ Alert email sent successfully. Check info@floridapolebarn.com inbox.')
    process.exit(0)
  } else {
    console.log('\n❌ Alert email failed:', result.error)
    process.exit(1)
  }
}

main().catch(err => {
  console.error('Unhandled error:', err)
  process.exit(1)
})
