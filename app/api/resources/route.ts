import { NextResponse } from 'next/server'
import clientPromise from '../../lib/mongodb'
import { Resource } from '../../models/types'
import { ObjectId, Document } from 'mongodb'

interface ResourceWithId extends Document {
  _id: ObjectId;
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("ekyooto")
    
    const resourcesCollection = await db
      .collection("resources")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    const resources: Resource[] = resourcesCollection.map(doc => ({
      _id: new ObjectId(doc._id),
      title: doc.title as string,
      description: doc.description as string,
      category: doc.category as 'business' | 'healthcare' | 'education' | 'legal' | 'housing',
      contact: doc.contact as string | undefined,
      website: doc.website as string | undefined,
      location: doc.location as string | undefined,
      createdAt: new Date(doc.createdAt)
    }))

    // Convert ObjectIds to strings for JSON serialization
    const serializedResources = resources.map(resource => ({
      ...resource,
      _id: resource._id.toString()
    }))

    return NextResponse.json(serializedResources)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("ekyooto")
    const body = await request.json()

    const newResource: Omit<ResourceWithId, '_id'> = {
      ...body,
      createdAt: new Date()
    }

    const result = await db.collection("resources").insertOne(newResource)
    
    return NextResponse.json({ 
      message: 'Resource created successfully',
      resourceId: result.insertedId.toString()
    })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 })
  }
}
