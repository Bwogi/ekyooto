import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = [
  '/auth/signin',
  '/auth/signup',
  '/auth/verify-email',
  '/',
  '/about',
];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for session cookie
  const session = request.cookies.get('session');
  if (!session?.value) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/emergency/:path*',
    '/marketplace/:path*',
    '/community/:path*',
    '/events/:path*',
    '/resources/:path*',
  ],
};
