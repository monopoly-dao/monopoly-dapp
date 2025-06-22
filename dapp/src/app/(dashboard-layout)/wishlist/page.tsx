'use client';

import { useSession } from 'next-auth/react';

import ListingCardLoader from '@/components/ListingCardLoader';

import { useGetWishlistQuery } from '@/api/properties';
import ListingCard from '@/app/(grouped-layout)/listings/_components/ListingCard';

export default function Page() {
  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';

  const { data, isLoading } = useGetWishlistQuery(userFirebaseId);

  const { data: wishlistResponse } = useGetWishlistQuery(userFirebaseId ?? '');

  const wishlist = wishlistResponse?.data?.wishlist;
  const wishlistPropertyIds = wishlist?.map((item) => item._id);

  const wishlistProperties = data?.data.wishlist;

  return (
    <section className='h-full overflow-y-auto'>
      <h1 className='font-merriweather font-light text-3xl'>Wishlist</h1>

      <div className='bg-white p-5 mt-5 rounded-[16px]'>
        {wishlistProperties?.length === 0 &&
          'You have no bookmarked properties'}
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
      </div>
    </section>
  );
}
