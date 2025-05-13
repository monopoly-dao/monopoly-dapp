'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { object, string } from 'yup';

import styles from '../../../../styles/Signup.module.css';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';

import { AUTH_BASE_URL } from '@/api';
import { AuthEndpoints } from '@/api/auth/authApiConstants';
import { handleErrors } from '@/utils/error';
import { multiStepVariants } from '@/utils/variants';

type Props = {
  setIsFormSubmitted: Dispatch<SetStateAction<boolean>>;
};

export default function ResetPasswordForm({ setIsFormSubmitted }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  // const handleClose = (e: React.SyntheticEvent | Event, reason?: string) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  // };

  const {
    getFieldProps,
    getFieldMeta,
    values,
    resetForm,
    isValid,
    dirty,
    handleSubmit,
  } = useFormik({
    initialValues: { email: '' },
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        await axios.post(
          `${AUTH_BASE_URL}${AuthEndpoints.ResetPassword.replace(
            ':email',
            values.email
          )}`
        );

        resetForm();

        // toast.success(
        //   'Please check your email for a link to reset your password'
        // );

        setIsFormSubmitted(true);
      } catch (error) {
        handleErrors(error);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: object({
      email: string()
        .required('Please provide your email')
        .email('Email is invalid'),
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
    <motion.form
      variants={multiStepVariants}
      initial='initial'
      exit='exit'
      animate='animate'
      onSubmit={handleSubmit}
      className={styles.right}
    >
      <h1 className='font-merriweather font-bold text-3xl mb-4'>
        Forgot your password?
      </h1>

      <p className='text-sm font-roboto text-[#1C1917]/80'>
        Please enter the email address associated with your Settley account, and
        we'll send you instructions to reset your password securely.
      </p>
      <div className={styles.form}>
        <Input
          id='email'
          label='Email address'
          {...getFormikInputProps('email')}
          labelClassName='font-roboto font-medium !text-xs text-[#A8A29E]'
        />

        <Button
          type='submit'
          className='py-3 px-10 mt-6 rounded-[8px] font-roboto'
          isLoading={isLoading}
          disabled={!isValid || !dirty}
        >
          Request password reset
        </Button>
        <Link
          href='/login'
          className='text-center font-roboto text-sm font-medium py-3 mt-2'
        >
          Back to Log in
        </Link>
      </div>
    </motion.form>
  );
}
