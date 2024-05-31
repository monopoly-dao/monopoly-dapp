import { Metadata } from 'next';
import { Darker_Grotesque, Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

import { siteConfig } from '@/constants/config';

import { authOptions } from './_lib/auth';
import { NextAuthProvider } from '../components/next-auth-provider';
import { ReduxProvider } from '../components/redux-provider';

export const metadata: Metadata = {
  title: siteConfig.title,
  applicationName: siteConfig.title,
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.png`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.png`],
  },
  authors: [
    {
      // name: 'Product Studio HQ',
      // url: 'https://theproductstudiohq.com',
    },
  ],
};

const darkerGrotesque = Darker_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dark-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en' className={`${darkerGrotesque.variable} ${inter.variable}`}>
      <body>
        <NextAuthProvider session={session}>
          <ReduxProvider>
            <main>{children}</main>
            <Toaster position='top-right' />
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
