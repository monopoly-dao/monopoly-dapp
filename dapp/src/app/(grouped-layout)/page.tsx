import { Metadata } from 'next';
import Image from 'next/image';

import FAQ from './_components/FAQ';
import GetStartedLink from './_components/GetStartedLink';
import OwnProperty from './_components/OwnProperty';
import OwnShare from './_components/OwnShare';

import landingBanner from '~/images/landing-banner-2.png';

export const metadata: Metadata = {
  title: 'Join the future of property ownership',
  description: 'Settley allows you to buy and own a home in minutes.', // enabled by blockchain technology.',
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
      <div className='mt-10 mb-20 flex flex-col gap-6 px-[5%] sm:px-[7%] text-center items-center'>
        <h1 className='font-playfair font-medium text-[48px] lg:text-[72px] leading-tight tracking-[-1.2px] lg:tracking-[-1.8px] text-navy w-full text-center mb-6'>
          <div>Own a Property</div>
          <div>In Minutes</div>
        </h1>
        <p className='text-settley-text font-inter text-[18px] lg:text-[20px] leading-[29.25px] lg:leading-[32.5px] max-w-[672px] w-full text-center mb-4'>
          Unlock genuine ownership of premium properties. Experience shared
          ownership while keeping it simple, secure, and genuinely yours.
        </p>
        <p className='text-navy/80 font-inter font-medium text-[14px] tracking-[1.4px] uppercase text-center mb-8'>
          Real Ownership. Real Assets. Real Simple.
        </p>
        <div className='w-full text-center flex items-center justify-center'>
          <GetStartedLink />

          {/* <Link
            className='text-navy outline outline-1 outline-navy bg-white rounded-[6px] font-normal w-full max-w-[140px] py-2 px-5'
            href='#footer'
          >
            Stay Updated
          </Link> */}
        </div>
      </div>

      <div className='mt-16 w-full max-w-6xl mx-auto px-4'>
        <div className='relative w-full aspect-video rounded-3xl shadow-2xl overflow-hidden'>
          <Image
            src={landingBanner}
            alt='Luxury Property'
            fill
            placeholder='blur'
            className='object-cover'
            priority
          />
        </div>
        {/* <div className='absolute bottom-0 bg-black/50 z-[2] py-8 text-white w-full flex justify-end pr-[10%]'>
          <Link href='/listings' className='flex items-center gap-5'>
            Villa in Lake Como, Italy{' '}
            <Image
              src='/icons/white arrow.png'
              alt='arrow'
              width={33}
              height={1}
            />
          </Link>
        </div> */}
      </div>

      <OwnShare />

      <OwnProperty />

      {/* <RealWorldAssets /> */}

      {/* <ValueProp /> */}

      {/* <StepsToBuy /> */}

      {/* <HowItWorks /> */}

      {/* <TrendingProperties /> */}

      {/* <div className='bg-cream px-[5%] lg:px-[7%] py-12 sm:py-20 lg:py-28 flex flex-col gap-28'>
        <WhoAreWe />
        <Cities />
      </div> */}

      {/* <ReimagineAssetOwnership /> */}

      <FAQ />
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
