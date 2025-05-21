'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaArrowRight } from 'react-icons/fa6';

export default function GetStartedLink() {
  const session = useSession();
  const isLoggedIn = session.status === 'authenticated';
  return (
    <>
      <Link
        className='bg-navy text-white rounded-[60px] font-medium flex items-center gap-1 w-fit py-4 px-7'
        href={isLoggedIn ? '/listings' : '/signup'}
      >
        {isLoggedIn ? 'Buy Now' : 'Get Started'}
        <FaArrowRight className='text-2xl' />
      </Link>
    </>
  );
}
