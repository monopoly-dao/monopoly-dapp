'use client';

import { useFormik } from 'formik';
import { object, number, string } from 'yup';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';

import { useLendMutation } from '@/api/vaults';
import { formatAmount } from '@/utils/utils';

const mockOpenLoans = [
  {
    id: 'loan_01',
    requestedAmount: 50000,
    fundedAmount: 12000,
    interestRate: 12,
    termMonths: 6,
    status: 'REQUESTED',
    pledgedTokens: 35000,
    collateralValue: 42000,
    propertyName: '14 Riverside Court',
  },
];

type Props = {
  propertyId: string;
};

export default function LendTab({ propertyId: _ }: Props) {
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

  const selectedLoan = mockOpenLoans.find((loan) => loan.id === values.selectedLoanId);
  const fundingPercent = selectedLoan
    ? Math.round((selectedLoan.fundedAmount / selectedLoan.requestedAmount) * 100)
    : 0;

  if (mockOpenLoans.length === 0) {
    return (
      <div className='text-center py-8'>
        <p className='text-sm text-[#57534E]'>No open loan requests on this property.</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {mockOpenLoans.map((loan) => (
        <div
          key={loan.id}
          className='rounded-[8px] border border-[#D6D3D1] bg-white p-4 cursor-pointer hover:bg-cream/30 transition-colors'
          onClick={() => formik.setFieldValue('selectedLoanId', loan.id)}
        >
          <div className='flex items-center justify-between mb-2'>
            <span className='text-xs font-medium text-navy bg-cream px-2 py-1 rounded-[6px]'>
              OPEN REQUEST
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
              Funded: ${formatAmount(loan.fundedAmount)} ${fundingPercent}% of ${formatAmount(loan.requestedAmount)}
            </p>
          </div>
          <div className='mt-3 text-sm text-[#44403C]'>
            <p>Rate: {loan.interestRate}% p.a.</p>
            <p>Term: {loan.termMonths} months</p>
            <p>Collateral: {formatAmount(loan.pledgedTokens)} tokens (${formatAmount(loan.collateralValue)})</p>
          </div>

          {values.selectedLoanId === loan.id && (
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
      ))}
    </div>
  );
}