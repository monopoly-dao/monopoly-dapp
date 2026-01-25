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
        className='bg-settley-primary hover:bg-settley-primary/90 transition-all text-[#FAFAFA] rounded-full font-medium text-lg flex items-center gap-2 w-fit py-2 px-12 group'
        href={isLoggedIn ? '/listings' : '/signup'}
      >
        {isLoggedIn ? 'Buy Now' : 'Get Started'}
        <FaArrowRight className='text-base group-hover:translate-x-1 transition-transform' />
      </Link>
    </>
  );
}
