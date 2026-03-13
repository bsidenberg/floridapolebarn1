import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendQuoteNotification } from '@/lib/email'

const schema = z.object({
  serviceType: z.enum(['kit-only', 'kit-install']),
  buildingType: z.enum(['open', 'enclosed', 'unsure']),
  size: z.string().min(1),
  primaryUses: z.array(z.string()).min(1),
  zipCode: z.string().min(5).max(10),
  timeline: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(10),
  email: z.string().email(),
  notes: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const result = await sendQuoteNotification(data)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
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
