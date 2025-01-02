import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { NextResponse } from 'next/server';

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
};

if (getApps().length === 0) {
  initializeApp(firebaseAdminConfig);
}

export async function POST(request: Request) {
  try {
    const { idToken } = await request.json();
    const auth = getAuth();
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });

    return NextResponse.json(
      { sessionCookie },
      {
        status: 200,
        headers: {
          'Set-Cookie': `session=${sessionCookie}; Max-Age=${expiresIn}; Path=/; HttpOnly; Secure; SameSite=Lax`,
        },
      }
    );
  } catch {
    return NextResponse.json(
      { error: 'Unauthorized request' },
      { status: 401 }
    );
  }
}

export async function DELETE() {
  return NextResponse.json(
    { status: 'success' },
    {
      status: 200,
      headers: {
        'Set-Cookie': 'session=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax',
      },
    }
  );
}
