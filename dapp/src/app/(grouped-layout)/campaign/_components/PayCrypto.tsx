import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';

import Button from '@/components/buttons/Button';
import { Input, Select } from '@/components/input';

import { useAppDispatch, useAppSelector } from '@/store';

import {
  setCampaignPaymentStage,
  setCryptoDetails,
} from '@/slices/campaignPaymentSlice';
import { formatAmount, removeNonDigit } from '@/utils/utils';
import { multiStepVariants } from '@/utils/variants';

import { payCryptoInitialValues } from '../_utils/paymentConstants';
import { payCryptoSchema } from '../_utils/paymentValidations';

const paymentOptions = [
  { label: 'Browser Wallet extension (e.g. Metamask)', value: 'metamask' },
  { label: 'CEX transfer (e.g. from Binance)', value: 'cex' },
];

const amounts = [50, 100, 200, 500];

export default function PayCrypto() {
  const { cryptoAmount, method } = useAppSelector(
    (state) => state.campaignPayment
  );

  const dispatch = useAppDispatch();

  const initialValues = useMemo(
    () => ({
      ...payCryptoInitialValues,
      method,
      cryptoAmount,
    }),
    [method, cryptoAmount]
  );

  const {
    values,
    getFieldHelpers,
    getFieldMeta,
    getFieldProps,
    handleSubmit,
    isValid,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit: (values) => {
      dispatch(setCryptoDetails(values));
      dispatch(setCampaignPaymentStage('crptoQR'));
    },
    validationSchema: payCryptoSchema,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,
  });

  const getFormikInputProps = (id: keyof typeof values) => {
    return {
      ...getFieldProps(id),
      ...getFieldMeta(id),
    };
  };

  const getFormikSelectProps = (field: keyof typeof values) => ({
    ...getFieldHelpers(field),
    ...getFieldMeta(field),
  });

  async function handleAddAmount(amount: number) {
    const currentAmount = removeNonDigit(values.cryptoAmount || '0');
    const newAmount = Number(currentAmount) + amount;
    await setFieldValue('cryptoAmount', formatAmount(newAmount, '$'));
  }

  return (
    <motion.form
      variants={multiStepVariants}
      onSubmit={handleSubmit}
      initial='initial'
      exit='exit'
      animate='animate'
      className='grid grid-cols-2 gap-x-3 gap-y-5'
    >
      <div className='col-span-2 flex flex-col gap-1'>
        <Button
          variant='ghost'
          className='w-fit bg-transparent px-0 font-roboto border-none'
          leftIcon={IoIosArrowRoundBack}
          onClick={() => dispatch(setCampaignPaymentStage('details'))}
          type='button'
        >
          Back
        </Button>
        <p className='text-sm mt-1 text-[#121212B2] font-roboto'>
          Minimum purchase
        </p>
        <p className='font-medium text-2xl text-[#121212] font-roboto'>$50</p>
      </div>

      <div className='col-span-2'>
        <Input
          id='cryptoAmount'
          label='Amount'
          {...getFormikInputProps('cryptoAmount')}
          onChange={async (e) =>
            await setFieldValue(
              'cryptoAmount',
              formatAmount(e.target.value, '$')
            )
          }
          containerClassName='border-[#D0D5DD] rounded-[8px]'
        />
      </div>

      <div className='grid grid-cols-5 col-span-2 gap-2 md:gap-4'>
        {amounts.map((amount) => (
          <Button
            key={amount}
            variant='ghost'
            className='w-full font-roboto !text-sm text-[#121212] hover:bg-navy hover:text-white bg-transparent py-3 border-[#00000080]'
            onClick={() => handleAddAmount(amount)}
          >
            +${amount}
          </Button>
        ))}
      </div>

      <div className='col-span-2'>
        <Select
          id='method'
          label='Payment method'
          {...getFormikSelectProps('method')}
          options={paymentOptions}
          containerClassName='border-[#D0D5DD] rounded-[8px]'
        />
      </div>

      <div className='mb-14 col-span-2 flex flex-col items-center gap-5'>
        <Button
          className='!rounded-[100px] w-full font-roboto py-3'
          type='submit'
          disabled={!isValid}
        >
          CONTINUE TO PAYMENT
        </Button>
        <p className='uppercase text-xs font-roboto text-[#101828B2] font-light tracking-[0.15em]'>
          Your payment information is secure and encrypted
        </p>
      </div>
    </motion.form>
  );
}
