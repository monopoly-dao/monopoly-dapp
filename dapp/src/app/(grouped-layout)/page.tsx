'use client';

import { useSession } from 'next-auth/react';

import SubscriptionForm from '../_components/SubscriptionForm';
import {
  useGetPropertiesQuery,
  useGetWishlistQuery,
} from '../../api/properties';
import Carousel from '../../components/Carousel';
import PropertyCard from '../../components/PropertyCard';

function Dashboard() {
  const session = useSession();
  const userId = session.data?.id;

  const { data } = useGetPropertiesQuery();
  const { data: wishlistResponse } = useGetWishlistQuery(userId ?? '');

  const wishlist = wishlistResponse?.data?.wishlist;
  const wishlistPropertyIds = wishlist?.map((item) => item._id);

  const properties = data?.data;

  return (
    <div>
      <Carousel />

      <div className='my-20 px-[7%] grid grid-cols-3 gap-4'>
        {properties?.map((property) => (
          <div key={property.id} className='col-span-1'>
            <PropertyCard property={property} wishlist={wishlistPropertyIds} />
          </div>
        ))}
      </div>

      <div className='px-[7%]'>
        <SubscriptionForm />
      </div>
    </div>
  );
}

export default Dashboard;
