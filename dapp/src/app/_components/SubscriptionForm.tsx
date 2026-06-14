'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { object, string } from 'yup';

import Button from '@/components/buttons/Button';
import SettleyLogo from '@/components/SettleyLogo';

import { BASE_URL } from '@/api';

export default function SubscriptionForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    getFieldMeta,
    getFieldProps,
    values,
    isValid,
    // dirty,
    resetForm,
    errors,
  } = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      if (!isValid) {
        toast.error(errors['email'] || '');
        return;
      }

      setIsLoading(true);

      try {
        await axios.post(
          `${BASE_URL}/subscribe`,
          { email: values.email },
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_MAILERLITE_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
          }
        );

        toast.success('Newsletter subscription activated');
        resetForm();
      } catch (e) {
        toast.error('Failed to submit email');
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: object({
      email: string()
        .email('Email is invalid')
        .required('Please provide email'),
    }),
    validateOnBlur: true,
    validateOnChange: true,
  });

  const getFormikInputProps = (id: keyof typeof values) => {
    return {
      ...getFieldProps(id),
      ...getFieldMeta(id),
    };
  };

  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-col gap-5'>
      <SettleyLogo colour='no-beta' />
      <p>
        Join our newsletter for new ownership opportunities, vault openings, and
        asset updates.
      </p>

      <div className='relative flex items-center'>
        <input
          id='email'
          placeholder='Join our newsletter'
          className='w-full h-[48px] pl-6 pr-32 rounded-full border border-navy focus:outline-none /focus:border-2 transition-colors text-sm font-inter'
          {...getFormikInputProps('email')}
          autoComplete='off'
        />

        <Button
          className='absolute right-1 top-1 bottom-1 px-6 rounded-full bg-navy text-white hover:bg-white transition-colors text-sm font-medium h-auto'
          type='submit'
          isLoading={isLoading}
        >
          Subscribe
        </Button>
      </div>
      {/* {errors.email && (
        <p className='text-red-400 text-xs mt-2 ml-4'>{errors.email}</p>
      )} */}
    </form>
  );
}
