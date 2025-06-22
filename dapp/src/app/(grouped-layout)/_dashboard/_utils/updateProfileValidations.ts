import { object, string } from 'yup';

import { UpdateProfileIds } from './updateProfileConstants';

export const updateProfileSchema = object({
  [UpdateProfileIds.FirstName]: string().required('First name is required'),
  [UpdateProfileIds.LastName]: string().required('Last name is required'),
  [UpdateProfileIds.Username]: string()
    .required('Please provide your username')
    .min(6, 'Username must have a minimum of 6 characters'),
  [UpdateProfileIds.Phone]: string(),
});
