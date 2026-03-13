import type { BarnSize, UseCase, Testimonial, GalleryImage, FAQItem, ServiceCity } from './types'

export const COMPANY = {
  name: 'Florida Pole Barn',
  fullName: 'Florida Pole Barn',
  tagline: "Central Florida's Trusted Pole Barn Builder",
  phone: '(352) 340-0822',
  phoneHref: 'tel:3523400822',
  email: 'info@floridapolebarn.com',
  address: {
    street: 'Florida Highway 50',
    city: 'Clermont',
    state: 'FL',
    zip: '34711',
    full: 'Florida Highway 50, Clermont, FL 34711',
  },
  social: {
    facebook: 'https://www.facebook.com/people/Florida-Pole-Barn/61556805939648/',
    instagram: 'https://www.instagram.com/florida_pole_barn/',
    tiktok: 'https://www.tiktok.com/@floydfonck?lang=en',
  },
} as const

export const BARN_SIZES: BarnSize[] = [
  {
    width: 20,
    length: 24,
    heights: [12, 14],
    sqft: 480,
    primaryUse: 'Personal storage, small garage',
    startingPrice: 2326,
  },
  {
    width: 30,
    length: 36,
    heights: [12, 14],
    sqft: 1080,
    primaryUse: 'Equipment storage, small workshop',
    startingPrice: 4601,
  },
  {
    width: 40,
    length: 48,
    heights: [12, 14],
    sqft: 1920,
    primaryUse: 'Large workshop, horse barn, multi-vehicle',
    startingPrice: 7244,
  },
  {
    width: 40,
    length: 60,
    heights: [12, 14],
    sqft: 2400,
    primaryUse: 'Multi-use barn, RV storage, agricultural',
    startingPrice: 8788,
  },
  {
    width: 50,
    length: 60,
    heights: [12, 14],
    sqft: 3000,
    primaryUse: 'Large agricultural or commercial storage',
    startingPrice: 12140,
  },
  {
    width: 50,
    length: 96,
    heights: [12, 14],
    sqft: 4800,
    primaryUse: 'Commercial barn, large-scale agricultural',
    startingPrice: 16962,
  },
]

export const USE_CASES: UseCase[] = [
  {
    id: 'horse-barns',
    label: 'Horse Barns',
    shortLabel: 'Horse Barns',
    description: 'Safe, ventilated shelters engineered for Florida heat with stall options and custom layouts.',
    href: '/horse-barns',
    icon: '/Horse Barn2.png',
  },
  {
    id: 'equipment-storage',
    label: 'Equipment Storage',
    shortLabel: 'Equipment',
    description: 'Protect tractors, ATVs, farm equipment, and tools from the Florida sun and rain.',
    href: '/equipment-storage',
    icon: '/Equipment1.png',
  },
  {
    id: 'rv-boat-storage',
    label: 'RV & Boat Storage',
    shortLabel: 'RV & Boat',
    description: 'Covered, open storage for RVs, boats, and recreational vehicles — easy pull-through access.',
    href: '/rv-boat-storage',
    icon: '/RV & Boat1.png',
  },
  {
    id: 'workshop-garage',
    label: 'Workshop & Garage',
    shortLabel: 'Workshop',
    description: 'Build the ultimate garage, workshop, or man cave on your property.',
    href: '/workshop-garage',
    icon: '/Workshop1.png',
  },
  {
    id: 'agricultural-buildings',
    label: 'Agricultural Buildings',
    shortLabel: 'Agricultural',
    description: 'Durable farm structures for hay, crop storage, livestock, and agricultural operations.',
    href: '/agricultural-buildings',
    icon: '/Agricultural.png',
  },
  {
    id: 'man-cave',
    label: 'Man Cave / Recreation',
    shortLabel: 'Man Cave',
    description: "Your property, your rules. Build the recreational retreat you've always wanted.",
    href: '/workshop-garage',
    icon: '/Man Cave1.png',
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Mike R.',
    location: 'Ocala, FL',
    rating: 5,
    text: 'Florida Pole Barn built us a 40×60 equipment storage barn. The team was professional, got it done on time, and the quality is outstanding. Our equipment has never been better protected from the Florida weather.',
    useCase: 'Equipment Storage',
  },
  {
    name: 'Sarah T.',
    location: 'Clermont, FL',
    rating: 5,
    text: 'We needed a horse barn before the rainy season. They delivered a beautiful 30×36 enclosed barn with everything we needed. Our horses are happy and we couldn\'t be more pleased with the craftsmanship.',
    useCase: 'Horse Barn',
  },
  {
    name: 'James K.',
    location: 'Leesburg, FL',
    rating: 5,
    text: 'Best investment I\'ve made on my property. The 50×60 pole barn has been rock solid through two hurricane seasons. Built to Florida code and engineered for 140 mph winds — I\'d recommend them to anyone.',
    useCase: 'Agricultural Storage',
  },
  {
    name: 'David M.',
    location: 'Lakeland, FL',
    rating: 5,
    text: 'Used them to build a workshop and man cave. Exactly what I envisioned at a price that beat every other quote I got. The Florida Pole Barn team really knows what they\'re doing.',
    useCase: 'Workshop',
  },
  {
    name: 'Robert H.',
    location: 'Orlando, FL',
    rating: 5,
    text: 'Finally have a place to store my RV and boat out of the Florida sun. The 40×48 open barn has been perfect. Easy to pull in and out, great ventilation. Very happy with the whole experience.',
    useCase: 'RV & Boat Storage',
  },
]

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/Open.jpg',
    alt: 'Open pole barn kit in Central Florida with metal roof',
    category: 'open',
    caption: '40×60 Open Pole Barn — Ocala, FL',
  },
  {
    src: '/Shop-Front.jpg',
    alt: 'Enclosed pole barn with metal siding and roll-up door',
    category: 'enclosed',
    caption: '30×36 Enclosed Barn — Clermont, FL',
  },
  {
    src: '/IMG_6667.jpg',
    alt: 'Horse barn with stalls in Florida',
    category: 'horse',
    caption: '40×48 Horse Barn — Leesburg, FL',
  },
  {
    src: '/IMG_6911.jpg',
    alt: 'Equipment storage pole barn',
    category: 'equipment',
    caption: '50×60 Equipment Storage — Polk County, FL',
  },
  {
    src: '/Jeffs.jpeg',
    alt: 'Enclosed workshop pole barn with large doors',
    category: 'workshop',
    caption: '40×48 Workshop — Lakeland, FL',
  },
  {
    src: '/IMG_8588.jpg',
    alt: 'Open pole barn for RV storage',
    category: 'rv',
    caption: '30×60 RV Storage — Orlando, FL',
  },
  {
    src: '/IMG_6669.jpg',
    alt: 'Horse barn with metal roof in Florida',
    category: 'horse',
    caption: '30×60 Horse Barn — Sumter County, FL',
  },
  {
    src: '/IMG_6913.jpg',
    alt: 'Open equipment storage barn with wide span',
    category: 'equipment',
    caption: '40×60 Equipment Storage — Gainesville, FL',
  },
  {
    src: '/Lundy.jpg',
    alt: 'Custom pole barn workshop and man cave',
    category: 'workshop',
    caption: '30×48 Man Cave Workshop — Kissimmee, FL',
  },
  {
    src: '/Open-Gable-with-Roof-Trim.jpg',
    alt: 'Open pole barn with gable and roof trim detail',
    category: 'open',
    caption: '40×48 Open Barn — Alachua County, FL',
  },
  {
    src: '/IMG_8998.jpg',
    alt: 'Agricultural pole barn building in Florida',
    category: 'equipment',
    caption: 'Agricultural Storage — Central Florida',
  },
  {
    src: '/IMG_6668.jpg',
    alt: 'Horse barn in Florida',
    category: 'horse',
    caption: 'Horse Barn — Central Florida',
  },
  {
    src: '/IMG_9688.JPG',
    alt: 'Enclosed pole barn in Clermont, FL',
    category: 'enclosed',
    caption: 'Enclosed Pole Barn — Clermont, FL',
  },
  {
    src: '/IMG_9687.JPG',
    alt: 'Enclosed pole barn in Clermont, FL',
    category: 'enclosed',
    caption: 'Enclosed Pole Barn — Clermont, FL',
  },
  {
    src: '/619caba4-24e3-4042-a104-991bb2adf494.jpg',
    alt: 'Enclosed pole barn in Seffner, FL',
    category: 'enclosed',
    caption: 'Enclosed Pole Barn — Seffner, FL',
  },
  {
    src: '/89bfd6f3-82b6-43de-b5a1-137c4e192b55.jpg',
    alt: 'Enclosed pole barn in Seffner, FL',
    category: 'enclosed',
    caption: 'Enclosed Pole Barn — Seffner, FL',
  },
]

export const FAQS: FAQItem[] = [
  {
    question: 'Do I need a permit to build a pole barn in Florida?',
    answer:
      'In most Florida counties, a building permit is required for any permanent structure. The requirements vary by county and the size of your building. We work with customers to understand local permit requirements. Our buildings are engineered to Florida building codes, making the permit process straightforward.',
  },
  {
    question: 'How long does it take to build a pole barn?',
    answer:
      'Most pole barn kits can be delivered within 4–6 weeks after order. Installation typically takes 3–7 days depending on the size and complexity. We\'ll give you a specific timeline during your free quote consultation.',
  },
  {
    question: 'Are your pole barns rated for Florida weather and hurricanes?',
    answer:
      'Yes. All of our buildings are engineered specifically for Florida conditions and rated for 140 mph winds. Our steel trusses are custom-fabricated with hot-formed angle iron and designed to meet Florida building code requirements.',
  },
  {
    question: 'What is the difference between an open and enclosed pole barn?',
    answer:
      'Open pole barns have a roof and posts but no walls, providing ventilation and covered storage at the lowest cost. Enclosed pole barns add metal siding and doors, providing weather protection and security for your equipment, animals, or valuables.',
  },
  {
    question: 'What post sizes do you use?',
    answer:
      'We use pressure-treated wood posts in 6×6, 8×8, and 10×10 sizes depending on the building dimensions and load requirements. All posts are pressure-treated for ground contact and Florida\'s humid conditions.',
  },
  {
    question: 'Can I customize the size and colors?',
    answer:
      'Absolutely. We offer fully custom sizes and 20 different roof and siding color options including Galvalume. Our team works with you to design a building that fits your exact property and use case.',
  },
  {
    question: 'Do you serve all of Florida?',
    answer:
      'Yes. We serve the entire state of Florida. Our team is based in Central Florida near Clermont, and we travel throughout the state to complete projects.',
  },
  {
    question: 'What does a pole barn kit include?',
    answer:
      'Our kits include pressure-treated posts, custom steel trusses, metal roofing panels, fascia boards, and all hardware. Enclosed kits add metal sidewall panels, end walls, and doors. We can also provide installation.',
  },
  {
    question: 'How much does a pole barn cost in Florida?',
    answer:
      'Kit prices start at $2,899 for a 20×24 and go up based on size and features. See our pricing table for exact kit prices on our most popular sizes. For custom sizes, contact us for a free quote.',
  },
  {
    question: 'Do you install the barn or just provide the kit?',
    answer:
      'We offer both. You can purchase a kit and install it yourself, or we can handle the full installation. Talk to us about your project and we\'ll find the right solution.',
  },
]

export const SERVICE_CITIES: ServiceCity[] = [
  { name: 'Orlando', county: 'Orange County', region: 'central' },
  { name: 'Tampa', county: 'Hillsborough County', region: 'west' },
  { name: 'Clermont', county: 'Lake County', region: 'central' },
  { name: 'Ocala', county: 'Marion County', region: 'central' },
  { name: 'Leesburg', county: 'Lake County', region: 'central' },
  { name: 'The Villages', county: 'Sumter County', region: 'central' },
  { name: 'Gainesville', county: 'Alachua County', region: 'north' },
  { name: 'Lakeland', county: 'Polk County', region: 'central' },
  { name: 'Kissimmee', county: 'Osceola County', region: 'central' },
  { name: 'Sanford', county: 'Seminole County', region: 'central' },
  { name: 'Daytona Beach', county: 'Volusia County', region: 'east' },
  { name: 'St. Cloud', county: 'Osceola County', region: 'central' },
  { name: 'Winter Haven', county: 'Polk County', region: 'central' },
  { name: 'Bartow', county: 'Polk County', region: 'central' },
  { name: 'Plant City', county: 'Hillsborough County', region: 'west' },
  { name: 'Brooksville', county: 'Hernando County', region: 'west' },
  { name: 'Spring Hill', county: 'Hernando County', region: 'west' },
  { name: 'Wildwood', county: 'Sumter County', region: 'central' },
  { name: 'Inverness', county: 'Citrus County', region: 'central' },
  { name: 'Bushnell', county: 'Sumter County', region: 'central' },
  { name: 'Eustis', county: 'Lake County', region: 'central' },
  { name: 'Mount Dora', county: 'Lake County', region: 'central' },
  { name: 'Apopka', county: 'Orange County', region: 'central' },
  { name: 'Deland', county: 'Volusia County', region: 'east' },
  { name: 'Palatka', county: 'Putnam County', region: 'north' },
  { name: 'Jacksonville', county: 'Duval County', region: 'north' },
  { name: 'Tallahassee', county: 'Leon County', region: 'north' },
  { name: 'Pensacola', county: 'Escambia County', region: 'north' },
  { name: 'Fort Myers', county: 'Lee County', region: 'south' },
  { name: 'Naples', county: 'Collier County', region: 'south' },
  { name: 'Sarasota', county: 'Sarasota County', region: 'west' },
  { name: 'Fort Pierce', county: 'St. Lucie County', region: 'east' },
]

export const NAV_LINKS = [
  {
    label: 'Products',
    href: '#',
    children: [
      { label: 'Open Pole Barns', href: '/open-pole-barns' },
      { label: 'Enclosed Pole Barns', href: '/enclosed-pole-barns' },
    ],
  },
  {
    label: 'Uses',
    href: '#',
    children: [
      { label: 'Horse Barns', href: '/horse-barns' },
      { label: 'Equipment Storage', href: '/equipment-storage' },
      { label: 'RV & Boat Storage', href: '/rv-boat-storage' },
      { label: 'Workshop & Garage', href: '/workshop-garage' },
      { label: 'Agricultural Buildings', href: '/agricultural-buildings' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Service Area', href: '/service-area' },
]
