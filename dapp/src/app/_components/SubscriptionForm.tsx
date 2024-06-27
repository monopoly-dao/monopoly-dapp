'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { object, string } from 'yup';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';
import SettleyLogo from '@/components/SettleyLogo';

export default function SubscriptionForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    getFieldMeta,
    getFieldProps,
    values,
    isValid,
    dirty,
    resetForm,
  } = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        await axios.post(
          'https://connect.mailerlite.com/api/subscribers',
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
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
      <SettleyLogo colour='new' />
      <p>Join our newsletter to stay up to date on new property listings</p>

      <div className='flex items-start gap-4 h-[53px]'>
        <Input
          id='email'
          // label='Email address'
          placeholder='Enter your email'
          containerClassName='h-full'
          className='h-full'
          {...getFormikInputProps('email')}
        />

        <Button
          className='py-4 px-7 rounded-[6px] h-[calc(100%-8px)] sm:h-[calc(100%-2px)]'
          // variant='dark'
          type='submit'
          isLoading={isLoading}
          disabled={!isValid || !dirty}
        >
          Subscribe
        </Button>
      </div>

      <p className='-mt-2'>
        By subscribing, you agree to our{' '}
        <Link href='/' className='underline'>
          Privacy Policy
        </Link>{' '}
        and provide consent to receive updates from Settley.
      </p>
    </form>
  );
}
