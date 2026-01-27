import { Metadata } from 'next';
import Script from 'next/script';
import { siteConfig } from '@/constants/config';
import ListingsClient from './ListingsClient';

export const metadata: Metadata = {
  title: 'Real Estate Listings | Buy Shared Property Fractions',
  description: 'Browse available properties from around the world. Start owning high-yield real estate fractions for as low as $1.',
  keywords: [
    'Settley',
    'Listings',
    'Real Estate',
    'Property Fractions',
    'Asset Ownership',
    'Invest in Property',
  ],
  openGraph: {
    title: 'Settley Property Listings',
    description: 'Explore premium real estate opportunities globally.',
    url: `${siteConfig.url}/listings`,
    type: 'website',
  },
};

export default function Page() {
  const listingsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Settley Property Listings',
    description: 'A collection of real estate properties available for fractional ownership.',
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
