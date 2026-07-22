'use client';

import Link from 'next/link';

import Button from '@/components/buttons/Button';
import { formatAmount } from '@/utils/utils';
import useDisclosure from '@/hooks/useDisclosure';

import {
  Loan,
  LoanStatus,
  AmountDueResponse,
} from '@/api/vaults/vaultsApiTypes';
import { useGetAmountDueQuery } from '@/api/vaults';
import RepayLoanModal from '@/components/modals/RepayLoanModal';
import CancelIntentModal from '@/components/modals/CancelIntentModal';

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
    case 'CANCELLED':
      return 'bg-[#F5F5F4] text-[#78716C]';
    default:
      return 'bg-cream text-[#57534E] border border-[#D6D3D1]';
  }
}

type Props = {
  loanId: string;
};

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
  onchainIntentId: '4',
  onchainLoanId: '12',
  propertyName: '14 Riverside Court',
};

export default function LoanDetailClient({ loanId: _ }: Props) {
  const loan = mockLoan;
  const { data: amountDueResponse } = useGetAmountDueQuery(loan.id);
  const amountDue: AmountDueResponse['amountDue'] = amountDueResponse?.data?.amountDue || '53200.00';
  const source = amountDueResponse?.data?.source || 'calculated';

  const { isOpen: isRepayOpen, open: openRepay, close: closeRepay } = useDisclosure();
  const { isOpen: isCancelOpen, open: openCancel, close: closeCancel } = useDisclosure();

  const showRepay = loan.status === 'ACTIVE' || loan.status === 'OVERDUE';
  const showCancel = loan.status === 'REQUESTED';

  return (
    <div className='px-[5%] lg:px-[7%] font-inter'>
      <Link href='/dashboard' className='inline-block text-sm text-navy hover:underline mb-6'>
        ← Back to dashboard
      </Link>

      <div className='rounded-[8px] border border-[#D6D3D1] bg-white p-6 sm:p-8'>
        <div className='mb-6'>
          <h1 className='text-3xl font-medium text-[#1C1917]'>
            Loan — {loan.propertyName}
          </h1>
          <div className='mt-2'>
            <span className={`px-2 py-1 text-xs font-medium rounded-[4px] ${getStatusClasses(loan.status)}`}>
              {loan.status}
            </span>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 mb-6'>
          <div className='rounded-[8px] border border-[#D6D3D1] p-4'>
            <p className='text-sm text-[#57534E]'>Principal</p>
            <p className='mt-1 text-2xl font-medium'>${formatAmount(loan.requestedAmount)}</p>
          </div>
          <div className='rounded-[8px] border border-[#D6D3D1] p-4'>
            <p className='text-sm text-[#57534E]'>Amount due now</p>
            <div className='mt-1 flex items-center gap-2'>
              <p className='text-2xl font-medium'>${amountDue}</p>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-[4px] ${
                  source === 'onchain'
                    ? 'bg-[#D1FAE5] text-[#065F46]'
                    : 'bg-cream text-[#57534E]'
                }`}
                title={source === 'calculated' ? 'Estimated — smart contract not yet live' : undefined}
              >
                ● {source}
              </span>
            </div>
          </div>
          <div className='rounded-[8px] border border-[#D6D3D1] p-4'>
            <p className='text-sm text-[#57534E]'>Rate</p>
            <p className='mt-1 text-2xl font-medium'>{loan.interestRate}% p.a.</p>
          </div>
          <div className='rounded-[8px] border border-[#D6D3D1] p-4'>
            <p className='text-sm text-[#57534E]'>Term</p>
            <p className='mt-1 text-2xl font-medium'>{loan.termMonths} months</p>
          </div>
          <div className='rounded-[8px] border border-[#D6D3D1] p-4'>
            <p className='text-sm text-[#57534E]'>Pledged tokens</p>
            <p className='mt-1 text-2xl font-medium'>{formatAmount(Number(loan.pledgedTokenAmount))}</p>
          </div>
          <div className='rounded-[8px] border border-[#D6D3D1] p-4'>
            <p className='text-sm text-[#57534E]'>Due date</p>
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

        {/* Onchain IDs */}
        <div className='mb-6'>
          <h3 className='font-medium text-lg text-[#1C1917] mb-3'>Onchain IDs</h3>
          <div className='space-y-2 text-sm'>
            {loan.onchainIntentId && (
              <p>
                Intent ID <span className='text-navy'>{loan.onchainIntentId}</span>
              </p>
            )}
            {loan.onchainLoanId && (
              <p>
                Loan ID <span className='text-navy'>{loan.onchainLoanId}</span> (after matching)
              </p>
            )}
            {loan.blockchainTxHash && (
              <p>
                Tx hash{' '}
                <a
                  href={`https://basescan.org/tx/${loan.blockchainTxHash}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-blue-600 underline break-all'
                >
                  {loan.blockchainTxHash.slice(0, 10)}...{loan.blockchainTxHash.slice(-8)} ↗
                </a>
              </p>
            )}
          </div>
        </div>

        {/* Lend Positions */}
        {loan.positions && loan.positions.length > 0 && (
          <div className='mb-6'>
            <h3 className='font-medium text-lg text-[#1C1917] mb-3'>Lend Positions</h3>
            <table className='w-full border-collapse border border-medium-grey'>
              <thead>
                <tr className='border-b border-medium-grey'>
                  <th className='px-5 py-3 text-left text-sm font-medium text-[#57534E]'>Lender</th>
                  <th className='px-5 py-3 text-left text-sm font-medium text-[#57534E]'>Amount</th>
                  <th className='px-5 py-3 text-left text-sm font-medium text-[#57534E]'>Onchain intent</th>
                </tr>
              </thead>
              <tbody>
                {loan.positions.map((pos) => (
                  <tr key={pos.id}>
                    <td className='px-5 border-b border-medium-grey py-3 font-inter'>
                      {pos.lenderId.slice(0, 6)}...{pos.lenderId.slice(-4)}
                    </td>
                    <td className='px-5 border-b border-medium-grey py-3 font-inter'>
                      ${formatAmount(pos.amountFunded)}
                    </td>
                    <td className='px-5 border-b border-medium-grey py-3 font-inter'>
                      intent id: {pos.onchainIntentId || pos.id}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Action buttons */}
        <div className='flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-5'>
          {showRepay && (
            <Button className='py-3 px-6 bg-navy text-white' onClick={openRepay}>
              Repay Loan
            </Button>
          )}
          {showCancel && (
            <Button variant='outline' className='py-3 px-6 border-navy text-navy' onClick={openCancel}>
              Cancel Intent
            </Button>
          )}
        </div>
      </div>

      {/* Modals */}
      <RepayLoanModal
        isOpen={isRepayOpen}
        handleCloseModal={closeRepay}
        handleOpenModal={openRepay}
        loanId={loan.id}
        amountDue={amountDue}
        propertyName={loan.propertyName}
      />
      <CancelIntentModal
        isOpen={isCancelOpen}
        handleCloseModal={closeCancel}
        handleOpenModal={openCancel}
        loanId={loan.id}
        intentType='borrow'
      />
    </div>
  );
}