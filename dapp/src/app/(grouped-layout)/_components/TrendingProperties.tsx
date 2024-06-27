'use client';

import Link from 'next/link';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetPropertiesQuery } from '@/api/properties';

import TrendingPropertyCard from './TrendingPropertyCard';

export default function TrendingProperties() {
  const { data: propertiesResponse, isLoading } = useGetPropertiesQuery({
    limit: 3,
    page: 1,
  });

  const properties = propertiesResponse?.data;

  return (
    <div className='flex flex-col gap-6 sm:gap-12 bg-white py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'>
      <div className='flex justify-between items-start'>
        <h2 className='text-3xl sm:text-4xl'>Trending Properties</h2>
        <Link
          href='/listings'
          className='text-black flex font-medium items-center gap-2 underline'
        >
          View All
          {/* <IoIosArrowForward /> */}
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
        <ListingCardLoader isLoading={isLoading} cardNumber={3} />
        {properties?.map((property) => (
          <TrendingPropertyCard
            key={property._id}
            image={property.propertyDetails.photos[0].url}
            caption={property.propertyDetails.name}
            propertyId={property._id}
          />
        ))}
      </div>
    </div>
  );
}
