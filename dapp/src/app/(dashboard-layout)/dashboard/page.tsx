'use client';

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
      <h1 className='font-merriweather font-light text-3xl'>Dashboard</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
        <DashboardCard
          title='Total Portfolio Value'
          amount={walletStats?.totalValue}
          isLoading={isLoading}
          isMoney
          percentChange={100}
        />
        <DashboardCard
          title='Properties Owned'
          amount={walletStats?.totalProperties}
          isLoading={isLoading}
          percentChange={-100}
        />
        <DashboardCard
          title='Wallet Balance'
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
