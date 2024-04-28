'use client';

import { Stack } from '@mui/material';
import { useSession } from 'next-auth/react';

import styles from '../../styles/Dashboard.module.scss';

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
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems='center'
        justifyContent='space-between'
        className={styles.banner}
      >
        <p>Own property affordably from all over the world</p>

        <Stack direction='row' gap='40px'>
          <button role='button' className='black-bg'>
            Browse assets
          </button>
          <button role='button' className='transparent-bg'>
            Browse assets
          </button>
        </Stack>
      </Stack>
      <Carousel />

      <div className='my-20 px-[7%] grid grid-cols-3 gap-4'>
        {properties?.map((property) => (
          <div key={property._id} className='col-span-1'>
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
