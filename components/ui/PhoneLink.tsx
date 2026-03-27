'use client'

import { pushEvent } from '@/lib/gtm'

interface PhoneLinkProps {
  href: string
  phoneNumber: string
  location: string
  className?: string
  children: React.ReactNode
}

export default function PhoneLink({ href, phoneNumber, location, className, children }: PhoneLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => pushEvent('phone_click', { phone_number: phoneNumber, click_location: location })}
    >
      {children}
    </a>
  )
}
