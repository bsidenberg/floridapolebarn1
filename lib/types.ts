export interface BarnSize {
  width: number
  length: number
  heights: number[]
  sqft: number
  primaryUse: string
  startingPrice: number | null
}

export interface UseCase {
  id: string
  label: string
  shortLabel: string
  description: string
  href: string
  icon: string
}

export interface Testimonial {
  name: string
  location: string
  rating: number
  text: string
  useCase: string
}

export interface GalleryImage {
  src: string
  alt: string
  category: 'open' | 'enclosed' | 'horse' | 'equipment' | 'workshop' | 'rv'
  caption: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface QuoteFormData {
  // Step 1
  serviceType: 'kit-only' | 'kit-install'
  buildingType: 'open' | 'enclosed' | 'unsure'
  size: string
  // Step 2
  primaryUses: string[]
  city: string
  state: string
  zipCode: string
  timeline: string
  engineeringOption?: 'plans-only' | 'plans-and-permits'
  // Step 3
  firstName: string
  lastName: string
  phone: string
  email: string
  notes?: string
}

export interface ServiceCity {
  name: string
  county: string
  region: 'central' | 'north' | 'south' | 'east' | 'west'
}
