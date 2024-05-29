'use client';

import { useSession } from 'next-auth/react';

import Cities from './_components/Cities';
import Header from './_components/Header';
import HowItWorks from './_components/HowItWorks';
import TrendingProperties from './_components/TrendingProperties';
import {
  useGetPropertiesQuery,
  useGetWishlistQuery,
} from '../../api/properties';
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
      <Header />

      <div className='px-[5%] py-14 flex flex-col gap-16 lg:gap-32'>
        <HowItWorks />
        <TrendingProperties />
        <div className='flex flex-col gap-4 w-full sm:w-4/5 lg:w-3/5'>
          <h2 className='font-bold text-3xl sm:text-5xl'>Who we are</h2>
          <p>
            We are your decentralised real estate agent, handling the end to end
            process of acquiring and managing real world assets globally to
            provide dynamic yield and a safer store of value using blockchain
            Technology. Settley also offers a secondary marketplace for
            fractional digitalised real estate, even for properties not
            initially owned by the DAO. We aim to provide further liquidity to
            the real estate market and be a reputable blockchain investment with
            yield you can understand.
          </p>
        </div>
        <Cities />
      </div>

      <div className='my-20 px-[7%] grid grid-cols-3 gap-4'>
        {properties?.map((property) => (
          <div key={property._id} className='col-span-1'>
            <PropertyCard property={property} wishlist={wishlistPropertyIds} />
          </div>
        ))}
      </div>

      {/* <div className='px-[7%]'>
        <SubscriptionForm />
      </div> */}
    </div>
  );
}

export default Dashboard;
