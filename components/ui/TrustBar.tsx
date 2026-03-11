import Image from 'next/image'

const badges = [
  { img: '/us.png', icon: '', label: 'Made in USA' },
  { icon: '🌀', label: 'Minimum 140+ MPH Wind Rated' },
  { icon: '✅', label: 'Florida Code Compliant' },
  { icon: '🔧', label: 'Custom Steel Trusses' },
  { icon: '🏠', label: 'Serving All of Florida' },
  { icon: '⭐', label: 'Free Quote · No Pressure' },
]

export default function TrustBar() {
  return (
    <div className="bg-brand-800 py-3">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {badges.map((badge) => (
            <li key={badge.label} className="flex items-center gap-1.5 text-sm text-brand-100 whitespace-nowrap">
              {'img' in badge && badge.img
                ? <Image src={badge.img} alt="" width={20} height={20} className="shrink-0" />
                : <span className="text-base">{badge.icon}</span>
              }
              <span>{badge.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
