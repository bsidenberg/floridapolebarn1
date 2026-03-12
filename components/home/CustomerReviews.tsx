'use client'

import { useState } from 'react'

const reviews = [
  {
    name: 'Jack Ghiz',
    text: 'Worked w/ Paul on design & build of a 30\'x30\' pole barn - I wanted the roofline to extend over existing building to create a covered walkway between the two structures. Paul made it happen and the finished product is exactly what I envisioned.',
  },
  {
    name: 'Pradeep Gossai',
    text: 'Reasonable price. Florida Pole Barn did an amazing job on my project. You can tell they take pride in delivering a high-end product. Very professional and easy to work with throughout the whole process.',
  },
  {
    name: 'Stephen Juliano',
    text: 'Our church used Florida Pole Barn to build a 40x40 pavilion on our church farm. The finished product was amazing! Big shout out to Brian who helped us throughout the project! Thanks for a job well done!!',
  },
  {
    name: 'S Close',
    text: 'A great experience from the first phone call. Very fast and efficient installation, good price, good communication. We couldn\'t be more pleased.',
  },
  {
    name: 'Gil Levy',
    text: 'I\'ll save you the time and energy! These guys are good and know what they\'re doing. Highly recommend Florida Pole Barn for anyone looking for quality work at a fair price.',
  },
  {
    name: 'Joseph Lugones',
    text: 'Yeis and his crew are awesome! The pictures say everything from Zero to Hero. Incredible transformation and quality craftsmanship from start to finish.',
  },
  {
    name: 'James Middleton',
    text: '',
  },
  {
    name: 'Kittery Barrows',
    text: 'Brian was absolutely awesome to work with. He was more than happy to work with us to get everything exactly right. The build quality is excellent and the whole experience was smooth from start to finish.',
  },
  {
    name: 'Roberta Hemphill',
    text: 'Wonderful experience. The team was professional, on time, and the quality of work exceeded our expectations.',
  },
  {
    name: 'Greg H',
    text: 'The communications and correspondence from Brian was professional and outstanding. Complete and detailed information with a very fair price quotation and excellent references.',
  },
  {
    name: 'Carol Newhart',
    text: 'From start to finish we have been happy. Communication was excellent throughout design, prep and construction. Would definitely recommend.',
  },
  {
    name: 'Paul M',
    text: 'I had these guys add a 12\' X 32\' extension to an existing pole barn. The price was fair and the work was top notch. Very happy with the result and would use them again.',
  },
  {
    name: 'Ed Berry',
    text: 'Brian and the guys were amazing! We had a really hard time getting the county to approve our plans, and Brian stepped in and helped us navigate the whole process. Couldn\'t have done it without them.',
  },
  {
    name: 'Clint Hardy',
    text: 'Brian at Florida Pole Barn answered all questions and helped with anything that arose through the process of building our 50x40 pole barn. Building looks great couldn\'t be happier!',
  },
  {
    name: 'Mike Fuller',
    text: 'Great crew, delivered and completed on time in estimate provided. I would definitely recommend them.',
  },
  {
    name: 'Lance Renfro',
    text: 'Very satisfied with the installation on my 24 x 36 barn. Employees were very polite and knowledgeable of their work. Would absolutely recommend Florida Pole Barn to anyone.',
  },
]

const INITIAL_COUNT = 6

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function CustomerReviews() {
  const [showAll, setShowAll] = useState(false)
  const visible = showAll ? reviews : reviews.slice(0, INITIAL_COUNT)

  return (
    <section className="section-padding bg-brand-950">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-400 mb-2">
            Google Reviews
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            What Our Customers Say
          </h2>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-white font-bold text-lg">5.0</span>
            <span className="text-brand-400 text-sm">· {reviews.length} reviews</span>
          </div>
        </div>

        {/* Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {visible.map((review) => (
            <div
              key={review.name}
              className="break-inside-avoid bg-white rounded-2xl p-5 shadow-sm border border-brand-100"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-700 text-white font-bold text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-900 text-sm leading-tight">{review.name}</span>
                </div>
                <StarRating />
              </div>
              {review.text && (
                <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              )}
            </div>
          ))}
        </div>

        {/* Toggle button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-600 px-6 py-3 text-sm font-semibold text-brand-300 hover:bg-brand-800 transition-colors"
          >
            {showAll ? (
              <>Show fewer reviews <span>↑</span></>
            ) : (
              <>Show all {reviews.length} reviews <span>↓</span></>
            )}
          </button>
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJt8LpYVOVV4gR1T1hgRoCcD4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 transition-colors"
          >
            <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Leave Us a Google Review
          </a>
        </div>
      </div>
    </section>
  )
}
