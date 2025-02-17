'use client';

import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

import { handleErrors } from '@/utils/error';

export default function GoogleButton() {
  const searchParams = useSearchParams();

  async function googleSignIn() {
    try {
      const paramsUrl = searchParams.get('callbackUrl');
      let callbackUrl: string;

      if (typeof paramsUrl === 'string') {
        callbackUrl = new URL(paramsUrl).toString();
      } else callbackUrl = '/';

      await signIn('google', { redirect: false, callbackUrl });
    } catch (e) {
      handleErrors(e);
    }
  }

  return (
    <div className='flex flex-col gap-4 max-w-[500px] mb-5'>
      <div className='flex items-center gap-4'>
        <div className='w-full h-[1px] bg-dark-grey/50 ' />
        OR
        <div className='w-full h-[1px] bg-dark-grey/50 ' />
      </div>
      <button
        className='w-full flex items-center gap-3 justify-center bg-white shadow-2xl px-10 py-3'
        onClick={googleSignIn}
      >
        <FcGoogle className='text-3xl' /> Continue with Google
      </button>
    </div>
  );
}
