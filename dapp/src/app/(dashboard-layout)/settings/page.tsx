'use client';

import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import { BsTwitterX } from 'react-icons/bs';
import { RiErrorWarningLine } from 'react-icons/ri';

import { cn } from '@/lib/utils';

import { useGetUserDetailsQuery } from '@/api/profile';
import UpdateProfileForm from '@/app/(grouped-layout)/_dashboard/_components/UpdateProfileForm';
import { handleErrors } from '@/utils/error';

const labels = ['general'];

export default function Page() {
  const [view, setView] = useState('general');

  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';
  // const email = session.data?.email ?? '';

  const { data } = useGetUserDetailsQuery(userFirebaseId);
  const userDetails = data?.data;

  const twitter = userDetails?.userDetails.twitter ?? '';

  const initialValuesFromDb = {
    firstName: userDetails?.firstName ?? '',
    lastName: userDetails?.lastName ?? '',
    phone: userDetails?.userDetails.phone ?? '',
    username: userDetails?.userDetails.username ?? '',
  };

  async function twitterSignIn() {
    try {
      await signIn('twitter', { redirect: false });
    } catch (e) {
      handleErrors(e);
    }
  }

  return (
    <section className='h-full overflow-y-auto'>
      <h1 className='font-merriweather font-light text-3xl'>
        Account Settings
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-7 mt-7 gap-6'>
        <div className='col-span-1 flex flex-row lg:flex-col text-sm'>
          {labels.map((label) => (
            <p
              key={label}
              className={cn(
                'capitalize font-medium cursor-pointer p-2 text-[#78716C]',
                [view === label && 'text-black']
              )}
              onClick={() => setView(label)}
            >
              {label}
            </p>
          ))}
        </div>

        <div className='col-span-1 lg:col-span-4 xl:col-span-3'>
          {view === 'general' &&
            (userDetails ? (
              <UpdateProfileForm
                key='Edit'
                mode='edit'
                detailsFromDb={initialValuesFromDb}
                // setProfileToView={setProfileToView}
              />
            ) : (
              <UpdateProfileForm
                key='Create'
                mode='create'
                // setProfileToView={setProfileToView}
              />
            ))}
        </div>

        <div className='col-span-1 block lg:hidden' />

        <div className='col-span-1 lg:col-span-2 xl:col-span-3'>
          {view === 'general' && (
            <div className='rounded-[16px] bg-white py-5 px-4'>
              <p className='font-semibold mb-5 font-general-sans'>Connect</p>
              {!twitter && (
                <div className='w-fit flex flex-col gap-[5px]'>
                  <button
                    onClick={twitterSignIn}
                    className='rounded-[8px] flex border border-medium-grey items-center gap-5 w-fit py-3 px-5 text-navy'
                  >
                    Connect <BsTwitterX />
                  </button>
                  <p className='flex items-center gap-1 text-[11px]'>
                    <RiErrorWarningLine className='text-[red]' /> Don't forget
                    to connect your X account to complete your profile and claim
                    your tokens
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
      </div>
    </section>
  );
}
