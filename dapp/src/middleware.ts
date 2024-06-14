export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/wishlist',
    '/profile',
    '/portfolio',
    // '/((?!api|_next/static|_next/image|favicon.ico|login|signup|forgot-password||favicon|assets|fonts|svg|images|serviceWorker).*)',
  ],
};
