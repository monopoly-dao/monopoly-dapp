'use client';

import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import TableContainer from '@/components/table';

import { useGetUserTransactionsQuery } from '@/api/profile';

import TransactionTableItem from '../_components/TransactionTableItem';

const headers = [
  'Transaction ID',
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

  const {
    data: userTransactionsResponse,
    isLoading,
    isFetching,
  } = useGetUserTransactionsQuery({
    userFirebaseId,
    page,
    limit: 10,
  });

  const transactions = userTransactionsResponse?.data;

  return (
    <div>
      <h2 className='text-3xl mt-12 font-inter mb-6'>Transaction History</h2>

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
