'use client';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetPropertiesQuery } from '@/api/properties';

import InvestmentPropertyCard from '../campaign/_components/InvestmentPropertyCard';

export default function Page() {
  const {
    data: propertiesResponse,
    isLoading,
    isFetching,
  } = useGetPropertiesQuery({
    limit: 12,
    page: 1,
  });
  const properties = propertiesResponse?.data;

  return (
    <section>
      <div className='mt-10 mb-20 flex flex-col gap-6 px-[5%] sm:px-[7%] text-center items-center'>
        <h1 className='!font-roboto font-medium text-[24px] w-full leading-[35px] sm:leading-[45px] lg:leading-[60px] sm:text-[34px] lg:text-[54px]'>
          Build your Portfolio
        </h1>
        <p className='text-dark-grey font-merriweather w-[90%] sm:w-4/5 lg:w-3/5'>
          Find Curated properties in the world's most desirable locations.
        </p>
      </div>

      <div className='my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8 px-[5%]'>
        <ListingCardLoader
          cardNumber={12}
          isLoading={isLoading || isFetching}
        />
        {properties?.map((property) => (
          <InvestmentPropertyCard
            key={property._id}
            property={property}
            width='variable'
            link
          />
        ))}
      </div>
    </section>
  );
}
