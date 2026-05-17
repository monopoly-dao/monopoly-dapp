'use client';

import axios from 'axios';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
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
      <header className='mb-6'>
        <h2 className='font-headline-lg text-[32px] font-playfair text-headline-lg font-bold text-on-surface'>
          Reset Your Password
        </h2>
        <p className='font-body-md font-inter text-body-md text-on-surface-variant'>
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </header>

      {/* <p className='text-sm font-roboto text-[#1C1917]/80'>
        Please enter the email address associated with your Settley account, and
        we'll send you instructions to reset your password securely.
      </p> */}
      <div className={styles.form}>
        <Input
          id='email'
          label='Email address'
          {...getFormikInputProps('email')}
          error='ignore'
        // labelClassName='font-roboto font-medium !text-xs text-[#A8A29E]'
        />

        <Button
          type='submit'
          className='w-full bg-navy !text-on-primary py-4 px-[24px] rounded-lg font-label-md text-label-md shadow-sm hover:bg-navy/90 transition-all duration-300 flex items-center justify-center gap-[8px] mt-[48px]'
          disabled={!isValid || !dirty}
          aria-label='Reset Password'
        >
          Request Password Reset
          <GoArrowRight />
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
