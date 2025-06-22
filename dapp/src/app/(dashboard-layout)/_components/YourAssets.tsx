'use client';

import { useSearchParams } from 'next/navigation';

import TableContainer from '@/components/table';

import { useGetUserAssetsQuery } from '@/api/profile';
import AssetTableItem from '@/app/(grouped-layout)/_dashboard/_components/AssetTableItem';

type Props = {
  userFirebaseId: string;
  limit?: number;
};

const headers = ['Property', 'Token', 'Amount', 'USD Value'];

export default function YourAssets({ userFirebaseId, limit = 5 }: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const {
    data: userAssetsResponse,
    isLoading,
    isFetching,
  } = useGetUserAssetsQuery({
    userFirebaseId,
    page,
    limit,
  });

  const assets = userAssetsResponse?.data;

  return (
    <div className='rounded-[16px] bg-white py-5 px-4'>
      <p className='font-semibold mb-3 font-general-sans'>Your Assets</p>

      {assets?.length === 0 && `You don't have any assets yet`}
      <TableContainer
        tableHeadClass='border-none text-xs font-medium text-[A8A29E]'
        isLoading={isLoading || isFetching}
        headers={headers}
        totalPages={limit ? userAssetsResponse?.meta.totalPages : 1}
        tableClassName='border-none'
      >
        {assets?.map((asset) => (
          <AssetTableItem key={asset._id} asset={asset} />
        ))}
      </TableContainer>
    </div>
  );
}
