'use client';

import { useSession } from 'next-auth/react';

import { useGetWishlistQuery } from '../../../api/properties';
import PropertyCard from '../../../components/PropertyCard';

export default function Page() {
  const session = useSession();

  const userId = session.data?.id ?? '';
  const { data } = useGetWishlistQuery(userId);

  const { data: wishlistResponse } = useGetWishlistQuery(userId ?? '');

  const wishlist = wishlistResponse?.data?.wishlist;
  const wishlistPropertyIds = wishlist?.map((item) => item._id);

  const wishlistProperties = data?.data.wishlist;

  return (
    <div className='p-[5%]'>
      <h1>Wishlist</h1>

      <div className='my-20 grid grid-cols-3 gap-4'>
        {wishlistProperties?.map((property) => (
          <div key={property._id} className='col-span-1'>
            <PropertyCard property={property} wishlist={wishlistPropertyIds} />
          </div>
        ))}
      </div>
    </div>
  );
}
