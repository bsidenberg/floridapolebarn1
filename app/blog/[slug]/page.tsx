import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CTABanner from '@/components/home/CTABanner'
import { COMPANY } from '@/lib/constants'

// ─── Blog post content ──────────────────────────────────────────────────────
// Add new posts here. Each post has a slug, metadata, and full content.

interface PostFaq {
  question: string
  answer: string
}

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
  faqs?: PostFaq[]
}

const POSTS: Post[] = [
  {
    slug: 'pole-barn-eave-height-door-openings-florida',
    title: 'What to Think About When Choosing Eave Height and Door Openings for a Florida Pole Barn',
    description:
      'A practical guide to sizing eave height, clear height, and door openings for RVs, boats, tractors, and equipment in a Florida pole barn.',
    date: '2026-10-05',
    author: 'Florida Pole Barn',
    readTime: '8 min read',
    category: 'Buying Guide',
    faqs: [
      {
        question: 'How tall should a pole barn be for an RV?',
        answer: 'Tall enough for the RV you measured, air conditioners and antennas included, to clear the door with room left under the trusses. There is no single eave height for every coach. Measure yours and have the builder set the eave from that opening.',
      },
      {
        question: 'Is eave height the same as door height?',
        answer: 'No. The eave is where the roof meets the wall. The door height is the clear hole you drive through. Header, hardware, and the bottom chord of the truss all sit in between, so both the door and the interior are shorter than the eave.',
      },
      {
        question: 'Can I add a taller door later?',
        answer: 'Only if the eave, header, and trusses already leave room, and the engineer accepts the larger opening. If a taller coach or a boat tower is likely, size the opening now.',
      },
      {
        question: 'Do larger doors affect wind design in Florida?',
        answer: 'Yes. Size, location, and whether the opening is shut in a storm or left open all change the loads. A bigger door can change the engineering and the anchorage. Match the order to the plans, or change the plans first.',
      },
      {
        question: 'Does a concrete slab change my clearance?',
        answer: 'It can. If the slab sits higher than the ground where you measured, the header is closer, and apron slope can change that again. Settle the floor and the approach before the door height is final.',
      },
      {
        question: 'What should I measure before calling a builder?',
        answer: 'The height of each machine as it will enter, accessories included. Width, mirrors included. Length of the longest trailer plus room at both ends. The drive, turns and slope included. And the next machine if it will be taller or longer.',
      }
    ],
    content: `
## What to Think About When Choosing Eave Height and Door Openings for a Florida Pole Barn

How tall should a pole barn be? Size it from the tallest thing that has to pass through the door, measured the way it will actually come in: a roof air conditioner, an antenna, a bimini or T-top, an outboard tilted up, a loader bucket raised, a dump bed up. The door opening and the usable clear height inside both sit lower than the eave height, because the header, the door, and the bottom of the truss take space a wall-height number does not include. Plan the eave height from the door and the clearance you need, and have the builder confirm the exact dimension on the drawings.

## Eave Height, Clear Height, and Door Height

Eave height, clear height, and door height get used as if they were one number. They are not.

Eave height is the wall height where the side wall meets the roof, which is what people mean by how tall the barn is. It is not the hole you drive through, and it is not how high you can stack under the trusses.

Clear height is the usable height inside, from the finished floor to the lowest thing overhead — often the bottom chord of the truss, or a light, hoist, or door opener below it. A lift or a hay stack is limited by that clear height, which is shorter than the eave.

Door height is the clear opening: finished floor to the underside of the header, or to the door in the open position, whichever is lower. The header, the track or the coil, and the hardware sit in the band between the eave and the top of that opening. A tall eave with a deep header is still a short door.

Measure what must fit and add clearance above it so a bounce on the apron is not a scrape. That is the clear opening. Hardware needs more height above it, and the eave has to cover both while leaving room under the trusses. The builder and the door supplier confirm the stack. The opening comes first.

## Measure What You Own, and What You Might Own Next

A guess is how a camper roof meets a header. Measure what you own, and write down anything taller you are likely to own next. Measure to the high point, in the position the machine will be in at the door.

- **RV or fifth wheel**: Include roof air conditioners, vents, and antennas, and measure the unit on its own tires. If you have not bought it yet, use the manufacturer's overall height with the accessories you will run, and treat that figure as something to confirm.
- **Boat on a trailer**: Include the trailer, a tower, a T-top or bimini left up, and a tilted outboard. Clearing with the engine down does not mean you clear with it up.
- **Tractor**: Measure to the ROPS or the cab, and again with the loader raised if that is how you enter. Anything towed behind it needs length and room to turn. A folding ROPS counts as folded only if you fold it every time.
- **Trucks**: Racks, service bodies, and dump beds change the height. A bed up on arrival is a door problem. A bed that rises only inside is a clear-height problem.
- **Hay**: The stack stops at the truss, not at the eave. Note the height you pile to and the machine that sets the top.
- **Shop**: A lift or hoist needs room for the machine and for the vehicle under it. Say so before the trusses are drawn.

Add clearance above the tallest item and have the builder confirm the gap. Do not drop it to force a shorter wall.

Length and width belong on the same sheet. A tall door does not store a trailer the building cannot hold, and posts between bays take width. The [guide to common pole barn sizes](/blog/best-pole-barn-sizes-for-florida) is a start on the footprint. Check the opening against your tape.

## Door Width and the Approach

You need room to line a trailer up, to correct, and often to back, including the tow vehicle if you drive in still hitched. A tight turn puts the trailer on an angle at the opening. That approach needs a wider door, a wider apron, or both. Sketch the path before the width is final.

- **Apron and slope**: A rise, a dip, or a break at the slab can lift the nose or drop the rear, so the roof moves closer to the header than it was on flat ground. If the load rises as you crest the edge, the yard measurement is short.
- **Side door or gable end**: The end wall often gives a straight run down the building, which suits a long trailer. A door in the side wall can suit a drive that already runs along the barn, but the trailer has to swing past the posts. The wall you see from the road is not always the wall you can enter.
- **A second opening**: The tractor that lives inside and the truck that only pulls up to load may need different doors. Each one goes on the drawings, with its header.

Compare the clear width, mirrors included. Trim and side guides take part of the opening.

## How the Door Type Changes the Opening

- **Open bay**: No leaf, so the opening runs up to the header or the trim across the bay. Nothing coils overhead, which is why tall equipment often sits in an open bay. Rain comes in, and leaving the bay open is an engineering choice as well as a layout choice.
- **Overhead door**: The panel rides up and back on tracks. The tracks, opener, and curve need headroom above the opening and often project into the bay. Get that headroom from the supplier and give it to the builder before the eave is set. The catalog height is not the clear opening.
- **Roll-up door**: The curtain coils above the opening, so the coil and brackets take height and the guides take width. Ask where the coil sits against the eave and the truss.
- **Sliding door**: The panel runs beside the opening, so it usually needs less headroom overhead. It needs a clear run of wall for the full panel, and the track has to stay out of the drive. A gable end may not have that wall. A door that stops partway is smaller than the one you ordered.

Rough opening, clear opening, and the size printed on the door are three figures. Build to the clear opening, and get it in writing from the builder and the supplier.

## Florida Wind, Rain, Grade, and Height Limits

In Florida a large opening is part of the wind design. Open, enclosed, and partially enclosed are engineering classes, and they change the load on the frame. A door closed for a storm is not the same case as a bay left open. Enlarge an opening later, or wall in an open side, and the drawings may have to be revised. See [what a wind rating means on a Florida pole barn](/blog/pole-barn-hurricane-rating-florida), [planning for storm season](/blog/planning-pole-barn-florida-storm-season), and [open versus enclosed layouts](/blog/open-vs-enclosed-pole-barn-florida).

Enclosed doors need the wind rating for your address, with the attachment on the permit set. The builder and the engineer name that rating. A door accepted in another state may not meet the Florida Building Code in your county.

An open side or open gable lets wind-driven rain onto what is parked there. An overhang or lean-to can carry the roof past the opening, and it also changes the footprint, the posts, and sometimes the wind design. Ask for that cover while the roof is still on paper.

A slab or a built-up pad sets the vehicle higher than the yard where you measured, so the header is closer. A ramp does the same thing when the trailer crests it. Set the pad and the door together. Grade and drainage are covered in the [site preparation checklist](/blog/florida-pole-barn-site-preparation-checklist).

County and association height limits usually follow the eave, the pitch, and the peak, so a taller eave can push the peak over the cap. An agricultural exemption does not apply to every parcel. Start with [whether a pole barn in Florida needs a permit](/blog/do-you-need-a-permit-for-a-pole-barn-in-florida), then confirm the height limit before the eave is fixed.

## A Checklist Before You Build

- **Measure the tallest item**: Include a roof unit, a raised bucket, or a tilted motor, in the position it will enter.
- **Keep clearance above it**: Have the builder confirm the gap.
- **Name the door type**: Get the headroom and the side room from the supplier.
- **Set the eave from that opening**: Check clear height under the trusses if you will lift or stack.
- **Walk the approach**: Turns, backing room, slope, and a side door versus the gable end.
- **Put the openings on the engineering**: Include wind-rated doors where the design requires them.
- **Fix the pad height**: Keep the slab or gravel from using up the clearance you measured.
- **Check height limits**: County and association rules, and the permit path, before a tall eave is committed.

When you ask for a quote, say what has to fit and how it gets in: the machine, the trailer, the approach, and which bays stay open. We will plan the openings so the eave, the door, and the drawings are the same building.

**[Tell us what has to fit →](/quote)**

## Frequently Asked Questions

### How tall should a pole barn be for an RV?

Tall enough for the RV you measured, air conditioners and antennas included, to clear the door with room left under the trusses. There is no single eave height for every coach. Measure yours and have the builder set the eave from that opening.

### Is eave height the same as door height?

No. The eave is where the roof meets the wall. The door height is the clear hole you drive through. Header, hardware, and the bottom chord of the truss all sit in between, so both the door and the interior are shorter than the eave.

### Can I add a taller door later?

Only if the eave, header, and trusses already leave room, and the engineer accepts the larger opening. If a taller coach or a boat tower is likely, size the opening now.

### Do larger doors affect wind design in Florida?

Yes. Size, location, and whether the opening is shut in a storm or left open all change the loads. A bigger door can change the engineering and the anchorage. Match the order to the plans, or change the plans first.

### Does a concrete slab change my clearance?

It can. If the slab sits higher than the ground where you measured, the header is closer, and apron slope can change that again. Settle the floor and the approach before the door height is final.

### What should I measure before calling a builder?

The height of each machine as it will enter, accessories included. Width, mirrors included. Length of the longest trailer plus room at both ends. The drive, turns and slope included. And the next machine if it will be taller or longer.
    `,
  },
  {
    slug: 'florida-pole-barn-site-preparation-checklist',
    title: 'What to Think About When Preparing Your Site for a Florida Pole Barn',
    description:
      'Prepare your Florida property for a pole barn: grade and drainage, access for delivery and equipment, pad elevation, utility marking, and a practical checklist before posts go in the ground.',
    date: '2026-09-28',
    author: 'Florida Pole Barn',
    readTime: '8 min read',
    category: 'Construction & Materials',
    content: `
## What to Think About When Preparing Your Site for a Florida Pole Barn

A Florida pole barn goes up more smoothly when the pad is graded to shed water, the delivery path can handle posts and trusses, utilities are marked, and the layout on the ground matches the engineered drawings before the first hole is dug.

Site work is easy to underestimate. The building set assumes a certain grade, access, and pad. When the truck cannot reach the pad, when the low corner ponds after the first rain, or when a unmarked irrigation line sits where a post belongs, the schedule and the structure both take the hit. Before the crew arrives, walk the property with the same questions a builder and an inspector will ask.

### Start With Use, Layout, and the Pad Footprint

Stake the building outline from the approved dimensions — width, length, eave height, and which sides stay open. Walk that footprint with the drawings in hand.

Here is what to think about when you set the pad:

- **Setbacks and easements**: Confirm the barn sits where the county and any HOA allow. A pad that is perfect for drainage but over a utility easement or too close to a property line will have to move.
- **Orientation**: Note sun, prevailing wind, driveway approach, and how equipment will enter. In Florida heat, afternoon sun on a long west wall matters for enclosed barns and for livestock shade on open ones.
- **Open versus enclosed sides**: Mark which sides will have walls or doors. That choice affects enclosure class on the engineering set and where you need clear space for door swing or lean-tos.
- **Future additions**: If you may add a lean-to, wash bay, or second bay later, leave room now so the first pad does not block the logical expansion.

Do not treat the stakes as optional. The posts will follow them. Moving the building after holes are dug means new holes and a new conversation with the engineer if dimensions change.

### Grade and Drainage Come Before Concrete

Florida rain is heavy, soils are often sandy, and the water table can sit close to the surface. Wind and gravity both assume the posts stay where the drawings put them. Standing water at the post line works against that assumption.

What to think about for water on the site:

- **High point for the pad**: Prefer a slight crown or continuous fall away from the building. A pad in a natural low spot will collect runoff from the rest of the pasture or yard.
- **Sheet flow path**: Trace where water goes in a hard afternoon storm. Keep roof discharge and yard runoff from cutting a channel along the posts.
- **Floor choice**: Concrete, gravel, or compacted base each needs a planned exit for wash water and driven rain. Slope the floor or the surrounding grade so water leaves the building instead of sitting on the post line.
- **Roof water**: A large metal roof sheds a lot of water quickly. Gutters are optional; a clear discharge path is not. Keep that water off the embedment zone.
- **Neighbor and road drainage**: Do not solve your ponding by sending a new stream onto a neighbor or into a right-of-way without checking local rules.

After you rough-grade, wait for a real rain if you can, or soak the pad with a hose. Fix ruts and low corners before posts go in.

### Access for Delivery, Equipment, and Inspections

Posts, trusses, and panels arrive on trucks that need width, height clearance, and a firm path. Cranes or lifts, if used, need stable ground. Inspectors need to reach the work.

Think through the path from the road to the pad:

- **Gate and driveway width**: Will the delivery truck clear the gate posts, trees, and power lines? Overhead limbs and soft shoulders stop more jobs than people expect.
- **Turning and staging**: Leave a staging area for bundles of steel and panels so the pad itself stays clear for layout.
- **Soft ground**: After summer rains, sand and organic soil can bog a loaded truck. Plan temporary matting or an alternate dry approach if the driveway floods.
- **Neighbor relations**: If the only access crosses a shared drive, confirm that before the truck is on the way.

If the path is tight, say so early. Relocating the pad a few feet for access is cheaper in planning than improvising on delivery day.

### Utilities, Wells, and What Lies Underground

Before any digging, know what is under the stakes.

- **Call for locates**: Use the statewide call-before-you-dig service so public utilities are marked. Do this early enough that marks are still visible when work starts.
- **Private lines**: Irrigation, septic, electric to a well, low-voltage cable, and old fence charger lines often do not show on public locates. Walk the property with anyone who installed them.
- **Wells and septic**: Keep required setbacks from wells and drain fields. County health rules can veto a pad location that otherwise looks perfect.
- **Overhead lines**: Note clearances for delivery and for any future lean-to or antenna. Metal buildings and overhead service need planned separation.

Mark known private lines with flags that survive a rain. A sketch in your phone is not enough once the excavator arrives.

### Soil, Water Table, and Embedment Reality

The engineering set specifies post depth, hole diameter, and backfill for the design wind load and assumed soil. Florida sites often include sand, organic layers, or a high water table that fills holes as soon as they are dug.

What to think about before dig day:

- **Match the detail**: Do not copy embedment from another county or another barn. Follow the stamped sheets for this building.
- **Wet holes**: If groundwater fills the holes, stop and ask how the detail should be adjusted before concrete goes in. A hole poured full of slurry water is not the detail on the plans.
- **Organic or fill soil**: Soft spots, old dump areas, and recent fill may need undercut or a different foundation approach. Flag them when you walk the site.
- **Compaction of the pad**: Loose fill under a future slab or gravel floor settles. Compact in lifts where the drawings or the builder specify.

If the soil on site does not match what the drawings assume, resolve that before posts are set — not after the frame is up.

### A Practical Checklist Before the Crew Arrives

Use this sequence so site decisions do not have to be undone:

- **1. Confirm permits and the approved set**: Keep the stamped drawings on site. The pad and openings should match that set.
- **2. Stake the footprint and door locations**: Walk setbacks, easements, and swing paths.
- **3. Rough-grade for drainage**: Establish fall away from the building and a roof-water path.
- **4. Clear and firm the access route**: Gates, limbs, soft spots, and staging area.
- **5. Complete utility locates**: Public marks plus private irrigation, septic, and well lines.
- **6. Recheck after rain**: Fix ponding and ruts before dig day.
- **7. Brief the crew on surprises**: Soft spots, overhead lines, neighbor access, and any hole that hit water on a test dig.

Florida Pole Barn builds from engineered drawings matched to the span and wind load of the building you are planning. Having the pad, access, and utility picture clear when you request a quote helps the layout and the permit set line up with the property you actually have.

### Frequently Asked Questions

### How far in advance should I prepare the site?

Finish staking, rough grading, access clearing, and utility locates before the delivery window — early enough to fix drainage after a real rain and to reschedule if locates uncover a conflict. Last-minute grading under a delivery truck is how pads end up low in one corner.

### Do I need a perfectly level pad?

You need a controlled pad: generally level for the building layout, with intentional drainage away from the posts. A bowl that holds water is worse than a gentle, even slope that sheds it. Follow the elevations the builder and the drawings call for.

### What if my water table is high?

Plan for it before dig day. High groundwater can flood post holes and change how embedment is placed. Tell the builder and, if needed, the engineer so the detail on site matches the sealed plans.

### Can I pour a slab before the frame goes up?

Sometimes, when the drawings and the builder’s sequence allow it. Many Florida pole barns set posts first and place a slab later, or use gravel. Coordinate the floor type with post layout and embedment so the slab edge and the post line do not fight each other.

### Who marks private irrigation and septic lines?

Public locate services mark public utilities. Private irrigation, septic, and well lines are usually your responsibility to identify. Use as-builts if you have them, and walk the property with whoever installed the system.

### What should I have ready when I request a quote?

A rough idea of size and use, whether sides will be open or enclosed, the property address for wind and code context, photos or notes about access and drainage, and any known well, septic, or easement limits. That information helps the layout match the site from the start.

**[Request a free quote for your Florida pole barn →](/quote)**
    `,
  },
  {
    slug: 'planning-pole-barn-florida-storm-season',
    title: 'Planning a Pole Barn for Florida Storm Season',
    description:
      'Plan a Florida pole barn for storm season: site wind speed, open versus enclosed layouts, drainage and post embedment, and engineering documents that match the property.',
    date: '2026-09-22',
    author: 'Florida Pole Barn',
    readTime: '9 min read',
    category: 'Construction & Materials',
    content: `
## Planning a Pole Barn for Florida Storm Season

A Florida pole barn planned for storm season is engineered to the wind speed, exposure, and soil at the site, with a deliberate choice about which sides stay open from June through November, drainage that moves water away from the posts, and stamped drawings that describe that exact building.

Atlantic hurricane season runs from June 1 through November 30. County rules and the Florida Building Code set the minimum. Your parcel can still differ from the county next door, and an open pasture can design differently from a wooded lot on the same road. Before you order doors or set posts, answer four questions: what wind speed applies here, will the barn be open or enclosed during storm months, where will rainwater go, and do the drawings match this building on this property?

### Wind Speed Is Set by the Site, Not by One Statewide Number

The Florida Building Code assigns an ultimate design wind speed by location and by risk category. Counties enforce that code, and some add local amendments. There is no single wind speed that covers every pole barn in the state. An inland county such as Marion, Lake, or Polk is not interchangeable with a coastal county such as Lee, Collier, or Escambia, and even inside one county the parcel nearer open water can differ from a parcel miles inland.

Here is what to think about when you ask a building department or an engineer about your county:

- **Map speed for the address**: The speed comes from the code wind map for your coordinates, not from a brochure. Inland north and central counties are often lower than coastal counties. The Keys, the southeast coast, and open shorelines are generally higher.
- **Risk category**: A private storage barn is commonly designed as Risk Category II, but the category follows how the building will be used. A different use can raise the speed the engineer must design to. Confirm the category instead of assuming every barn is the same.
- **Exposure category**: This describes the terrain around the barn. Suburban or wooded surroundings are typically Exposure B. Open fields, pasture, and many agricultural sites are Exposure C, which increases the pressure on the frame. Sites close to large open water can be Exposure D. Two barns with the same map speed can need different framing if one sits in the open and one sits among trees.
- **Wind-borne debris region**: In many coastal areas, doors and windows must be designed for wind-borne debris or be protected. That decision belongs on the plans before you order openings.
- **High-Velocity Hurricane Zone**: Miami-Dade and Broward counties follow High-Velocity Hurricane Zone requirements in addition to wind speed. Drawings prepared for an inland county are not a substitute for those documents.

Ask for the design wind speed, exposure, and risk category in writing, tied to your address. If a drawing lists only a round number and no site, resolve that before you submit for a permit.

### Open, Enclosed, or Partially Open During Storm Months

Open and enclosed are structural choices, not only comfort choices. Engineers classify a building as open, enclosed, or partially enclosed, and that classification changes internal wind pressure. The drawings have to match the walls you actually build.

Think through June through November, not only the week you move equipment in:

- **Open sides**: Air moves through the barn in Florida heat, which helps with equipment, hay, and livestock. In a tropical storm, rain blows in, and anything loose can become a projectile. Decide what stays in the barn through storm season and how it will be tied down or moved.
- **Enclosed sides**: Walls and doors keep rain off tools, feed, and vehicles, and they give you a way to secure the building. Doors and other large openings must be on the plans. A door that is not latched the way the design assumes is an opening the engineer did not count on.
- **A mix**: Many Florida barns leave one or more sides open, add a lean-to, or use end walls only. That layout works when it is the layout on the drawings. Adding metal to an open side later is a structural change, because it can move the building from open to partially enclosed and change the loads on the frame.

Before storm season, walk the building against the plans. Note which openings are meant to be closed, which hardware has to be engaged, and which items you will relocate when a storm is forecast. Write that down while the weather is quiet.

Hurricane season is also peak heat. If you enclose the barn, plan ventilation for the weeks it stays shut — ridge vents, eave vents, or fans — so humidity does not sit on tack, tools, and stored feed. Ventilation and a way to close the building can both be part of the same design.

### Drainage and Post Embedment

Florida rain is heavy, soils are often sandy, and the water table can sit close to the surface. Wind design assumes the posts stay where the engineer put them. Standing water in post holes, or runoff that scours around the piers, works against that assumption.

What to think about on the site:

- **Grade**: Slope the ground so water moves away from the building. A pad that is the low spot in the pasture will hold water against the posts and, on an enclosed barn, against the base of the walls.
- **Floor**: A concrete slab, gravel, or compacted base each handles water differently. Plan a slope and an exit path so wash water and driven rain leave the building instead of sitting on the post line.
- **Roof water**: A large roof sheds a lot of water in a short storm. Gutters are a choice; a clear path for that water is part of the plan. Keep discharge off the embedment zone and away from low ground you do not want to flood.
- **Embedment**: Depth, hole diameter, concrete backfill, and any uplift restraint come from the engineering for your wind load and soil. Do not copy a depth from another county or another barn. Sandy soil, organic soil, and a high water table can all change the detail.
- **Timing**: Setting posts in holes full of water, or backfilling differently from the detail on the plans, means the building in the ground is not the building on the drawings. If the site is wet, ask how the detail should be adjusted before concrete goes in.

After the first hard rain, walk the perimeter. If water ponds at a corner or cuts a channel along a post, correct the grade before storm season.

### Engineering Documents That Match This Site

Permits, inspections, and insurance questions all go more smoothly when the paper describes the building on the property. When you review drawings, look for:

- **Project location**: An address, parcel, or county — enough to show the design is for this site.
- **Code edition**: The Florida Building Code edition your county is enforcing, including any local amendment the building department requires.
- **Design criteria**: Ultimate wind speed, exposure category, risk category, and whether the building is open, enclosed, or partially enclosed.
- **Geometry**: Width, length, eave height, roof pitch, and the location of open sides and doors. If you change a door size or enclose a bay, the set should be updated to match.
- **Foundation or embedment**: Post depth, concrete, and any footing or anchor the design relies on, with notes that fit the soil you actually have.
- **Seal**: The design professional's seal on the sheets you will submit.

Keep the approved set with your property records. When you sell, insure, or repair the barn after a storm, that set is what shows the building was planned for the site.

Florida Pole Barn prepares engineered drawings for the span and wind load of the building you are planning, so the permit set can follow the county and the layout. Have the address, the open-versus-enclosed plan, and the door sizes ready when you start.

### A Planning Sequence That Fits Storm Season

Use this order so decisions do not have to be undone in May:

- **1. Pick the use and the layout**: What the barn holds, which sides are open, door sizes, and eave height. Those choices drive enclosure class and openings.
- **2. Confirm the site criteria**: Wind speed, exposure, risk category, grade, and the code edition with your county building department or your engineer.
- **3. Match the documents to those criteria**: Drawings, embedment, and opening details should list the same information you just confirmed.
- **4. Build drainage into the pad**: Set grade and floor slope before posts and concrete lock the low spots in place.
- **5. Leave a storm routine**: Who closes which doors, what gets moved, and where the approved plans are kept. Review it each spring before June 1.

### Frequently Asked Questions

### Does every Florida county use the same pole barn wind speed?

No. The Florida Building Code maps ultimate design wind speed by location and risk category. Coastal counties and the Keys are generally higher than inland counties, and Miami-Dade and Broward also follow High-Velocity Hurricane Zone rules. Confirm the speed for your address, along with the exposure category of the terrain around the barn.

### Is an open pole barn a poor fit for storm months?

Not by itself. An open barn can be the right layout for equipment, hay, and livestock because it vents heat. It does let rain in, and loose items need a tie-down or relocation plan. The structure still has to be engineered for the site wind speed and for an open or partially enclosed classification. Choose open when that is how you will use the barn, and put that layout on the drawings.

### Can I enclose an open barn later, before hurricane season?

Only after the structure is rechecked. Adding walls changes internal wind pressure and can change the loads on posts, trusses, and connections. Plan the enclosed or partially enclosed layout at the start if you know you will want walls, or have the engineer review the change before you add them.

### Why do drainage and embedment belong in a storm-season plan?

Wind design assumes the posts and anchors stay in the ground. Heavy rain, sandy soils, and a high water table can soften or scour that support if the site ponds, or if post holes are placed wet and backfilled off the detail. Grade water away from the building and follow the embedment on the stamped plans.

### What should the engineering set include?

Location, the Florida Building Code edition, design wind speed, exposure, risk category, enclosure classification, building dimensions, openings, and the post or foundation detail. The sheets you submit should describe the barn you are building, including which sides are open.

### When should storm details be decided?

Before the permit set is finalized. Wind criteria, open versus enclosed sides, door sizes, and embedment are design inputs. Deciding them after the seal usually means revising the documents. A spring walkthrough is for hardware and housekeeping, not for redesigning the frame.

**[Request a free quote for your Florida pole barn →](/quote)**
    `,
  },
  {
    slug: 'how-much-does-a-pole-barn-cost-in-florida',
    title: 'How Much Does a Pole Barn Cost in Florida? (2026 Guide)',
    description:
      'Complete breakdown of pole barn costs in Florida — kit prices, installation, concrete, permits, and what to budget.',
    date: '2025-01-15',
    updatedDate: '2026-03-26',
    author: 'Florida Pole Barn',
    readTime: '6 min read',
    category: 'Cost Guide',
    content: `
## Pole Barn Costs in Florida: The Real Numbers

If you're searching for pole barn costs in Florida, you've probably seen a wide range of numbers. Here's a straightforward breakdown from a Florida pole barn builder.

### Kit Prices (Materials Only)

The kit — posts, trusses, roofing, hardware — is the foundation of your cost. Kit pricing varies based on size, wall height, open vs. enclosed configuration, and current material costs.

*Prices vary — contact us for current pricing on your specific size and configuration. We respond within 1 business day with an exact quote.*

These are kit prices — materials only. Installation and site work are separate.

### Installation Costs

Professional installation typically runs $3–$6 per square foot for labor depending on size and complexity. A 30×36 open barn might run $3,000–$4,500 for installation; a 40×60 enclosed barn with doors could run $8,000–$15,000.

### Additional Costs to Budget

**Concrete slab:** $4–$8 per sq ft depending on thickness and reinforcement. A 40×60 slab runs $10,000–$20,000.

**Site prep and grading:** Varies significantly by site. Budget $1,000–$5,000 for typical level sites.

**Permits:** Most Florida counties charge $500–$2,000 for building permits on structures of this size.

**Doors:** Roll-up garage doors range from $800–$3,000 each depending on size.

**Electrical:** Basic electrical rough-in typically runs $2,000–$6,000 by a licensed electrician.

### Total Budget Framework

When budgeting your full project, factor in: kit materials, installation labor, concrete slab (if applicable), site prep, permits, doors, and any electrical or finishing work. Total project costs scale significantly with size and whether the barn is open or enclosed.

*Kit prices vary — contact us for a current quote on your specific size. We'll give you an exact number, not a range.*

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
    title: { absolute: `${post.title} | Florida Pole Barn` },
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

function renderInline(text: string, keyPrefix: string): React.ReactNode {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g
  const nodes: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let index = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    const label = match[1]
    const href = match[2]
    const className = 'font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-900'
    nodes.push(
      href.startsWith('/') ? (
        <Link key={`${keyPrefix}-${index}`} href={href} className={className}>
          {label}
        </Link>
      ) : (
        <a key={`${keyPrefix}-${index}`} href={href} className={className}>
          {label}
        </a>
      )
    )
    index += 1
    lastIndex = match.index + match[0].length
  }

  if (index === 0) return text
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
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
            <span><strong>{match[1]}:</strong> {renderInline(match[2], `li-${key}`)}</span>
          </li>
        )
      }
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="flex gap-2 text-sm text-gray-700 mb-1">
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-600 shrink-0" />
          <span>{renderInline(line.slice(2), `li-${key}`)}</span>
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
      elements.push(<p key={key++} className="text-gray-700 leading-relaxed">{renderInline(line, `p-${key}`)}</p>)
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

  const faqSchema = post.faqs && post.faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqs.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
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
