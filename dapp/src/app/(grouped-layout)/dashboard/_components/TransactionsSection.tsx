import Link from 'next/link';

import TableContainer from '@/components/table';

const headers = [
  'Transaction ID',
  'Property ID',
  'Date',
  'Price',
  'Quantity',
  'Status',
];

export default function TransactionsSection() {
  return (
    <div className=''>
      <div className='flex justify-between items-start mb-6'>
        <h2 className='text-3xl font-inter'>Recent Transactions</h2>
        <Link
          href='/dashboard/transactions'
          className='text-black flex font-medium items-center gap-2 underline whitespace-nowrap'
        >
          View All
          {/* <IoIosArrowForward /> */}
        </Link>
      </div>

      <TableContainer headers={headers}>
        {/* <TransactionTableItem />
        <TransactionTableItem />
        <TransactionTableItem /> */}
      </TableContainer>
    </div>
  );
}
