import { useSearchParams } from 'next/navigation';

import TableContainer from '@/components/table';

import { useGetUserAssetsQuery } from '@/api/profile';

import AssetTableItem from './AssetTableItem';

const headers = ['Token', 'Amount', 'USD Value'];

type Props = {
  userFirebaseId: string;
};

export default function AssetsSection({ userFirebaseId }: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const {
    data: userAssetsResponse,
    isLoading,
    isFetching,
  } = useGetUserAssetsQuery({
    userFirebaseId,
    page,
    limit: 10,
  });

  const assets = userAssetsResponse?.data;

  return (
    <div>
      <div className='flex justify-between items-start mb-6'>
        <h2 className='text-3xl font-inter'>Your Assets</h2>
      </div>

      {assets?.length === 0 && `You don't have any assets yet`}
      <TableContainer
        tableHeadClass='last:text-right [&:nth-child(2)]:text-center'
        isLoading={isLoading || isFetching}
        headers={headers}
        totalPages={userAssetsResponse?.meta.totalPages}
      >
        {assets?.map((asset) => (
          <AssetTableItem key={asset._id} asset={asset} />
        ))}
      </TableContainer>
    </div>
  );
}
