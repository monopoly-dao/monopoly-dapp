import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Cities from './_components/Cities';
import FAQ from './_components/FAQ';
import GetStartedLink from './_components/GetStartedLink';
import HowItWorks from './_components/HowItWorks';
import TrendingProperties from './_components/TrendingProperties';
import WhoAreWe from './_components/WhoAreWe';

import landingBanner from '~/images/landing-banner.png';

export const metadata: Metadata = {
  title: 'Join the future of property ownership',
  description:
    'Settley allows you to buy and own a home in minutes enabled by blockchain technology.',
  keywords: [
    'Settley',
    'Join the future of property ownership',
    'SettleyCo',
    'Settley co',
  ],
};

export default function Page() {
  return (
    <div>
      <div className='mt-10 mb-20 flex flex-col gap-5 px-[5%] sm:px-[7%] text-center items-center'>
        <h1 className='font-medium text-[30px] w-full leading-[35px] sm:leading-[45px] lg:leading-[60px] sm:text-[40px] lg:text-[60px]'>
          <div>Join the future of property </div>
          <div>ownership</div>
        </h1>
        <p className='text-dark-grey'>
          Settley allows you to buy and own a home in minutes.
        </p>
        <div className='w-full text-center gap-4 flex items-center justify-center font-inter text-sm'>
          <GetStartedLink />
          <Link
            className='text-navy outline outline-1 outline-navy bg-white rounded-[6px] font-normal w-full max-w-[140px] py-2 px-5'
            href='#footer'
          >
            Stay Updated
          </Link>
        </div>
      </div>

      <div className='relative'>
        <Image
          src={landingBanner}
          alt='banner'
          width={1000}
          height={595}
          quality={100}
          placeholder='blur'
          className='w-full h-[250px] sm:h-[400px] lg:h-[595px] object-cover'
        />
        <div className='absolute bottom-0 bg-black/50 z-[2] py-8 text-white w-full flex justify-end pr-[10%]'>
          <Link href='/listings' className='flex items-center gap-5'>
            Villa in Lake Como, Italy{' '}
            <Image
              src='/icons/white arrow.png'
              alt='arrow'
              width={33}
              height={1}
            />
          </Link>
        </div>
      </div>

      <HowItWorks />

      <TrendingProperties />

      <div className='bg-cream px-[5%] lg:px-[7%] py-12 sm:py-20 lg:py-28 flex flex-col gap-28'>
        <WhoAreWe />
        <Cities />
      </div>

      <div className='px-[5%] lg:px-[7%]'>
        <FAQ />
      </div>
    </div>
  );
}

{
  /* <div className='mt-20 mb-20 flex flex-col gap-11 px-[5%] sm:px-[7%]'>
  <h1 className='font-medium text-[45px] w-full leading-[55px] sm:leading-[75px] lg:leading-[96px] sm:text-[60px] lg:text-[80px]'>
    <div>Join the future of </div>
    <div>property ownership</div>
  </h1>
  <p>Settley allows you to buy and own a home in minutes.</p>
  <div className='w-full text-center font-inter text-lg sm:w-full lg:w-1/2 antialiased'>
    <div className='flex flex-wrap w-full justify-center gap-4 sm:w-full lg:flex-nowrap lg:w-3/5'>
      <GetStartedLink />
      <Link
        className='text-navy outline outline-1 outline-navy bg-white rounded-[6px] font-normal  w-full py-5 sm:w-full'
        href='#footer'
      >
        Stay Updated
      </Link>
    </div>
  </div>
</div>; */
}
