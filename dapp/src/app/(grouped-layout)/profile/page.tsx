'use client';

import { useSession } from 'next-auth/react';

import LoadingSkeleton from '@/components/LoadingSkeleton';

import UpdateProfileForm from './_components/UpdateProfileForm';
import { useGetUserDetailsQuery } from '../../../api/profile';

export default function Page() {
  const session = useSession();
  const userId = session.data?.id ?? '';
  // const email = session.data?.email ?? '';

  const { data, isLoading } = useGetUserDetailsQuery(userId);
  const userDetails = data?.data;

  const initialValuesFromDb = {
    firstName: userDetails?.firstName ?? '',
    lastName: userDetails?.lastName ?? '',
    email: userDetails?.userDetails.email ?? '',
    phone: userDetails?.userDetails.phone ?? '',
    twitter: userDetails?.userDetails.twitter ?? '',
  };

  return (
    <div className='py-[5%] px-[5%] lg:px-[7%]'>
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
      {isLoading && (
        <div className='mt-10 w-3/4 flex flex-col gap-4'>
          {Array(4)
            .fill('')
            .map((_, id) => (
              <LoadingSkeleton key={id} className='w-full h-14' />
            ))}
        </div>
      )}

      {!isLoading &&
        (userDetails ? (
          <UpdateProfileForm key='Edit' detailsFromDb={initialValuesFromDb} />
        ) : (
          <UpdateProfileForm key='Create' />
        ))}
    </div>
  );
}
