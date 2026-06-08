'use client';

import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { MdContentCopy } from 'react-icons/md';

import LoadingText from '@/components/LoadingText';

import { useGetUserDetailsQuery } from '@/api/profile';
import { handleErrors } from '@/utils/error';

import RecentTransactions from '../_components/RecentTransactions';

export default function Page() {
  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';

  const { data: userDetailsResponse, isLoading: isUserLoading } =
    useGetUserDetailsQuery(userFirebaseId);
  const userDetails = userDetailsResponse?.data;

  async function copyWalletAddress() {
    try {
      await navigator.clipboard.writeText(
        userDetails?.userDetails.walletAddress ?? ''
      );

      toast.success('Wallet address has been copied!');
    } catch (e) {
      handleErrors(e);
    }
  }

  return (
    <section className='h-full overflow-y-auto'>
      <h1 className='font-merriweather font-light text-3xl'>Activity</h1>
      <p className='mt-3 max-w-2xl font-inter text-sm leading-relaxed text-[#3B3C4A]'>
        Your token purchases and sales will appear here. Future vault activity
        should make loan funding, collateral, and repayment events just as easy
        to review.
      </p>

      <div className='my-5 flex flex-col md:flex-row gap-1 md:gap-4'>
        <p className='font-roboto'>Wallet Address:</p>
        <p
          className='text-navy/80 text-sm md:text-base flex items-center font-roboto gap-2 cursor-pointer hover:underline'
          onClick={copyWalletAddress}
        >
          <LoadingText
            isLoading={isUserLoading}
            value={userDetails?.userDetails.walletAddress}
          />{' '}
          <MdContentCopy />
        </p>
      </div>

      <RecentTransactions userFirebaseId={userFirebaseId} limit={10} />
    </section>
  );
}
