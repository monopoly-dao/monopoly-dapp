import { object, string } from 'yup';

import { UpdateProfileIds } from './updateProfileConstants';

export const updateProfileSchema = object({
  [UpdateProfileIds.FirstName]: string().required('First name is required'),
  [UpdateProfileIds.LastName]: string().required('Last name is required'),
  [UpdateProfileIds.Username]: string().required('Username is required'),
  [UpdateProfileIds.Phone]: string().required('Phone is required'),
});
