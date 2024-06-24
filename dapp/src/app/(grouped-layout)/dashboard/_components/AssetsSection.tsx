import TableContainer from '@/components/table';

import AssetTableItem from './AssetTableItem';

const headers = ['Token', 'Amount', 'USD Value'];

export default function AssetsSection() {
  return (
    <div>
      <div className='flex justify-between items-start mb-6'>
        <h2 className='text-3xl font-inter'>Assets</h2>
      </div>

      <TableContainer
        tableHeadClass='last:text-right [&:nth-child(2)]:text-center'
        headers={headers}
      >
        <AssetTableItem />
        <AssetTableItem />
        <AssetTableItem />
        <AssetTableItem />
      </TableContainer>
    </div>
  );
}
