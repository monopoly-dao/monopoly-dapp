'use client';

import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useSession } from 'next-auth/react';

import CardPaginationContainer from '@/components/CardPaginationContainer';
import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetPropertiesQuery, useGetWishlistQuery } from '@/api/properties';
import { siteConfig } from '@/constants/config';

import ListingCard from './_components/ListingCard';
import ListingsHeader from './_components/ListingsHeader';
import PropertiesFilter from './_components/PropertiesFIlter';

// export const metadata: Metadata = {
//   title: 'Property Listings',
//   keywords: [
//     'Settley',
//     'Listings',
//     'Settley Listings',
//     'Settley Properties',
//     'Property Listings',
//     'SettleyCo',
//     'Settley co',
//   ],
// };

export default function Page() {
  const session = useSession();
  const isLoggedIn = session.data;
  const userFirebaseId = session.data?.userFirebaseId ?? '';

  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const {
    data: propertiesResponse,
    isLoading,
    isFetching,
  } = useGetPropertiesQuery({
    limit: 12,
    page,
  });
  const properties = propertiesResponse?.data;

  const { data: wishlistResponse } = useGetWishlistQuery(userFirebaseId ?? '', {
    skip: !isLoggedIn,
  });
  const wishlist = wishlistResponse?.data?.wishlist;
  const wishlistPropertyIds = wishlist?.map((item) => item._id);

  const listingsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage', // Or ItemList if you want to list individual properties
    name: 'Settley Property Listings',
    description: 'Browse our wide selection of properties for sale.',
    url: `${siteConfig.url}/listings`,
    keywords: [
      'Settley',
      'Listings',
      'Settley Listings',
      'Settley Properties',
      'Property Listings',
      'SettleyCo',
      'Settley co',
      'settle',
      'settley',
    ],
    // If you want to list individual properties (more complex):
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: properties?.map((property, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'RealEstateListing', // Or Property if RealEstateListing isn't appropriate
          name: property.propertyDetails.name,
          description: property.propertyDetails.description,
          url: `${siteConfig.url}/listings/${property._id}`, // Assuming you have individual property pages
          // Add more property details here
        },
      })),
    },
  };

  return (
    <div>
      <Script
        id='listings-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listingsSchema) }}
      />

      <ListingsHeader />

      <div className='mt-16 sm:mt-28 mb-16 sm:mb-32 px-[5%]'>
        <div className='flex flex-col lg:flex-row gap-3 justify-between items-start mb-16'>
          <h2 className='font-medium text-3xl sm:text-4xl'>
            Popular Properties
          </h2>
          <PropertiesFilter />
        </div>

        <CardPaginationContainer
          totalPages={propertiesResponse?.meta.totalPages}
        >
          <div className='my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
            <ListingCardLoader
              cardNumber={12}
              isLoading={isLoading || isFetching}
            />
            {properties?.map((property) => (
              <ListingCard
                key={property._id}
                property={property}
                wishlist={wishlistPropertyIds}
              />
            ))}
          </div>
        </CardPaginationContainer>
      </div>
    </div>
  );
}
