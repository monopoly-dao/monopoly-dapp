'use client';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import styles from '../../../styles/Signup.module.css';

import { LoginIds, loginInitialValues } from './_utils/loginConstants';
import { loginSchema } from './_utils/loginValidations';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { handleErrors } from '../../../utils/error';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = () => {
    setShowPassword(!showPassword);
  };

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
    initialValues: loginInitialValues,
    onSubmit: async (values) => {
      try {
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
        resetForm();
        const callbackUrl = searchParams.get('callbackUrl');

        if (typeof callbackUrl === 'string') {
          return router.replace(new URL(callbackUrl).toString());
        }

        router.replace('/');
      } catch (error) {
        setIsLoading(false);
        handleErrors(error);
      }
    },
    validationSchema: loginSchema,
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
        <h1>Welcome back!</h1>
        <p>Log in to your account to manage your assets</p>
      </div>
      <div className={styles.form}>
        <Input
          id={LoginIds.Email}
          required
          label='Email address'
          {...getFormikInputProps(LoginIds.Email)}
        />
        <Input
          id={LoginIds.Email}
          required
          label='Password'
          {...getFormikInputProps(LoginIds.Password)}
          type={showPassword ? 'text' : 'password'}
          inputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type='submit'
          variant='contained'
          disabled={isLoading || !isValid || !dirty}
        >
          Log in
        </Button>
        <h4 className={styles.h5}>
          Don&apos;t have an account?{' '}
          <Link href='/signup' className='underline'>
            Sign up
          </Link>
        </h4>
        <h4 className={styles.h5}>
          Forgotten your password?{' '}
          <Link href='/reset-password' className='underline'>
            Reset your password
          </Link>
        </h4>
      </div>
      {/* <div className={styles.divider}>
            <Divider>OR</Divider>
          </div> */}
      {/* <GoogleButton type='contained'>
            <Image src={google} alt='google icon' width={35} height={35} />
            &nbsp; &nbsp; Continue with Google
          </GoogleButton> */}

      {/* <Snackbar
            open={!!error}
            autoHideDuration={3000}
            onClose={handleClose}
            message={error}
            // action={action}
          /> */}
    </Box>
  );
}
