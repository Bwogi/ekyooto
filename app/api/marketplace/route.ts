import { NextResponse } from 'next/server'
import clientPromise from '../../lib/mongodb'
import { MarketplaceListing } from '../../models/types'
import { ObjectId, Document } from 'mongodb'

interface ListingWithId extends Document {
  _id: ObjectId;
  seller: ObjectId;
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("ekyooto")
    
    const listingsCollection = await db
      .collection("marketplace")
      .find({ status: 'available' })
      .sort({ createdAt: -1 })
      .toArray()

    const listings: MarketplaceListing[] = listingsCollection.map(doc => ({
      _id: new ObjectId(doc._id),
      title: doc.title as string,
      description: doc.description as string,
      price: doc.price as number,
      category: doc.category as 'cultural' | 'food' | 'services' | 'general',
      seller: new ObjectId(doc.seller),
      image: doc.image as string | undefined,
      status: doc.status as 'available' | 'sold',
      createdAt: new Date(doc.createdAt)
    }))

    // Convert ObjectIds to strings for JSON serialization
    const serializedListings = listings.map(listing => ({
      ...listing,
      _id: listing._id.toString(),
      seller: listing.seller.toString()
    }))

    return NextResponse.json(serializedListings)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch listings' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("ekyooto")
    const body = await request.json()

    const newListing: Omit<ListingWithId, '_id'> = {
      ...body,
      seller: new ObjectId(body.seller),
      status: 'available',
      createdAt: new Date()
    }

    const result = await db.collection("marketplace").insertOne(newListing)
    
    return NextResponse.json({ 
      message: 'Listing created successfully',
      listingId: result.insertedId.toString()
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create listing' }, { status: 500 })
  }
}
