'use client';

import { useFormik } from 'formik';
import { object, number } from 'yup';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';
import LoadingText from '@/components/LoadingText';

import { useRequestLoanMutation } from '@/api/vaults';
import { formatAmount } from '@/utils/utils';

const mockOwnership = { tokenBalance: 12000, totalSupply: 100000 };

// Reusable slider component (matching VaultPlayground pattern)
type SliderProps = {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  suffix?: string;
  value: number;
  valueLabel: string;
  disabled?: boolean;
};

function SliderControl({
  label,
  max,
  min,
  onChange,
  step,
  suffix,
  value,
  valueLabel,
  disabled,
}: SliderProps) {
  return (
    <label className='block'>
      <div className='mb-3 flex items-start justify-between gap-4'>
        <span className='font-medium text-[#1C1917]'>{label}</span>
        <span className='rounded-[6px] border border-[#D6D3D1] bg-white px-3 py-1 text-sm font-medium text-[#272343]'>
          {valueLabel}
          {suffix}
        </span>
      </div>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className='h-2 w-full accent-[#272343]'
        disabled={disabled}
      />
    </label>
  );
}

type Props = {
  propertyId: string;
};

export default function BorrowTab({ propertyId }: Props) {
  const [requestLoan, { isLoading }] = useRequestLoanMutation();

  const tokenPrice = 1;
  const maxTokensToPledge = mockOwnership.tokenBalance;

  const formik = useFormik({
    initialValues: {
      tokensToPledge: 0,
      loanAmount: 0,
      interestRate: 8,
      termMonths: 6,
    },
    onSubmit: async (values) => {
      await requestLoan({
        vaultId: propertyId,
        payload: {
          pledgedTokenAmount: values.tokensToPledge,
          requestedAmount: values.loanAmount,
          interestRate: values.interestRate,
          termMonths: values.termMonths,
        },
      }).unwrap();
    },
    validationSchema: object({
      tokensToPledge: number()
        .required('Required')
        .min(1, 'Must pledge at least 1 token'),
      loanAmount: number()
        .required('Required')
        .positive('Must be positive'),
      interestRate: number()
        .required('Required')
        .min(4, 'Minimum 4%')
        .max(24, 'Maximum 24%'),
      termMonths: number()
        .required('Required')
        .min(1, 'Minimum 1 month')
        .max(18, 'Maximum 18 months'),
    }),
  });

  const { values, handleSubmit, isValid, dirty } = formik;

  const collateralValue = values.tokensToPledge * tokenPrice;
  const ltv = values.loanAmount > 0 ? (values.loanAmount / collateralValue) * 100 : 0;
  const interest = values.loanAmount * (values.interestRate / 100) * (values.termMonths / 12);
  const totalRepayable = values.loanAmount + interest;

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div>
        <p className='text-sm text-[#57534E] mb-2'>
          Your token balance: <strong>{formatAmount(mockOwnership.tokenBalance)} tokens</strong>
        </p>
        <p className='text-sm text-[#57534E] mb-4'>Max LTV: 60%</p>
      </div>

      <SliderControl
        label='Tokens to pledge'
        min={0}
        max={maxTokensToPledge}
        step={100}
        value={values.tokensToPledge}
        valueLabel={formatAmount(values.tokensToPledge) ?? ''}
        onChange={(v) => formik.setFieldValue('tokensToPledge', v)}
      />

      <Input
        type='number'
        label='Loan amount (USDC)'
        id='loanAmount'
        placeholder='0'
        value={values.loanAmount || ''}
        onChange={(e) => formik.setFieldValue('loanAmount', Number(e.target.value))}
        disabled={isLoading}
      />

      <Input
        type='number'
        label='Interest rate (%)'
        id='interestRate'
        placeholder='8'
        value={values.interestRate || ''}
        onChange={(e) => formik.setFieldValue('interestRate', Number(e.target.value))}
        disabled={isLoading}
      />

      <label className='block'>
        <span className='mb-3 block font-medium text-[#1C1917]'>Term (months)</span>
        <select
          id='termMonths'
          value={values.termMonths}
          onChange={(e) => formik.setFieldValue('termMonths', Number(e.target.value))}
          disabled={isLoading}
          className='w-full rounded-[6px] border border-[#D6D3D1] bg-white px-4 py-3 text-sm font-medium text-[#1C1917]'
        >
          <option value={1}>1 month</option>
          <option value={3}>3 months</option>
          <option value={6}>6 months</option>
          <option value={12}>12 months</option>
          <option value={18}>18 months</option>
        </select>
      </label>

      {(values.tokensToPledge > 0 || values.loanAmount > 0) && (
        <div className='rounded-[8px] border border-[#D6D3D1] bg-cream/50 p-4'>
          <p className='text-sm font-medium text-[#1C1917] mb-3'>Loan preview</p>
          <div className='flex flex-col gap-2 text-sm'>
            <div className='flex justify-between'>
              <span className='text-[#57534E]'>Collateral value</span>
              <span className='font-medium'>${formatAmount(collateralValue)}</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-[#57534E]'>LTV</span>
              <span className='font-medium'>
                <LoadingText isLoading={false} value={`${ltv.toFixed(1)}%`} />
              </span>
            </div>
            <div className='flex justify-between border-t border-[#D6D3D1] pt-2'>
              <span className='font-medium'>Total repayable</span>
              <span className='font-semibold text-navy'>${formatAmount(totalRepayable)}</span>
            </div>
          </div>
        </div>
      )}

      <Button
        type='submit'
        isLoading={isLoading}
        disabled={!isValid || !dirty}
        className='py-3 w-full bg-navy text-white'
      >
        Request Loan
      </Button>

      <p className='text-xs text-[#57534E] mt-2'>
        Your request is reviewed before matching with a lender.
      </p>
    </form>
  );
}