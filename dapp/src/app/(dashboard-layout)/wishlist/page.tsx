'use client';

import { useSession } from 'next-auth/react';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetWishlistQuery } from '@/api/properties';
import ListingCard from '@/app/(grouped-layout)/listings/_components/ListingCard';

import DashboardEmptyState from '../_components/DashboardEmptyState';

export default function Page() {
  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';

  const { data, isLoading } = useGetWishlistQuery(userFirebaseId);

  const { data: wishlistResponse } = useGetWishlistQuery(userFirebaseId ?? '');

  const wishlist = wishlistResponse?.data?.wishlist;
  const wishlistPropertyIds = wishlist?.map((item) => item._id);

  const wishlistProperties = data?.data.wishlist;
  const hasBookmarks = !!wishlistProperties?.length;

  return (
    <section className='h-full overflow-y-auto'>
      <h1 className='font-merriweather font-light text-3xl'>
        Bookmarked Assets
      </h1>
      <p className='mt-3 max-w-2xl font-inter text-sm leading-relaxed text-[#3B3C4A]'>
        Save properties you want to review again before buying tokens or
        comparing future vault terms.
      </p>

      <div className='bg-white p-5 mt-5 rounded-[16px]'>
        {!hasBookmarks && !isLoading && (
          <DashboardEmptyState
            title='No bookmarked assets yet'
            body='Bookmark properties while browsing so you can come back to review the documents, token availability, and any vault context.'
            primaryLabel='Browse Properties'
            primaryHref='/listings'
            secondaryLabel='Try a Vault'
            secondaryHref='/vaults#playground'
          />
        )}
        {(hasBookmarks || isLoading) && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
            <ListingCardLoader cardNumber={12} isLoading={isLoading} />
            {wishlistProperties?.map((property) => (
              <ListingCard
                key={property._id}
                property={property}
                wishlist={wishlistPropertyIds}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
