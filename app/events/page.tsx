import { Event } from '../models/types'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Cultural', value: 'cultural' },
  { name: 'Social', value: 'social' },
  { name: 'Educational', value: 'educational' },
  { name: 'Professional', value: 'professional' },
]

async function getEvents() {
  const res = await fetch('http://localhost:3000/api/events', { 
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }
  return res.json()
}

export default async function Events() {
  const events = await getEvents()

  const featuredEvent = events[0] // Assuming the first event is featured

  return (
    <div className="bg-white">
      {/* Hero section with featured event */}
      <div className="relative">
        <div className="mx-auto max-w-7xl">
          <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
            <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
                <div className="hidden sm:mb-10 sm:flex">
                  <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-inset ring-gray-900/10 hover:ring-gray-900/20">
                    Upcoming Featured Event
                  </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Community Events
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Join us for cultural celebrations, networking opportunities, and community gatherings.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    href="/events/create"
                    className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                  >
                    Create Event
                  </Link>
                  <Link href="#browse" className="text-sm font-semibold leading-6 text-gray-900">
                    Browse Events <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="relative h-96 lg:h-full">
            {featuredEvent?.image && (
              <Image
                src={featuredEvent.image}
                alt={featuredEvent.title}
                fill
                className="aspect-[3/2] w-full object-cover lg:aspect-auto lg:h-full lg:w-full"
              />
            )}
          </div>
        </div>
      </div>

      {/* Category filters */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center space-x-4 py-8">
          {categories.map((category) => (
            <button
              key={category.value}
              className="rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-100"
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {events.map((event: Event) => (
            <article key={event._id?.toString() || event.createdAt.toString()} className="flex flex-col items-start justify-between">
              <div className="relative w-full">
                <div className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]">
                  {event.image && (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="rounded-2xl object-cover"
                    />
                  )}
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={event.date.toISOString()} className="text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {event.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/events/${event._id}`}>
                      <span className="absolute inset-0" />
                      {event.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{event.description}</p>
                </div>
                <div className="mt-4 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      {event.location}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8">
        <svg
          className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1d4240dd-898f-445f-932d-e2872fd12de3"
              width={200}
              height={200}
              x="50%"
              y={0}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={0} className="overflow-visible fill-gray-50">
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect width="100%" height="100%" strokeWidth={0} fill="url(#1d4240dd-898f-445f-932d-e2872fd12de3)" />
        </svg>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Host Your Own Event
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Share your knowledge, celebrate culture, or bring the community together. Create and host your own event today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/events/create"
              className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Create Event
            </Link>
            <Link href="/events/guidelines" className="text-sm font-semibold leading-6 text-gray-900">
              Event Guidelines <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
