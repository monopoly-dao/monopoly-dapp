import { object, string } from 'yup';

import { LoginIds } from './loginConstants';

export const loginSchema = object({
  [LoginIds.Email]: string()
    .email('Email is not valid')
    .required('Please provide your email address'),
  [LoginIds.Password]: string().required('Password is required'),
});
