import { object, string } from 'yup';

import { UpdateProfileIds } from './updateProfileConstants';

export const updateProfileSchema = object({
  [UpdateProfileIds.FirstName]: string().required('First name is required'),
  [UpdateProfileIds.LastName]: string().required('Last name is required'),
  [UpdateProfileIds.Address]: string().required('Address is required'),
  [UpdateProfileIds.Phone]: string().required('Phone is required'),
  [UpdateProfileIds.Email]: string()
    .email('Email format is invalid')
    .required('Email is required'),
  [UpdateProfileIds.Preferred_Currency]: string().required(
    'Preferred currency is required'
  ),
});
