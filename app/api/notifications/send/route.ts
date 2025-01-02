import { NextResponse } from 'next/server';
import { messaging } from '../../../firebase/admin';

export async function POST(request: Request) {
  try {
    const { token, notification } = await request.json();

    if (!token || !notification) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send the notification
    await messaging.send({
      token,
      notification,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending notification:', error);
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    );
  }
}
