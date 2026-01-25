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
    <div className='rounded-2xl bg-white py-6 px-6 border border-settley-primary/5 shadow-sm'>
      <p className='font-bold mb-4 font-inter text-navy uppercase text-xs tracking-widest'>Your Assets</p>

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
