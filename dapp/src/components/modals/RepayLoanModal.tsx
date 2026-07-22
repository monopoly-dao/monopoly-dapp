'use client';

import { useFormik } from 'formik';
import { number } from 'yup';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';
import Modal from '@/components/modal';

import { useRepayMutation } from '@/api/vaults';

type Props = {
  isOpen: boolean;
  handleCloseModal: () => void;
  handleOpenModal: () => void;
  loanId: string;
  amountDue: string;
  propertyName?: string;
};

export default function RepayLoanModal({
  isOpen,
  handleCloseModal,
  handleOpenModal,
  loanId,
  amountDue,
  propertyName = 'Property',
}: Props) {
  const [repay, { isLoading }] = useRepayMutation();

  const formik = useFormik({
    initialValues: {
      amount: amountDue,
    },
    onSubmit: async (values) => {
      await repay({
        loanId,
        payload: { amount: values.amount },
      }).unwrap();
      handleCloseModal();
    },
    validationSchema: number()
      .required('Required')
      .positive('Must be positive'),
    enableReinitialize: true,
  });

  const { values, handleSubmit, isValid, dirty } = formik;

  return (
    <Modal
      isOpen={isOpen}
      handleCloseModal={handleCloseModal}
      handleOpenModal={handleOpenModal}
      title={`Repay loan — ${propertyName}`}
      className='w-[92%] max-w-[480px]'
    >
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-6 sm:p-8'>
        <div className='rounded-[8px] border border-[#D6D3D1] bg-cream/30 p-4'>
          <p className='text-sm text-[#57534E]'>Amount due (from contract)</p>
          <p className='mt-1 text-xl font-medium'>${amountDue}</p>
        </div>

        <Input
          type='number'
          label='USDC amount to send'
          id='amount'
          placeholder='0'
          value={values.amount}
          onChange={(e) => formik.setFieldValue('amount', e.target.value)}
          disabled={isLoading}
        />

        <p className='text-sm text-[#57534E]'>
          You are repaying the full amount due. Pledged tokens will be released.
        </p>

        <div className='flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:gap-5'>
          <Button
            type='button'
            variant='outline'
            onClick={handleCloseModal}
            disabled={isLoading}
            className='py-2 px-4 border-navy text-navy'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            isLoading={isLoading}
            disabled={!isValid || !dirty}
            className='py-2 px-6 bg-navy text-white'
          >
            Confirm Repayment
          </Button>
        </div>
      </form>
    </Modal>
  );
}