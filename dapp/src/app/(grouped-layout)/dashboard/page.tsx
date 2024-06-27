'use client';

import { useSession } from 'next-auth/react';
import { PiHouseLine } from 'react-icons/pi';
import { PiCubeFill } from 'react-icons/pi';
import { TbWheel } from 'react-icons/tb';

import { useGetWalletStatsQuery } from '@/api/profile';

import AssetsSection from './_components/AssetsSection';
import DashboardCard from './_components/DashboardCard';

export default function Page() {
  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';

  const { data: walletStatsResponse, isLoading } =
    useGetWalletStatsQuery(userFirebaseId);
  const walletStats = walletStatsResponse?.data;

  return (
    <div>
      <h2 className='text-3xl mt-12 font-inter mb-2'>Dashboard</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
        <DashboardCard
          title='Total Portfolio Value'
          amount={walletStats?.totalValue}
          isLoading={isLoading}
          isMoney
          percentChange={100}
          icon={TbWheel}
        />
        <DashboardCard
          title='Total Portfolio Volume'
          amount={walletStats?.totalProperties}
          isLoading={isLoading}
          percentChange={-100}
          icon={PiHouseLine}
        />
        <DashboardCard
          title='Wallet Balance'
          amount={walletStats?.walletBalance}
          isLoading={isLoading}
          isMoney
          percentChange={100}
          icon={PiCubeFill}
        />
      </div>

      <div className='mt-20'>
        <AssetsSection userFirebaseId={userFirebaseId} />
      </div>

      {/* <div className='mt-20'>
        <TransactionsSection />
      </div> */}
    </div>
  );
}
