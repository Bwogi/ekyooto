import { NextResponse } from 'next/server';
import { db } from '../../../firebase/admin';

export async function POST(request: Request) {
  try {
    const { token, userId } = await request.json();

    if (!token || !userId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store the token in Firestore
    await db.collection('notificationTokens').doc(userId).set({
      token,
      updatedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error registering notification token:', error);
    return NextResponse.json(
      { error: 'Failed to register notification token' },
      { status: 500 }
    );
  }
}
