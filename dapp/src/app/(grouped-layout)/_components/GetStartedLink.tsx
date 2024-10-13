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
          className='text-white font-normal bg-navy rounded-[6px] w-full max-w-[140px] py-2 px-4'
          href='/signup'
        >
          Get Started
        </Link>
      )}
      {isLoggedIn && (
        <Link
          className='text-white font-normal bg-navy rounded-[6px] w-full max-w-[140px] py-2 px-4'
          href='/listings'
        >
          Buy Now
        </Link>
      )}
    </>
  );
}
