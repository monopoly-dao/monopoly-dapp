'use client';

import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import TableContainer from '@/components/table';

import { useGetUserTransactionsQuery } from '@/api/profile';

import DashboardEmptyState from '../_components/DashboardEmptyState';
import TransactionTableItem from '../_components/TransactionTableItem';

const headers = [
  'Transaction ID',
  'Property Token',
  'Date',
  'Price',
  'Tokens',
  'Status',
];

export default function Page() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data: userTransactionsResponse, isLoading } =
    useGetUserTransactionsQuery({
      page,
      limit: 10,
    });

  const transactions = userTransactionsResponse?.data;
  const hasTransactions = !!transactions?.length;

  return (
    <div>
      <div className='mt-12 mb-6'>
        <h2 className='text-3xl font-inter'>Transaction History</h2>
        <p className='mt-3 max-w-2xl text-[#44403C]'>
          Your token purchases and sales will appear here. Future vault activity
          should make loan funding, collateral, and repayment events just as
          easy to review.
        </p>
      </div>

      {!hasTransactions && !isLoading && (
        <DashboardEmptyState
          title='No token activity yet'
          body='Once you buy or sell property tokens, each transaction will show here with the property token, date, amount, and status.'
          primaryLabel='Browse Properties'
          primaryHref='/listings'
          secondaryLabel='See How Vaults Work'
          secondaryHref='/vaults'
        />
      )}
      {(hasTransactions || isLoading) && (
        <TableContainer
          headers={headers}
          isLoading={isLoading}
          totalPages={userTransactionsResponse?.meta.totalPages}
        >
          {transactions?.map((transaction) => (
            <TransactionTableItem
              key={transaction._id}
              transaction={transaction}
            />
          ))}
        </TableContainer>
      )}
    </div>
  );
}
