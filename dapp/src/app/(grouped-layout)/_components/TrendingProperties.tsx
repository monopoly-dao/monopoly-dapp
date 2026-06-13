'use client';

import Link from 'next/link';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetPropertiesQuery } from '@/api/properties';

import TrendingPropertyCard from './TrendingPropertyCard';

const fallbackProperties = [
  {
    image: '/images/mykonos-2.jpg',
    caption: 'Coastal Villa',
    location: 'Mykonos, Greece',
  },
  {
    image: '/images/apartment buildings.jpg',
    caption: 'Urban Apartments',
    location: 'Dubai, UAE',
  },
  {
    image: '/images/Monaco.png',
    caption: 'City Residence',
    location: 'Monaco',
  },
];

export default function TrendingProperties() {
  const { data: propertiesResponse, isLoading } = useGetPropertiesQuery({
    limit: 3,
    page: 1,
  });

  const properties = propertiesResponse?.data;
  const hasProperties = Boolean(properties?.length);

  return (
    <div className='flex flex-col gap-6 sm:gap-12 bg-white py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'>
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='text-3xl sm:text-4xl'>Properties on Settley</h2>
          <p className='mt-4 max-w-[620px] text-dark-grey'>
            Browse properties with documented ownership terms, raise details,
            and clear status before you commit.
          </p>
        </div>
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
            location={[
              property.propertyDetails.stateOrProvince,
              property.propertyDetails.country,
            ]
              .filter(Boolean)
              .join(', ')}
            propertyId={property._id}
          />
        ))}
        {!isLoading &&
          !hasProperties &&
          fallbackProperties.map((property) => (
            <TrendingPropertyCard key={property.caption} {...property} />
          ))}
      </div>
    </div>
  );
}
