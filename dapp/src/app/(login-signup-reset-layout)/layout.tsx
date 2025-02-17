import Image from 'next/image';
import { PropsWithChildren } from 'react';

import SettleyLogo from '@/components/SettleyLogo';

import layoutImage from '~/images/Auth-Layout Image.png';

export default function LoginSignupResetLayout({
  children,
}: PropsWithChildren) {
  return (
    <main className='w-full'>
      <div className='flex h-screen md:h-auto lg:h-screen w-full'>
        <div className='hidden sm:block w-2/5 overflow-hidden'>
          <Image
            src={layoutImage}
            alt='Settley'
            width={800}
            height={1000}
            className='w-full object-cover h-full'
            placeholder='blur'
          />
        </div>
        <div className='w-full sm:w-3/5 bg-white flex flex-col justify-between'>
          <div className='py-5 ml-[5%]'>
            <SettleyLogo colour='new' />
          </div>
          <div className='mt-5 px-[5%] w-full sm:w-5/6'>{children}</div>
          <p className='h-14 ml-[5%]'>© 2024 Settley</p>
        </div>
      </div>
    </main>
  );
}
