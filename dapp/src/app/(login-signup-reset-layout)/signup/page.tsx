'use client';

import Box from '@mui/material/Box';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

import styles from '../../../styles/Signup.module.css';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';

import { AUTH_BASE_URL } from '@/api';
import { AuthEndpoints } from '@/api/auth/authApiConstants';
import { handleErrors } from '@/utils/error';

import { SignupIds, signupInitialValues } from './_utils/signupConstants';
import { signupSchema } from './_utils/signupValidations';
import GoogleButton from '@/components/GoogleButton';

export default function Page() {
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

        toast.success(
          'Please check your email for a link to verify your email address'
        );
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
    <>
      <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { width: 'inherit' },
        }}
        onSubmit={handleSubmit}
        className={styles.right}
      >
        <div className={styles.title}>
          <h1>Get started with Settley</h1>
          <p>Create your account and start purchasing properties in minutes</p>
        </div>
        <div className={styles.form}>
          <Input
            required
            label='Email address'
            id={SignupIds.Email}
            {...getFormikInputProps(SignupIds.Email)}
          />
          <Input
            required
            label='Password'
            id={SignupIds.Password}
            {...getFormikInputProps(SignupIds.Password)}
            type='password'
          />
          <Input
            required
            label='Confirm Password'
            id={SignupIds.ConfirmPassword}
            {...getFormikInputProps(SignupIds.ConfirmPassword)}
            type='password'
            onPaste={(e) => e.preventDefault()}
          />
          <Button
            type='submit'
            className='py-4 px-10'
            isLoading={isLoading}
            disabled={!isValid || !dirty}
          >
            Sign up
          </Button>
          <h4 className={styles.h5}>
            Already have an account?{' '}
            <Link href='/login' className='underline'>
              Log in
            </Link>
          </h4>
        </div>
      </Box>
      <GoogleButton />
    </>
  );
}
