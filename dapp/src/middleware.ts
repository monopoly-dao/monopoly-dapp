import { NextResponse } from 'next/server';
import withAuth from 'next-auth/middleware';

export default withAuth(
  async function middleware(req) {
    if (
      (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '') &&
      req.nextauth.token?.data.userFirebaseId
    ) {
      return NextResponse.redirect(new URL('/home', req.url));
    }

    if (
      req.nextUrl.pathname === '/home' &&
      !req.nextauth.token?.data.userFirebaseId
    ) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname === '/' || req.nextUrl.pathname === '/home') {
          return true; // Allow access to / for everyone
        }
        return !!token; // Require authentication for other routes
      },
    },
  }
);

export const config = {
  matcher: [
    '/wishlist',
    '/dashboard',
    '/wishlist',
    '/transactions',
    '/settings',
    '/portfolio',
    '/my-properties',
    '/',
    '/home',
    // '/((?!api|_next/static|_next/image|favicon.ico|login|signup|forgot-password||favicon|assets|fonts|svg|images|serviceWorker).*)',
  ],
};
