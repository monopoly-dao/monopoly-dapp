'use client';

import { useSession } from 'next-auth/react';

import { useGetWishlistQuery } from '../../../api/properties';
import PropertyCard from '../../../components/PropertyCard';

export default function Page() {
  const session = useSession();

  const userFirebaseId = session.data?.userFirebaseId ?? '';
  const { data } = useGetWishlistQuery(userFirebaseId);

  const { data: wishlistResponse } = useGetWishlistQuery(userFirebaseId ?? '');

  const wishlist = wishlistResponse?.data?.wishlist;
  const wishlistPropertyIds = wishlist?.map((item) => item._id);

  const wishlistProperties = data?.data.wishlist;

  return (
    <div className='p-[5%]'>
      <h1>Wishlist</h1>

      <div className='my-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {wishlistProperties?.map((property) => (
          <div key={property._id} className='col-span-1'>
            <PropertyCard property={property} wishlist={wishlistPropertyIds} />
          </div>
        ))}
      </div>
    </div>
  );
}
