'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { RiErrorWarningLine } from 'react-icons/ri';

import { useGetUserDetailsQuery } from '@/api/profile';
import { handleErrors } from '@/utils/error';

import ProfileDetails from '../_components/ProfileDetails';
import UpdateProfileForm from '../_components/UpdateProfileForm';

export default function Page() {
  const [profileState, setProfileState] = useState<
    'view' | 'edit' | 'updatePassword'
  >('view');

  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';
  // const email = session.data?.email ?? '';

  const { data, isLoading } = useGetUserDetailsQuery(userFirebaseId);
  const userDetails = data?.data;

  const twitter = userDetails?.userDetails.twitter ?? '';

  const initialValuesFromDb = {
    firstName: userDetails?.firstName ?? '',
    lastName: userDetails?.lastName ?? '',
    phone: userDetails?.userDetails.phone ?? '',
    username: userDetails?.userDetails.username ?? '',
  };

  function setProfileToEdit() {
    setProfileState('edit');
  }

  function setProfileToView() {
    setProfileState('view');
  }

  async function twitterSignIn() {
    try {
      await signIn('twitter', { redirect: false });
    } catch (e) {
      handleErrors(e);
    }
  }

  return (
    <div>
      {profileState === 'view' && (
        <ProfileDetails setProfileToEdit={setProfileToEdit} />
      )}

      {profileState === 'edit' &&
        (userDetails ? (
          <UpdateProfileForm
            key='Edit'
            mode='edit'
            detailsFromDb={initialValuesFromDb}
            setProfileToView={setProfileToView}
          />
        ) : (
          <UpdateProfileForm
            key='Create'
            mode='create'
            setProfileToView={setProfileToView}
          />
        ))}

      {profileState === 'view' && !isLoading && (
        <div className='mt-7'>
          {!twitter && (
            <div className='w-fit flex flex-col gap-[5px]'>
              <button
                onClick={twitterSignIn}
                className='rounded-[8px] flex border border-medium-grey items-center gap-5 w-fit py-3 px-5 text-navy'
              >
                Connect <BsTwitterX />
              </button>
              <p className='flex items-center gap-1 text-[11px]'>
                <RiErrorWarningLine className='text-[red]' /> Don't forget to
                connect your X account to complete your profile and claim your
                tokens
              </p>
            </div>
          )}
          {twitter && (
            <div className='rounded-[8px] bg-black text-white flex items-center gap-5 py-3 px-5 w-fit'>
              <BsTwitterX /> Connected
            </div>
          )}
        </div>
      )}
    </div>
  );
}
