import { useSearchParams } from 'next/navigation';

import TableContainer from '@/components/table';

import { useGetUserTransactionsQuery } from '@/api/profile';
import TransactionTableItem from '@/app/(grouped-layout)/_dashboard/_components/TransactionTableItem';

import DashboardEmptyState from './DashboardEmptyState';

const headers = [
  'Transaction ID',
  'Property Token',
  'Date',
  'Price',
  'Tokens',
  'Status',
];

type Props = {
  userFirebaseId: string;
  limit?: number;
};

export default function RecentTransactions({
  userFirebaseId,
  limit = 5,
}: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const {
    data: userTransactionsResponse,
    isLoading,
    isFetching,
  } = useGetUserTransactionsQuery({
    userFirebaseId,
    page,
    limit,
    sort: { created_at: 'desc' },
  });

  const transactions = userTransactionsResponse?.data;
  const hasTransactions = !!transactions?.length;

  return (
    <div className='rounded-2xl bg-white py-6 px-6 border border-settley-primary/5 shadow-sm'>
      <p className='font-bold mb-4 font-inter text-navy uppercase text-xs tracking-widest'>
        Recent Activity
      </p>

      {!hasTransactions && !isLoading && !isFetching && (
        <DashboardEmptyState
          title='No token activity yet'
          body='Once you buy or sell property tokens, each transaction will show here with the property token, date, amount, and status.'
          primaryLabel='Browse Properties'
          primaryHref='/listings'
          secondaryLabel='Try a Vault'
          secondaryHref='/vaults#playground'
        />
      )}
      {(hasTransactions || isLoading || isFetching) && (
        <TableContainer
          tableHeadClass='border-none text-xs font-medium text-[A8A29E]'
          isLoading={isLoading || isFetching}
          headers={headers}
          totalPages={limit ? userTransactionsResponse?.meta.totalPages : 1}
          tableClassName='border-none'
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
