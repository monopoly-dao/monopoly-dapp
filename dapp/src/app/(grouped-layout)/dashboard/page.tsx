'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { PiHouseLine } from 'react-icons/pi';
import { PiCubeFill } from 'react-icons/pi';
import { TbWheel } from 'react-icons/tb';

import { useGetWalletStatsQuery } from '@/api/profile';

import AssetsSection from './_components/AssetsSection';
import DashboardCard from './_components/DashboardCard';
import VaultActivitySection from './_components/VaultActivitySection';

type HoldingTab = 'tokens' | 'vault';

export default function Page() {
  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';
  const [activeTab, setActiveTab] = useState<HoldingTab>('tokens');

  const { data: walletStatsResponse, isLoading } =
    useGetWalletStatsQuery(userFirebaseId);
  const walletStats = walletStatsResponse?.data;

  return (
    <div>
      <section className='mt-12 rounded-[8px] border border-[#D6D3D1] bg-cream p-6 sm:p-8'>
        <p className='mb-3 text-sm uppercase tracking-[0.14em] text-[#57534E]'>
          Your Settley account
        </p>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <h2 className='font-inter text-3xl font-medium text-[#1C1917]'>
              Track property tokens and vault activity.
            </h2>
            <p className='mt-4 max-w-3xl text-[#44403C]'>
              This is where your property token holdings, bookmarked assets, and
              purchase activity live. When vault activity is available, this is
              also where loan requests, collateral, and repayment updates should
              become visible.
            </p>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <Link
              href='/listings'
              className='w-fit rounded-[6px] bg-navy px-5 py-3 font-medium text-white'
            >
              Browse Properties
            </Link>
            <Link
              href='/vaults#playground'
              className='w-fit rounded-[6px] border border-navy px-5 py-3 font-medium text-navy'
            >
              Try a Vault
            </Link>
          </div>
        </div>
      </section>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
        <DashboardCard
          title='Token Holding Value'
          amount={walletStats?.totalValue}
          isLoading={isLoading}
          isMoney
          percentChange={100}
          icon={TbWheel}
        />
        <DashboardCard
          title='Token Positions'
          amount={walletStats?.totalProperties}
          isLoading={isLoading}
          percentChange={-100}
          icon={PiHouseLine}
        />
        <DashboardCard
          title='Available Balance'
          amount={walletStats?.walletBalance}
          isLoading={isLoading}
          isMoney
          percentChange={100}
          icon={PiCubeFill}
        />
      </div>

      <div className='mt-20'>
        <div className='flex border-b border-[#D6D3D1] mb-6'>
          <button
            type='button'
            onClick={() => setActiveTab('tokens')}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'tokens'
                ? 'border-b-2 border-navy text-navy'
                : 'text-[#57534E] hover:text-navy'
            }`}
          >
            Token Holdings
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('vault')}
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === 'vault'
                ? 'border-b-2 border-navy text-navy'
                : 'text-[#57534E] hover:text-navy'
            }`}
          >
            Vault Activity
          </button>
        </div>

        {activeTab === 'tokens' && <AssetsSection userFirebaseId={userFirebaseId} />}
        {activeTab === 'vault' && <VaultActivitySection userFirebaseId={userFirebaseId} />}
      </div>
    </div>
  );
}
