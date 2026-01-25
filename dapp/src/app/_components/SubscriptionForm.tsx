'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { object, string } from 'yup';

import Button from '@/components/buttons/Button';

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
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='relative flex items-center'>
        <input
          id='email'
          placeholder='Join our newsletter'
          className='w-full h-[48px] pl-6 pr-32 rounded-full bg-transparent border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-white/50 transition-colors text-sm font-inter'
          {...getFormikInputProps('email')}
          autoComplete='off'
        />

        <Button
          className='absolute right-1 top-1 bottom-1 px-6 rounded-full bg-[#E8E2D2] text-[#0B1221] hover:bg-white transition-colors text-sm font-medium h-auto'
          type='submit'
          isLoading={isLoading}
        >
          Subscribe
        </Button>
      </div>
      {errors.email && <p className='text-red-400 text-xs mt-2 ml-4'>{errors.email}</p>}
    </form>
  );
}
