'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import ProfileDetails from './_components/ProfileDetails';
import UpdateProfileForm from './_components/UpdateProfileForm';
import { useGetUserDetailsQuery } from '../../../api/profile';

export default function Page() {
  const [profileState, setProfileState] = useState<
    'view' | 'edit' | 'updatePassword'
  >('view');

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
            detailsFromDb={initialValuesFromDb}
            setProfileToView={setProfileToView}
          />
        ) : (
          <UpdateProfileForm key='Create' setProfileToView={setProfileToView} />
        ))}
    </div>
  );
}
