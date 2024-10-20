'use client';

import { Box } from '@mui/material';
import { useFormik } from 'formik';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

import Button from '@/components/buttons/Button';
import { Input } from '@/components/input';
import Phone from '@/components/input/input-phone';

import {
  useCreateUserDetailsMutation,
  useUpdateUserDetailsMutation,
} from '@/api/profile';
import { handleErrors } from '@/utils/error';

import {
  UpdateProfileIds,
  UpdateProfileInitialValues,
} from '../_utils/updateProfileConstants';
import { updateProfileSchema } from '../_utils/updateProfileValidations';

type Props = {
  mode: 'create' | 'edit';
  setProfileToView: () => void;
  detailsFromDb?: {
    firstName: string;
    lastName: string;
    // email: string;
    username: string;
    phone: string;
  };
};

export default function UpdateProfileForm({
  setProfileToView,
  detailsFromDb,
  mode,
}: Props) {
  const session = useSession();
  const email = session.data?.email ?? '';
  const [updateUser, { isLoading: isUpdateLoading }] =
    useUpdateUserDetailsMutation();
  const [createUser, { isLoading: isCreateLoading }] =
    useCreateUserDetailsMutation();

  const isLoading = mode === 'create' ? isCreateLoading : isUpdateLoading;

  const {
    getFieldProps,
    getFieldMeta,
    values,
    // resetForm,
    isValid,
    dirty,
    handleSubmit,
    setFieldTouched,
    setFieldValue,
  } = useFormik({
    initialValues: detailsFromDb ?? UpdateProfileInitialValues(email),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.set('firstName', values.firstName);
      formData.set('lastName', values.lastName);
      formData.set('phone', values.phone);
      formData.set('username', values.username);

      try {
        if (mode === 'create') {
          await createUser({
            data: formData,
            userFirebaseId: session.data?.userFirebaseId ?? '',
          }).unwrap();

          toast.success('Profile details successfully created');
          toast.success(
            'Connect your X account to complete your profile and get funded with test tokens!'
          );
        } else {
          await updateUser({
            data: formData,
            userFirebaseId: session.data?.userFirebaseId ?? '',
          }).unwrap();

          toast.success('Profile details successfuly updated');
        }

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
        label='First Name'
        {...getFormikInputProps(UpdateProfileIds.FirstName)}
      />
      <Input
        id={UpdateProfileIds.LastName}
        label='Last Name'
        {...getFormikInputProps(UpdateProfileIds.LastName)}
      />
      <Input
        id={UpdateProfileIds.Username}
        label='Username'
        {...getFormikInputProps(UpdateProfileIds.Username)}
      />
      <Phone
        id={UpdateProfileIds.Phone}
        type='tel'
        label='Phone number (optional)'
        {...getFormikInputProps(UpdateProfileIds.Phone)}
        handleChange={(value) => {
          setFieldTouched(UpdateProfileIds.Phone);
          setFieldValue(UpdateProfileIds.Phone, value);
        }}
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
