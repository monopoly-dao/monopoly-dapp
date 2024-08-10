'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function GetStartedLink() {
  const session = useSession();
  const isLoggedIn = session.status === 'authenticated';
  return (
    <>
      {!isLoggedIn && (
        <Link
          className='text-white font-normal bg-navy rounded-[6px] w-full py-5 sm:w-full'
          href='/signup'
        >
          Get Started
        </Link>
      )}
      {isLoggedIn && (
        <Link
          className='text-white font-normal bg-navy rounded-[6px] w-full py-5 sm:w-full'
          href='/listings'
        >
          Buy Now
        </Link>
      )}
    </>
  );
}
