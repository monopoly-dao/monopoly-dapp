'use client';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

import styles from '../../../styles/Signup.module.css';

import { SignupIds, signupInitialValues } from './_utils/signupConstants';
import { signupSchema } from './_utils/signupValidations';
import { AUTH_BASE_URL } from '../../../api';
import { AuthEndpoints } from '../../../api/auth/authApiConstants';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { handleErrors } from '../../../utils/error';

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    initialValues: signupInitialValues,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await axios.post(`${AUTH_BASE_URL}${AuthEndpoints.Signup}`, {
          ...values,
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
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { width: 'inherit' },
      }}
      onSubmit={handleSubmit}
      className={styles.right}
    >
      <div className={styles.title}>
        <h1>
          Get started
          <br />
          with MonopolyDAO
        </h1>
        <p>Create your account and start purchasing properties in minutes</p>
      </div>
      <div className={styles.form}>
        <Input
          required
          label='Username'
          id={SignupIds.Username}
          {...getFormikInputProps(SignupIds.Username)}
        />
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
          variant='contained'
          type='submit'
          disabled={isLoading || !isValid || !dirty}
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
      {/* <div className={styles.divider}>
            <Divider>OR</Divider>
          </div> */}
      {/* <GoogleButton varian='contained' onClick={handleGoogleSignUp}>
            <Image src={google} alt='google icon' width={35} height={35} />
            &nbsp; &nbsp; Sign up with Google
          </GoogleButton>

          <Snackbar
            open={!!error}
            autoHideDuration={3000}
            onClose={handleClose}
            message={error}
            // action={action}
          /> */}
    </Box>
  );
}
