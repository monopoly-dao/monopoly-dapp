'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import TableContainer from '@/components/table';
import { useGetUserSubmissionsQuery } from '@/api/vaults';
import { AssetSubmission } from '@/api/vaults/vaultsApiTypes';
import DashboardEmptyState from '../_components/DashboardEmptyState';

function getStatusClasses(status: AssetSubmission['status']) {
  switch (status) {
    case 'PENDING':
      return 'bg-cream text-[#57534E] border border-[#D6D3D1]';
    case 'APPROVED':
      return 'bg-[#D1FAE5] text-[#065F46]';
    case 'REJECTED':
      return 'bg-[#FEE2E2] text-[#991B1B]';
    default:
      return 'bg-cream text-[#57534E] border border-[#D6D3D1]';
  }
}

export default function SubmissionsPage() {
  const session = useSession();
  const isLoggedIn = session.status === 'authenticated';

  const { data: submissionsResponse, isLoading } = useGetUserSubmissionsQuery(
    undefined,
    { skip: !isLoggedIn }
  );
  const submissions = submissionsResponse?.data ?? [];

  return (
    <div className='px-[5%] lg:px-[7%] py-12 font-inter'>
      <div className='mb-8'>
        <h1 className='text-3xl font-medium text-[#1C1917]'>Your Submissions</h1>
      </div>

      {!isLoading && submissions.length === 0 && (
        <DashboardEmptyState
          title='No submissions yet'
          body='Submit a property to get started.'
          primaryLabel='Submit Property'
          primaryHref='/submit'
        />
      )}

      {(isLoading || submissions.length > 0) && (
        <TableContainer
          tableHeadClass='last:text-right [&:nth-child(2)]:text-center [&:nth-child(3)]:text-center'
          isLoading={isLoading}
          headers={['Property', 'Type', 'Status']}
        >
          {submissions.map((submission: AssetSubmission) => (
            <tr key={submission.id}>
              <td className='px-5 border-b border-medium-grey py-3 font-inter'>
                <Link
                  href={`/dashboard/submissions/${submission.id}`}
                  className='font-medium text-navy hover:underline'
                >
                  {submission.streetAddress}
                </Link>
              </td>
              <td className='px-5 border-b border-medium-grey py-3 font-inter text-center'>
                {submission.type.replace('_', ' ')}
              </td>
              <td className='px-5 border-b border-medium-grey py-3 font-inter'>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-[4px] ${getStatusClasses(
                    submission.status
                  )}`}
                >
                  ● {submission.status}
                </span>
              </td>
            </tr>
          ))}
        </TableContainer>
      )}
    </div>
  );
}