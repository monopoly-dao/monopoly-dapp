'use client';

import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import styles from '../../../styles/Signup.module.css';

import Button from '@/components/buttons/Button';
import GoogleButton from '@/components/GoogleButton';
import { Input } from '@/components/input';

import { handleErrors } from '@/utils/error';

import { LoginIds, loginInitialValues } from './_utils/loginConstants';
import { loginSchema } from './_utils/loginValidations';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { getFieldProps, getFieldMeta, values, isValid, dirty, handleSubmit } =
    useFormik({
      initialValues: loginInitialValues,
      onSubmit: async (values) => {
        try {
          setIsLoading(true);
          const res = await signIn('login', { redirect: false, ...values });

          if ((!res || res.error) && res?.error !== 'undefined') {
            if (res?.error === 'CredentialsSignin') {
              setIsLoading(false);

              toast.error('Something went wrong');
              return;
            }
            toast.error(res?.error || 'Something went wrong');
            setIsLoading(false);

            return;
          }
          // resetForm();
          const callbackUrl = searchParams.get('callbackUrl');

          if (typeof callbackUrl === 'string') {
            router.replace(new URL(callbackUrl).toString());

            return (window.location.href = new URL(callbackUrl).toString());
          }

          router.replace('/');
          window.location.href = `${window.location.origin}/`;
        } catch (error) {
          setIsLoading(false);
          handleErrors(error);
        }
      },
      validationSchema: loginSchema,
      validateOnBlur: true,
      validateOnChange: true,
      validateOnMount: true,
    });

  const getFormikInputProps = (id: keyof typeof values) => {
    return {
      ...getFieldProps(id),
      ...getFieldMeta(id),
    };
  };

  return (
    <>
      <div className='absolute flex items-center top-5 right-[5%] sm:right-10 gap-4'>
        <p className='font-roboto hidden sm:block text-sm text-[#57534E]'>
          Need to create an account?
        </p>
        <Link
          href='/signup'
          className='rounded-[8px] text-black px-4 py-3 border border-black font-roboto text-sm'
        >
          Sign Up
        </Link>
      </div>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { width: 'inherit' },
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        className={styles.right}
      >
        <h1 className='font-merriweather font-bold text-3xl mb-4'>
          Welcome Back!
        </h1>

        <div className={styles.form}>
          <Input
            id={LoginIds.Email}
            label='Email address'
            {...getFormikInputProps(LoginIds.Email)}
            labelClassName='font-roboto font-medium !text-xs text-[#A8A29E]'
          />
          <div>
            <Input
              id={LoginIds.Email}
              label='Password'
              {...getFormikInputProps(LoginIds.Password)}
              type='password'
              labelClassName='font-roboto font-medium !text-xs text-[#A8A29E]'
            />
            <Link
              href='/reset-password'
              className='mt-1 font-semibold text-sm font-inter flex justify-end w-full'
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type='submit'
            className='py-3 px-10 mt-6 rounded-[8px] font-roboto'
            isLoading={isLoading}
            disabled={!isValid || !dirty}
          >
            Log In
          </Button>
          {/* <h4 className={styles.h5}>
            Don&apos;t have an account?{' '}
            <Link href='/signup' className='underline'>
              Sign up
            </Link>
          </h4> */}
        </div>
      </Box>
      <div className='mt-3'>
        <GoogleButton />
      </div>
    </>
  );
}
