import { NextResponse } from 'next/server';
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getMessaging } from 'firebase-admin/messaging';

// Initialize Firebase Admin if not already initialized
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = getFirestore();
const messaging = getMessaging();

export async function POST(request: Request) {
  try {
    const { title, description, category, location } = await request.json();
    
    // Validate input
    if (!title || !description || !category || !location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store the emergency request in Firestore
    const docRef = await db.collection('emergencyRequests').add({
      title,
      description,
      category,
      location,
      createdAt: new Date().toISOString(),
    });

    // Send notification to all users
    try {
      await messaging.send({
        notification: {
          title: `New ${category} Emergency Request`,
          body: description.substring(0, 100) + '...',
        },
        data: {
          requestId: docRef.id,
          category: category,
        },
        topic: 'emergencies', // Send to users subscribed to 'emergencies' topic
      });
    } catch (error) {
      console.error('Error sending notification:', error);
      // Continue even if notification fails
    }

    return NextResponse.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error creating emergency request:', error);
    return NextResponse.json(
      { error: 'Failed to create emergency request' },
      { status: 500 }
    );
  }
}
