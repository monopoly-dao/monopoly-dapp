import Image from 'next/image';
import { PropsWithChildren } from 'react';

import SettleyLogo from '@/components/SettleyLogo';

import layoutImage from '~/images/new-settley-auth-image.png';

export default function LoginSignupResetLayout({
  children,
}: PropsWithChildren) {
  return (
    <main className='w-full max-w-[1540px] mx-auto'>
      <div className='bg-gradient-to-b from-white to-[#F4F4F4] md:h-screen w-full relative overflow-hidden'>
        <div className='py-5 ml-[5%]'>
          <SettleyLogo colour='new' />
        </div>

        <div className='flex w-full mt-5'>
          <div className='hidden md:block w-1/2 overflow-y-hidden'>
            <div className='max-w-[600px] mx-auto w-4/5 flex flex-col gap-10'>
              <Image
                src={layoutImage}
                alt='Settley'
                width={800}
                height={1000}
                className='w-full object-cover h-full aspect-[560/420]'
                placeholder='blur'
              />

              <div className='flex flex-col gap-4 text-center'>
                <p className='font-merriweather text-4xl font-light xl:text-5xl'>
                  Get Started With Settley
                </p>
                <p className='font-roboto text-lg text-[#44403C]'>
                  Create your account and start purchasing properties in minutes
                </p>
              </div>
            </div>
          </div>
          <div className='w-full sm:w-1/2 flex flex-col justify-between sm:items-center'>
            <div className='p-6 w-full sm:w-5/6 max-w-[500px] rounded-[16px] bg-white md:h-[80vh] overflow-y-auto sm:shadow'>
              {children}
            </div>
            {/* <p className='h-14 ml-[5%] mb-10'>© 2025 Settley</p> */}
          </div>
        </div>
      </div>
    </main>
  );
}
