'use client';

import Link from 'next/link';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetPropertiesQuery } from '@/api/properties';

import TrendingPropertyCard from './TrendingPropertyCard';

const fallbackOpportunities = [
  {
    _id: 'asset-lisbon-loft',
    propertyDetails: {
      name: 'Lisbon Loft Apartments',
      photos: [{ url: '/images/interior1.png' }],
    },
    opportunity: {
      tag: 'Ownership Access',
      terms: 'Buyers can own part of the property with clear documents and rights.',
    },
  },
  {
    _id: 'asset-montenegro-lodge',
    propertyDetails: {
      name: 'Montenegro Mountain Lodge',
      photos: [{ url: '/images/Montenegro.png' }],
    },
    opportunity: {
      tag: 'Property Loan',
      terms: 'Lenders can fund a loan and accept the property tokens as collateral.',
    },
  },
  {
    _id: 'asset-vienna-vault',
    propertyDetails: {
      name: 'Vienna Imperial Residence',
      photos: [{ url: '/images/apartment.png' }],
    },
    opportunity: {
      tag: 'Owner Borrowing',
      terms: 'Owners can choose how much to borrow, the rate, and repayment date.',
    },
  },
];

export default function TrendingProperties() {
  const {
    data: propertiesResponse,
    isLoading,
    isError,
  } = useGetPropertiesQuery({
    limit: 3,
    page: 1,
  });

  const apiProperties = propertiesResponse?.data ?? [];
  const shouldUseFallback = isError || apiProperties.length === 0;
  const properties = shouldUseFallback ? fallbackOpportunities : apiProperties;

  return (
    <div className='flex flex-col gap-6 sm:gap-12 bg-white py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'>
      <div id='opportunities' className='flex justify-between items-start'>
        <div>
          <h2 className='text-3xl sm:text-4xl'>Ways to participate</h2>
          <p className='mt-5 max-w-2xl text-[#44403C]'>
            Own part of a property, lend against one, or bring a property to
            market for buyers and lenders.
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
        <ListingCardLoader
          isLoading={isLoading && !shouldUseFallback}
          cardNumber={3}
        />
        {properties?.map((property) => (
          <TrendingPropertyCard
            key={property._id}
            image={property.propertyDetails.photos[0].url}
            caption={property.propertyDetails.name}
            propertyId={property._id}
            tag={'opportunity' in property ? property.opportunity.tag : undefined}
            terms={
              'opportunity' in property ? property.opportunity.terms : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
