import { Metadata } from 'next';
import Script from 'next/script';

import { siteConfig } from '@/constants/config';

import ListingsClient from './ListingsClient';

export const metadata: Metadata = {
  title: 'Available Properties | Buy Property Tokens',
  description:
    'Browse properties where you may be able to buy tokens, track ownership exposure, or understand the collateral behind a future vault.',
  keywords: [
    'Settley',
    'Listings',
    'Real Estate',
    'Property Tokens',
    'Asset Ownership',
    'Invest in Property',
  ],
  openGraph: {
    title: 'Settley Available Properties',
    description: 'Explore tokenized property opportunities globally.',
    url: `${siteConfig.url}/listings`,
    type: 'website',
  },
};

export default function Page() {
  const listingsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Settley Available Properties',
    description:
      'A collection of properties available for tokenized ownership and future vault context.',
    url: `${siteConfig.url}/listings`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: 0, // Dynamic value if possible, simplified here
      itemListElement: [] // Simplified; detailed in client component or dynamic fetch
    },
  };

  return (
    <div>
      <Script
        id='listings-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingsSchema) }}
      />
      <ListingsClient />
    </div>
  );
}
