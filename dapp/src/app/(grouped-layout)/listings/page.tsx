'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import CardPaginationContainer from '@/components/CardPaginationContainer';
import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetPropertiesQuery, useGetWishlistQuery } from '@/api/properties';

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

  return (
    <div>
      <ListingsHeader />

      <div className='mt-16 sm:mt-28 mb-16 sm:mb-32 px-[5%]'>
        <section className='mb-12 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 border border-[#D6D3D1] rounded-[8px] p-6 sm:p-8 bg-white'>
          <div>
            <p className='text-sm uppercase tracking-[0.14em] text-[#57534E] mb-3'>
              What you are looking at
            </p>
            <h2 className='font-medium text-2xl sm:text-3xl text-[#1C1917]'>
              Each listing starts with a property. The opportunity depends on
              the structure.
            </h2>
            <p className='mt-5 text-[#44403C]'>
              Some listings are for buying property tokens. Some may support a
              vault where lenders fund a loan backed by pledged property tokens.
              The property page is where you review the asset, documents, tokens
              available, and terms.
            </p>
          </div>
          <div className='bg-cream rounded-[8px] p-5 flex flex-col justify-between gap-5'>
            <div>
              <h3 className='font-medium text-xl text-[#1C1917]'>
                New to Settley vaults?
              </h3>
              <p className='mt-3 text-[#44403C]'>
                Learn how owners raise, buyers buy tokens, and lenders review
                collateral before funding.
              </p>
            </div>
            <Link
              href='/vaults'
              className='text-navy font-medium underline underline-offset-4'
            >
              See how vaults work
            </Link>
          </div>
        </section>

        <div className='flex flex-col lg:flex-row gap-3 justify-between items-start mb-16'>
          <h2 className='font-medium text-3xl sm:text-4xl'>
            Available Property Opportunities
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
