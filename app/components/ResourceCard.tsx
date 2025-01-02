import { Resource } from '../models/types'
import Link from 'next/link'

interface SerializedResource extends Omit<Resource, '_id'> {
  _id: string;
}

interface ResourceCardProps {
  resource: SerializedResource
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      business: 'bg-blue-100 text-blue-800',
      healthcare: 'bg-green-100 text-green-800',
      education: 'bg-yellow-100 text-yellow-800',
      legal: 'bg-red-100 text-red-800',
      housing: 'bg-purple-100 text-purple-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{resource.title}</h3>
        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(resource.category)}`}>
          {resource.category}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{resource.description}</p>
      
      <div className="space-y-2">
        {resource.location && (
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {resource.location}
          </div>
        )}
        
        {resource.contact && (
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {resource.contact}
          </div>
        )}
        
        {resource.website && (
          <Link 
            href={resource.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-purple-600 hover:text-purple-800"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visit Website
          </Link>
        )}
      </div>
    </div>
  )
}

export default ResourceCard
