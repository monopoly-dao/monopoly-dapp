import { Metadata } from 'next';
import { Darker_Grotesque, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import { getServerSession } from 'next-auth';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

import { siteConfig } from '@/constants/config';

import { authOptions } from './_lib/auth';
import { NextAuthProvider } from '../components/next-auth-provider';
import { ReduxProvider } from '../components/redux-provider';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'Settley',
    template: `${siteConfig.title} | %s`,
  },
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
    creator: '@mubaraq__',
  },
  keywords: [
    'Settley',
    'SettleyCo',
    'settleyco',
    'Settley Co',
    'MonopolyDAO',
    'Monopoly DAO',
    'MDAO',
    'Properties',
    'Fractions',
    'Property Ownership',
    'Ownership',
    'Property Fractions',
    'Settley Properties',
  ],
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

const ppNeueMontreal = localFont({
  src: [
    {
      path: '../../public/fonts/NeueMontreal-Light.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NeueMontreal-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NeueMontreal-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/NeueMontreal-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-neue-montreal',
  display: 'swap',
  preload: true,
});

const craftworkGrotesk = localFont({
  src: [
    {
      path: '../../public/fonts/CraftworkGrotesk-Regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-craft',
  display: 'swap',
  preload: true,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html
      lang='en'
      className={`${darkerGrotesque.variable} ${inter.variable} ${ppNeueMontreal.variable} ${craftworkGrotesk.variable}`}
    >
      <body>
        <NextAuthProvider session={session}>
          <ReduxProvider>
            <NextTopLoader color='#272343' />
            {children}
            <Toaster position='top-right' />
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
