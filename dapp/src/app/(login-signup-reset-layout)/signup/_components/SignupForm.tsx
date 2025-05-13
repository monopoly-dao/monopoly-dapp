'use client';

import Box from '@mui/material/Box';
import axios from 'axios';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Dispatch, SetStateAction, useState } from 'react';

import styles from '../../../../styles/Signup.module.css';

import Button from '@/components/buttons/Button';
import GoogleButton from '@/components/GoogleButton';
import { Input } from '@/components/input';
import PasswordChecklist from '@/components/PasswordChecklist';

import { AUTH_BASE_URL } from '@/api';
import { AuthEndpoints } from '@/api/auth/authApiConstants';
import { handleErrors } from '@/utils/error';
import { testPassword } from '@/utils/utils';
import { multiStepVariants } from '@/utils/variants';

import { SignupIds, signupInitialValues } from '../_utils/signupConstants';
import { signupSchema } from '../_utils/signupValidations';

type Props = {
  setIsFormSubmitted: Dispatch<SetStateAction<boolean>>;
  setEmail: Dispatch<SetStateAction<string>>;
};

export default function SignupForm({ setIsFormSubmitted, setEmail }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    getFieldProps,
    getFieldMeta,
    values,
    resetForm,
    isValid,
    dirty,
    handleSubmit,
  } = useFormik({
    initialValues: signupInitialValues,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await axios.post(`${AUTH_BASE_URL}${AuthEndpoints.Signup}`, {
          email: values.email,
          password: values.password,
        });

        resetForm();

        // toast.success(
        //   'Please check your email for a link to verify your email address'
        // );

        setIsFormSubmitted(true);
        setEmail(values.email);
      } catch (error) {
        handleErrors(error);
      } finally {
        setIsLoading(false);
      }
    },
    validationSchema: signupSchema,
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
    <motion.div
      variants={multiStepVariants}
      initial='initial'
      exit='exit'
      animate='animate'
    >
      <div className='absolute flex items-center top-5 right-[5%] sm:right-10 gap-4'>
        <p className='font-roboto hidden sm:block text-sm text-[#57534E]'>
          Already have an account?
        </p>
        <Link
          href='/login'
          className='rounded-[8px] text-black px-4 py-3 border border-black font-roboto text-sm'
        >
          Log in
        </Link>
      </div>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { width: 'inherit' },
        }}
        onSubmit={handleSubmit}
        className={styles.right}
      >
        <h1 className='font-merriweather font-bold text-3xl mb-4'>Sign up</h1>

        <div className={styles.form}>
          <Input
            label='Email address'
            id={SignupIds.Email}
            {...getFormikInputProps(SignupIds.Email)}
            labelClassName='font-roboto font-medium !text-xs text-[#A8A29E]'
          />
          <Input
            label='Password'
            id={SignupIds.Password}
            {...getFormikInputProps(SignupIds.Password)}
            type='password'
            labelClassName='font-roboto font-medium !text-xs text-[#A8A29E]'
          />
          <Input
            label='Confirm Password'
            id={SignupIds.ConfirmPassword}
            {...getFormikInputProps(SignupIds.ConfirmPassword)}
            type='password'
            onPaste={(e) => e.preventDefault()}
            labelClassName='font-roboto font-medium !text-xs text-[#A8A29E]'
          />
          <div className='flex flex-col gap-3'>
            <PasswordChecklist
              label='At least 8 characters'
              checked={testPassword('length', values.password, 8)}
            />
            <PasswordChecklist
              label='At least one number'
              checked={testPassword('number', values.password)}
            />
            <PasswordChecklist
              label='Uppercase and lowercase characters'
              checked={
                testPassword('uppercase', values.password) &&
                testPassword('lowercase', values.password)
              }
            />
            <PasswordChecklist
              label='At least one special character'
              checked={testPassword('special', values.password)}
            />
          </div>
          <Button
            type='submit'
            className='py-3 px-10 mt-6 rounded-[8px] font-roboto'
            isLoading={isLoading}
            disabled={!isValid || !dirty}
          >
            Sign up
          </Button>
        </div>
        <p className='text-center font-roboto text-xs text-[#78716C] my-4'>
          By clicking the Sign up button, I have fully read, understood and I
          agree with the Privacy Policy & Terms of Use
        </p>
      </Box>
      <GoogleButton />
    </motion.div>
  );
}
