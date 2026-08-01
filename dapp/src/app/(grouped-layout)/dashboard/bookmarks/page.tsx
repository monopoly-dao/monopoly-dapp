'use client';

import { useSession } from 'next-auth/react';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetWishlistQuery } from '@/api/properties';

import DashboardEmptyState from '../_components/DashboardEmptyState';
import ListingCard from '../../listings/_components/ListingCard';

export default function Page() {
  const session = useSession();
  const isLoggedIn = session.status === 'authenticated';

  const { data, isLoading } = useGetWishlistQuery(undefined, { skip: !isLoggedIn });

  const wishlist = data?.data?.wishlist;
  const wishlistPropertyIds = wishlist?.map((item) => item._id);

  const wishlistProperties = data?.data?.wishlist;
  const hasBookmarks = !!wishlistProperties?.length;

  return (
    <div>
      <div className='mt-12 mb-6'>
        <h2 className='text-3xl font-inter'>Bookmarked Assets</h2>
        <p className='mt-3 max-w-2xl text-[#44403C]'>
          Save properties you want to review again before buying tokens or
          comparing future vault terms.
        </p>
      </div>

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
  );
}
