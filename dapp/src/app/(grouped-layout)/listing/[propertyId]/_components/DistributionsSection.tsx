'use client';

import { formatAmount } from '@/utils/utils';
import { useGetDistributionsQuery, useGetWindDownQuery } from '@/api/vaults';

type Props = {
  assetToken: string | null | undefined;
};

export default function DistributionsSection({ assetToken }: Props) {
  const { data: distributionsResponse, isLoading: isLoadingDistributions } = useGetDistributionsQuery(
    assetToken || 'dummy',
    { skip: !assetToken }
  );

  const { data: windDownResponse } = useGetWindDownQuery(
    assetToken || 'dummy',
    { skip: !assetToken }
  );

  const distributions = distributionsResponse?.data ?? [];
  const windDown = windDownResponse?.data;

  if (!assetToken) return null;

  if (isLoadingDistributions) {
    return (
      <div className='mt-12 px-[5%] sm:px-[7%] font-inter'>
        <p className='text-sm text-[#57534E]'>Loading distributions...</p>
      </div>
    );
  }

  return (
    <div className='mt-12 px-[5%] sm:px-[7%] font-inter'>
      {/* Wind-down banner */}
      {windDown?.active && (
        <div className='rounded-[8px] border border-[#F59E0B] bg-[#FEF3C7] p-4 mb-6'>
          <p className='text-sm text-[#92400E]'>
            <span className='font-medium'>⚠️ This property is in wind-down.</span>{' '}
            Token holders will receive proportional proceeds.{' '}
            {windDown.navAtWindDown && (
              <>NAV at wind-down: ${(Number(windDown.navAtWindDown) / 1e18).toFixed(2)}</>
            )}
          </p>
        </div>
      )}

      <div className='rounded-[8px] border border-[#D6D3D1] bg-white overflow-hidden'>
        <div className='p-6 border-b border-[#D6D3D1]'>
          <h2 className='font-medium text-xl text-[#1C1917]'>Distributions &amp; Yield</h2>
        </div>

        {distributions.length === 0 ? (
          <div className='p-8 text-center'>
            <p className='text-sm text-[#57534E]'>No distributions have been published yet.</p>
          </div>
        ) : (
          <table className='w-full'>
            <thead>
              <tr className='border-b border-[#D6D3D1]'>
                <th className='px-5 py-3 text-left text-sm font-medium text-[#57534E]'>Date</th>
                <th className='px-5 py-3 text-left text-sm font-medium text-[#57534E]'>Amount</th>
                <th className='px-5 py-3 text-left text-sm font-medium text-[#57534E]'>Token</th>
              </tr>
            </thead>
            <tbody>
              {distributions.map((dist) => (
                <tr key={dist.id}>
                  <td className='px-5 border-b border-medium-grey py-3 font-inter'>
                    {new Date(dist.timestamp).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className='px-5 border-b border-medium-grey py-3 font-inter'>
                    ${formatAmount(Number(dist.amount))}
                  </td>
                  <td className='px-5 border-b border-medium-grey py-3 font-inter'>
                    {dist.paymentToken}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}