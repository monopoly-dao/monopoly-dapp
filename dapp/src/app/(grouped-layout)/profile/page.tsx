'use client';

import { useSession } from 'next-auth/react';

import UpdateProfileForm from './_components/UpdateProfileForm';
import { useGetUserDetailsQuery } from '../../../api/profile';

export default function Page() {
  const session = useSession();
  const userId = session.data?.id ?? '';
  // const email = session.data?.email ?? '';

  const { data } = useGetUserDetailsQuery(userId);
  const userDetails = data?.data;

  const initialValuesFromDb = {
    firstName: userDetails?.firstName ?? '',
    lastName: userDetails?.lastName ?? '',
    email: userDetails?.userDetails.email ?? '',
    phone: userDetails?.userDetails.phone ?? '',
    address: userDetails?.userDetails.address ?? '',
    twitter: userDetails?.userDetails.twitter ?? '',
    preferredCurrency: userDetails?.userDetails.preferredCurrency ?? '',
  };

  return (
    <div className='p-[5%]'>
      <h1>Profile</h1>

      {/* <Box
        component='form'
        sx={{
          '& .MuiTextField-root': { width: 'inherit' },
        }}
        onSubmit={handleSubmit}
        className='mt-10 w-3/4'
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
          id={UpdateProfileIds.Email}
          required
          label='Email address'
          {...getFormikInputProps(UpdateProfileIds.Email)}
        />
        <Input
          id={UpdateProfileIds.Email}
          required
          label='Email address'
          {...getFormikInputProps(UpdateProfileIds.Email)}
        />
      </Box> */}
      {userDetails ? (
        <UpdateProfileForm key='Edit' detailsFromDb={initialValuesFromDb} />
      ) : (
        <UpdateProfileForm key='Create' />
      )}
    </div>
  );
}
