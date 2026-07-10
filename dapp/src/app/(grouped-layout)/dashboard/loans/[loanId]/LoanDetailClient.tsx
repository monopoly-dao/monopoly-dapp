'use client';

import Link from 'next/link';

import Button from '@/components/buttons/Button';
import { formatAmount } from '@/utils/utils';

import { Loan, LoanStatus } from '@/api/vaults/vaultsApiTypes';
import { useGetAmountDueQuery } from '@/api/vaults';

const mockLoan: Loan = {
  id: 'loan_01',
  vaultId: 'vault_1',
  borrowerId: '0x1234',
  pledgedTokenAmount: '35000',
  requestedAmount: 50000,
  fundedAmount: 50000,
  interestRate: 12,
  termMonths: 6,
  status: 'ACTIVE',
  repaymentDueDate: '2025-12-15',
  blockchainTxHash: '0xabcdef123456',
  onchainLoanId: '123',
  propertyName: '14 Riverside Court',
};

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

type Props = {
  loanId: string;
};

export default function LoanDetailClient({ loanId: _ }: Props) {
  const loan = mockLoan;
  const { data: amountDueResponse } = useGetAmountDueQuery(loan.id);
  const _amountDue = amountDueResponse?.data?.amountDue;

  const interest = loan.requestedAmount * (loan.interestRate / 100) * (loan.termMonths / 12);
  const totalDue = loan.requestedAmount + interest;

  return (
    <div className='px-[5%] lg:px-[7%] font-inter'>
      <Link
        href='/dashboard'
        className='inline-block text-sm text-navy hover:underline mb-6'
      >
        ← Back to dashboard
      </Link>

      <div className='rounded-[8px] border border-[#D6D3D1] bg-white p-6 sm:p-8'>
        <div className='mb-6'>
          <h1 className='text-3xl font-medium text-[#1C1917]'>
            Loan — {loan.propertyName}
          </h1>
          <div className='mt-2 flex items-center gap-4 text-sm'>
            <span>
              Status:{' '}
              <span className={`px-2 py-1 text-xs font-medium rounded-[4px] ${getStatusClasses(loan.status)}`}>
                {loan.status}
              </span>
            </span>
            <span className='text-[#57534E]'>Rate: {loan.interestRate}% p.a.</span>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6'>
          <div className='rounded-[8px] border border-[#D6D3D1] p-4'>
            <p className='text-sm text-[#57534E]'>Principal</p>
            <p className='mt-1 text-2xl font-medium'>${formatAmount(loan.requestedAmount)}</p>
          </div>
          <div className='rounded-[8px] border border-[#D6D3D1] p-4'>
            <p className='text-sm text-[#57534E]'>Total due at repayment</p>
            <p className='mt-1 text-2xl font-medium'>${formatAmount(totalDue)}</p>
          </div>
          <div className='rounded-[8px] border border-[#D6D3D1] p-4'>
            <p className='text-sm text-[#57534E]'>Pledged tokens</p>
            <p className='mt-1 text-2xl font-medium'>{formatAmount(Number(loan.pledgedTokenAmount))}</p>
          </div>
          <div className='rounded-[8px] border border-[#D6D3D1] p-4'>
            <p className='text-sm text-[#57534E]'>Repayment due</p>
            <p className='mt-1 text-2xl font-medium'>
              {loan.repaymentDueDate
                ? new Date(loan.repaymentDueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : '-'}
            </p>
          </div>
        </div>

        <div className='mb-6'>
          <h3 className='font-medium text-lg text-[#1C1917] mb-3'>Collateral property</h3>
          <Link
            href={`/listing/${loan.propertyName?.toLowerCase().replace(/\s+/g, '-')}`}
            className='inline-block rounded-[8px] border border-[#D6D3D1] bg-cream/30 px-4 py-2 text-sm font-medium text-navy hover:underline'
          >
            View {loan.propertyName}
          </Link>
        </div>

        <div className='mb-6'>
          <h3 className='font-medium text-lg text-[#1C1917] mb-3'>Lend positions</h3>
          <table className='w-full border-collapse border border-medium-grey'>
            <thead>
              <tr className='border-b border-medium-grey'>
                <th className='px-5 py-3 text-left text-sm font-medium text-[#57534E]'>Lender</th>
                <th className='px-5 py-3 text-left text-sm font-medium text-[#57534E]'>Amount funded</th>
                <th className='px-5 py-3 text-left text-sm font-medium text-[#57534E]'>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-5 border-b border-medium-grey py-3 font-inter'>0xabc...a4</td>
                <td className='px-5 border-b border-medium-grey py-3 font-inter'>${formatAmount(loan.fundedAmount)}</td>
                <td className='px-5 border-b border-medium-grey py-3 font-inter'>
                  <span className={`px-2 py-1 text-xs font-medium rounded-[4px] ${getStatusClasses(loan.status)}`}>
                    {loan.status}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {loan.blockchainTxHash && (
          <div className='mb-6'>
            <p className='text-sm text-[#57534E]'>Onchain transaction hash</p>
            <a
              href={`https://basescan.org/tx/${loan.blockchainTxHash}`}
              target='_blank'
              rel='noopener noreferrer'
              className='text-sm text-blue-600 underline break-all'
            >
              {loan.blockchainTxHash}
            </a>
          </div>
        )}

        <div className='flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-5'>
          {loan.status === 'ACTIVE' && (
            <Button
              className='py-3 px-6 bg-navy text-white'
              onClick={() => {
                const modal = document.getElementById('repay-modal-trigger');
                if (modal) modal.click();
              }}
            >
              Repay Loan
            </Button>
          )}
          {loan.status === 'REQUESTED' && (
            <Button variant='outline' className='py-3 px-6 border-navy text-navy'>
              Cancel Intent
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}