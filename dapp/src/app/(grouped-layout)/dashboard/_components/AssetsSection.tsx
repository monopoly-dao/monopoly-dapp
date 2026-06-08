import { useSearchParams } from 'next/navigation';

import TableContainer from '@/components/table';

import { useGetUserAssetsQuery } from '@/api/profile';

import AssetTableItem from './AssetTableItem';
import DashboardEmptyState from './DashboardEmptyState';

const headers = ['Token', 'Tokens', 'USD Value'];

type Props = {
  userFirebaseId: string;
};

export default function AssetsSection({ userFirebaseId }: Props) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const { data: userAssetsResponse, isLoading } = useGetUserAssetsQuery({
    userFirebaseId,
    page,
    limit: 10,
  });

  const assets = userAssetsResponse?.data;
  const hasAssets = !!assets?.length;

  return (
    <div>
      <div className='flex justify-between items-start mb-6'>
        <h2 className='text-3xl font-inter'>Token Holdings</h2>
      </div>

      {!hasAssets && !isLoading && (
        <DashboardEmptyState
          title='No property tokens yet'
          body='When you buy property tokens, they will appear here with the number of tokens held and their current displayed value.'
          primaryLabel='Browse Properties'
          primaryHref='/listings'
          secondaryLabel='See How Vaults Work'
          secondaryHref='/vaults'
        />
      )}
      {(hasAssets || isLoading) && (
        <TableContainer
          tableHeadClass='last:text-right [&:nth-child(2)]:text-center'
          isLoading={isLoading}
          headers={headers}
          totalPages={userAssetsResponse?.meta.totalPages}
        >
          {assets?.map((asset) => (
            <AssetTableItem key={asset._id} asset={asset} />
          ))}
        </TableContainer>
      )}
    </div>
  );
}
