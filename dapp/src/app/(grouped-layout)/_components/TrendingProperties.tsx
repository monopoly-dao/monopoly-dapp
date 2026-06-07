'use client';

import Link from 'next/link';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetPropertiesQuery } from '@/api/properties';

import TrendingPropertyCard from './TrendingPropertyCard';

const fallbackOpportunities = [
  {
    _id: 'asset-vienna-vault',
    propertyDetails: {
      name: 'Vienna Imperial Residence',
      photos: [{ url: '/images/apartment.png' }],
    },
    opportunity: {
      tag: 'Lending Vault',
      terms: 'Owner request with configurable advance rate, pricing, repayment date, and pledged tokens.',
    },
  },
  {
    _id: 'asset-lisbon-loft',
    propertyDetails: {
      name: 'Lisbon Loft Apartments',
      photos: [{ url: '/images/interior1.png' }],
    },
    opportunity: {
      tag: 'Ownership Access',
      terms: 'Tokenized ownership structure with compliance checks and investor access.',
    },
  },
  {
    _id: 'asset-montenegro-lodge',
    propertyDetails: {
      name: 'Montenegro Mountain Lodge',
      photos: [{ url: '/images/Montenegro.png' }],
    },
    opportunity: {
      tag: 'Vault Funding',
      terms: 'LPs review collateral, funding terms, repayment date, and enforcement path.',
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
          <h2 className='text-3xl sm:text-4xl'>Active liquidity structures</h2>
          <p className='mt-5 max-w-2xl text-[#44403C]'>
            Review examples of how assets can be structured for ownership,
            liquidity requests, and vault funding.
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
