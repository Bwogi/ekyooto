'use client'

import { useEffect, useState } from 'react'
import { Resource } from '../models/types'
import ResourceCard from '../components/ResourceCard'
import Link from 'next/link'

interface SerializedResource extends Omit<Resource, '_id'> {
  _id: string;
}

const categories = [
  { name: 'All Resources', value: 'all' },
  { name: 'Business', value: 'business', description: 'Resources for entrepreneurs and business owners' },
  { name: 'Healthcare', value: 'healthcare', description: 'Medical and wellness resources' },
  { name: 'Education', value: 'education', description: 'Learning and academic support' },
  { name: 'Legal', value: 'legal', description: 'Legal aid and consultation' },
  { name: 'Housing', value: 'housing', description: 'Housing assistance and information' },
]

export default function ResourcesPage() {
  const [resources, setResources] = useState<SerializedResource[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('/api/resources')
        const data = await response.json()
        setResources(data)
      } catch (error) {
        console.error('Error fetching resources:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResources()
  }, [])

  const filteredResources = filter === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === filter)

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-purple-100/20">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Community Resources
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Access valuable resources and support services available to our Ugandan community in Boston.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="#"
                onClick={() => {/* Implement add resource modal */}}
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Add Resource
              </Link>
              <Link href="#browse" className="text-sm font-semibold leading-6 text-gray-900">
                Browse Resources <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>

      {/* Category section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12" id="browse">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Categories</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Browse resources by category or view all available resources.
          </p>
        </div>
        
        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {categories.filter(cat => cat.value !== 'all').map((category) => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`relative flex flex-col gap-2 rounded-2xl p-6 ring-1 ring-inset transition-all hover:bg-gray-50 ${
                filter === category.value
                  ? 'bg-purple-50 ring-purple-600'
                  : 'ring-gray-200'
              }`}
            >
              <h3 className={`text-lg font-semibold ${
                filter === category.value ? 'text-purple-600' : 'text-gray-900'
              }`}>
                {category.name}
              </h3>
              <p className="text-sm text-gray-600">{category.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Resources grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {filter === 'all' ? 'All Resources' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Resources`}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {filteredResources.length} resources available
            </p>
          </div>
          <button
            onClick={() => setFilter('all')}
            className={`text-sm font-medium ${
              filter === 'all'
                ? 'text-gray-400 cursor-default'
                : 'text-purple-600 hover:text-purple-500'
            }`}
            disabled={filter === 'all'}
          >
            Clear filter
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {filteredResources.map((resource) => (
              <ResourceCard key={resource._id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No resources found</h3>
            <p className="mt-1 text-sm text-gray-500">
              No resources are currently available in this category.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setFilter('all')}
                className="text-sm font-semibold text-purple-600 hover:text-purple-500"
              >
                View all resources
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
