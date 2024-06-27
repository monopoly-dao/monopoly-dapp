'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetWishlistQuery } from '@/api/properties';

import ListingCard from '../../listings/_components/ListingCard';

export default function BookmarkSection() {
  const session = useSession();

  const userFirebaseId = session.data?.userFirebaseId ?? '';
  const { data, isLoading } = useGetWishlistQuery(userFirebaseId);

  const { data: wishlistResponse } = useGetWishlistQuery(userFirebaseId ?? '');

  const wishlist = wishlistResponse?.data?.wishlist;
  const wishlistPropertyIds = wishlist?.map((item) => item._id);

  const wishlistProperties = data?.data.wishlist;

  return (
    <div>
      <div className='flex justify-between items-start'>
        <h2 className='text-3xl font-inter'>Bookmarks</h2>
        <Link
          href='/dashboard/bookmarks'
          className='text-black flex font-medium items-center gap-2 underline'
        >
          View All
          {/* <IoIosArrowForward /> */}
        </Link>
      </div>

      {wishlistProperties?.length === 0 && 'You have no bookmarked properties'}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        <ListingCardLoader cardNumber={3} isLoading={isLoading} />
        {wishlistProperties?.map((property) => (
          <ListingCard
            key={property._id}
            property={property}
            wishlist={wishlistPropertyIds}
          />
        ))}
      </div>
    </div>
  );
}
