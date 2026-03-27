import Link from 'next/link'
import Image from 'next/image'
import { COMPANY } from '@/lib/constants'
import PhoneLink from '@/components/ui/PhoneLink'

const productLinks = [
  { label: 'Open Pole Barn Kits', href: '/open-pole-barns' },
  { label: 'Enclosed Pole Barn Kits', href: '/enclosed-pole-barns' },
]

const useLinks = [
  { label: 'Horse Barns', href: '/horse-barns' },
  { label: 'Equipment Storage', href: '/equipment-storage' },
  { label: 'RV & Boat Storage', href: '/rv-boat-storage' },
  { label: 'Workshop & Garage', href: '/workshop-garage' },
  { label: 'Agricultural Buildings', href: '/agricultural-buildings' },
]

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Service Area', href: '/service-area' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Blog', href: '/blog' },
  { label: 'Get Free Quote', href: '/quote' },
]

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900">
      {/* Main CTA strip */}
      <div className="bg-accent-600 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold text-xl">Ready to build your pole barn?</p>
            <p className="text-orange-100 text-sm mt-0.5">Free quotes · No commitment · We call you within 1 business day</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <PhoneLink
              href={COMPANY.phoneHref}
              phoneNumber="3523400822"
              location="footer_cta"
              className="btn-white text-sm px-5 py-2.5 whitespace-nowrap"
            >
              {COMPANY.phone}
            </PhoneLink>
            <Link href="/quote" className="bg-white/10 border border-white/30 text-white hover:bg-white/20 inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all whitespace-nowrap">
              Request Free Quote →
            </Link>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/1.1.png" alt="Florida Pole Barn" width={159} height={53} className="h-[53px] w-auto" />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Building custom pole barn kits across Florida. Engineered for Florida weather, made in the USA.
            </p>
            <div className="space-y-1.5 text-sm">
              <PhoneLink
                href={COMPANY.phoneHref}
                phoneNumber="3523400822"
                location="footer_contact"
                className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
              >
                <svg className="h-4 w-4 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                {COMPANY.phone}
              </PhoneLink>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors">
                <svg className="h-4 w-4 text-brand-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {COMPANY.email}
              </a>
              <p className="flex items-start gap-2 text-gray-600 text-xs">
                <svg className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {COMPANY.address.full}
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <a href={COMPANY.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href={COMPANY.social.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                </svg>
              </a>
              <a href={COMPANY.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors" aria-label="TikTok">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-black mb-4">Products</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-700 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-semibold uppercase tracking-wider text-black mb-4 mt-6">Building Uses</h3>
            <ul className="space-y-2">
              {useLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-700 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-black mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-700 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Trust badges */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-black mb-4">Why Choose Us</h3>
            <ul className="space-y-3">
              {[
                { icon: '', img: '/us.png', text: 'Made in the USA' },
                { icon: '🌀', text: '140+ MPH Wind Rated' },
                { icon: '✅', text: 'Florida Code Compliant' },
                { icon: '🔧', text: 'Custom Fabricated Steel' },
                { icon: '🏠', text: 'Serving All of Florida' },
                { icon: '📞', text: 'Free Quotes, No Pressure' },
              ].map((item) => (
                <li key={item.text} className="flex items-center gap-2 text-sm text-gray-800 whitespace-nowrap">
                  <span className="flex items-center justify-center w-5 h-5 shrink-0">
                    {'img' in item && item.img
                      ? <Image src={item.img} alt="" width={18} height={18} />
                      : <span className="text-base leading-none">{item.icon}</span>
                    }
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Florida Pole Barn. All rights reserved.</p>
          <p>Clermont, FL — Serving All of Florida</p>
        </div>
      </div>
    </footer>
  )
}
