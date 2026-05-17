import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaHome, FaHeart, FaKey, FaBuilding, FaArrowRight } from 'react-icons/fa';

import ExpandableFAQ from './_components/ExpandableFAQ';
import GetStartedLink from './_components/GetStartedLink';
import OwnProperty from './_components/OwnProperty';
import OwnShare from './_components/OwnShare';
import { faqs } from '@/constants/appConstants';

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
      </div>

      {/* "Who are you?" Audience Router */}
      <section className='mt-20 py-16 px-4 md:px-8 bg-cream/30 border-y border-[#C6C6CD]/15'>
        <div className='max-w-6xl mx-auto text-center'>
          <h2 className='font-playfair text-3xl sm:text-4xl text-navy font-bold mb-4'>
            Who are you?
          </h2>
          <p className='text-[#8E8E93] font-light text-sm sm:text-base mb-12 max-w-lg mx-auto'>
            Choose the pathway that matches your goals and discover how Settley makes it simple, fast, and completely secure.
          </p>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            {/* Card 1: Homeowner */}
            <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/25 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-5 group'>
              <div className='relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#272342]/5 text-[#272342] group-hover:bg-[#272342] group-hover:text-white transition-all duration-300'>
                <FaHome className='text-2xl' />
                <FaHeart className='absolute bottom-3 right-3 text-xs text-rose-500 bg-white rounded-full p-0.5 group-hover:bg-[#272342] transition-colors duration-300' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-playfair font-bold text-xl text-navy'>
                  I own a home
                </h3>
                <p className='text-[#8E8E93] text-sm font-light leading-relaxed min-h-[40px]'>
                  Unlock cash from your home without selling it.
                </p>
              </div>
              <Link
                href='/homeowners'
                className='inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-[#272342]/85 transition-colors mt-2 font-inter'
              >
                For Homeowners <FaArrowRight className='text-xs' />
              </Link>
            </div>

            {/* Card 2: Seller */}
            <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/25 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-5 group'>
              <div className='relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#272342]/5 text-[#272342] group-hover:bg-[#272342] group-hover:text-white transition-all duration-300'>
                <FaHome className='text-2xl' />
                <FaKey className='absolute bottom-3 right-3 text-xs text-[#272342] bg-white rounded-full p-0.5 group-hover:bg-[#272342] group-hover:text-white transition-all duration-300' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-playfair font-bold text-xl text-navy'>
                  I want to sell
                </h3>
                <p className='text-[#8E8E93] text-sm font-light leading-relaxed min-h-[40px]'>
                  Sell your home to a global investor network, faster than traditional routes.
                </p>
              </div>
              <Link
                href='/sellers'
                className='inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-[#272342]/85 transition-colors mt-2 font-inter'
              >
                For Sellers <FaArrowRight className='text-xs' />
              </Link>
            </div>

            {/* Card 3: Developer */}
            <div className='bg-white p-8 rounded-3xl border border-[#C6C6CD]/25 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center gap-5 group'>
              <div className='flex items-center justify-center w-16 h-16 rounded-2xl bg-[#272342]/5 text-[#272342] group-hover:bg-[#272342] group-hover:text-white transition-all duration-300'>
                <FaBuilding className='text-2xl' />
              </div>
              <div className='flex flex-col gap-2'>
                <h3 className='font-playfair font-bold text-xl text-navy'>
                  I build property
                </h3>
                <p className='text-[#8E8E93] text-sm font-light leading-relaxed min-h-[40px]'>
                  Move inventory faster and reach investors globally.
                </p>
              </div>
              <Link
                href='/developers'
                className='inline-flex items-center gap-2 text-sm font-semibold text-navy group-hover:text-[#272342]/85 transition-colors mt-2 font-inter'
              >
                For Developers <FaArrowRight className='text-xs' />
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      <section className='px-[5%] lg:px-[7%] pb-24 max-w-5xl mx-auto'>
        <ExpandableFAQ items={faqs} title='Frequently Asked Questions' />
      </section>
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
