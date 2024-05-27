'use client';

import { Box, Button } from '@mui/material';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';

import Input from '@/components/Input';

import {
  UpdateProfileIds,
  UpdateProfileInitialValues,
} from '../_utils/updateProfileConstants';
import { updateProfileSchema } from '../_utils/updateProfileValidations';

type Props = {
  detailsFromDb?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    twitter: string;
    preferredCurrency: string;
  };
};

export default function UpdateProfileForm({ detailsFromDb }: Props) {
  const session = useSession();
  const email = session.data?.email ?? '';

  const {
    getFieldProps,
    getFieldMeta,
    values,
    // resetForm,
    isValid,
    dirty,
    handleSubmit,
  } = useFormik({
    initialValues: detailsFromDb ?? UpdateProfileInitialValues(email),
    onSubmit: async () => {
      //
    },
    validationSchema: updateProfileSchema,
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

  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { width: 'inherit' },
      }}
      onSubmit={handleSubmit}
      className='mt-10 w-3/4 flex flex-col gap-3'
    >
      <Input
        id={UpdateProfileIds.FirstName}
        required
        fullWidth
        label='First Name'
        {...getFormikInputProps(UpdateProfileIds.FirstName)}
      />
      <Input
        id={UpdateProfileIds.LastName}
        required
        label='Last Name'
        {...getFormikInputProps(UpdateProfileIds.LastName)}
      />
      <Input
        id={UpdateProfileIds.Email}
        required
        label='Email address'
        {...getFormikInputProps(UpdateProfileIds.Email)}
      />
      <Input
        id={UpdateProfileIds.Phone}
        required
        label='Phone number'
        {...getFormikInputProps(UpdateProfileIds.Phone)}
      />
      <Input
        id={UpdateProfileIds.Address}
        required
        label='House address'
        {...getFormikInputProps(UpdateProfileIds.Address)}
      />
      <Input
        required={false}
        id={UpdateProfileIds.Twitter}
        label='Twitter'
        {...getFormikInputProps(UpdateProfileIds.Twitter)}
      />
      <Input
        id={UpdateProfileIds.Preferred_Currency}
        required
        label='Preferred Currency'
        {...getFormikInputProps(UpdateProfileIds.Preferred_Currency)}
      />

      <Button type='submit' variant='contained' disabled={!isValid || !dirty}>
        Save Changes
      </Button>
    </Box>
  );
}
