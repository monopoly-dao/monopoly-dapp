'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

export default function GoogleButton() {
  // const searchParams = useSearchParams();

  // async function googleSignIn() {
  //   try {
  //     const paramsUrl = searchParams.get('callbackUrl');
  //     let callbackUrl: string;

  //     if (typeof paramsUrl === 'string') {
  //       callbackUrl = new URL(paramsUrl).toString();
  //     } else callbackUrl = '/';

  //     await signIn('google', { callbackUrl });
  //   } catch (e) {
  //     handleErrors(e);
  //   }
  // }
  //

  return (
    <div className='flex flex-col gap-5 w-full mb-5'>
      <p className='flex items-center gap-4 text-center font-roboto text-sm w-full justify-center'>
        or connect with
      </p>
      <button
        type='button'
        className='w-full flex items-center gap-2 rounded-[8px] font-roboto border border-[#D6D3D1] justify-center px-10 py-4'
        onClick={async () => await signIn('google', { callbackUrl: '/' })}
      >
        Continue with Google
        <FcGoogle className='text-2xl' />
      </button>
    </div>
  );
}
