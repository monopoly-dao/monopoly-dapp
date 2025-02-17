import { object, ref, string } from 'yup';

import { SignupIds } from './signupConstants';

export const signupSchema = object({
  [SignupIds.Email]: string()
    .email('Email is not valid')
    .required('Please provide your email address'),
  // [SignupIds.Username]: string()
  //   .required('Please provide your username')
  //   .min(6, 'Username must have a minimum of 6 characters'),
  [SignupIds.Password]: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, {
      excludeEmptyString: true,
      message: 'Please include at least one uppercase letter',
    })
    .matches(/\d/, {
      excludeEmptyString: true,
      message: 'Please include at least one number',
    })
    .matches(/[^\w\d.]/, {
      excludeEmptyString: true,
      message: 'Please include at least one special character',
    })
    .matches(/[a-z]/, {
      excludeEmptyString: true,
      message: 'Please include at least one lowercase letter',
    }),
  [SignupIds.ConfirmPassword]: string()
    .required('Please provide a password confirmation')
    .oneOf([ref('password')], 'Passwords must match'),
});
