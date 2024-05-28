'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { object, string } from 'yup';

import { Input } from '@/components/input';

import Button from '../../components/Button';
import { handleErrors } from '../../utils/error';

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
      subscribe: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        axios.post(
          `https://mdao-emailservice.fly.dev/email/send?email=${values.subscribe}`
        );

        toast.success('Newsletter subscription activated');
        resetForm();
      } catch (e) {
        handleErrors(e);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: object({
      subscribe: string()
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
    <form onSubmit={handleSubmit} className='w-80 p-5 flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <div className='w-4 h-4 bg-[#72ff5b] rounded-[100%]' />
        <h4>NEWSLETTER</h4>
      </div>
      <p>Get a summary of the Settley community action every week</p>

      <Input
        id='subscribe'
        required
        label='Email address'
        {...getFormikInputProps('subscribe')}
      />

      <div>
        <Button
          className='black-bg !w-fit'
          type='submit'
          isLoading={isLoading}
          disabled={!isValid || !dirty}
          variant='contained'
        >
          Subscribe!
        </Button>
      </div>
    </form>
  );
}
