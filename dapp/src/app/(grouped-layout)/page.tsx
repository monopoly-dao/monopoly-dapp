import { Metadata } from 'next';
import Image from 'next/image';

import FAQ from './_components/FAQ';
import GetStartedLink from './_components/GetStartedLink';
import OwnProperty from './_components/OwnProperty';
import OwnShare from './_components/OwnShare';

import JMHouse from '~/images/JM_Mishref_House.png';
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
        <h1 className='font-merriweather font-semibold text-3xl w-full leading-[35px] sm:leading-[45px] lg:leading-[60px] sm:text-[34px] lg:text-[54px]'>
          {/* <div>Own Real Assets,</div>
          <div>Share with Your Circle</div> */}
          <div>Own a Property</div>
          <div>In Minutes</div>
        </h1>
        <p className='text-dark-grey font-merriweather w-[90%] sm:w-4/5 lg:w-3/5'>
          Unlock genuine ownership of premium properties.
          {/* via our blockchain protocol.  */}
          Experience shared ownership while keeping it simple, secure, and
          genuinely yours.
        </p>
        <p className='text-dark-grey font-light text-xs font-merriweather w-[90%] sm:w-4/5 lg:w-3/5'>
          Real Ownership. Real Assets. Real Simple.
        </p>
        <div className='w-full text-center gap-4 flex items-center justify-center font-inter text-sm'>
          <GetStartedLink />

          {/* <Link
            className='text-navy outline outline-1 outline-navy bg-white rounded-[6px] font-normal w-full max-w-[140px] py-2 px-5'
            href='#footer'
          >
            Stay Updated
          </Link> */}
        </div>
      </div>

      <div className='relative px-[1.5%]'>
        <Image
          src={landingBanner}
          alt='banner'
          width={1000}
          height={640}
          quality={100}
          placeholder='blur'
          // priority
          className='w-full aspect-[1403/640] object-cover rounded-[20px]'
        />
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

      <div className='w-full h-[500px] relative lg:h-[700px]'>
        <Image
          src={JMHouse}
          alt='jm house'
          width={1000}
          height={1000}
          className='w-full h-[500px] lg:h-[700px] object-cover top-0 left-0 absolute'
        />
        <div className='absolute z-[3] text-white w-4/5 lg:w-3/4 font-merriweather bottom-[5%] left-[5%]'>
          <h2 className='text-3xl sm:text-5xl mb-14 lg:mb-20'>
            Frequently Asked Questions
          </h2>
        </div>
      </div>

      {/* <Partners /> */}

      {/* <div className='bg-cream'>
        <Testimonials />
      </div> */}

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
