import { MarketplaceListing } from '../models/types'
import Image from 'next/image'

interface SerializedMarketplaceListing extends Omit<MarketplaceListing, '_id' | 'seller'> {
  _id: string;
  seller: string;
}

interface MarketplaceCardProps {
  listing: SerializedMarketplaceListing
}

const MarketplaceCard = ({ listing }: MarketplaceCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {listing.image && (
        <div className="relative h-48 w-full">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{listing.title}</h3>
            <p className="text-purple-600 font-semibold">${listing.price.toFixed(2)}</p>
          </div>
          <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            {listing.category}
          </span>
        </div>
        
        <p className="mt-2 text-gray-600">{listing.description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <button 
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            onClick={() => {/* Implement contact seller logic */}}
          >
            Contact Seller
          </button>
          
          <span className="text-sm text-gray-500">
            Posted {new Date(listing.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default MarketplaceCard
