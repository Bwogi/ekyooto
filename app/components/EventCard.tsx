import { Event } from '../models/types'
import Image from 'next/image'
import Link from 'next/link'

interface SerializedEvent extends Omit<Event, '_id' | 'organizer' | 'attendees'> {
  _id: string;
  organizer: string;
  attendees?: string[];
}

interface EventCardProps {
  event: SerializedEvent
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {event.image && (
        <div className="relative h-48 w-full">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <div className="uppercase tracking-wide text-sm text-purple-500 font-semibold">
          {event.category}
        </div>
        <Link href={`/events/${event._id}`} className="block mt-1">
          <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
        </Link>
        <p className="mt-2 text-gray-500">{event.description}</p>
        <div className="mt-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventCard
