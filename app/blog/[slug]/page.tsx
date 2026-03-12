import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CTABanner from '@/components/home/CTABanner'
import { COMPANY } from '@/lib/constants'

// ─── Blog post content ──────────────────────────────────────────────────────
// Add new posts here. Each post has a slug, metadata, and full content.

interface Post {
  slug: string
  title: string
  description: string
  date: string
  updatedDate?: string
  author: string
  readTime: string
  category: string
  content: string
}

const POSTS: Post[] = [
  {
    slug: 'how-much-does-a-pole-barn-cost-in-florida',
    title: 'How Much Does a Pole Barn Cost in Florida? (2025 Guide)',
    description:
      'Complete breakdown of pole barn costs in Florida — kit prices, installation, concrete, permits, and what to budget.',
    date: '2025-01-15',
    updatedDate: '2025-03-01',
    author: 'Florida Pole Barn',
    readTime: '6 min read',
    category: 'Cost Guide',
    content: `
## Pole Barn Costs in Florida: The Real Numbers

If you're searching for pole barn costs in Florida, you've probably seen a wide range of numbers. Here's a straightforward breakdown from a Florida pole barn builder.

### Kit Prices (Materials Only)

The kit — posts, trusses, roofing, hardware — is the foundation of your cost:

- **20×24 (480 sq ft):** Starting around $2,899
- **30×36 (1,080 sq ft):** Starting around $3,048
- **40×48 (1,920 sq ft):** Starting around $4,689
- **40×60 (2,400 sq ft):** Starting around $6,954
- **50×60 and larger:** Request a quote

These are kit prices — materials only. Installation and site work are separate.

### Installation Costs

Professional installation typically runs $3–$6 per square foot for labor depending on size and complexity. A 30×36 open barn might run $3,000–$4,500 for installation; a 40×60 enclosed barn with doors could run $8,000–$15,000.

### Additional Costs to Budget

**Concrete slab:** $4–$8 per sq ft depending on thickness and reinforcement. A 40×60 slab runs $10,000–$20,000.

**Site prep and grading:** Varies significantly by site. Budget $1,000–$5,000 for typical level sites.

**Permits:** Most Florida counties charge $500–$2,000 for building permits on structures of this size.

**Doors:** Roll-up garage doors range from $800–$3,000 each depending on size.

**Electrical:** Basic electrical rough-in typically runs $2,000–$6,000 by a licensed electrician.

### Total Budget Estimates

| Building Size | Kit | Install | Total w/ Concrete |
|---|---|---|---|
| 20×24 open | $2,899 | ~$2,000 | ~$8,000 |
| 30×36 open | $3,048 | ~$3,500 | ~$15,000 |
| 40×48 enclosed | ~$7,000 | ~$8,000 | ~$30,000 |
| 40×60 enclosed | ~$9,000 | ~$12,000 | ~$38,000 |

*These are estimates. Get a free quote for your specific project.*

### Why Florida Prices May Differ From What You See Online

Most online pole barn cost calculators are built for the Midwest. Florida has:

- Higher wind load requirements (140 MPH vs. 90 MPH in many states)
- Specific pressure-treating requirements for humid climates
- County-specific permit requirements
- Distance factors for rural delivery

A Florida-engineered building costs more than a generic kit — because it's built to actually survive here.

**[Get a free quote for your Florida pole barn →](/quote)**
    `,
  },
  {
    slug: 'do-you-need-a-permit-for-a-pole-barn-in-florida',
    title: 'Do You Need a Permit for a Pole Barn in Florida?',
    description:
      'Florida building permit requirements for pole barns — county rules, agricultural exemptions, and how to navigate the process.',
    date: '2025-01-10',
    author: 'Florida Pole Barn',
    readTime: '5 min read',
    category: 'Permits & Regulations',
    content: `
## Pole Barn Permits in Florida: What You Need to Know

The short answer: **in most Florida counties, yes — you need a permit for a permanent pole barn.** But there are important exceptions.

### The General Rule

Any permanent structure in Florida — one that's affixed to the ground with posts — typically requires a building permit. This applies to both open and enclosed pole barns, garages, and similar structures.

Permit requirements are set at the **county level**, not the state level, so rules vary.

### Agricultural Exemptions

Florida Statute 604.50 provides exemptions for certain agricultural buildings. If your property qualifies as a bona fide farm, you may be able to build certain structures without a full building permit.

Key requirements for agricultural exemption:
- Property must be classified as agricultural
- Building must be used for agricultural purposes
- Some counties require a simple registration even without a permit

**Check with your specific county.** Marion County, Alachua County, Polk County, and others have different interpretations of this law.

### When You Do Need a Permit

For non-agricultural or residential property, expect to pull a permit. The process typically involves:

1. Submit building plans (we provide engineered drawings)
2. County reviews for code compliance
3. Permit issued
4. Inspection during and after construction

Our buildings are engineered to Florida Building Code and come with stamped engineering drawings — which makes the permit process much smoother.

### Permit Costs

Typical permit fees in Florida range from $500–$2,000 for a pole barn, depending on county and building size.

### Our Advice

Don't skip permits on structures that require them. Unpermitted buildings can:
- Complicate property sales
- Create insurance issues
- Result in required demolition

If you're not sure whether your project needs a permit, ask your county building department or include the question in your free quote request — we're happy to help.

**[Request a free quote and ask about permits in your area →](/quote)**
    `,
  },
  {
    slug: 'open-vs-enclosed-pole-barn-florida',
    title: 'Open vs. Enclosed Pole Barn: Which Is Right for Your Florida Property?',
    description:
      'Side-by-side comparison of open and enclosed pole barns for Florida — cost, ventilation, protection, and which works best for each use case.',
    date: '2025-01-05',
    author: 'Florida Pole Barn',
    readTime: '5 min read',
    category: 'Buying Guide',
    content: `
## Open vs. Enclosed Pole Barn in Florida: A Practical Guide

One of the first decisions you'll make is whether you want an open or enclosed pole barn. Here's how to think about it for Florida specifically.

### Open Pole Barns

**What they are:** A full roof supported by posts, with open sides. No walls.

**Best for:**
- Equipment storage (tractors, ATVs, implements)
- RV and boat storage
- Hay and feed storage
- Livestock shade and shelter
- Covered outdoor workspace

**Florida advantage:** Open barns excel in Florida's heat. The open sides allow natural ventilation that's critical when you're storing equipment, animals, or organic materials in hot, humid conditions.

**Cost:** Lower than enclosed — no siding, no door hardware, simpler framing.

### Enclosed Pole Barns

**What they are:** The same post-and-truss structure, but with metal siding on all four sides and doors.

**Best for:**
- Horse barns with stalls
- Workshops and garages
- Man caves and recreation
- Secure equipment storage
- Commercial storage
- Livestock housing in heavy rain areas

**Florida advantage:** Full weather protection during heavy rain and storms. Security for high-value equipment, tools, or finished goods.

**Cost:** Higher than open — siding, end walls, and doors add to the kit price.

### Side-by-Side Comparison

| Feature | Open | Enclosed |
|---|---|---|
| Ventilation | Excellent | Requires vents/fans |
| Rain protection | Roof only | Full |
| Security | None | Lockable |
| Best in Florida heat | ✓ | With ventilation |
| Hurricane protection | Good | Better |
| Cost | Lower | Higher |
| Permit complexity | Simpler | More involved |

### Our Recommendation for Common Uses

- **Equipment storage:** Open barn, usually best
- **Horse barns:** Enclosed with vented eaves
- **RV/boat storage:** Open, with optional side panels
- **Workshop:** Enclosed
- **Hay storage:** Open
- **Man cave:** Enclosed, insulated

Still unsure? Ask us during your free quote — we'll recommend what's right for your specific property and use.

**[Get a free quote and tell us what you're planning →](/quote)**
    `,
  },
  {
    slug: 'best-pole-barn-sizes-for-florida',
    title: 'Best Pole Barn Sizes for Common Uses in Florida',
    description: 'How to choose the right pole barn size for your Florida use case.',
    date: '2024-12-20',
    author: 'Florida Pole Barn',
    readTime: '4 min read',
    category: 'Buying Guide',
    content: `
## Choosing the Right Pole Barn Size in Florida

Picking the right size saves money and avoids the frustration of outgrowing your barn too quickly. Here are our recommendations by use case.

### For Horse Barns

- **2 horses:** 24×36 or 30×36
- **4 horses:** 30×48 or 40×48
- **6–8 horses:** 40×60
- **10+ horses:** 50×60 or larger

Always add extra space for a tack room, aisle, and hay storage.

### For Equipment Storage

- **1–2 tractors + implements:** 30×48 or 40×48
- **Large farm operation:** 40×60 or 50×96
- **Commercial/multi-machine:** 50×96

Think about the length of your longest piece of equipment plus turning radius.

### For RV & Boat Storage

- **Single Class C or travel trailer:** 20×40 or 24×40
- **Class A motorhome:** 24×40 or 30×40 (14 ft walls)
- **Multiple vehicles:** 40×60 or 50×96

### For Workshops & Garages

- **2-car garage:** 24×24 or 24×30
- **3-car garage:** 30×40
- **Full workshop:** 30×48 or 40×48
- **Commercial shop:** 40×60 or larger

### General Advice

Build bigger than you think you need. The number one regret we hear from customers is wishing they'd gone slightly larger. The marginal cost of adding a few feet is much less than building a second structure later.

**[Request a quote for your specific size →](/quote)**
    `,
  },
  {
    slug: 'pole-barn-hurricane-rating-florida',
    title: 'Pole Barn Hurricane Ratings: What 140 MPH Really Means',
    description:
      'What the 140 MPH wind rating on Florida pole barns actually means and what to look for when buying.',
    date: '2024-12-10',
    author: 'Florida Pole Barn',
    readTime: '4 min read',
    category: 'Construction & Materials',
    content: `
## Pole Barn Wind Ratings: What You Need to Know in Florida

When we say our buildings are "140 MPH rated," what does that actually mean — and why does it matter in Florida?

### Florida's Wind Load Requirements

Florida is one of the most demanding wind-load environments in the country. The Florida Building Code specifies minimum design wind speeds based on location. Coastal areas require higher ratings than inland areas, but most of Florida requires design wind speeds of 120–160 MPH.

### What "140 MPH Rated" Means

A 140 MPH wind rating means the structure is **engineered to resist wind loads equivalent to a 140 MPH wind speed** without structural failure. This isn't a marketing claim — it's a structural engineering calculation performed by a licensed engineer and stamped on the building plans.

The rating accounts for:
- Roof uplift forces
- Lateral wall pressure
- Post embedment depth
- Truss design and connections

### Why Generic Kits May Not Be Safe in Florida

Many "pole barn kit" sellers ship the same building nationwide. A kit designed for 90 MPH wind loads in Kansas **does not meet Florida building code** and could fail in a hurricane. Always ask for Florida-specific engineering documentation.

### Our Buildings Are Custom-Engineered

Every Florida Pole Barn structure comes with custom-fabricated steel trusses engineered by our team for the specific span and wind load of your building. We don't sell generic catalog trusses.

**[Get a Florida-engineered pole barn quote →](/quote)**
    `,
  },
  {
    slug: 'horse-barn-planning-florida',
    title: 'Horse Barn Planning Guide for Florida Properties',
    description:
      'Everything horse owners need to know when planning a Florida barn — stall sizing, ventilation, layouts, and cost.',
    date: '2024-11-28',
    author: 'Florida Pole Barn',
    readTime: '7 min read',
    category: 'Use Case Guide',
    content: `
## Planning a Horse Barn in Florida: A Complete Guide

Florida is one of the top equestrian states in the country. Planning a horse barn here requires specific consideration of our climate — heat, humidity, insects, and storm season.

### Stall Size Requirements

Standard stall sizes:
- **Horses under 15 hands:** 10×10 minimum, 12×12 recommended
- **Horses 15–16 hands:** 12×12 minimum
- **Large horses, warmbloods:** 12×14 or 14×14
- **Foaling stall:** 14×14 or 16×16

### Ventilation is Critical in Florida

Florida's heat and humidity make ventilation the most important design element in a horse barn. Poor ventilation causes:
- Respiratory issues in horses
- Excessive sweating
- Ammonia buildup from urine
- Mold in hay and bedding

**Good ventilation strategies:**
- Open-sided designs for maximum airflow
- Cupolas or ridge vents on enclosed barns
- Overhangs on south and west sides to block afternoon sun
- 12-inch eave overhang minimum

### Aisle Width

A standard aisle should be 10–12 feet wide. This allows:
- A horse to be tied in the aisle
- A wheelbarrow to pass
- Safe handling space

Double-wide aisles (14–16 ft) are ideal for showing barns.

### Additional Spaces to Plan For

- **Tack room:** 10×12 minimum
- **Feed room:** Separate from hay for fire safety
- **Hay storage:** 1 ton of hay = approximately 100 sq ft
- **Wash rack:** 12×12 with drainage

### Florida-Specific Considerations

- **Mosquitoes and insects:** Screened tack rooms, screened feed rooms
- **Storm protection:** Enclosed barn provides more safety than open
- **Flooding:** Elevate slab slightly, plan drainage around the perimeter
- **Summer heat:** Overhangs, fans, and light-colored roofing reduce barn temperature

### Barn Sizes for Common Horse Counts

- **2 horses:** 24×36 or 30×36
- **4 horses:** 30×60 or 40×48
- **6 horses:** 40×60
- **8–10 horses:** 50×60

### Get a Custom Quote

Every horse operation is different. Tell us your horse count, planned layout, and any special requirements — we'll design a barn that fits your property and your horses.

**[Request a free horse barn quote →](/quote)**
    `,
  },
]

export async function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = POSTS.find((p) => p.slug === params.slug)
  if (!post) return {}

  return {
    title: `${post.title} | Florida Pole Barn`,
    description: post.description,
    alternates: { canonical: `https://floridapolebarn.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://floridapolebarn.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedDate ?? post.date,
      authors: ['https://floridapolebarn.com/about'],
      images: [{ url: 'https://floridapolebarn.com/og-image.jpg', width: 1200, height: 630 }],
    },
  }
}

function renderContent(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0
  let inTable = false
  let tableRows: string[][] = []

  const flushTable = () => {
    if (tableRows.length > 0) {
      const [header, , ...body] = tableRows
      elements.push(
        <div key={key++} className="my-6 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-brand-800 text-white">
                {header.map((cell, i) => (
                  <th key={i} className="px-4 py-2 text-left font-semibold">{cell.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {body.map((row, ri) => (
                <tr key={ri} className="hover:bg-gray-50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2 text-gray-700">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      tableRows = []
      inTable = false
    }
  }

  for (const line of lines) {
    if (line.startsWith('|')) {
      inTable = true
      tableRows.push(line.split('|').filter((_, i, arr) => i > 0 && i < arr.length - 1))
      continue
    }

    if (inTable) flushTable()

    if (!line.trim()) {
      elements.push(<div key={key++} className="h-3" />)
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="mt-8 mb-3 text-2xl font-bold text-gray-900">{line.slice(3)}</h2>)
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={key++} className="mt-6 mb-2 text-xl font-bold text-gray-900">{line.slice(4)}</h3>)
    } else if (line.startsWith('- **')) {
      const match = line.match(/- \*\*(.+?)\*\*[:\s](.*)/)
      if (match) {
        elements.push(
          <li key={key++} className="flex gap-2 text-sm text-gray-700 mb-1">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-600 shrink-0" />
            <span><strong>{match[1]}:</strong> {match[2]}</span>
          </li>
        )
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="flex gap-2 text-sm text-gray-700 mb-1">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-600 shrink-0" />
          <span>{line.slice(2)}</span>
        </li>
      )
    } else if (line.startsWith('**[')) {
      const match = line.match(/\*\*\[(.+?)\]\((.+?)\)\*\*/)
      if (match) {
        elements.push(
          <div key={key++} className="my-6">
            <Link href={match[2]} className="btn-primary">
              {match[1]}
            </Link>
          </div>
        )
      }
    } else {
      elements.push(<p key={key++} className="text-gray-700 leading-relaxed">{line}</p>)
    }
  }

  if (inTable) flushTable()

  return elements
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = POSTS.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedDate ?? post.date,
    author: {
      '@type': 'Organization',
      name: 'Florida Pole Barn',
      url: 'https://floridapolebarn.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Florida Pole Barn',
      url: 'https://floridapolebarn.com',
    },
    url: `https://floridapolebarn.com/blog/${post.slug}`,
    mainEntityOfPage: `https://floridapolebarn.com/blog/${post.slug}`,
    image: 'https://floridapolebarn.com/og-image.jpg',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      <div className="bg-brand-900 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-brand-400 mb-6">
            <Link href="/" className="hover:text-brand-200">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/blog" className="hover:text-brand-200">Blog</Link>
            <span className="mx-2">›</span>
            <span className="text-brand-200">{post.category}</span>
          </nav>
          <span className="text-xs bg-brand-700 text-white rounded-full px-3 py-1 font-medium">{post.category}</span>
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl leading-tight">{post.title}</h1>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-brand-400">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            {post.updatedDate && (
              <span>Updated {new Date(post.updatedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            )}
            <span>{post.readTime}</span>
            <span>By {post.author}</span>
          </div>
        </div>
      </div>

      <article className="section-padding bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose-sm sm:prose max-w-none">
            {renderContent(post.content)}
          </div>

          <div className="mt-12 rounded-xl bg-brand-50 border border-brand-200 p-8">
            <h2 className="text-xl font-bold text-brand-900">Ready to Build Your Pole Barn?</h2>
            <p className="mt-2 text-brand-700 text-sm">
              Get a free, no-pressure quote from Florida&apos;s local pole barn builder.
              We call you within 1 business day.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <Link href="/quote" className="btn-primary">Request Free Quote →</Link>
              <a href={COMPANY.phoneHref} className="btn-secondary">{COMPANY.phone}</a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link href="/blog" className="text-sm font-semibold text-brand-600 hover:underline">
              ← Back to Blog
            </Link>
          </div>
        </div>
      </article>

      <CTABanner />
    </>
  )
}
