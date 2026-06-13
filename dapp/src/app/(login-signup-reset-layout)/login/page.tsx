'use client';

import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { GoArrowRight } from 'react-icons/go';

import styles from '../../../styles/Signup.module.css';

import { cn } from '@/lib/utils';

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
    <main className='w-full'>
      <header className=''>
        <h2 className='font-headline-lg text-[32px] font-playfair text-headline-lg font-bold text-on-surface'>
          Welcome Back!
        </h2>
        <p className='font-body-md font-inter text-body-md text-on-surface-variant'>
          Manage your property tokens, bookmarks, and Settley activity.
        </p>
      </header>
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
        <div className={cn(styles.form, 'mt-6 space-y-4')}>
          <Input
            id={LoginIds.Email}
            label='Email address'
            {...getFormikInputProps(LoginIds.Email)}
            error='ignore'
          // labelClassName='font-roboto font-medium !text-xs text-[#A8A29E]'
          />
          <div>
            <Input
              id={LoginIds.Password}
              label='Password'
              {...getFormikInputProps(LoginIds.Password)}
              type='password'
              error='ignore'
            // labelClassName='font-roboto font-medium !text-xs text-[#A8A29E]'
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
            className='w-full bg-navy !text-on-primary py-4 px-[24px] rounded-lg font-label-md text-label-md shadow-sm hover:bg-navy/90 transition-all duration-300 flex items-center justify-center gap-[8px] mt-[48px]'
            isLoading={isLoading}
            disabled={!isValid || !dirty}
            aria-label='Log in'
          >
            Log In
            <GoArrowRight />
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
        <GoogleButton type='outlined' handleClick={() => signIn('google')}>
          Continue with Google
        </GoogleButton>
      </div>
    </main>
  );
}
