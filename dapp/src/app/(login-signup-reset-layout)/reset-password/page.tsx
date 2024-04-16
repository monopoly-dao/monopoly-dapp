'use client';

import Box from '@mui/material/Box';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { object, string } from 'yup';

import styles from '../../../styles/Signup.module.css';

import { AUTH_BASE_URL } from '../../../api';
import { AuthEndpoints } from '../../../api/auth/authApiConstants';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { handleErrors } from '../../../utils/error';

export default function Page() {
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

        toast.success(
          'Please check your email for a link to reset your password'
        );
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
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { width: 'inherit' },
      }}
      onSubmit={handleSubmit}
      className={styles.right}
    >
      <div className={styles.title}>
        <h1>Reset Password</h1>
        <p>Fill in your email below to reset your password</p>
      </div>
      <div className={styles.form}>
        <Input
          id='email'
          required
          label='Email address'
          {...getFormikInputProps('email')}
        />

        <Button
          type='submit'
          variant='contained'
          disabled={isLoading || !isValid || !dirty}
        >
          Reset Password
        </Button>
      </div>
    </Box>
  );
}
