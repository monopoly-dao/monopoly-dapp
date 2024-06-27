'use client';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetPropertiesQuery } from '@/api/properties';

import TrendingPropertyCard from '../../_components/TrendingPropertyCard';

export default function YouMightAlsoLike() {
  const { data: propertiesResponse, isLoading } = useGetPropertiesQuery({
    limit: 3,
    page: 6,
  });

  const properties = propertiesResponse?.data;

  return (
    <div className='flex flex-col gap-6 sm:gap-12 bg-white py-12 sm:py-20 lg:py-28'>
      <div className='flex justify-between items-start'>
        <h2 className='font-medium text-3xl sm:text-4xl'>
          You Might Also Like
        </h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
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
