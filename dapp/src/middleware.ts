export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/wishlist',
    '/dashboard',
    '/dashboard/bookmarks',
    '/dashboard/transactions',
    '/dashboard/settings',
    '/portfolio',
    // '/((?!api|_next/static|_next/image|favicon.ico|login|signup|forgot-password||favicon|assets|fonts|svg|images|serviceWorker).*)',
  ],
};
