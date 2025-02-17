'use client';

import { useSession } from 'next-auth/react';

import Button from '@/components/buttons/Button';
import LoadingText from '@/components/LoadingText';

import { useGetUserDetailsQuery } from '@/api/profile';

type Props = {
  setProfileToEdit: () => void;
};

export default function ProfileDetails({ setProfileToEdit }: Props) {
  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';
  // const email = session.data?.email ?? '';

  const { data, isLoading } = useGetUserDetailsQuery(userFirebaseId);
  const userDetails = data?.data;

  return (
    <div className='flex flex-col gap-6'>
      <h2 className='text-3xl mt-12 font-inter mb-2'>Account Settings</h2>

      <div>
        <div className='flex items-start justify-between'>
          <p className='text-2xl font-inter'>First Name</p>
          <Button
            variant='ghost'
            onClick={setProfileToEdit}
            className='bg-transparent text-navy border-none'
          >
            Edit
          </Button>
        </div>
        <p className='text-lg text-dark-grey font-inter'>
          <LoadingText isLoading={isLoading} value={userDetails?.firstName} />
        </p>
      </div>
      <div>
        <div className='flex items-start justify-between'>
          <p className='text-2xl font-inter'>Last Name</p>
          <Button
            variant='ghost'
            onClick={setProfileToEdit}
            className='bg-transparent text-navy border-none'
          >
            Edit
          </Button>
        </div>
        <p className='text-lg text-dark-grey font-inter'>
          <LoadingText isLoading={isLoading} value={userDetails?.lastName} />
        </p>
      </div>
      <div>
        <div className='flex items-start justify-between'>
          <p className='text-2xl font-inter'>Username</p>
          <Button
            variant='ghost'
            onClick={setProfileToEdit}
            className='bg-transparent text-navy border-none'
          >
            Edit
          </Button>
        </div>
        <p className='text-lg text-dark-grey font-inter'>
          <LoadingText
            isLoading={isLoading}
            value={userDetails?.userDetails.username}
          />
        </p>
      </div>
      <div>
        <div className='flex items-start justify-between'>
          <p className='text-2xl font-inter'>Phone</p>
          <Button
            variant='ghost'
            onClick={setProfileToEdit}
            className='bg-transparent text-navy border-none'
          >
            Edit
          </Button>
        </div>
        <p className='text-lg text-dark-grey font-inter'>
          <LoadingText
            isLoading={isLoading}
            value={userDetails?.userDetails.phone}
          />
        </p>
      </div>
    </div>
  );
}
