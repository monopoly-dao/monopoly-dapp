'use client';

import Link from 'next/link';
import { useState } from 'react';

import TableContainer from '@/components/table';

import { Loan, LoanStatus, LendPosition } from '@/api/vaults/vaultsApiTypes';
import { useGetUserLoansQuery, useGetUserLendPositionsQuery } from '@/api/vaults';
import { formatAmount } from '@/utils/utils';
import DashboardEmptyState from './DashboardEmptyState';

function getStatusClasses(status: LoanStatus) {
  switch (status) {
    case 'REQUESTED':
      return 'bg-cream text-[#57534E] border border-[#D6D3D1]';
    case 'FUNDING':
      return 'bg-[#FEF3C7] text-[#92400E]';
    case 'ACTIVE':
      return 'bg-[#D1FAE5] text-[#065F46]';
    case 'REPAID':
      return 'bg-[#F0FDF4] text-[#14532D]';
    case 'OVERDUE':
    case 'DEFAULTED':
      return 'bg-[#FEE2E2] text-[#991B1B]';
    default:
      return 'bg-cream text-[#57534E] border border-[#D6D3D1]';
  }
}

function BorrowerLoanRow({ loan }: { loan: Loan }) {
  return (
    <tr>
      <td className='px-5 border-b border-medium-grey py-3 font-inter'>
        <Link
          href={`/listing/${loan.propertyName?.toLowerCase().replace(/\s+/g, '-')}`}
          className='font-medium text-navy hover:underline'
        >
          {loan.propertyName}
        </Link>
      </td>
      <td className='px-5 border-b border-medium-grey py-3 font-inter text-center'>
        ${formatAmount(loan.requestedAmount)}
      </td>
      <td className='px-5 border-b border-medium-grey py-3 font-inter'>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-[4px] ${getStatusClasses(loan.status)}`}
        >
          {loan.status}
        </span>
      </td>
      <td className='px-5 border-b border-medium-grey py-3 font-inter text-center'>
        {loan.repaymentDueDate ? new Date(loan.repaymentDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
      </td>
      <td className='px-5 border-b border-medium-grey py-3 font-inter text-right'>
        {loan.status === 'ACTIVE' && (
          <Link
            href={`/dashboard/loans/${loan.id}`}
            className='text-navy hover:underline text-sm font-medium'
          >
            Repay
          </Link>
        )}
        {loan.status === 'REQUESTED' && (
          <Link
            href={`/dashboard/loans/${loan.id}`}
            className='text-navy hover:underline text-sm font-medium'
          >
            View
          </Link>
        )}
      </td>
    </tr>
  );
}

function LenderPositionRow({ loan }: { loan: LendPosition }) {
  return (
    <tr>
      <td className='px-5 border-b border-medium-grey py-3 font-inter'>
        <Link
          href={`/listing/${(loan.propertyName ?? 'unknown').toLowerCase().replace(/\s+/g, '-')}`}
          className='font-medium text-navy hover:underline'
        >
          {loan.propertyName}
        </Link>
      </td>
      <td className='px-5 border-b border-medium-grey py-3 font-inter text-center'>
        ${formatAmount(loan.amountFunded)}
      </td>
      <td className='px-5 border-b border-medium-grey py-3 font-inter'>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-[4px] ${getStatusClasses(loan.status ?? 'REQUESTED')}`}
        >
          {loan.status}
        </span>
      </td>
      <td className='px-5 border-b border-medium-grey py-3 font-inter text-center'>
        {loan.repaymentDueDate ? new Date(loan.repaymentDueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
      </td>
      <td className='px-5 border-b border-medium-grey py-3 font-inter text-right'>
        <Link
          href={`/dashboard/loans/${loan.loanId}`}
          className='text-navy hover:underline text-sm font-medium'
        >
          View
        </Link>
      </td>
    </tr>
  );
}

type Props = {
  userFirebaseId: string;
};

export default function VaultActivitySection({ userFirebaseId }: Props) {
  const [activeTab, setActiveTab] = useState<'borrower' | 'lender'>('borrower');

  const effectiveUserFirebaseId = userFirebaseId || 'mock_user';

  const { data: borrowerLoansResponse, isLoading: isLoadingLoans } = useGetUserLoansQuery(effectiveUserFirebaseId);
  const { data: lenderPositionsResponse, isLoading: isLoadingPositions } = useGetUserLendPositionsQuery(effectiveUserFirebaseId);

  const borrowerLoans = borrowerLoansResponse?.data ?? [];
  const lenderPositions = lenderPositionsResponse?.data ?? [];

  const hasLoans = borrowerLoans.length > 0;
  const hasPositions = lenderPositions.length > 0;

  return (
    <div className='mt-20'>
      <div className='flex justify-between items-start mb-6'>
        <h2 className='text-3xl font-inter'>Vault Activity</h2>
        <div className='flex gap-2'>
          <button
            type='button'
            onClick={() => setActiveTab('borrower')}
            className={`px-4 py-2 text-sm font-medium rounded-[6px] transition-colors ${
              activeTab === 'borrower'
                ? 'bg-navy text-white'
                : 'text-[#57534E] hover:bg-cream'
            }`}
          >
            Borrower
          </button>
          <button
            type='button'
            onClick={() => setActiveTab('lender')}
            className={`px-4 py-2 text-sm font-medium rounded-[6px] transition-colors ${
              activeTab === 'lender'
                ? 'bg-navy text-white'
                : 'text-[#57534E] hover:bg-cream'
            }`}
          >
            Lender
          </button>
        </div>
      </div>

      {activeTab === 'borrower' && (
        <>
          {!hasLoans && !isLoadingLoans && (
            <DashboardEmptyState
              title='No loan requests'
              body='When you request a loan against your property tokens, they will appear here.'
              primaryLabel='Browse Properties'
              primaryHref='/listings'
            />
          )}
          {(hasLoans || isLoadingLoans) && (
            <TableContainer
              tableHeadClass='last:text-right [&:nth-child(2)]:text-center [&:nth-child(3)]:text-center [&:nth-child(4)]:text-center'
              isLoading={isLoadingLoans}
              headers={['Property', 'Amount', 'Status', 'Due', 'Action']}
            >
              {borrowerLoans.map((loan) => (
                <BorrowerLoanRow key={loan.id} loan={loan} />
              ))}
            </TableContainer>
          )}
        </>
      )}

      {activeTab === 'lender' && (
        <>
          {!hasPositions && !isLoadingPositions && (
            <DashboardEmptyState
              title='No lend positions'
              body='When you fund loans, your positions will appear here.'
              primaryLabel='Browse Properties'
              primaryHref='/listings'
            />
          )}
          {(hasPositions || isLoadingPositions) && (
            <TableContainer
              tableHeadClass='last:text-right [&:nth-child(2)]:text-center [&:nth-child(3)]:text-center [&:nth-child(4)]:text-center'
              isLoading={isLoadingPositions}
              headers={['Property', 'Funded', 'Status', 'Due', 'Action']}
            >
              {lenderPositions.map((position) => (
                <LenderPositionRow key={position.id} loan={position} />
              ))}
            </TableContainer>
          )}
        </>
      )}
    </div>
  );
}