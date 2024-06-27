'use client';

import Link from 'next/link';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetPropertiesQuery } from '@/api/properties';

import TrendingPropertyCard from './TrendingPropertyCard';

export default function Cities() {
  const { data: propertiesResponse, isLoading } = useGetPropertiesQuery({
    limit: 3,
    page: 5,
  });

  const properties = propertiesResponse?.data;

  return (
    <div className='flex flex-col gap-6 sm:gap-12'>
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='text-3xl sm:text-4xl'>Explore Cities</h2>
          <p className='mt-5 w-full sm:w-4/5'>
            Discover the cities with the most sought after properties and asset
            owners right now.
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
        <ListingCardLoader isLoading={isLoading} cardNumber={3} />
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
