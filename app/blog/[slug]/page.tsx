import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CTABanner from '@/components/home/CTABanner'
import { COMPANY, PRICING_GUIDANCE } from '@/lib/constants'

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
    slug: 'florida-pole-barn-posts-termites-moisture',
    title: 'Pole Barn Posts in Florida Soil: Termites, Moisture, and What to Ask Before You Build',
    description:
      'What Florida buyers should ask about pole barn posts: termites, moisture, sandy soil, high water, ground-contact wood, piers and brackets, depth, drainage, and wind uplift.',
    date: '2026-10-19',
    author: 'Florida Pole Barn',
    readTime: '13 min read',
    category: 'Construction & Materials',
    faqs: [
      {
        question: 'Do Florida pole barn posts need ground-contact treated wood?',
        answer:
          'If the wood post is buried or stays in contact with the ground, it should be pressure-treated and stamped for ground contact, not only for above-ground use. Above-ground treatment is a different rating, and it is the wrong product for a post that lives in Florida soil. Wood held entirely above grade on a pier or bracket is a different detail, and the engineer still specifies that post. Field-treat cut ends and drilled holes in any zone that stays damp, and confirm the stamp before the posts are set.',
      },
      {
        question: 'Are concrete piers or brackets better than embedded posts in Florida?',
        answer:
          'Neither is automatically the better foundation. An embedded ground-contact post is a sound pole-barn path when the depth, the hole, and the backfill match the drawings for that soil and that wind. A concrete pier or a steel bracket holds the wood above the soil, which reduces decay and termite exposure on the post itself, and it still has to be engineered for uplift and for lateral load. Termites can cross a short gap with shelter tubes, so wood above grade still needs a clear inspection line. Ask the engineer which detail fits this lot.',
      },
      {
        question: 'How deep should a pole barn post be set in Florida?',
        answer:
          'There is no single depth for every barn and every lot. In peninsular Florida the usual drivers are wind uplift, lateral load, and the soil, not frost. Depth, hole diameter, and backfill are on the stamped drawings for that building. A post set shallower than the sheet, or in a hole that caved in with loose sand, is not the foundation that was engineered. Confirm the detail with the project engineer and the local building department.',
      },
      {
        question: 'What if pole barn post holes fill with water?',
        answer:
          'Stop and ask before concrete or backfill goes in. On many Central Florida lots, including sandy ground around Clermont and in Lake County, groundwater sits higher in the rainy season than it does in a dry spring. A hole full of water is not the condition a dry-hole detail assumes, and concrete placed into standing water may not be the concrete on the plans. The engineer should say how to place the foundation on that site. Tell the builder if a test hole on the lot has already filled.',
      },
      {
        question: 'How do subterranean termites reach a pole barn in Florida?',
        answer:
          'Subterranean termites live in the soil and need moisture, which Florida ground supplies for much of the year. They can enter through a buried post, and they can build shelter tubes from the soil up a pier, a bracket, or a skirt board to reach wood above grade. Ground-contact treatment resists them in the treated zone of a buried post. It does not protect untreated girts, trim, or stored wood that touches soil or stays damp. Keep soil, mulch, and debris off the frame, leave the grade line visible enough to spot tubes, and have a pest professional look when tubes show up.',
      },
      {
        question: 'How do pole barn posts resist wind uplift in a Florida storm?',
        answer:
          'In a high wind the roof lifts, and that load travels through the trusses into the posts and then into the ground. Embedded posts resist it through the depth, the hole, and the concrete or backfill the engineer specified. Piers and brackets resist it through the anchors and the pier, which have to be designed for uplift and not only for the weight of the building. Sandy soil and water that scours around a post weaken that path. The wind design and the foundation detail belong on the same stamped set, confirmed with the building department.',
      },
    ],
    content: `
## Pole Barn Posts in Florida Soil: Termites, Moisture, and What to Ask Before You Build

Pole barn posts in Florida have to stay sound in sandy soil, seasonal high water, subterranean termites, and the uplift a hurricane wind puts on the roof. Ground-contact treated wood embedded to the stamped drawings is the usual approach, and concrete piers or brackets that hold the wood above grade are the alternative when the engineer designs them for that wind and soil. Confirm the post, the depth, and the backfill with the local building department and the project engineer before the first hole is dug.

Florida Pole Barn builds these barns for properties across the state, with the crew based near Clermont in Central Florida. The post is the part of the building that lives in the ground. Sandy soils, a rainy season that can fill a hole, and wind that tries to lift the roof are the conditions that detail has to answer. The pad, the drainage, and the holes belong on one plan. A foundation chosen after the frame is up has to live with posts that are already set.

## What Florida Ground Does to a Post

A pole barn post is both a column and a foundation. It carries the roof, and in an embedded design it is also what keeps the roof from lifting out of the ground. Florida asks more of that piece of wood or of the pier that replaces it than a dry, cold climate does.

### Sandy soil and a water table that moves

Much of Central Florida, including a lot of Lake County and the ground around Clermont, is sand. Clean sand can drain, which helps a pad that is built up above the yard. Sand also has little cohesion. A post sitting in loose sand does not grip the way a post in firm, compacted ground does. The drawings assume a soil. A hole that shows muck, clay, organic fill, or a buried layer of debris is a reason to stop and ask, not a reason to set the post and move on.

The seasonal high water table is how high groundwater usually stands in a wet year. On many peninsula lots it sits closer to the surface in the rainy season than it does in a dry spring. A test hole that is empty in April can have water in it in August. That water is an embedment question. It is also a reason to tell the builder what you have already seen on the lot.

### Termites and hurricane wind

Subterranean termites live in the soil across Florida, including Central Florida. They need moisture, and a buried post is in the habitat they already use. They are a reason the wood that touches the ground has to be the right treatment, and a reason the grade around the barn has to stay visible after the building is up.

Hurricane season, June through November, is the other load. Wind on the roof becomes uplift and lateral force in the posts. The foundation that resists that load is part of the wind design, not a detail copied from a barn in another county. [Planning a pole barn for Florida storm season](/blog/planning-pole-barn-florida-storm-season) is where drainage and embedment sit next to the wind speed for the parcel. The posts are that embedment.

Grade, access, and utility locates still come first. The [site preparation checklist](/blog/florida-pole-barn-site-preparation-checklist) is where the pad and the dig get settled before the holes are open.

## Termites and Ground-Contact Treated Wood

Subterranean termites travel through soil. They can feed on a buried post from below, and they can build shelter tubes — the mud tubes you can see — from the ground up a pier, a bracket, a skirt board, or a wall to reach wood that never touched the soil. Moisture is what makes the path usable. A post line that stays damp is an easier path than a post line that can dry.

### What the stamp should say

Pressure-treated lumber rated for ground contact is produced for wood that touches soil. Above-ground treatment is a different rating, for wood that stays off the ground and has a chance to dry. The stamp on the post is how you tell them apart. Ask to see a ground-contact mark, or a ground-contact use category, before a buried post goes in the hole. A stamp that only says the lumber was treated is not the same thing.

Treatment protects the treated zone. It resists decay and termite attack there. It is not a promise that the whole barn is termite-proof. A large post is not always treated through the full thickness. A cut end, a deep check, or a notch in the buried portion opens wood the original treatment may not have reached. Those cuts should be field-treated with a preservative made for that use, and the builder should look at them before the post is set. Confirm that step when you walk the posts, not after the holes are closed.

### Where termites still get in

Ground-contact posts do not cover the rest of the frame.

- **Skirt boards and bottom girts**: This is the wood most likely to sit near soil, mulch, or splash, besides the posts themselves. If it is not rated for the exposure it actually has, it is a separate termite and decay path.
- **Stored wood and debris**: Firewood, lumber offcuts, and cardboard piled against the barn give termites a bridge and hide the tubes.
- **Mulch and raised grade**: Soil or mulch pushed up against the frame after construction buries the line you would have inspected. Finish grade should leave that line visible.
- **Piers and brackets**: Holding the post above grade reduces decay and termite exposure on the post. Termites can still cross a short gap with a shelter tube. Above-grade wood needs a gap you can see, and someone who looks.

Have a pest professional inspect when tubes appear. A ground-contact post is one part of keeping the building sound. It does not replace looking at the barn after the rainy season.

## Moisture, Sandy Soil, and a High Water Table

Florida rain is heavy, and the wet season can keep the ground charged for months. A post detail that looks fine on a dry day in spring has to work on a wet afternoon in late summer, when the water table is up and the roof is shedding a storm.

### Sand that drains, and layers that do not

Sand drains when the profile under the pad is sand and the pad sits above the yard. A clay lens, a hardpan, organic muck, or a pocket of recent fill holds water above it. Those layers show up on Central Florida lots that look uniform from the driveway. Soft spots and old fill settle, and a post or a pier that bears on them is not on the soil the drawings assumed.

Say so if a hole has filled, or if the dig smells organic or looks like it was a low spot that someone filled. The engineer can adjust the detail. The crew cannot invent that adjustment in an open hole.

### Concrete, backfill, and water against the wood

An embedded post stays damp for long stretches of a Florida year. That is why the treatment rating matters. The material around the post matters too. Some details set the post in a concrete collar or footing. Some use a concrete footing with a specified backfill above it. Some keep the wood out of the ground entirely on a bracket. Concrete can trap water against a post when the pocket holds it. Compacted backfill and a concrete footing move water differently. The detail on the stamped sheet is the one that was chosen for that soil and that building. A mix of the two, decided in the hole, is a different foundation.

The floor meets the same water. A gravel pad that sheds through the base and a slab that needs a vapor break are different surfaces, and both of them change the grade at the post. [Gravel pad or concrete slab](/blog/gravel-pad-vs-concrete-slab-florida-pole-barn) is the companion choice. Settle it with the posts, so the slab edge and the post line are drawn together.

## Embedded Posts, Concrete Piers, and Brackets

Buyers usually hear three ways to put a pole barn on Florida ground. They solve different problems. None of them is a shortcut around engineering.

### Embedded ground-contact posts

This is the traditional pole-barn path. The post goes in the ground to the depth on the drawings, in a hole of the size on the drawings, with the concrete or backfill the sheet names. Uplift and lateral resistance come from that buried portion working with the soil. The wood in the ground needs a ground-contact stamp, field treatment at cuts, and a grade that does not scour the hole out from under the building.

Embedded posts are a weak match when the hole will not stay open in loose sand, when groundwater fills the hole and the detail has no method for that water, or when the soil in the footprint is not the soil on the plans. Those are reasons to call the engineer before the post is set. They are not reasons to set it shallow and backfill with whatever came out of the hole.

### Concrete piers and steel brackets

A concrete pier, a precast concrete column, or a steel bracket on a footing holds the wood post above grade. The wood spends less of its life in the termite and decay zone. The pier and the bracket then have to do the work the buried post was doing: carry the roof, and hold it down when the wind lifts.

Ask how the bracket connects to the post and how the bracket connects to the pier. Uplift hardware that was chosen for gravity only is not an uplift detail. Ask what coating the steel has. Florida humidity, splash, and soil moisture are hard on bare steel, and the coating belongs on the drawings with the bracket. Ask whether the base sheds water or holds it at the post bottom.

The wood above a bracket can still be reached by shelter tubes. Keep soil, vines, and stored material from closing the gap, and look at the steel where it meets the concrete.

### What to compare

Compare the options on the site you have, not on a barn you saw somewhere else.

- **Where the wood sits**: In the ground, or above a pier, with a treatment rating that matches that exposure.
- **How uplift is resisted**: Embedment and backfill, or anchors and a pier sized for lift, on the same wind design as the frame.
- **What a wet hole does**: Whether the detail assumes a dry hole, and what the engineer wants if this lot fills.
- **What you can inspect**: A visible grade line, a bracket you can see, and no mulch burying the base.
- **What the permit set shows**: The foundation on the sheets the building department will review. [Whether a pole barn in Florida needs a permit](/blog/do-you-need-a-permit-for-a-pole-barn-in-florida) is the place to start. The county, and any local amendment, still has to be confirmed for your parcel.

Florida Pole Barn uses pressure-treated posts rated for ground contact on the embedded buildings it plans. If the lot or the engineering calls for a pier or a bracket, that detail belongs in the same conversation, before holes are dug.

## Post Depth and Backfill

There is no single post depth that fits every Florida pole barn. In peninsular Florida, including Central Florida, frost is not the usual reason a post goes deep. Wind uplift, lateral load, the span, and the soil are. A neighbor's barn, or a depth remembered from another state, is not this building's foundation.

### What the drawings should name

The stamped set should show the embedment depth, the hole diameter, and the backfill or concrete for this wind and this soil. Hole size matters in sand. A wider, deeper embedment is one way an engineer develops resistance when the soil will not grip a narrow post. The number is theirs, for this barn. Setting the post shallower because the hole hit water, or because the sand caved, changes the design. Ask before that happens.

Confirm the same sheets with the local building department. Counties across Florida adopt the Florida Building Code and can add local amendments. Lake County and the counties around it do not all review a foundation the same way, and an open pasture can differ from a wooded lot on the same road. The engineer of record and the building department are the two places that can say the detail fits this parcel.

### Backfill that matches the sheet

Loose sand shoveled back into the hole is not the same as compacted backfill, and it is not the same as the concrete collar or footing on the plans. Uplift resistance depends on that material being placed the way the drawing says. A partial pour that is not on the sheet is a different foundation.

If the hole fills with water, stop. Concrete placed into standing water can wash out and may not be the concrete the plans describe. Dewatering, a different pier, or a different placement method is an engineering decision. Tell the builder if a test hole on the site has already filled, so the detail can be chosen before dig day rather than invented during it.

The [site preparation checklist](/blog/florida-pole-barn-site-preparation-checklist) covers the same point for the pad: if the soil on site does not match what the drawings assume, resolve it before the posts are set.

## Drainage Around the Posts

Water at the post line is a termite problem, a decay problem, and an uplift problem. Saturated sand has less resistance than the soil the design assumed. A trench cut by roof water can lower the grade and expose or undermine the embedment. Standing water keeps the base of the barn in the moisture subterranean termites use.

### Grade and the rainy season

Build the pad as the high ground, with a continuous fall away from the posts, and check it against a real storm if you can. A barn at the bottom of the pasture collects the yard and the roof together. Summer storms around Clermont and across Central Florida drop a lot of water in a short time. A corner that is firm in April can be soft in August. Fix the low spot before concrete and posts lock it in place.

- **Roof water**: A metal roof sheds rain in a sheet at the eave. Give that water a path — a swale, a stone strip, or gutters that discharge away from the posts. Gutters are optional. A discharge path is not. Keep it out of the embedment zone.
- **The drip line**: Fine or thin gravel at the eave moves. A rut there becomes a channel along the posts. Detail that edge so the rest of the grade stays where you placed it.
- **Splash and the skirt**: Water that bounces off a flat yard keeps the skirt and the post base wet. Grade and a clear line at the base let that splash leave.
- **After the first hard rain**: Walk the perimeter. A pond at a corner or a cut along a post is easier to correct before the finished grade is treated as done.

[Planning for storm season](/blog/planning-pole-barn-florida-storm-season) puts this drainage next to the wind design. The floor choice changes the same edge. A slab that sits low, or gravel placed in a bowl, holds water against the posts either way.

## Wind Uplift and the Connection to the Ground

In a hurricane wind the roof wants to lift. That force goes through the trusses into the posts, then into the ground through embedment, concrete, anchors, or brackets. If the connection at the ground is lighter than the wind design, the frame is not the building that was engineered.

### The load path

Look at both ends of the post. The truss connection and the foundation connection are one path. A post that is well set in the ground and poorly tied to the truss, or a bracket that is well tied to the truss and lightly anchored to the pier, breaks the path in a different place. Ask the builder to show you those two connections on the drawings.

Sandy soil is part of the path. Resistance in sand depends on the depth, the hole, and the backfill the engineer used. Scour from roof water, or a hole left full of loose sand, removes part of that resistance. Drainage and embedment are the same storm detail.

Open, enclosed, and partially enclosed are engineering classes. Adding walls later changes the load on the posts and the trusses. [What a wind rating means on a Florida pole barn](/blog/pole-barn-hurricane-rating-florida) explains what that rating is asking the frame to do. [Open versus enclosed layouts](/blog/open-vs-enclosed-pole-barn-florida) is the layout choice that has to match the drawings. Decide it before the posts are sized and set.

### What to confirm before dig day

The wind speed and the exposure come from the site, not from a single statewide number. The foundation on the sheets should name this parcel, this enclosure, and this soil. If the hole shows something else, the engineer updates the detail before concrete goes in. The building department sees that set when a permit is required. Keep the approved sheets on site so the holes match them.

## Questions to Ask a Builder

Walk this list on the lot, with the drawings, before the first hole is dug.

- **Ground-contact stamp**: If the post is buried, does the stamp say ground contact, and who field-treats cut ends and holes in that zone?
- **Embedded, pier, or bracket**: Which foundation is on the drawings, and why it fits this soil and this wind?
- **Depth, hole, and backfill**: What the sheet shows for embedment, hole size, concrete, and backfill, and what happens if the hole fills with water.
- **Soil in the hole**: Who stops the work if the dig shows muck, clay, fill, or caving sand that the plans did not assume?
- **Drainage**: Where the pad falls, where roof water discharges, and how that water stays out of the embedment zone.
- **Termite path**: Which wood sits near the soil, whether the grade line stays visible, and who looks for shelter tubes after the barn is up.
- **Uplift path**: How the post or bracket ties to the truss and to the ground, and whether that detail matches the wind design for this parcel.
- **The permit set**: Whether this foundation is on the sheets the building department will review, and which code edition the county is enforcing. Confirm both with the building department and the engineer.

## Talk Through the Posts on Your Lot

Florida Pole Barn plans pole barns for properties across Florida, with the crew based in Central Florida near Clermont. The posts follow the lot: the soil in the hole, where water stands in the rainy season, and the wind the building is engineered for. Tell us how you will use the barn and what the ground does after a summer storm. We will talk through the post and foundation detail with you before the holes are dug.

**[Book a free project call →](https://booqer.ai/shops/florida-pole-barn/book)**

## Frequently Asked Questions

### Do Florida pole barn posts need ground-contact treated wood?

If the wood post is buried or stays in contact with the ground, it should be pressure-treated and stamped for ground contact, not only for above-ground use. Above-ground treatment is a different rating, and it is the wrong product for a post that lives in Florida soil. Wood held entirely above grade on a pier or bracket is a different detail, and the engineer still specifies that post. Field-treat cut ends and drilled holes in any zone that stays damp, and confirm the stamp before the posts are set.

### Are concrete piers or brackets better than embedded posts in Florida?

Neither is automatically the better foundation. An embedded ground-contact post is a sound pole-barn path when the depth, the hole, and the backfill match the drawings for that soil and that wind. A concrete pier or a steel bracket holds the wood above the soil, which reduces decay and termite exposure on the post itself, and it still has to be engineered for uplift and for lateral load. Termites can cross a short gap with shelter tubes, so wood above grade still needs a clear inspection line. Ask the engineer which detail fits this lot.

### How deep should a pole barn post be set in Florida?

There is no single depth for every barn and every lot. In peninsular Florida the usual drivers are wind uplift, lateral load, and the soil, not frost. Depth, hole diameter, and backfill are on the stamped drawings for that building. A post set shallower than the sheet, or in a hole that caved in with loose sand, is not the foundation that was engineered. Confirm the detail with the project engineer and the local building department.

### What if pole barn post holes fill with water?

Stop and ask before concrete or backfill goes in. On many Central Florida lots, including sandy ground around Clermont and in Lake County, groundwater sits higher in the rainy season than it does in a dry spring. A hole full of water is not the condition a dry-hole detail assumes, and concrete placed into standing water may not be the concrete on the plans. The engineer should say how to place the foundation on that site. Tell the builder if a test hole on the lot has already filled.

### How do subterranean termites reach a pole barn in Florida?

Subterranean termites live in the soil and need moisture, which Florida ground supplies for much of the year. They can enter through a buried post, and they can build shelter tubes from the soil up a pier, a bracket, or a skirt board to reach wood above grade. Ground-contact treatment resists them in the treated zone of a buried post. It does not protect untreated girts, trim, or stored wood that touches soil or stays damp. Keep soil, mulch, and debris off the frame, leave the grade line visible enough to spot tubes, and have a pest professional look when tubes show up.

### How do pole barn posts resist wind uplift in a Florida storm?

In a high wind the roof lifts, and that load travels through the trusses into the posts and then into the ground. Embedded posts resist it through the depth, the hole, and the concrete or backfill the engineer specified. Piers and brackets resist it through the anchors and the pier, which have to be designed for uplift and not only for the weight of the building. Sandy soil and water that scours around a post weaken that path. The wind design and the foundation detail belong on the same stamped set, confirmed with the building department.
    `,
  },
  {
    slug: 'gravel-pad-vs-concrete-slab-florida-pole-barn',
    title: 'What to Think About When Choosing a Gravel Pad vs a Concrete Slab for a Florida Pole Barn',
    description:
      'When a gravel pad or concrete slab fits a Florida pole barn: drainage, seasonal high water, open storage versus a workshop, and what to ask before you choose.',
    date: '2026-10-15',
    author: 'Florida Pole Barn',
    readTime: '13 min read',
    category: 'Construction & Materials',
    faqs: [
      {
        question: 'When does a gravel pad fit a Florida pole barn?',
        answer: 'A gravel pad fits when the barn stays open for equipment, hay, or vehicles and the pad is built up so water can pass through the base and away from the posts. It suits a working surface on sandy ground that drains, as long as the rock is compacted and the pad is the high spot on the lot. It is a weak match for a closed workshop.',
      },
      {
        question: 'When does a concrete slab fit a Florida pole barn?',
        answer: 'A slab fits a workshop, an enclosed garage, or storage that needs a firm, sweepable floor and a break from ground moisture. It also sets the surface at the door for an RV, boat, or truck, so the opening should be measured from that finished floor. The pad still has to sit high enough that seasonal water stays off the edge.',
      },
      {
        question: 'Does the seasonal high water table change the floor?',
        answer: 'Yes. In the wet season, groundwater on many Central Florida lots, including around Clermont and Lake County, stands higher than it does in spring. A pad below that water, or in a spot that ponds after storms, keeps a gravel base soft and leaves a slab sitting in water. Build the floor above the surrounding grade, and tell the builder if holes on the site have filled.',
      },
      {
        question: 'Do I need a vapor barrier under a pole barn slab in Florida?',
        answer: 'For an enclosed barn, plan on a vapor retarder under the slab. Florida soil stays damp, and vapor moves up into a closed room through bare concrete. The sheet should be continuous, including at posts and pipes, and it goes in with the pour. An open barn that will stay open is a different case. If you might enclose it later, include the retarder when you pour.',
      },
      {
        question: 'What should happen to roof runoff at the edge of the pad?',
        answer: 'The metal roof drops a lot of water at the eave in a Florida storm. Grade the pad so that water runs away from the posts, and give the drip line a path: a swale, a stone strip, or gutters that discharge away from the building. Thin gravel at the eave will rut. A low slab edge will pond.',
      },
      {
        question: 'Can I start with gravel and pour a concrete slab later?',
        answer: 'Yes, when the gravel is a compacted base at an elevation that still lets the slab, the doors, and the outside grade work together. A thin layer of rock on sand usually has to come out. Order the door height for the future floor. If the barn will be enclosed, put a vapor retarder in with the pour.',
      },
      {
        question: 'Does the floor change door clearance?',
        answer: 'Yes. A slab raises the surface you drive on, so the clear opening under the header gets shorter, and the approach outside has to meet the new edge. Set eave height and door size from the finished floor when a slab is part of the plan. Gravel thickness can use up clearance the same way if the pad is built up after you measured on bare ground.',
      },
      {
        question: 'What should I ask before I choose a gravel pad or a slab?',
        answer: 'Ask what each bay is for, which sides stay open, where water stands after a storm, how high the seasonal water is, where roof runoff will go, whether the gravel is meant to become a slab, and whether the slab detail includes a vapor retarder. Those answers belong in the plan before the pad is built.',
      },
    ],
    content: `
## What to Think About When Choosing a Gravel Pad vs a Concrete Slab for a Florida Pole Barn

Choose a gravel pad when the pole barn stays open for equipment, hay, or vehicles and the site can shed water through a built-up base. Choose a concrete slab when the barn is a workshop or another enclosed use that needs a firm floor and a vapor break between damp Florida soil and the room. Drainage, the seasonal high water on the lot, and how you will use the building decide which surface fits. On a Central Florida property, one barn can take gravel under an open equipment bay and a slab under a closed shop. Name each bay before the pad is built.

Florida Pole Barn builds these barns for properties across the state, with the crew based near Clermont in Central Florida. Summer storms, sandy ground, and a water table that rises in the wet season are the conditions the floor lives with. The surface belongs with site preparation: grade, drainage, and the pad elevation, settled before the posts go in. A floor chosen after the building is framed has to live with doors, post lines, and grades that are already set.

## When a Gravel Pad Fits

Gravel is a drained working surface. It fits when water should pass through the base and leave the building, and when what you store can sit on firm aggregate in the open air.

### Open storage and equipment

Tractors, implements, trailers, feed, and other equipment that live under a roof with open sides are the usual match. A compacted gravel pad keeps tires out of loose sand and lets rain that blows into the bay soak through, as long as the pad itself is high enough to drain. [Open and enclosed pole barns](/blog/open-vs-enclosed-pole-barn-florida) are a layout choice and a floor choice. Open sides move air, and they also let weather in. The floor has to tolerate that water.

- **Equipment and agricultural storage**: A firm gravel surface under an open bay is a working yard with a roof. It suits machines that already live outdoors and that can park on aggregate.
- **A use that stays open**: If the sides will stay open, gravel can be the finished surface. Build it with depth, clean stone, and compaction. A thin scatter of rock on native sand disappears under traffic.
- **Traffic that would rut sand**: Central Florida sand moves under tires. A real base spreads that load. A light covering of gravel mixes with that sand and stops carrying the equipment.

### Sites that need a path for water

Sandy ground around Clermont and across much of Central Florida can drain when the soil profile is sand and the pad sits above the yard. Gravel continues that path. Water that reaches the bay has a way through the surface and away from the posts, if the grade falls away from the building. A slab on the same footprint is a lid. Where seasonal water already stands high, that lid sits over wet soil, and the base under it needs a different plan than an open pad that can drain.

- **Built up above the yard**: The gravel pad should be the high ground. Rock placed in a low hole, or in the low corner of a pasture, stores water against the posts.
- **Compaction in lifts**: Loose fill and a single dumped load of stone settle. Ruts become low spots that hold water. Compact the base the way the builder and the drawings describe before you call the pad finished.
- **A later pour, named now**: Many owners start with open storage and enclose a bay later. Gravel can be the first surface when it is built as a base for that slab. Depth, elevation, and door clearance have to assume the concrete. That sequence has its own section below.

### Horses, hay, and wash water

Animals, hay, and a wash area add water the roof did not. Open shade and a wash area need a way for that water to leave, or it ponds under a horse, a hay stack, or the wash rack. The [horse barn planning guide](/blog/horse-barn-planning-florida) covers stalls, aisles, and wash racks. The floor under them still has to send water out of the building. An enclosed stall bay, with drainage at the wash rack, usually wants a slab. An open gravel pad is the surface for shade and equipment that stay open.

Gravel stops being the right surface when you enclose the barn and expect a dry shop, when the layer is too thin to carry traffic, or when the pad sits where storm water already collects. The [site preparation checklist](/blog/florida-pole-barn-site-preparation-checklist) is where pad elevation and compaction get settled before the posts go in.

## When a Concrete Slab Fits

A slab is the floor for a use that needs a clean, level, durable surface and a separation from ground moisture.

### Workshops and enclosed bays

Tools, a workbench, a vehicle you want off the dirt, and any bay you will close belong on concrete. You can sweep a slab. You can roll a cart on it. You can fasten to it when the pour was drawn for that load. [Workshop and garage barns](/workshop-garage) are planned around that floor. An enclosed bay also holds humidity. The slab keeps ground moisture out of that air only when a vapor retarder is under the concrete.

- **A shop you will close**: Walls change the floor. Gravel that was fine in an open bay stays damp once the doors shut and the air stops moving.
- **A bay you may cool**: Cooling a workshop pulls the moisture question forward. Damp concrete without a break under it feeds the room, and that moisture shows up again on a cool metal roof. [Condensation under a Florida pole barn metal roof](/blog/pole-barn-metal-roof-condensation-florida) starts with humid air the building never kept out, including air fed from the ground.
- **Storage off damp aggregate**: Boxes, steel equipment feet, and anything that rusts or molds when it sits on damp rock belong on a slab that stays dry on the room side.

### Doors, tall vehicles, and the approach

RVs, boats, and trucks need a predictable surface at the opening. A slab sets that surface, and it raises it. The clear height under the header shrinks by the thickness of the floor and by any rise in the approach outside. Measure the opening against the finished floor. [Eave height and door openings](/blog/pole-barn-eave-height-door-openings-florida) is the companion decision, and it should be made with the pad, before the doors are ordered.

- **Finished floor, then the door**: The header, the track, and the bottom of the truss all sit above the slab. A door sized to bare ground comes up short once the concrete is in.
- **Approach outside the bay**: The apron has to meet the slab edge. A trailer that crests a lip at the threshold loses the clearance you measured in the yard.
- **A way out for blown-in rain**: A level slab with a tall edge at the door holds rain that blows into an open bay. Give that water an exit.

### Loads fastened to the floor

Racking, a partition, a lift, or equipment bolted down belongs on a slab that was thickened, reinforced, and jointed for those loads. Say so before the pour. A uniform slab can carry stored equipment. A lift or a bolted machine needs the thickness and reinforcement shown on the drawings. The floor belongs on the plan the same way the frame does.

A slab is a poor match when the pad sits in a bowl, when seasonal high water will stand against the edge for weeks, or when the barn stays fully open and the main job of the surface is to drain. Concrete holds the water a low corner collects. That water sits on the floor or runs to the posts.

## Drainage and Seasonal High Water in Florida

Florida rain comes hard. Afternoon storms around Clermont and across Central Florida can drop a lot of water in a short time, and the wet season keeps the ground charged. A pad that looks dry in April can be soft in August or September. Choose the floor for a wet-season afternoon, when that water is on the lot.

### Seasonal high water

The seasonal high water table is how high groundwater usually stands on that ground in a wet year. On many peninsula lots it sits close to the surface. Lake County lots vary. Ridge sand can drain. A nearby flatwoods lot, a filled low area, or a pasture at the bottom of a slope can hold water. Ask what a hole on this site does in the wet season. A dry test hole in spring is one day. The floor and the post holes live there all year.

- **Say so if holes have filled**: High groundwater is an embedment question and a floor question. Post holes that fill need the detail on the drawings. The same water will sit under a slab or in a gravel base that was placed too low.
- **Separate a puddle from the water table**: A puddle after a storm can be surface grading. Water that rises in a hole and stays is groundwater. Grade fixes the puddle. Pad elevation and the foundation detail answer the groundwater.
- **Set the pad above wet-season ground**: The pad elevation should clear the water you expect in a wet summer, with fall away from the posts. [Planning a pole barn for Florida storm season](/blog/planning-pole-barn-florida-storm-season) is where drainage and embedment sit next to the wind design. The floor is part of that water path.

### Soil that drains, and soil that holds water

Sand drains when the profile under the pad is sand. A clay lens, a hardpan, organic muck, or a layer of recent fill holds water above it. Those layers show up on Florida lots that look uniform from the driveway.

- **Soft spots and old fill**: Organic pockets, buried debris, and loose fill settle under gravel and under a slab. Flag them when you walk the footprint. Undercut and replace, or change the foundation approach, before the floor goes down.
- **Compaction carries the floor**: Stone or concrete on loose fill follows the fill as it sinks. Ruts, a cracked slab, and a low corner that holds water are the usual result. Compact in lifts where the builder specifies.
- **Match the drawings**: The engineering set assumes a soil. When the ground in the footprint is different, ask before concrete goes in the holes or on the pad.

### A pad that sits low

Gravel placed below the surrounding grade holds the water the yard sends it. A slab in the same bowl holds that water on the surface and at the edges. Either floor wants the same first move. Make the pad the high ground, with a continuous fall away from the building, and give wash water and driven rain an exit. The [site preparation checklist](/blog/florida-pole-barn-site-preparation-checklist) walks through crown, sheet flow, and a check after a real rain. Do that before the surface is locked in.

## Vapor Barrier and Moisture Under a Slab

Ground moisture in Florida keeps moving after concrete covers it. Water vapor travels from damp soil toward drier air. In an enclosed barn, and especially in a bay you cool, that vapor comes up through a slab with nothing under it. The floor feels cool and damp, cardboard molds from the bottom, and the air under the roof stays wetter than the weather alone would make it.

### What the sheet under the slab is doing

A vapor retarder — the layer people often call a vapor barrier — is a continuous sheet under the slab. It separates the soil from the room. It sits on a compacted base, under the concrete, with laps and penetrations treated so the sheet works as one layer. Place it on that base, under the concrete. Decide it before pour day, while the base is still open.

- **Where it sits**: Under the slab, on the base the pour is placed on. Vapor that has already entered the concrete has already passed a sheet laid on top of the finished floor.
- **Whether it is continuous**: Seams, post penetrations, and pipes are the gaps. A sheet that stops at every post still feeds the room at every post.
- **What it is rated for**: Under-slab use, lapped and sealed the way the detail shows. A torn sheet with open seams is an unfinished detail.
- **Walls you may add later**: An open barn that stays open changes air all day, and ground vapor has a way out. Once the walls go up, a slab poured without a retarder keeps feeding the room, and the sheet has to be placed before the pour. If enclosure is even a possibility, include the retarder in the first pour.

### Gravel uses a different moisture path

A membrane under a gravel pad can hold water in the rock when that water has no exit. Open storage wants drainage through the base. A closed shop wants a slab and a retarder. A coating rolled over gravel, so the bay looks finished, can trap moisture against whatever you store. Match the assembly to the use.

The roof and the floor are one moisture plan. Humid air from a damp slab is air a metal roof can condense when the panels cool. Decide the floor with the roof, before either is ordered.

## Roof Runoff and Grade

A metal roof sheds rain in a sheet at the eave. On a large barn, that sheet is a lot of water at the drip line, in the same storms that already soak the yard. Loose gravel at that line washes into a trench. A slab edge that sits level with a flat yard ponds against the posts and the skirt. Grade is how the roof and the floor work together.

### The drip line

- **A path for roof water**: A shallow swale, a strip of larger stone along the eave, or gutters and downspouts that discharge away from the posts. Gutters are optional. The discharge path still belongs on the plan. Keep that water out of the embedment zone.
- **Stone that stays at the eave**: Fine or thin gravel at the drip line moves. The eave is where the roof concentrates the storm. Detail that edge so the rest of the pad stays where you placed it.
- **The joint at the slab edge**: Water that stands against the concrete works at the joint between the floor and the ground. Grade outside the building should carry that water away from the bay.

### Fall away from the building

The pad should crown, or fall continuously away from the posts, on every side you can grade. Roof water then leaves the building. A barn set in a natural low spot collects the pasture and the roof together. The pad elevation has to sit above that flow.

- **An exit at the doors**: Slope that sends water out of an open bay is part of the floor. A threshold or a slab edge that acts as a curb holds the rain that blows in. Open storage needs a low side.
- **The uphill side of the lot**: Note which way the yard falls before you stake the barn. A building at the bottom of the slope receives the slope. A swale above the pad, and a pad that is actually high, belong in the site plan.
- **A walk in the rain**: After the frame is up, walk the drip line during a hard storm if you can. A rut at the eave or a pond at a corner is easier to correct before a slab locks the grade in place.

## Starting on Gravel and Pouring a Slab Later

You can start on gravel and pour a slab later when the gravel was built as a base. Posts usually go in first on a Florida pole barn. The floor can follow. The sequence works when the finished floor elevation was chosen before the posts and the doors were set.

### A base, with room for concrete

Depth, clean stone, and compaction in lifts are what make a later pour possible. A thin pad that has mixed with the sand is material to remove. Tell the builder a slab is part of the plan so the base depth and the post layout leave room for it. The slab edge and the post line have to be drawn together. The [site preparation checklist](/blog/florida-pole-barn-site-preparation-checklist) makes the same point about coordinating the floor with embedment, whether the concrete goes in before the frame or after.

### Door height for the future floor

A slab raises the surface you drive on. Clearance under the header shrinks by whatever the floor adds, and the approach outside has to meet the new edge. Doors ordered to the gravel lose opening once the concrete is in. If a pour is likely, set the eave and the door from the future floor. [Eave height and door openings](/blog/pole-barn-eave-height-door-openings-florida) walks through that measurement.

### Grade that still works after the pour

The top of the concrete should still let water out of open bays, and the ground outside should still fall away. A slab poured high, with shoulders left low, traps water at the edge and at the posts. Set the outside grade when you set the floor elevation.

### The retarder goes in with the pour

Plan the vapor retarder into the concrete, and place the sheet before the pour covers the base. A year of open storage on gravel leaves the same ground moisture under a future enclosed room. If the bay will be closed, the retarder is part of the slab.

### Walls change the building

An open gravel barn that becomes a closed shop has a new moisture plan, a new floor, and sometimes a different enclosure than the engineering was drawn for. Read [open versus enclosed layouts](/blog/open-vs-enclosed-pole-barn-florida) again before you order walls, and confirm the change on the drawings.

If the barn will stay open equipment storage, a well-built gravel pad can be the finished surface. Pour later when the base was compacted and the doors were sized for concrete.

## Questions to Ask Before You Choose

Walk this list on the site before the pad is built.

- **Name the use of each bay**: Open equipment storage, hay, horses, an RV, a workshop, or a cooled room. Include the use you expect later.
- **Name which sides stay open**: Walls change the floor. Gravel under a future enclosed shop is a different plan from gravel under an open run-in.
- **Where water stands after a summer storm**: Which corner is soft, and which way the yard falls.
- **Where the seasonal high water sits**: Whether a hole on this lot has filled, and whether the pad is low relative to the wet-season water.
- **How roof water leaves**: Drip line, swale, stone, or gutters, and where it discharges relative to the posts.
- **Whether the gravel is the floor or the base**: If you may pour later, whether depth, compaction, and elevation are set for a slab and for the doors.
- **Where a slab sits relative to the doors and the grade**: Clearance under the header, a way out of the bay for driven rain, and fall away outside.
- **Whether the slab detail includes a vapor retarder**: Continuous, under the concrete, with a plan for posts and pipes, whenever a bay will be enclosed.
- **Who compacts, and against what the drawings show**: Lifts, and a base that matches the plan. Loose fill settles under traffic and under concrete.
- **Whether the floor matches the engineering set**: Post embedment, slab edges, and any thickened areas the use needs. If the soil or the water differs from the plans, ask before concrete goes in the holes or on the pad.

## Talk Through Use and Drainage

Florida Pole Barn plans pole barns for properties across Florida, with the crew based in Central Florida near Clermont. The floor follows the site and the use: how water moves on the lot, whether the sides stay open, and whether any bay becomes a workshop. Tell us how you will use the barn and how the lot drains. We will plan the pad with the building, and you can request a quote from that conversation.

**[Request a quote →](/quote)**

## Frequently Asked Questions

### When does a gravel pad fit a Florida pole barn?

A gravel pad fits when the barn stays open for equipment, hay, or vehicles and the pad is built up so water can pass through the base and away from the posts. It suits a working surface on sandy ground that drains, as long as the rock is compacted and the pad is the high spot on the lot. It is a weak match for a closed workshop.

### When does a concrete slab fit a Florida pole barn?

A slab fits a workshop, an enclosed garage, or storage that needs a firm, sweepable floor and a break from ground moisture. It also sets the surface at the door for an RV, boat, or truck, so the opening should be measured from that finished floor. The pad still has to sit high enough that seasonal water stays off the edge.

### Does the seasonal high water table change the floor?

Yes. In the wet season, groundwater on many Central Florida lots, including around Clermont and Lake County, stands higher than it does in spring. A pad below that water, or in a spot that ponds after storms, keeps a gravel base soft and leaves a slab sitting in water. Build the floor above the surrounding grade, and tell the builder if holes on the site have filled.

### Do I need a vapor barrier under a pole barn slab in Florida?

For an enclosed barn, plan on a vapor retarder under the slab. Florida soil stays damp, and vapor moves up into a closed room through bare concrete. The sheet should be continuous, including at posts and pipes, and it goes in with the pour. An open barn that will stay open is a different case. If you might enclose it later, include the retarder when you pour.

### What should happen to roof runoff at the edge of the pad?

The metal roof drops a lot of water at the eave in a Florida storm. Grade the pad so that water runs away from the posts, and give the drip line a path: a swale, a stone strip, or gutters that discharge away from the building. Thin gravel at the eave will rut. A low slab edge will pond.

### Can I start with gravel and pour a concrete slab later?

Yes, when the gravel is a compacted base at an elevation that still lets the slab, the doors, and the outside grade work together. A thin layer of rock on sand usually has to come out. Order the door height for the future floor. If the barn will be enclosed, put a vapor retarder in with the pour.

### Does the floor change door clearance?

Yes. A slab raises the surface you drive on, so the clear opening under the header gets shorter, and the approach outside has to meet the new edge. Set eave height and door size from the finished floor when a slab is part of the plan. Gravel thickness can use up clearance the same way if the pad is built up after you measured on bare ground.

### What should I ask before I choose a gravel pad or a slab?

Ask what each bay is for, which sides stay open, where water stands after a storm, how high the seasonal water is, where roof runoff will go, whether the gravel is meant to become a slab, and whether the slab detail includes a vapor retarder. Those answers belong in the plan before the pad is built.
    `,
  },
  {
    slug: 'pole-barn-metal-roof-condensation-florida',
    title: 'What to Think About When Planning Condensation Control Under a Florida Pole Barn Metal Roof',
    description:
      'Why a Florida pole barn metal roof sweats, and what to think through on insulation, vapor control, ventilation, and open versus enclosed use before drips reach what you store.',
    date: '2026-10-12',
    author: 'Florida Pole Barn',
    readTime: '9 min read',
    category: 'Construction & Materials',
    faqs: [
      {
        question: 'Why does a metal roof sweat in a Florida pole barn?',
        answer: 'Florida air holds a lot of moisture for most of the year. A metal panel is thin, so it heats in the sun and cools quickly after sunset, in a cold snap, or above a cooled shop. When the underside drops below the dew point of the air touching it, that moisture becomes droplets. Through a Central Florida summer the dew point often sits in the 70s, so the panel only has to be cooler than the air against it.',
      },
      {
        question: 'Is condensation the same as a roof leak?',
        answer: 'No. A leak follows rain and usually shows up at a screw, a lap, a ridge, or a penetration. Condensation often shows up on a clear, humid morning, as a line under a purlin, or as widespread dampness when the metal is cool. Both can stain and rust, so tell them apart before you reseal a roof that is already tight.',
      },
      {
        question: 'Do open pole barns get condensation under the roof?',
        answer: 'Yes. Open bays still have metal that can fall below the dew point on a humid Florida night. Moving air usually dries the panels and what you store before the day heats up. An enclosed barn holds that humid air, so the same night can leave drips on tools, hay, and stored goods.',
      },
      {
        question: 'Will insulation alone stop condensation on a pole barn metal roof?',
        answer: 'Not by itself. Insulation changes the temperature through the roof, but humid air that still reaches cold metal will condense on it or inside the insulation. The air and vapor path has to match the insulation: sealed where the plan is to keep air off the metal, or deliberately vented where the plan is to dry the space. Ask how those pieces work together before the roof is ordered.',
      },
      {
        question: 'Should a cooled Florida workshop be vented like an open barn?',
        answer: 'Usually no. An unconditioned enclosed barn often uses eave intake and ridge exhaust to flush humid air. A cooled shop is trying to keep outdoor humidity out. Opening that building to the weather brings more moisture in and works against the cooling. The roof and walls need an air-sealing and insulation approach suited to a conditioned space, confirmed on the drawings.',
      },
      {
        question: 'What are early signs of condensation under a metal roof?',
        answer: 'Drips or a damp floor on clear mornings, rust-colored streaks on purlins or screw lines, water spots on the tops of stored items, musty cardboard or hay, and wet or sagging insulation. Stains that appear only in rain are more likely a leak. Stains that appear after a cool, humid night are more likely condensation.',
      },
      {
        question: 'When should condensation control be decided on a pole barn?',
        answer: 'Before the roof is ordered, and again before an open barn is enclosed or a bay is cooled. Open storage, hay, horses, and a cooled workshop each change the insulation, vapor control, and ventilation. Adding walls or cooling later without revisiting the roof assembly is when many Florida barns start to drip.',
      },
    ],
    content: `
## What to Think About When Planning Condensation Control Under a Florida Pole Barn Metal Roof

Condensation under a Florida pole barn metal roof is water that forms on the underside of the panels when humid air meets metal that has cooled below the dew point. The air in Florida holds a lot of moisture for most of the year. The panels heat in the afternoon sun, then cool quickly after sunset, in a winter cold snap, or above a cooled workshop. When the steel drops below the dew point of the air touching it, that moisture comes out as droplets. Those drips show up as rust stains on purlins and screws, damp boxes, musty hay, or a wet floor on a clear morning. It is a planning problem. How you will use the barn — open storage, enclosed and unconditioned, or closed and cooled — decides whether the roof needs insulation, a vapor and air control layer, ventilation, or a combination. That decision belongs on the drawings before the roof is ordered.

## Why a Florida Metal Roof Sweats

A metal panel is thin. It has little mass, so its temperature follows the weather faster than wood decking or a heavier roof. On a Central Florida afternoon the panel can be hot to the touch. After a clear night, or when a cool front moves down the peninsula, the same panel can fall below the temperature of the air in the barn. Humid air off the Gulf and the Atlantic keeps the dew point high through much of the year, including many winter mornings. Through a typical summer the dew point often sits in the 70s, so the metal does not have to feel cold by northern standards. It only has to be cooler than the air against it. If the underside is below that dew point, water beads on it.

The pattern is easy to confuse with a leak, and the next step is different.

- **After a clear, humid night**: Droplets along the low edge of a panel, a damp line under a purlin, or a wet spot on the floor with no rain in the gauge. That is condensation.
- **During or right after rain**: Water at a screw, a lap, a ridge, or a pipe flashing. That is a leak path, and resealing is the right next step.
- **Both on the same day**: A storm can cool the roof and drive humid air in through open bays. Watch whether the drip continues on the next clear morning.

A barn that stays dry in July can drip in January, when a cool roof meets air that never really dried out. Horses, hay, a washed tractor, and a dirt floor add vapor of their own. The metal is the surface where it shows up. Screws and purlins can sweat even when the field of the panel looks dry. Rust-colored streaks at those lines are an early clue.

## Open Bays, Enclosed Barns, and a Cooled Shop

The same roof behaves differently once you decide what the walls do. [Open and enclosed pole barns](/blog/open-vs-enclosed-pole-barn-florida) are a layout choice and a moisture choice.

- **Open storage**: Air moves through the bays. The panels can still fall below the dew point on a humid night, and you may see a light sweat at dawn. Moving air usually dries the steel and what you park under it before the day heats up. Rain is the larger threat to the equipment, which is why overhangs and which way the barn faces still matter. Condensation control is simpler here, and it is not automatic.
- **Enclosed, not cooled**: Walls and doors hold the humid air that an open bay would have flushed. Hay, livestock, a dirt or gravel floor, and a wash bay all keep the indoor dew point high. This is the layout where owners most often find drips on tools and rust on the roof screws. Ventilation has to be drawn, not hoped for.
- **Cooled or heated**: A workshop, an office bay, or any space you air-condition puts cooler, drier interior air on one side of the roof and hot, humid outdoor air on the other. In a Florida summer the vapor drive is often inward, toward the cooled space. A roof that was fine as open storage can sweat, or wet the insulation, once the space is closed and cooled. Say so before the walls and the roof assembly are drawn.
- **Use that will change**: An open barn you may enclose later, or an enclosed barn you may cool later, needs that future use named now. Adding walls or cooling without revisiting the roof is when many Florida barns start to drip. If horses or hay are part of the plan, say that too. Animals and feed add moisture the roof will see every night.

## Insulation, Vapor Control, and Air Sealing

Insulation slows heat moving through the roof. On its own it does not stop humid air from touching cold metal. Air that still reaches the panel drops its moisture there and can wet the insulation from the roof side. Wet insulation sags, smells musty, and does less of its job. No one facing fits every barn. Ask how the air and vapor path is supposed to work.

- **Keep humid air off the steel**: If the plan is a layer directly under the panels — a facing on the insulation or a separate membrane — it has to be continuous. Laps, eaves, the ridge, light holes, and pipe penetrations are where untreated air still reaches the metal. A seam that is only pinched, not sealed, is still a path for condensation.
- **Match the layer to this climate**: Most of Florida is hot and humid. Moisture often moves from outdoors toward a cooled interior in summer, and the drive can reverse on a cold night. A vapor retarder placed as if this were a northern winter can trap water in the roof. Ask where the layer sits, and why that side is right for a Florida building that may be cooled, left unconditioned, or both.
- **Leave a way for stray moisture to dry**: Two tight sheets with insulation between them can hold water that gets in, with nowhere for it to go. One control layer, and a drying path the builder can point to, is the question to ask.
- **Include the thermal bridges**: Purlins and fasteners carry heat around the insulation. They can sweat, stain, and drip even when the flat of the panel stays dry. Ask how those members are treated, not only the field of the roof.
- **Pick ceiling or roof, and carry it through**: Insulating a flat ceiling and venting the space above it is a different assembly from insulating directly under the metal and leaving that cavity closed. Either approach can work when it is finished the way it was drawn. Mixing them — a ceiling batt, a blocked ridge, and a closed pocket against the panels — is a common way to store water in the roof.

Gaps at the wall-to-roof joint, around door headers, and at wire penetrations move a lot of humid air. That air feeds the drip in an enclosed barn, and it is moisture a cooled shop has to remove. The drawings should say which joints are sealed and which stay open so the barn can vent. A membrane or a different insulation stack still has to match the engineered roof. If the assembly changes after the plans are stamped, the engineer should see it. [What a wind rating means on a Florida pole barn](/blog/pole-barn-hurricane-rating-florida) is the companion question: the roof has to stay on the building, and the underside has to stay dry.

## Ventilation, Eave Intake, and Ridge Airflow

Ventilation and vapor control do different jobs. Ventilation replaces humid indoor air with outdoor air and gives wet surfaces a chance to dry. A vapor and air control layer keeps humid air from reaching a cold surface in the first place. An unconditioned enclosed barn often needs the first. A cooled shop usually needs the second. Using the open-barn answer on a closed, cooled bay pulls outdoor humidity inside and works against the cooling.

For an enclosed barn that is not conditioned, think about a path, not a single vent.

- **Intake low**: Eave or soffit openings let air in. If insulation, a facing, or a trim piece blocks that slot, the high vent has little air to pull and the space under the roof stays stale.
- **Exhaust high**: A ridge vent or a cupola lets the warmest, wettest air out. A high opening with no low intake mostly sits there. Air needs an entrance and an exit.
- **A clear channel**: A planned gap keeps insulation from closing the airway at the eave. If you cannot trace a continuous path from eave to ridge, treat it as blocked until someone shows you the opening.
- **Open sides and storms**: More open area dries the barn and also changes the wind load. Closing vents or adding walls before a storm is an engineering change, not only a weather habit. [Planning a pole barn for Florida storm season](/blog/planning-pole-barn-florida-storm-season) covers how open and enclosed layouts are supposed to match the site.

Fans move air. They do not lower the dew point by themselves. If the air they move is already saturated, they can spread a drip without drying the barn. Outdoor exchange helps when that air is drier, or when it carries moisture off a surface that warms after sunrise. Leaving doors open so the barn can breathe is a layout the drawings should already show. An open door is a path for wind-driven rain, and the engineering class depends on which sides stay open.

## Early Signs on the Panels, the Purlins, and What You Store

Look on a clear morning, not only during a storm.

- **Drips with no rain**: A wet line on the floor under a purlin, or drops along the low rib of a panel, after a dry night.
- **Rust-colored streaks**: Stains that start at screws or on top of a purlin and run down. Condensation sits on those colder members and leaves a mark before a panel rusts through.
- **Damp stored goods**: Cardboard, a saddle, a boat cover, or the top of an RV with spots that are not under one seam. Water that fell across a wide area fits condensation better than one failed screw.
- **Musty hay or feed**: A smell, caking, or heating in the top of a stack. Hay adds moisture of its own. A sweating roof adds more. Either one is a reason to look up.
- **Wet or sagging insulation**: Facing that stains, droops, or shows droplets on the barn side. Air is reaching a cold surface inside the assembly.
- **A stain that only appears in rain**: More likely a fastener, a lap, or a flashing. Fix that path. Covering an active leak with insulation does not turn it into a condensation problem, and it does not solve it.

A dirt floor, a slab with no vapor break under it, and poor grading add ground moisture that the roof can then condense. The pad and the drainage are part of the moisture plan. The [site preparation checklist](/blog/florida-pole-barn-site-preparation-checklist) is where grade and drainage get settled before the posts go in, so the barn is not sitting in water it is also collecting overhead.

## A Checklist Before You Build or Enclose

Walk through this before the roof package is ordered, and again before you enclose an open barn or add cooling.

- **Name the use**: Open equipment storage, enclosed unconditioned storage, horses, hay, a workshop, or a cooled bay. Include the use you expect later.
- **Name the moisture sources**: Animals, hay, a wash bay, a dirt floor, an RV that comes in wet, or a shop you will cool.
- **Ask how humid air stays off the metal**: A facing, a membrane, or a vented space, and whether the laps and penetrations are sealed.
- **Ask where the vapor control sits, and why**: Especially if any bay will be air-conditioned through a Florida summer.
- **Pick vented or closed, and stick to it**: Intake at the eave, exhaust at the ridge, and a channel that insulation cannot block — or a sealed assembly with a drying path the builder can explain.
- **Include purlins and fasteners**: They can sweat when the field of the panel does not.
- **Keep the site from feeding the air**: Grade, drainage, and the floor, so ground moisture is not the source you left out.
- **Match any new walls to the engineering**: Enclosing a side, closing vents, or changing the roof stack can change the wind design. Confirm it on the drawings before the order changes.
- **Look up after the first cool night**: A walk-through on a clear, humid morning tells you whether the assembly is doing what it was drawn to do.

## Tell Us How You Will Use the Barn

Florida Pole Barn plans metal-roofed pole barns for properties across Florida, with the crew based in Central Florida. Condensation control starts with use: what you store, whether the sides stay open, and whether any bay will be cooled. Tell us how you will use the barn. We will plan the roof, the walls, and the ventilation as one building, and you can request a free quote from that conversation.

**[Tell us how you will use the barn →](/quote)**

## Frequently Asked Questions

### Why does a metal roof sweat in a Florida pole barn?

Florida air holds a lot of moisture for most of the year. A metal panel is thin, so it heats in the sun and cools quickly after sunset, in a cold snap, or above a cooled shop. When the underside drops below the dew point of the air touching it, that moisture becomes droplets. Through a Central Florida summer the dew point often sits in the 70s, so the panel only has to be cooler than the air against it.

### Is condensation the same as a roof leak?

No. A leak follows rain and usually shows up at a screw, a lap, a ridge, or a penetration. Condensation often shows up on a clear, humid morning, as a line under a purlin, or as widespread dampness when the metal is cool. Both can stain and rust, so tell them apart before you reseal a roof that is already tight.

### Do open pole barns get condensation under the roof?

Yes. Open bays still have metal that can fall below the dew point on a humid Florida night. Moving air usually dries the panels and what you store before the day heats up. An enclosed barn holds that humid air, so the same night can leave drips on tools, hay, and stored goods.

### Will insulation alone stop condensation on a pole barn metal roof?

Not by itself. Insulation changes the temperature through the roof, but humid air that still reaches cold metal will condense on it or inside the insulation. The air and vapor path has to match the insulation: sealed where the plan is to keep air off the metal, or deliberately vented where the plan is to dry the space. Ask how those pieces work together before the roof is ordered.

### Should a cooled Florida workshop be vented like an open barn?

Usually no. An unconditioned enclosed barn often uses eave intake and ridge exhaust to flush humid air. A cooled shop is trying to keep outdoor humidity out. Opening that building to the weather brings more moisture in and works against the cooling. The roof and walls need an air-sealing and insulation approach suited to a conditioned space, confirmed on the drawings.

### What are early signs of condensation under a metal roof?

Drips or a damp floor on clear mornings, rust-colored streaks on purlins or screw lines, water spots on the tops of stored items, musty cardboard or hay, and wet or sagging insulation. Stains that appear only in rain are more likely a leak. Stains that appear after a cool, humid night are more likely condensation.

### When should condensation control be decided on a pole barn?

Before the roof is ordered, and again before an open barn is enclosed or a bay is cooled. Open storage, hay, horses, and a cooled workshop each change the insulation, vapor control, and ventilation. Adding walls or cooling later without revisiting the roof assembly is when many Florida barns start to drip.
    `,
  },
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

If the path is tight, say so early. Relocating the pad a few feet for access is easier to plan than improvising on delivery day.

### Utilities, Wells, and What Lies Underground

Before any digging, know what is under the stakes.

- **Call for locates**: Use the statewide call-before-you-dig service so public utilities are marked. Do this early enough that marks are still visible when work starts.
- **Private lines**: Irrigation, septic, electric to a well, low-voltage cable, and old fence charger lines often do not show on public locates. Walk the property with anyone who installed them.
- **Wells and septic**: Keep required setbacks from wells and drain fields. County health rules can veto a pad location that otherwise looks perfect.
- **Overhead lines**: Note clearances for delivery and for any future lean-to or antenna. Metal buildings and overhead service need planned separation.

Mark known private lines with flags that survive a rain. A sketch in your phone is not enough once the excavator arrives.

### Soil, Water Table, and Embedment Reality

The engineering set specifies post depth, hole diameter, and backfill for the design wind load and assumed soil. Florida sites often include sand, organic layers, or a high water table that fills holes as soon as they are dug. What to ask about termites, ground-contact treatment, piers and brackets, and wind uplift is in [pole barn posts in Florida soil](/blog/florida-pole-barn-posts-termites-moisture).

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

Florida rain is heavy, soils are often sandy, and the water table can sit close to the surface. Wind design assumes the posts stay where the engineer put them. Standing water in post holes, or runoff that scours around the piers, works against that assumption. Treatment, depth, backfill, and uplift for the posts themselves are covered in [pole barn posts in Florida soil](/blog/florida-pole-barn-posts-termites-moisture).

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
    title: 'What Affects Your Pole Barn Cost in Florida',
    description:
      'What changes a Florida pole barn project: building size, county wind-load requirements, site conditions, enclosure, and options. No published prices — get a free quote.',
    date: '2025-01-15',
    updatedDate: '2026-10-16',
    author: 'Florida Pole Barn',
    readTime: '6 min read',
    category: 'Planning Guide',
    content: `
## What Affects Your Pole Barn Cost in Florida

${PRICING_GUIDANCE}

A single published figure would miss the property. The useful question is which parts of the project change the quote.

### Building size and layout

Width, length, and wall height set the posts, trusses, and roof. A taller eave, a wider clear span, or a longer run of bays changes the structure. Extra door bays and a layout built around horses, equipment, an RV, or a workshop change it again. Tell us what has to fit, and the building is sized to that use.

### Open or enclosed

An open barn is a roof on posts. An enclosed barn adds metal siding, end walls, and doors. Enclosure, door count, and door size are options. Insulation, windows, lean-tos, and interior finishing are options too.

### County wind-load requirements

Florida counties do not all use the same design wind speed. Coastal and inland sites can require different engineering. Stamped plans for your county's wind load are part of a Florida project, and they are scoped with the building.

### Site conditions

The lot changes the work around the building:

- Grade and drainage
- Access for delivery
- Gravel pad or concrete slab
- Utilities and electrical
- How the posts are set

A level, accessible site and a sloping or wet site are different projects. Site work is scoped on the property.

### Permits and options

Most counties require a permit for a permanent pole barn. The process depends on the county, the size, and whether the use is agricultural. Doors, roof trim, wainscot, and interior finishing are chosen with the layout.

### How to get a number for your project

${PRICING_GUIDANCE}

**[Get a free quote for your Florida pole barn →](/quote)**

**[Book a free project call →](https://booqer.ai/shops/florida-pole-barn/book)**
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

### Permit Fees

Permit fees are set by the county and change with building size and scope. We do not publish a fee. Ask the county building department, or include the question in a quote request and we will talk through what your county typically requires.

${PRICING_GUIDANCE}

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
      'Side-by-side comparison of open and enclosed pole barns for Florida — ventilation, protection, and which works best for each use case.',
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

**What the building includes:** A roof on posts. No siding and no door hardware. Simpler framing.

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

**What the building includes:** The same post-and-truss structure, plus siding, end walls, and doors.

### Side-by-Side Comparison

| Feature | Open | Enclosed |
|---|---|---|
| Ventilation | Excellent | Requires vents/fans |
| Rain protection | Roof only | Full |
| Security | None | Lockable |
| Best in Florida heat | ✓ | With ventilation |
| Hurricane protection | Good | Better |
| What you add | Roof and posts | Siding, end walls, and doors |
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

Picking the right size avoids the frustration of outgrowing your barn too quickly. Here are our recommendations by use case.

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

Build bigger than you think you need. The number one regret we hear from customers is wishing they'd gone slightly larger. Adding a few feet during the original build is simpler than putting up a second structure later.

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
      'Everything horse owners need to know when planning a Florida barn — stall sizing, ventilation, and layouts.',
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
