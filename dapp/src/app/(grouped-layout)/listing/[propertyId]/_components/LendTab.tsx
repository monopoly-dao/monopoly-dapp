'use client';

import { useFormik } from 'formik';
import { object, number, string } from 'yup';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';

import {
  useLendMutation,
  useGetVaultQuery,
  useGetLoanIntentsQuery,
} from '@/api/vaults';
import { LoanStatus, BorrowIntent, LendIntent } from '@/api/vaults/vaultsApiTypes';
import { formatAmount } from '@/utils/utils';

type Props = {
  propertyId: string;
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

export default function LendTab({ propertyId }: Props) {
  const { data: vaultResponse } = useGetVaultQuery(propertyId);
  const vault = vaultResponse?.data;

  const { data: loanIntentsResponse } = useGetLoanIntentsQuery(
    vault?.collateralToken || 'dummy',
    { skip: !vault?.collateralToken }
  );
  const loanIntents = loanIntentsResponse?.data;

  const [lend, { isLoading }] = useLendMutation();

  const formik = useFormik({
    initialValues: {
      selectedLoanId: '' as string,
      amountToLend: 0,
    },
    onSubmit: async (values) => {
      await lend({
        loanId: values.selectedLoanId,
        payload: { amountFunded: values.amountToLend },
      }).unwrap();
    },
    validationSchema: object({
      selectedLoanId: string().required('Select a loan'),
      amountToLend: number()
        .required('Required')
        .positive('Must be positive'),
    }),
  });

  const { values } = formik;

  // Combine DB loans and onchain intents
  const dbLoans = vault?.loans.filter((l) => l.status === 'REQUESTED' || l.status === 'FUNDING') || [];

  const hasOpenLoans = dbLoans.length > 0 || (loanIntents && (loanIntents.borrowIntents.length > 0 || loanIntents.lendIntents.length > 0));

  if (!vault) {
    return (
      <div className='text-center py-8'>
        <p className='text-sm text-[#57534E]'>No lending vault on this property yet.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {/* DB-backed open loans */}
      {dbLoans.length > 0 && (
        <>
          <p className='text-sm font-medium text-[#1C1917]'>Open Borrow Requests (from vault)</p>
          {dbLoans.map((loan) => {
            const fundingPercent = Math.round((loan.fundedAmount / loan.requestedAmount) * 100);
            const isSelected = values.selectedLoanId === loan.id;

            return (
              <div
                key={loan.id}
                className='rounded-[8px] border border-[#D6D3D1] bg-white p-4 cursor-pointer hover:bg-cream/30 transition-colors'
                onClick={() => formik.setFieldValue('selectedLoanId', loan.id)}
              >
                <div className='flex items-center justify-between mb-2'>
                  <span className={`text-xs font-medium rounded-[6px] px-2 py-1 ${getStatusClasses(loan.status)}`}>
                    {loan.status} {loan.id.slice(-3)}
                  </span>
                  <span className='text-xs text-[#57534E]'>{loan.id}</span>
                </div>
                <p className='font-medium text-lg'>${formatAmount(loan.requestedAmount)} requested</p>
                <div className='mt-2'>
                  <div className='h-2 bg-[#E7E5E4] rounded-full overflow-hidden'>
                    <div
                      className='h-full bg-navy transition-all'
                      style={{ width: `${fundingPercent}%` }}
                    />
                  </div>
                  <p className='text-xs text-[#57534E] mt-1'>
                    Funded: ${formatAmount(loan.fundedAmount)} {fundingPercent}% of ${formatAmount(loan.requestedAmount)}
                  </p>
                </div>
                <div className='mt-3 text-sm text-[#44403C]'>
                  <p>Rate: {loan.interestRate}% p.a. Term: {loan.termMonths} months</p>
                  <p>Collateral: {formatAmount(Number(loan.pledgedTokenAmount))} tokens</p>
                </div>

                {isSelected && (
                  <form onSubmit={formik.handleSubmit} className='mt-4 pt-4 border-t border-[#D6D3D1]'>
                    <Input
                      type='number'
                      label='Amount to lend (USDC)'
                      id='amountToLend'
                      placeholder='0'
                      value={values.amountToLend || ''}
                      onChange={(e) => formik.setFieldValue('amountToLend', Number(e.target.value))}
                      disabled={isLoading}
                    />
                    <Button
                      type='submit'
                      isLoading={isLoading}
                      disabled={!formik.isValid || !formik.dirty}
                      className='mt-3 py-2 w-full bg-navy text-white'
                    >
                      Fund this loan
                    </Button>
                  </form>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* Onchain intents from subgraph */}
      {loanIntents && (loanIntents.borrowIntents.length > 0 || loanIntents.lendIntents.length > 0) && (
        <>
          <p className='text-sm font-medium text-[#1C1917]'>Onchain Open Intents</p>
          <p className='text-xs text-[#57534E]'>From LoanBook contract via subgraph</p>

          {/* Borrow intents */}
          {loanIntents.borrowIntents.map((intent: BorrowIntent) => (
            <div
              key={`borrow-${intent.id}`}
              className='rounded-[8px] border border-[#D6D3D1] bg-white p-4'
            >
              <p className='font-medium text-sm mb-2'>BORROW INTENT id: {intent.id}</p>
              <div className='text-sm text-[#44403C] space-y-1'>
                <p>Collateral: {formatAmount(Number(intent.collateralAmount))} tokens</p>
                <p>Min LTV: {(Number(intent.minLTVBps) / 100).toFixed(1)}% Max rate: {(Number(intent.maxRateBps) / 100).toFixed(1)}%</p>
                <p>Duration: {formatAmount(Number(intent.duration))} days</p>
              </div>
            </div>
          ))}

          {/* Lend intents */}
          {loanIntents.lendIntents.map((intent: LendIntent) => (
            <div
              key={`lend-${intent.id}`}
              className='rounded-[8px] border border-[#D6D3D1] bg-white p-4'
            >
              <p className='font-medium text-sm mb-2'>LEND INTENT id: {intent.id}</p>
              <div className='text-sm text-[#44403C] space-y-1'>
                <p>Max principal: ${formatAmount(Number(intent.maxPrincipal) / 1e6)} USDC</p>
                <p>Offered LTV: {(Number(intent.ltvBps) / 100).toFixed(1)}%</p>
                <p>Rate: {(Number(intent.rateBps) / 100).toFixed(1)}%</p>
              </div>
            </div>
          ))}
        </>
      )}

      {!hasOpenLoans && (
        <div className='text-center py-8'>
          <p className='text-sm text-[#57534E]'>No open loan requests on this property.</p>
        </div>
      )}
    </div>
  );
}