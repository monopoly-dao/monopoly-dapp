import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import { GoInfo } from 'react-icons/go';

import OwnHomeCard from './OwnHomeCard';

import card from '~/images/card.png';
import community from '~/images/community-icon.png';
import home from '~/images/home-icon.png';
import keys from '~/images/keys-background.jpg';

const data = [
  {
    icon: card,
    title: 'Purchase a Digital Collectible',
    content:
      'Choose Your Membership ($50-$5,000). Join the founding 1,000. Your commitment reserves your ownership share. Get immediate founder benefits + voting rights.',
  },
  {
    icon: community,
    title: 'Join the community',
    content:
      'We Buy the Property Together. When we hit our goal, Settley purchases the Valencia property (Q2 2026). Community votes on final property selection.',
  },
  {
    icon: home,
    title: 'Receive Property Token',
    content:
      'You Own & Earn Receive legal ownership tokens. Start earning 6.17% annual rental income',
  },
];

const steps = [
  'Join the founding 1,000 for $50-$5,000. Your commitment reserves your ownership percentage of our first property.',
  // 'You indicate your location and property preferences through our voting system.',
  'We purchase the $160,000 Valencia property in Q1 2026 when campaign closes December 31st.',
  'You receive legal ownership tokens + start earning 6.17% annual rental income.',
];

export default function OwnHome() {
  return (
    <div className='px-[5%] py-20'>
      <div className='flex flex-col gap-10'>
        <div className='flex items-center justify-between'>
          <div className='font-medium text-3xl lg:text-4xl'>
            <p className='font-roboto'>Own a home</p>
            <p className='font-roboto bg-clip-text text-transparent bg-gradient-to-r from-[#4330C8] to-[#1D1459]'>
              in 3 simple steps
            </p>
          </div>
          <Link
            className='bg-white text-navy rounded-[20px] font-inter text-sm font-medium flex items-center gap-[6px] w-fit py-[10px] px-5 border'
            href='/campaign/payment'
          >
            Join Now <FaArrowRight className='text-sm' />
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {data.map((item) => (
            <OwnHomeCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <div className='mt-20 rounded-[20px] grid grid-cols-1 lg:grid-cols-2 relative'>
        <div className='absolute top-0 bottom-0 w-full h-full bg-[#2B216E1A] rounded-[20px] z-[1]' />
        <div className='top-0 bottom-0 z-[0] absolute lg:relative col-span-1 lg:col-span-2 w-full h-full'>
          <Image
            src={keys}
            alt='collectible'
            width={1500}
            height={700}
            quality={100}
            placeholder='blur'
            className='rounded-[20px] lg:max-h-[640px] w-full h-full lg:h-auto object-cover lg:object-right bottom-0'
          />
        </div>
        <div className='p-6 rounded-[20px] z-[1] lg:absolute col-span-1 lg:top-5 lg:bottom-5 w-full lg:right-5 lg:w-1/2 lg:p-6 flex flex-col justify-between text-white gap-8 border border-[#E0E0E0] bg-[#6C677980]'>
          <p className='font-merriweather text-2xl md:text-3xl xl:text-5xl lg:!leading-[120%]'>
            Settley brings collective power to real estate investment.
          </p>
          <div className='flex flex-col gap-5'>
            {steps.map((step, i) => (
              <div key={step} className='flex items-start gap-3'>
                <div>
                  <p className='text-navy bg-white rounded-[100%] w-6 h-6 text-sm flex items-center justify-center'>
                    {i + 1}
                  </p>
                </div>
                <p className='font-roboto font-medium'>{step}</p>
              </div>
            ))}
          </div>
          <div className='bg-[#E1E2E166] w-full h-[1px]' />
          <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-[13px]'>
            <div className='flex flex-col text-white'>
              <p className='flex items-center gap-1'>
                Property ownership starting at <GoInfo />
              </p>
              <p className='font-roboto font-semibold text-3xl xl:text-5xl'>
                $50
              </p>
            </div>

            <Link
              href='/campaign/payment'
              className='bg-white rounded-[20px] py-[10px] px-5 text-navy font-inter font-medium text-sm'
            >
              Join now
            </Link>

            {/* <div className='flex flex-col gap-1'>
              <p className='font-roboto text-2xl'>
                <span className='font-semibold text-5xl'>$1</span>/Unit
              </p>
              <p className='font-roboto'>Starting at $10</p>
            </div>
            <Link
              href='/campaign/payment'
              className='bg-white rounded-[20px] py-[10px] px-5 text-navy font-inter font-medium text-sm'
            >
              Join now
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}
