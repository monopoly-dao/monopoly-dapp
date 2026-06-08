'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import Button from '@/components/buttons/Button';

import { useGetUserEmailsCountQuery, useLazyGetUserEmailsQuery } from '@/api';
import { useGetWalletStatsQuery } from '@/api/profile';
import DashboardCard from '@/app/(grouped-layout)/_dashboard/_components/DashboardCard';

import RecentTransactions from '../_components/RecentTransactions';
import YourAssets from '../_components/YourAssets';

export default function Page() {
  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';
  const email = session.data?.user?.email ?? '';

  const { data: walletStatsResponse, isLoading } =
    useGetWalletStatsQuery(userFirebaseId);
  const walletStats = walletStatsResponse?.data;

  const { data: userEmailCount } = useGetUserEmailsCountQuery({ email });
  const [getUserEmails, { isLoading: isDownloading }] =
    useLazyGetUserEmailsQuery();

  async function downloadUserEmailsCSV() {
    const response = await getUserEmails({ email }).unwrap(); // use your actual API route

    const blob = new Blob([response], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-emails.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  return (
    <section className='h-full overflow-y-auto'>
      <div className='rounded-2xl border border-settley-primary/5 bg-white p-6 shadow-sm'>
        <p className='mb-3 font-inter text-xs font-bold uppercase tracking-widest text-navy/70'>
          Your Settley account
        </p>
        <div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between'>
          <div>
            <h1 className='font-merriweather text-3xl font-light text-navy'>
              Track property tokens and vault activity.
            </h1>
            <p className='mt-4 max-w-3xl font-inter text-sm leading-relaxed text-[#3B3C4A]'>
              This is where your property token holdings, bookmarked assets, and
              purchase activity live. When vault activity is available, this is
              also where loan requests, collateral, and repayment updates should
              become visible.
            </p>
          </div>
          <div className='flex flex-col gap-3 sm:flex-row'>
            <Link
              href='/listings'
              className='w-fit rounded-full bg-navy px-5 py-3 font-inter text-sm font-medium text-white transition hover:bg-navy/90'
            >
              Browse Properties
            </Link>
            <Link
              href='/vaults#playground'
              className='w-fit rounded-full border border-navy px-5 py-3 font-inter text-sm font-medium text-navy transition hover:bg-navy/5'
            >
              Try a Vault
            </Link>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
        <DashboardCard
          title='Token Holding Value'
          amount={walletStats?.totalValue}
          isLoading={isLoading}
          isMoney
          percentChange={100}
        />
        <DashboardCard
          title='Token Positions'
          amount={walletStats?.totalProperties}
          isLoading={isLoading}
          percentChange={-100}
        />
        <DashboardCard
          title='Available Balance'
          amount={walletStats?.walletBalance}
          isLoading={isLoading}
          isMoney
          percentChange={100}
        />
      </div>

      <div className='my-5'>
        <YourAssets userFirebaseId={userFirebaseId} />
      </div>

      <RecentTransactions userFirebaseId={userFirebaseId} />

      {(email === 'temisan@settley.co' ||
        email === 'ayomidemusty@gmail.com' ||
        email === 'tagbajoh@gmail.com') && (
        <div className='mt-5 flex items-center gap-5'>
          <p>{userEmailCount?.data} users</p>
          <Button onClick={downloadUserEmailsCSV} isLoading={isDownloading}>
            Get Emails
          </Button>
        </div>
      )}
    </section>
  );
}
