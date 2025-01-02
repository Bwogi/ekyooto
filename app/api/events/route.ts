import { NextResponse } from 'next/server'
import clientPromise from '../../lib/mongodb'
import { Event } from '../../models/types'
import { ObjectId, Document } from 'mongodb'

interface EventWithId extends Document {
  _id: ObjectId;
  organizer: ObjectId;
  attendees?: ObjectId[];
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("togetherug")
    
    const eventsCollection = await db.collection("events").find({}).toArray()
    const events: Event[] = eventsCollection.map(doc => ({
      _id: new ObjectId(doc._id),
      title: doc.title as string,
      description: doc.description as string,
      date: new Date(doc.date),
      location: doc.location as string,
      category: doc.category as 'cultural' | 'religious' | 'social' | 'educational',
      organizer: doc.organizer as ObjectId,
      attendees: doc.attendees as ObjectId[],
      image: doc.image as string | undefined,
      createdAt: new Date(doc.createdAt)
    }))

    const eventsWithId = events.map(event => ({
      ...event,
      _id: event._id.toString(),
      organizer: event.organizer.toString(),
      attendees: event.attendees?.map((id: ObjectId) => id.toString())
    }))

    return NextResponse.json(eventsWithId)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("togetherug")
    const body = await request.json()

    // Convert string IDs to ObjectIds
    const newEvent: EventWithId = {
      ...body,
      organizer: new ObjectId(body.organizer),
      attendees: body.attendees?.map((id: string) => new ObjectId(id)),
      createdAt: new Date(),
      date: new Date(body.date)
    }

    const result = await db.collection("events").insertOne(newEvent)
    
    return NextResponse.json({ 
      message: 'Event created successfully',
      eventId: result.insertedId.toString()
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}
