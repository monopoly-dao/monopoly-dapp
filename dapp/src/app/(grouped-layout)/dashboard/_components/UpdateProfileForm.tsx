'use client';

import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';

import { useUpdateUserDetailsMutation } from '@/api/profile';
import { handleErrors } from '@/utils/error';

import {
  UpdateProfileIds,
  UpdateProfileInitialValues,
} from '../_utils/updateProfileConstants';
import { updateProfileSchema } from '../_utils/updateProfileValidations';

type Props = {
  setProfileToView: () => void;
  detailsFromDb?: {
    firstName: string;
    lastName: string;
    // email: string;
    username: string;
    phone: string;
    twitter: string;
  };
};

export default function UpdateProfileForm({
  setProfileToView,
  detailsFromDb,
}: Props) {
  const session = useSession();
  const email = session.data?.email ?? '';
  const [updateUser, { isLoading }] = useUpdateUserDetailsMutation();

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
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.set('firstName', values.firstName);
      formData.set('lastName', values.lastName);
      formData.set('phone', values.phone);
      formData.set('twitter', values.twitter);
      formData.set('username', values.username);

      try {
        await updateUser({
          data: formData,
          userFirebaseId: session.data?.userFirebaseId ?? '',
        }).unwrap();

        toast.success('Data successfuly updatd');
        setProfileToView();
      } catch (e) {
        handleErrors(e);
      }
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
      className='mt-10 w-3/4 lg:w-1/2 flex flex-col gap-3'
    >
      <Input
        id={UpdateProfileIds.FirstName}
        required
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
        id={UpdateProfileIds.Username}
        required
        label='Username'
        {...getFormikInputProps(UpdateProfileIds.Username)}
      />
      <Input
        id={UpdateProfileIds.Phone}
        required
        label='Phone number'
        {...getFormikInputProps(UpdateProfileIds.Phone)}
      />
      <Input
        required={false}
        id={UpdateProfileIds.Twitter}
        label='Twitter'
        {...getFormikInputProps(UpdateProfileIds.Twitter)}
      />

      <div className='flex items-center gap-4'>
        <Button
          className='w-fit py-2 px-8'
          variant='outline'
          onClick={setProfileToView}
        >
          Back
        </Button>
        <Button
          type='submit'
          isLoading={isLoading}
          disabled={!isValid || !dirty}
          className='w-fit py-2 px-8'
        >
          Save Changes
        </Button>
      </div>
    </Box>
  );
}
