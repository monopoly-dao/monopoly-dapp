'use client';

import { useSession } from 'next-auth/react';
import { FiKey } from 'react-icons/fi';
import { GoHome } from 'react-icons/go';
import { IoWalletOutline } from 'react-icons/io5';

import { useGetWalletStatsQuery } from '@/api/profile';

import AssetsSection from './_components/AssetsSection';
import DashboardCard from './_components/DashboardCard';
import ExploreOpportunities from './_components/ExploreOpportunites';

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
          icon={GoHome}
        />
        <DashboardCard
          title='Properties Owned'
          amount={walletStats?.totalProperties}
          isLoading={isLoading}
          percentChange={-100}
          icon={FiKey}
        />
        <DashboardCard
          title='Wallet Balance'
          amount={walletStats?.walletBalance}
          isLoading={isLoading}
          isMoney
          percentChange={100}
          icon={IoWalletOutline}
        />
      </div>

      {(walletStats?.totalProperties === 0 || !walletStats?.totalProperties) &&
        !isLoading && (
          <div className='mt-20'>
            <ExploreOpportunities />
          </div>
        )}

      <div className='mt-20'>
        <AssetsSection userFirebaseId={userFirebaseId} />
      </div>

      {/* <div className='mt-20'>
        <TransactionsSection />
      </div> */}
    </div>
  );
}
