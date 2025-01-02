import Link from 'next/link'

export default function Community() {
  const communityGroups = [
    {
      name: 'Cultural Exchange',
      description: 'Share and celebrate Ugandan traditions, music, dance, and food.',
      icon: '🎭',
      members: 120,
      events: 15
    },
    {
      name: 'Professional Network',
      description: 'Connect with fellow professionals for career growth and mentorship.',
      icon: '💼',
      members: 85,
      events: 8
    },
    {
      name: 'Students Association',
      description: 'Support network for Ugandan students in Boston area universities.',
      icon: '🎓',
      members: 150,
      events: 12
    },
    {
      name: 'Family Support',
      description: 'Resources and support for Ugandan families in Boston.',
      icon: '👨‍👩‍👧‍👦',
      members: 65,
      events: 6
    }
  ]

  const upcomingEvents = [
    {
      name: 'Monthly Community Meetup',
      date: 'January 15, 2024',
      location: 'Boston Common',
      type: 'Social'
    },
    {
      name: 'Career Networking Night',
      date: 'January 22, 2024',
      location: 'WeWork Seaport',
      type: 'Professional'
    },
    {
      name: 'Ugandan Cooking Workshop',
      date: 'January 28, 2024',
      location: 'Community Kitchen',
      type: 'Cultural'
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-purple-100/20 pt-14">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Join Our Community
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with fellow Ugandans in Boston, participate in events, and build lasting friendships.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/auth/signup"
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Join Now
              </Link>
              <Link href="#groups" className="text-sm font-semibold leading-6 text-gray-900">
                View Groups <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="mx-auto mt-8 max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Active Members</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">500+</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Monthly Events</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">15+</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Community Groups</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">8</dd>
          </div>
        </dl>
      </div>

      {/* Community groups section */}
      <div id="groups" className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Community Groups</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join groups that match your interests and connect with like-minded community members.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
          {communityGroups.map((group) => (
            <div
              key={group.name}
              className="flex flex-col gap-8 rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
            >
              <div className="flex items-center gap-x-4">
                <span className="text-4xl">{group.icon}</span>
                <h3 className="text-lg font-semibold leading-8 text-gray-900">{group.name}</h3>
              </div>
              <p className="text-sm leading-6 text-gray-600">{group.description}</p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-600">
                  {group.members} members
                </span>
                <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-600">
                  {group.events} events
                </span>
              </div>
              <Link
                href={`/groups/${group.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-semibold leading-6 text-purple-600"
              >
                Join group <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming events section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Upcoming Events</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join us at our upcoming community events and activities.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {upcomingEvents.map((event) => (
            <div
              key={event.name}
              className="flex flex-col gap-8 rounded-3xl bg-white p-8 ring-1 ring-gray-200"
            >
              <div>
                <span className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-purple-600">
                  {event.type}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-8 text-gray-900">{event.name}</h3>
                <div className="mt-4 flex items-center gap-x-4 text-sm leading-6 text-gray-600">
                  <p>{event.date}</p>
                  <div className="h-1 w-1 rounded-full bg-gray-400" />
                  <p>{event.location}</p>
                </div>
              </div>
              <Link
                href={`/events/${event.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm font-semibold leading-6 text-purple-600"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter section */}
      <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-24 xl:py-32">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Stay Updated
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
            Subscribe to our newsletter for community updates, event announcements, and more.
          </p>
          <form className="mx-auto mt-10 flex max-w-md gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Subscribe
            </button>
          </form>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
