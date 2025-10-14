import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';

import { useAppDispatch, useAppSelector } from '@/store';

import {
  setCampaignPaymentStage,
  setDetails,
} from '@/slices/campaignPaymentSlice';
import { multiStepVariants } from '@/utils/variants';

import { detailsInitialValues } from '../_utils/paymentConstants';
import { detailsSchema } from '../_utils/paymentValidations';

// const paymentOptions = ['Crypto'].map((e) => ({ label: e, value: e }));

type Props = {
  isOnHomepage?: boolean;
};

export default function PayeeDetails({ isOnHomepage }: Props) {
  const { firstName, lastName, email, phone, country } = useAppSelector(
    (state) => state.campaignPayment
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const initialValues = useMemo(
    () => ({
      ...detailsInitialValues,
      firstName,
      lastName,
      email,
      phone,
      country,
      // paymentMethod,
    }),
    [firstName, lastName, email, phone, country]
  );

  const {
    values,
    // getFieldHelpers,
    getFieldMeta,
    getFieldProps,
    handleSubmit,
    isValid,
  } = useFormik({
    initialValues,
    onSubmit: (values) => {
      if (isOnHomepage) {
        router.push('/campaign/payment');
      }

      dispatch(setDetails(values));
      dispatch(setCampaignPaymentStage('crypto'));
    },
    validationSchema: detailsSchema,
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

  // const getFormikSelectProps = (field: keyof typeof values) => ({
  //   ...getFieldHelpers(field),
  //   ...getFieldMeta(field),
  // });

  return (
    <motion.form
      variants={multiStepVariants}
      onSubmit={handleSubmit}
      initial='initial'
      exit='exit'
      animate='animate'
      className='grid grid-cols-2 gap-x-3 gap-y-5'
    >
      <Input
        id='firstName'
        label='First name'
        {...getFormikInputProps('firstName')}
        containerClassName='border-[#D0D5DD] rounded-[8px]'
      />
      <Input
        id='lastName'
        label='Last name'
        {...getFormikInputProps('lastName')}
        containerClassName='border-[#D0D5DD] rounded-[8px]'
      />
      <Input
        id='country'
        label='Country'
        {...getFormikInputProps('country')}
        containerClassName='border-[#D0D5DD] rounded-[8px]'
      />
      <Input
        id='phone'
        label='Phone number'
        {...getFormikInputProps('phone')}
        containerClassName='border-[#D0D5DD] rounded-[8px]'
      />
      <div className='col-span-2'>
        <Input
          id='email'
          label='Email'
          {...getFormikInputProps('email')}
          containerClassName='border-[#D0D5DD] rounded-[8px]'
        />
      </div>
      {/* <div className='col-span-2'>
        <Select
          id='paymentMethod'
          label='Preferred payment method'
          {...getFormikSelectProps('paymentMethod')}
          options={paymentOptions}
          containerClassName='border-[#D0D5DD] rounded-[8px]'
        />
      </div> */}

      <Button
        className='mb-14 col-span-2 !rounded-[100px] w-full font-roboto py-3'
        type='submit'
        disabled={!isValid}
      >
        {isOnHomepage ? 'SECURE MY SPOT' : 'CONTINUE TO PAYMENT'}
      </Button>
    </motion.form>
  );
}
