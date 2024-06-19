import TableContainer from '@/components/table';

import TransactionTableItem from '../_components/TransactionTableItem';

const headers = [
  'Transaction ID',
  'Property ID',
  'Date',
  'Price',
  'Quantity',
  'Status',
];

export default function Page() {
  return (
    <div>
      <h2 className='text-3xl mt-12 font-inter mb-6'>Transaction History</h2>

      <TableContainer headers={headers}>
        <TransactionTableItem />
        <TransactionTableItem />
        <TransactionTableItem />
        <TransactionTableItem />
        <TransactionTableItem />
        <TransactionTableItem />
        <TransactionTableItem />
      </TableContainer>
    </div>
  );
}
