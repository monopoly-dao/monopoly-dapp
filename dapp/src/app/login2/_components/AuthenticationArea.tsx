'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { GoArrowRight } from 'react-icons/go';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';
import SettleyLogo from '@/components/SettleyLogo';

import {
  LoginIds,
  loginInitialValues,
} from '@/app/(login-signup-reset-layout)/login/_utils/loginConstants';
import { loginSchema } from '@/app/(login-signup-reset-layout)/login/_utils/loginValidations';
import { handleErrors } from '@/utils/error';

export default function AuthenticationArea() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
              setShowPassword(false);

              toast.error('Invalid email or password');
              return;
            }
            toast.error(res?.error || 'Something went wrong');
            setIsLoading(false);
            setShowPassword(false);

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
          setShowPassword(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className='flex flex-col flex-1 bg-surface-container-lowest md:px-[64px] px-[16px] py-[48px] min-h-screen justify-center items-center'>
      {/* Mobile Header Only */}
      <div className='md:hidden w-full flex justify-between items-center mb-[48px]'>
        <SettleyLogo colour='new' />
        <a
          href='/signup'
          className='font-label-md text-label-md text-primary hover:underline'
        >
          Sign Up
        </a>
      </div>
      <div className='w-full max-w-md mx-auto text-xs'>
        {/* Desktop Header */}
        <div className='hidden md:flex justify-end absolute top-[64px] right-[64px] items-center gap-[8px]'>
          <span className='font-label-sm text-label-sm text-on-surface-variant tracking-wider'>
            Need to create an account?
          </span>
          <Link
            href='/signup'
            className='font-label-md text-label-md px-6 py-2 border border-outline-variant hover:bg-surface-container-low transition-colors duration-300'
          >
            Sign Up
          </Link>
        </div>
        {/* Main Form Area */}
        <div className=''>
          <header className=''>
            <h2 className='font-headline-lg text-[32px] font-playfair text-headline-lg font-bold text-on-surface'>
              Welcome Back!
            </h2>
            <p className='font-body-md font-inter mt-2 text-body-md text-on-surface-variant'>
              Please enter your details to access your account.
            </p>
          </header>
          <form
            className='space-y-5 pt-4'
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            {/* Email Input */}
            <div className='space-y-[4px]'>
              <label
                htmlFor='email'
                className='font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider'
              >
                Email address
              </label>
              <Input
                id='email'
                {...getFormikInputProps(LoginIds.Email)}
                // className='w-full bg-transparent border-outline-variant focus:border-primary focus:ring-0 py-[8px] transition-colors duration-300 text-[16px] font-inter text-on-surface placeholder:text-outline-variant'
                type='email'
                placeholder='name@example.com'
                required
              />
            </div>
            {/* Password Input */}
            <div className='space-y-[4px] relative'>
              <label
                htmlFor='password'
                className='font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  {...getFormikInputProps(LoginIds.Password)}
                  className='w-full bg-transparent border-b border-outline-variant focus:border-primary focus:ring-0 py-[8px] transition-colors duration-300 text-[16px] font-inter text-on-surface placeholder:text-outline-variant'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='••••••••'
                  required
                />
                <button
                  type='button'
                  className='absolute right-0 bottom-[8px] text-on-surface-variant hover:text-primary transition-colors'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaRegEyeSlash className='w-4 h-4' />
                  ) : (
                    <FaRegEye className='w-4 h-4' />
                  )}
                </button>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <label className='flex items-center gap-[4px] cursor-pointer group'>
                <input
                  className='rounded-sm border-outline-variant text-primary focus:ring-primary w-4 h-4'
                  type='checkbox'
                  // {...getFormikInputProps('rememberMe')}
                />
                <span className='font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface'>
                  Remember me
                </span>
              </label>
              <a
                href='/reset-password'
                className='font-label-sm text-label-sm text-primary font-bold hover:underline'
              >
                Forgot password?
              </a>
            </div>
            {/* Primary Login Button */}
            <Button
              type='submit'
              className='w-full bg-navy text-on-primary py-4 px-[24px] rounded-lg font-label-md text-label-md shadow-sm hover:bg-navy/90 transition-all duration-300 flex items-center justify-center gap-[8px] mt-[48px]'
              isLoading={isLoading}
              disabled={!isValid || !dirty}
              aria-label='Log in'
            >
              Log In
              <GoArrowRight />
            </Button>
            {/* Divider */}
            <div className='relative py-2'>
              <div className='absolute inset-0 flex items-center'>
                <div className='w-full border-t border-outline-variant'></div>
              </div>
              <div className='relative flex justify-center'>
                <span className='bg-surface-container-lowest px-[24px] font-label-sm text-label-sm text-outline'>
                  or connect with
                </span>
              </div>
            </div>
            {/* Social Login */}
            <button
              type='button'
              className='w-full flex items-center justify-center gap-[24px] py-4 border border-outline-variant rounded-lg font-label-md text-label-md hover:bg-surface-container-low transition-all duration-300 group'
              onClick={() => signIn('google')}
            >
              <svg
                className='w-5 h-5'
                viewBox='0 0 24 24'
                aria-hidden='true'
                focusable='false'
              >
                <path
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  fill='#4285F4'
                ></path>
                <path
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  fill='#34A853'
                ></path>
                <path
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z'
                  fill='#FBBC05'
                ></path>
                <path
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  fill='#EA4335'
                ></path>
              </svg>
              <span className='text-on-surface group-hover:text-primary'>
                Continue with Google
              </span>
            </button>
          </form>
        </div>
      </div>
      {/* Footer Links (Contextual) */}
      <footer className='mt-[48px] pt-[24px] flex flex-wrap gap-x-[24px] gap-y-[8px] justify-center md:justify-start border-t border-outline-variant/30'>
        <a
          href='/privacy-policy'
          className='font-label-sm text-label-sm text-outline hover:text-primary transition-colors'
        >
          Privacy Policy
        </a>
        <a
          href='/terms-of-service'
          className='font-label-sm text-label-sm text-outline hover:text-primary transition-colors'
        >
          Terms of Service
        </a>
        <a
          href='/help-center'
          className='font-label-sm text-label-sm text-outline hover:text-primary transition-colors'
        >
          Help Center
        </a>
      </footer>
    </section>
  );
}
