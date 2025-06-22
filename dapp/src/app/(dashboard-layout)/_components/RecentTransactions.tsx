import { useSearchParams } from 'next/navigation';

import TableContainer from '@/components/table';

import { useGetUserTransactionsQuery } from '@/api/profile';
import TransactionTableItem from '@/app/(grouped-layout)/_dashboard/_components/TransactionTableItem';

const headers = [
  'Transaction ID',
  'Property ID',
  'Date',
  'Price',
  'Quantity',
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

  return (
    <div className='rounded-[16px] bg-white py-5 px-4'>
      <p className='font-semibold mb-3 font-general-sans'>
        Recent Transactions
      </p>

      {transactions?.length === 0 && `You don't have any transactions yet`}
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
    </div>
  );
}
