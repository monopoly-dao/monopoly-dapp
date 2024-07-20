'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { useGetUserDetailsQuery } from '@/api/profile';

import ProfileDetails from '../_components/ProfileDetails';
import UpdateProfileForm from '../_components/UpdateProfileForm';

export default function Page() {
  const [profileState, setProfileState] = useState<
    'view' | 'edit' | 'updatePassword'
  >('view');

  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';
  // const email = session.data?.email ?? '';

  const { data } = useGetUserDetailsQuery(userFirebaseId);
  const userDetails = data?.data;

  const initialValuesFromDb = {
    firstName: userDetails?.firstName ?? '',
    lastName: userDetails?.lastName ?? '',
    // email: userDetails?.userDetails.email ?? '',
    phone: userDetails?.userDetails.phone ?? '',
    username: userDetails?.userDetails.username ?? '',
    twitter: userDetails?.userDetails.twitter ?? '',
  };

  function setProfileToEdit() {
    setProfileState('edit');
  }

  function setProfileToView() {
    setProfileState('view');
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
    </div>
  );
}
