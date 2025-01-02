import { SerializedMarketplaceListing } from '../models/types'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { name: 'All', value: 'all' },
  { name: 'Food & Drinks', value: 'food' },
  { name: 'Crafts', value: 'crafts' },
  { name: 'Services', value: 'services' },
  { name: 'Cultural Items', value: 'cultural' },
]

async function getListings() {
  const res = await fetch('http://localhost:3000/api/marketplace', { 
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) {
    throw new Error('Failed to fetch listings')
  }
  return res.json()
}

export default async function Marketplace() {
  const listings = await getListings()

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-purple-100/20">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Community Marketplace
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover authentic Ugandan products and services from our community members.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/marketplace/create"
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Create Listing
              </Link>
              <Link href="#browse" className="text-sm font-semibold leading-6 text-gray-900">
                Browse Items <span aria-hidden="true">→</span>
              </Link>
            </div>
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

      {/* Product grid */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {listings.map((listing: SerializedMarketplaceListing) => (
            <Link key={listing._id} href={`/marketplace/${listing._id}`} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                {listing.image && (
                  <Image
                    src={listing.image}
                    alt={listing.title}
                    fill
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-sm text-gray-700">{listing.title}</h3>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-lg font-medium text-gray-900">${listing.price}</p>
                  <span className="inline-flex items-center rounded-full bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700">
                    {listing.category}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{listing.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
