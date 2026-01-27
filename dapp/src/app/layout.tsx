import { Metadata } from 'next';
import {
  Darker_Grotesque,
  Inter,
  Merriweather,
  Playfair_Display,
  Roboto,
} from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';
import { getServerSession } from 'next-auth';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

import TopScrollProvider from '@/components/scroll-provider';

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
    'settle',
    'Settle',
    'settle co',
    'setley',
    'settleco',
    'settley beta',
    'buy property on the blockchain',
    'buy property',
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

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-roboto',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
  variable: '--font-merriweather',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
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

const generalSans = localFont({
  src: [
    {
      path: '../../public/fonts/GeneralSans-Extralight.otf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GeneralSans-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GeneralSans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GeneralSans-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GeneralSans-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/GeneralSans-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-general-sans',
  display: 'swap',
  preload: true,
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    url: siteConfig.url,
    description: siteConfig.description,
    keywords: metadata.keywords,
    // potentialAction: {
    //   '@type': 'SearchAction',
    //   target: `${siteConfig.url}/listings?q={search_term_string}`,
    //   'query-input': 'required name=search_term_string',
    // },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': siteConfig.url
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Articles',
        'item': `${siteConfig.url}/articles`
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Listings',
        'item': `${siteConfig.url}/listings`
      },
      {
        '@type': 'ListItem',
        'position': 4,
        'name': 'Campaign',
        'item': `${siteConfig.url}/campaign`
      }
    ]
  };

  return (
    <html
      lang='en'
      className={`${darkerGrotesque.variable} ${inter.variable} 
                  ${ppNeueMontreal.variable} ${craftworkGrotesk.variable} 
                  ${roboto.variable} ${merriweather.variable} ${generalSans.variable} ${playfairDisplay.variable}`}
    >
      <head>
        <Script
          id='structured-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <Script
          id='breadcrumb-data'
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body>
        <NextAuthProvider session={session}>
          <ReduxProvider>
            <NextTopLoader color='#272343' />
            <TopScrollProvider>{children}</TopScrollProvider>
            <Toaster position='top-right' />
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
