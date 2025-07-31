'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaArrowRight } from 'react-icons/fa6';

import GetStartedLink from './GetStartedLink';

export default function ReimagineAssetOwnership() {
  const session = useSession();
  const isLoggedIn = session.status === 'authenticated';

  return (
    <div className='flex flex-col my-10 lg:my-20 gap-6 sm:gap-14 py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <p className='font-merriweather font-light w-1/2 text-2xl lg:text-4xl'>
            Reimagining asset ownership
            {/* through blockchain technology */}
          </p>

          <Link
            className='bg-white text-navy rounded-[60px] font-medium flex items-center gap-1 w-fit py-2 px-7 border border-navy'
            href={isLoggedIn ? '/listings' : '/signup'}
          >
            Join now
            <FaArrowRight className='text-2xl' />
          </Link>
        </div>
        <p className='w-3/4 text-lg font-roboto'>
          We're creating a new standard for asset ownership where properties can
          be bought, sold, and managed with the same ease as digital
          transactions.
          {/* Through blockchain technology, */}
          We're eliminating traditional barriers, reducing costs, and empowering
          investors with direct control over their assets.
        </p>
      </div>

      <div className='bg-[#FFFDF1] rounded-[20px] flex flex-col lg:flex-row gap-[10%] overflow-hidden'>
        <div className='w-full lg:w-1/2 flex flex-col justify-center py-20 lg:pl-[10%] gap-5'>
          <p className='text-4xl'>Community Investing</p>
          <p className='font-roboto text-lg'>
            We’re redefining property ownership by putting the power back into
            the hands of the people. Through our community investing model,
            individuals can come together to co-invest in property—sharing
            ownership, making decisions collectively, and even setting the
            property's value together.
          </p>
          <GetStartedLink />
        </div>
        <div className='w-full lg:w-1/2 h-full min-h-[180px]'>
          {/* <RandomImages
            imageUrls={[
              '/images/reimagine 1.png',
              '/images/reimagine 2.png',
              '/images/reimagine 3.png',
              '/images/reimagine 1.png',
              '/images/reimagine 2.png',
              '/images/reimagine 3.png',
              '/images/reimagine 1.png',
              '/images/reimagine 2.png',
              '/images/reimagine 3.png',
            ]}
          /> */}
          <Image
            src='/images/reimagine.png'
            alt='reimagine'
            width={500}
            height={500}
            className='w-auto h-full object-cover'
          />
        </div>
      </div>
    </div>
  );
}
