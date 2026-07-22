'use client';

import { formatAmount } from '@/utils/utils';
import { useGetNavQuery } from '@/api/vaults';

type Props = {
  assetToken: string | null | undefined;
};

function formatRelativeTime(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function NavBadge({ assetToken }: Props) {
  const { data: navResponse, isLoading } = useGetNavQuery(
    assetToken || 'dummy',
    { skip: !assetToken }
  );

  const nav = navResponse?.data;

  if (!assetToken) return null;

  if (isLoading) {
    return (
      <div className='rounded-[8px] border border-[#D6D3D1] bg-cream/30 p-4 mb-4'>
        <p className='text-sm text-[#57534E]'>Loading NAV...</p>
      </div>
    );
  }

  if (!nav || !nav.valid) {
    return (
      <div className='rounded-[8px] border border-[#D6D3D1] bg-cream/30 p-4 mb-4'>
        <p className='text-sm text-[#57534E] mb-1'>Net Asset Value</p>
        <p className='text-sm text-[#57534E]'>
          NAV not published <span className='text-[#D6D3D1]'>○</span> Unpriced
        </p>
      </div>
    );
  }

  const navValue = Number(nav.value) / 1e18;

  return (
    <div className='rounded-[8px] border border-[#D6D3D1] bg-cream/30 p-4 mb-4'>
      <p className='text-sm text-[#57534E] mb-1'>Net Asset Value</p>
      <p className='text-xl font-medium'>
        ${formatAmount(navValue)} <span className='text-[#065F46]'>●</span>{' '}
        <span className='text-sm font-normal text-[#57534E]'>
          Valid as of {formatRelativeTime(nav.publishedAt)}
        </span>
      </p>
    </div>
  );
}