'use client';

import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { MdContentCopy } from 'react-icons/md';

import LoadingText from '@/components/LoadingText';
import TableContainer from '@/components/table';

import {
  useGetUserDetailsQuery,
  useGetUserTransactionsQuery,
} from '@/api/profile';
import { handleErrors } from '@/utils/error';

import TransactionTableItem from '../_components/TransactionTableItem';

const headers = [
  'Transaction Hash',
  'Asset Symbol',
  'Date',
  'Price',
  'Quantity',
  'Status',
];

export default function Page() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';

  const { data: userDetailsResponse, isLoading: isUserLoading } =
    useGetUserDetailsQuery(userFirebaseId);
  const userDetails = userDetailsResponse?.data;

  const {
    data: userTransactionsResponse,
    isLoading,
    isFetching,
  } = useGetUserTransactionsQuery({
    userFirebaseId,
    page,
    limit: 10,
    sort: { created_at: 'desc' },
  });

  const transactions = userTransactionsResponse?.data;

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
    <div>
      <h2 className='text-3xl mt-12 font-inter mb-6'>Transaction History</h2>

      <div className='mb-6 flex flex-col md:flex-row gap-1 md:gap-4'>
        <p className='font-inter'>Wallet Address:</p>
        <p
          className='text-dark-grey text-sm md:text-base flex items-center font-n-montreal cursor-pointer hover:underline'
          onClick={copyWalletAddress}
        >
          <LoadingText
            isLoading={isUserLoading}
            value={userDetails?.userDetails.walletAddress}
          />{' '}
          <MdContentCopy />
        </p>
      </div>

      {transactions?.length === 0 && `You don't have any transactions yet`}
      <TableContainer
        headers={headers}
        isLoading={isLoading || isFetching}
        totalPages={userTransactionsResponse?.meta.totalPages}
      >
        {transactions?.map((transaction) => (
          <TransactionTableItem
            key={transaction._id}
            transaction={transaction}
          />
        ))}
      </TableContainer>
    </div>
  );
}
