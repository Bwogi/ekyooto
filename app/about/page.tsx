import Image from 'next/image'
import Link from 'next/link'

export default function About() {
  const teamMembers = [
    {
      name: 'Sarah Nakato',
      role: 'Community Lead',
      image: '/team/sarah.jpg',
      bio: 'Born and raised in Kampala, Sarah brings her passion for community building to Boston.'
    },
    {
      name: 'David Mugisha',
      role: 'Events Coordinator',
      image: '/team/david.jpg',
      bio: 'With 5 years of event planning experience, David creates unforgettable cultural experiences.'
    },
    {
      name: 'Grace Auma',
      role: 'Resource Manager',
      image: '/team/grace.jpg',
      bio: 'Grace connects community members with essential resources and opportunities.'
    }
  ]

  const values = [
    {
      title: 'Community First',
      description: 'We prioritize the needs and well-being of our community members above all else.'
    },
    {
      title: 'Cultural Preservation',
      description: 'We actively work to preserve and share Ugandan culture with future generations.'
    },
    {
      title: 'Mutual Support',
      description: 'We believe in lifting each other up and creating opportunities for collective success.'
    },
    {
      title: 'Innovation',
      description: 'We embrace new ideas and technologies to better serve our community.'
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate -z-10">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                About ekyooto Boston
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Building a vibrant Ugandan community in Boston through connection, culture, and mutual support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <div className="mx-auto mt-8 max-w-7xl px-6 sm:mt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-xl leading-8 text-gray-600">
                ekyooto Boston aims to create a strong, supportive community for Ugandans living in the Greater Boston area. 
                We strive to preserve our cultural heritage while fostering meaningful connections and providing resources for 
                personal and professional growth.
              </p>
              <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                <p>
                  Through our platform, we facilitate cultural events, networking opportunities, and resource sharing. We believe 
                  that by coming together, we can create a home away from home for all Ugandans in Boston.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Values</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            These core values guide everything we do at ekyooto Boston.
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title}>
              <dt className="font-semibold text-gray-900">{value.title}</dt>
              <dd className="mt-1 text-gray-600">{value.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Team section */}
      <div className="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Team</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Meet the dedicated individuals working to build and strengthen our community.
          </p>
        </div>
        <ul role="list" className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {teamMembers.map((person) => (
            <li key={person.name}>
              <div className="relative h-56 w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-8 text-gray-900">{person.name}</h3>
              <p className="text-base leading-7 text-purple-600">{person.role}</p>
              <p className="mt-4 text-base leading-7 text-gray-600">{person.bio}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA section */}
      <div className="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Join Our Community
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Be part of something special. Connect with fellow Ugandans in Boston and help build a stronger community.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/auth/signup"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get started
            </Link>
            <Link href="/contact" className="text-sm font-semibold leading-6 text-white">
              Contact us <span aria-hidden="true">→</span>
            </Link>
          </div>
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
