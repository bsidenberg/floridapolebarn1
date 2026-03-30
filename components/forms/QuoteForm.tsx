'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BARN_SIZES } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { pushEvent } from '@/lib/gtm'
import { getStoredUtmData } from '@/lib/utm'

const schema = z.object({
  serviceType: z.enum(['kit-only', 'kit-install'], { required_error: 'Please select a service type' }),
  buildingType: z.enum(['open', 'enclosed', 'unsure'], { required_error: 'Please select a building type' }),
  size: z.string().min(1, 'Please select a size'),
  primaryUses: z.array(z.string()).min(1, 'Please select at least one use'),
  zipCode: z.string().min(5, 'Please enter a valid zip code').max(10),
  timeline: z.string().min(1, 'Please select a timeline'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  email: z.string().email('Please enter a valid email address'),
  notes: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const USE_OPTIONS = [
  { id: 'equipment-storage', label: 'Equipment Storage' },
  { id: 'horse-barn', label: 'Horse Barn' },
  { id: 'rv-boat-storage', label: 'RV / Boat Storage' },
  { id: 'workshop-garage', label: 'Workshop / Garage' },
  { id: 'agricultural', label: 'Agricultural / Farming' },
  { id: 'man-cave', label: 'Man Cave / Recreation' },
  { id: 'commercial', label: 'Commercial Use' },
  { id: 'other', label: 'Other' },
]

const SIZE_OPTIONS = [
  { value: '20x24x12', label: '20×24 (12 ft walls) — 480 sq ft' },
  { value: '20x24x14', label: '20×24 (14 ft walls) — 480 sq ft' },
  { value: '30x36x12', label: '30×36 (12 ft walls) — 1,080 sq ft' },
  { value: '30x36x14', label: '30×36 (14 ft walls) — 1,080 sq ft' },
  { value: '40x48x12', label: '40×48 (12 ft walls) — 1,920 sq ft' },
  { value: '40x48x14', label: '40×48 (14 ft walls) — 1,920 sq ft' },
  { value: '40x60x12', label: '40×60 (12 ft walls) — 2,400 sq ft' },
  { value: '40x60x14', label: '40×60 (14 ft walls) — 2,400 sq ft' },
  { value: '50x60x12', label: '50×60 (12 ft walls) — 3,000 sq ft' },
  { value: '50x60x14', label: '50×60 (14 ft walls) — 3,000 sq ft' },
  { value: '50x96x12', label: '50×96 (12 ft walls) — 4,800 sq ft' },
  { value: '50x96x14', label: '50×96 (14 ft walls) — 4,800 sq ft' },
  { value: 'custom', label: 'Custom size — I\'ll describe in notes' },
]

const TIMELINE_OPTIONS = [
  { value: 'asap', label: 'As Soon As Possible' },
  { value: '1-3mo', label: '1–3 Months' },
  { value: '3-6mo', label: '3–6 Months' },
  { value: '6mo+', label: '6+ Months Out' },
  { value: 'planning', label: 'Just Planning / Getting Info' },
]

const STEPS = ['Building', 'Details', 'Contact']

export default function QuoteForm() {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      primaryUses: [],
    },
  })

  const serviceType = watch('serviceType')
  const buildingType = watch('buildingType')
  const primaryUses = watch('primaryUses')

  const toggleUse = (id: string) => {
    const current = primaryUses || []
    setValue(
      'primaryUses',
      current.includes(id) ? current.filter((u) => u !== id) : [...current, id],
      { shouldValidate: true }
    )
  }

  const nextStep = async () => {
    let fieldsToValidate: (keyof FormData)[] = []
    if (step === 0) fieldsToValidate = ['serviceType', 'buildingType', 'size']
    if (step === 1) fieldsToValidate = ['primaryUses', 'zipCode', 'timeline']

    const valid = await trigger(fieldsToValidate)
    if (valid) setStep((s) => s + 1)
  }

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setSubmitError(null)

    try {
      const utmData = getStoredUtmData()
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...utmData }),
      })

      const json = await res.json()

      if (!res.ok || !json.success) {
        setSubmitError('Something went wrong. Please call us directly at (352) 340-0822.')
        return
      }

      setSubmitted(true)
      pushEvent('form_submission', {
        form_name: 'get_free_quote',
        form_location: window.location.pathname,
      })
    } catch {
      setSubmitError('Network error. Please try calling us at (352) 340-0822.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-4">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-100">
          <svg className="h-10 w-10 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Quote Request Received!</h2>
        <p className="mt-3 text-gray-600 max-w-md mx-auto">
          Thanks! We received your request and will call you within 1 business day to discuss your pole barn project.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          Need to talk sooner?{' '}
          <a href="tel:3523400822" className="font-semibold text-brand-600 hover:underline">
            Call us at (352) 340-0822
          </a>
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  i < step
                    ? 'bg-brand-600 text-white'
                    : i === step
                    ? 'bg-accent-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                )}
              >
                {i < step ? (
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span className={cn('text-sm font-medium hidden sm:block', i === step ? 'text-accent-600' : i < step ? 'text-brand-600' : 'text-gray-400')}>
                {label}
              </span>
              {i < STEPS.length - 1 && (
                <div className={cn('flex-1 h-0.5 w-8 sm:w-16 mx-2', i < step ? 'bg-brand-600' : 'bg-gray-200')} />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Step 0: Building */}
        {step === 0 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                What are you looking for? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { value: 'kit-only', label: 'Kit Delivery Only', desc: 'We deliver the kit — you or your crew installs it', icon: '📦' },
                  { value: 'kit-install', label: 'Kit + Installation', desc: 'We deliver and fully install your barn', icon: '🔨' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-xl border-2 p-4 cursor-pointer transition-all text-center',
                      serviceType === opt.value
                        ? 'border-accent-500 bg-accent-50'
                        : 'border-gray-200 hover:border-brand-300 bg-white'
                    )}
                  >
                    <input type="radio" value={opt.value} {...register('serviceType')} className="sr-only" />
                    <span className="text-3xl">{opt.icon}</span>
                    <span className="font-semibold text-sm text-gray-900">{opt.label}</span>
                    <span className="text-xs text-gray-500">{opt.desc}</span>
                  </label>
                ))}
              </div>
              {errors.serviceType && (
                <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                What type of pole barn do you need? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { value: 'open', label: 'Open Pole Barn', desc: 'Roof + posts, open sides', icon: '🏗️' },
                  { value: 'enclosed', label: 'Enclosed Pole Barn', desc: 'Full walls, doors, weather-tight', icon: '🏠' },
                  { value: 'unsure', label: 'Not Sure Yet', desc: 'Help me decide', icon: '💬' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={cn(
                      'flex flex-col items-center gap-2 rounded-xl border-2 p-4 cursor-pointer transition-all text-center',
                      buildingType === opt.value
                        ? 'border-accent-500 bg-accent-50'
                        : 'border-gray-200 hover:border-brand-300 bg-white'
                    )}
                  >
                    <input type="radio" value={opt.value} {...register('buildingType')} className="sr-only" />
                    <span className="text-3xl">{opt.icon}</span>
                    <span className="font-semibold text-sm text-gray-900">{opt.label}</span>
                    <span className="text-xs text-gray-500">{opt.desc}</span>
                  </label>
                ))}
              </div>
              {errors.buildingType && (
                <p className="mt-1 text-sm text-red-600">{errors.buildingType.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="size" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Approximate size <span className="text-red-500">*</span>
              </label>
              <select
                id="size"
                {...register('size')}
                className={cn(
                  'w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white',
                  errors.size ? 'border-red-400' : 'border-gray-300'
                )}
              >
                <option value="">Select a size...</option>
                {SIZE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              {errors.size && <p className="mt-1 text-sm text-red-600">{errors.size.message}</p>}
            </div>

            <button type="button" onClick={nextStep} className="btn-primary w-full py-3">
              Next: Project Details →
            </button>
          </div>
        )}

        {/* Step 1: Details */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                What will you primarily use it for? <span className="text-red-500">*</span>{' '}
                <span className="font-normal text-gray-500">(select all that apply)</span>
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {USE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleUse(opt.id)}
                    className={cn(
                      'rounded-lg border-2 px-3 py-2.5 text-xs font-semibold transition-all text-center',
                      primaryUses?.includes(opt.id)
                        ? 'border-accent-500 bg-accent-50 text-accent-700'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-brand-300'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.primaryUses && (
                <p className="mt-1 text-sm text-red-600">{errors.primaryUses.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Property Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  id="zipCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  {...register('zipCode')}
                  placeholder="32711"
                  className={cn(
                    'w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500',
                    errors.zipCode ? 'border-red-400' : 'border-gray-300'
                  )}
                />
                {errors.zipCode && <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>}
              </div>

              <div>
                <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Desired Timeline <span className="text-red-500">*</span>
                </label>
                <select
                  id="timeline"
                  {...register('timeline')}
                  className={cn(
                    'w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white',
                    errors.timeline ? 'border-red-400' : 'border-gray-300'
                  )}
                >
                  <option value="">Select timeline...</option>
                  {TIMELINE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.timeline && <p className="mt-1 text-sm text-red-600">{errors.timeline.message}</p>}
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(0)} className="btn-secondary flex-none px-5">
                ← Back
              </button>
              <button type="button" onClick={nextStep} className="btn-primary flex-1 py-3">
                Next: Your Info →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Contact */}
        {step === 2 && (
          <div className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  {...register('firstName')}
                  placeholder="John"
                  className={cn(
                    'w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500',
                    errors.firstName ? 'border-red-400' : 'border-gray-300'
                  )}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  {...register('lastName')}
                  placeholder="Smith"
                  className={cn(
                    'w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500',
                    errors.lastName ? 'border-red-400' : 'border-gray-300'
                  )}
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="(352) 555-0100"
                className={cn(
                  'w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500',
                  errors.phone ? 'border-red-400' : 'border-gray-300'
                )}
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                placeholder="john@example.com"
                className={cn(
                  'w-full rounded-lg border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500',
                  errors.email ? 'border-red-400' : 'border-gray-300'
                )}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Additional Notes <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="notes"
                {...register('notes')}
                rows={3}
                placeholder="Tell us anything else about your project — lot size, specific requirements, questions, etc."
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
              />
            </div>

            {submitError && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-700">
                {submitError}
              </div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-none px-5">
                ← Back
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex-1 py-3 disabled:opacity-60"
              >
                {submitting ? 'Sending...' : 'Submit Quote Request →'}
              </button>
            </div>

            <p className="text-center text-xs text-gray-500">
              By submitting, you agree to be contacted about your quote request.
              No spam, ever. We call you — we don&apos;t sell your info.
            </p>
          </div>
        )}
      </form>
    </div>
  )
}
