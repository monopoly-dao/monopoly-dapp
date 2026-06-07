'use client';

import Link from 'next/link';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetPropertiesQuery } from '@/api/properties';

import TrendingPropertyCard from './TrendingPropertyCard';

const fallbackMarkets = [
  {
    _id: 'market-portugal',
    propertyDetails: {
      stateOrProvince: 'Lisbon',
      country: 'Portugal',
      photos: [{ url: '/images/landing-banner.png' }],
    },
  },
  {
    _id: 'market-montenegro',
    propertyDetails: {
      stateOrProvince: 'Bay of Kotor',
      country: 'Montenegro',
      photos: [{ url: '/images/own a property.png' }],
    },
  },
  {
    _id: 'market-uae',
    propertyDetails: {
      stateOrProvince: 'Dubai',
      country: 'United Arab Emirates',
      photos: [{ url: '/images/apartment.png' }],
    },
  },
];

export default function Cities() {
  const {
    data: propertiesResponse,
    isLoading,
    isError,
  } = useGetPropertiesQuery({
    limit: 3,
    page: 5,
  });

  const apiProperties = propertiesResponse?.data ?? [];
  const shouldUseFallback = isError || apiProperties.length === 0;
  const properties = shouldUseFallback ? fallbackMarkets : apiProperties;

  return (
    <div className='flex flex-col gap-6 sm:gap-12'>
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='text-3xl sm:text-4xl'>Where assets meet capital</h2>
          <p className='mt-5 w-full sm:w-4/5'>
            Discover markets where asset owners, buyers, and liquidity
            providers can meet around structured real-asset opportunities.
          </p>
        </div>
        <Link
          href='/listings'
          className='text-black flex font-medium items-center gap-2 underline whitespace-nowrap'
        >
          View All
          {/* <IoIosArrowForward /> */}
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
        <ListingCardLoader
          isLoading={isLoading && !shouldUseFallback}
          cardNumber={3}
        />
        {properties?.map((property) => (
          <TrendingPropertyCard
            key={property._id}
            image={property.propertyDetails.photos[0].url}
            caption={`${property.propertyDetails.stateOrProvince}, ${property.propertyDetails.country}`}
            propertyId={property._id}
          />
        ))}
      </div>
    </div>
  );
}
