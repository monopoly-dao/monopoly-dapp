'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/buttons/Button';

const steps = [
  {
    title: 'Bring an asset',
    copy: 'Owners, developers, or partners submit an eligible property or income-producing asset.',
  },
  {
    title: 'Structure ownership',
    copy: 'Settley links the asset to compliance checks, legal documentation, and tokenized ownership records.',
  },
  {
    title: 'Create liquidity options',
    copy: 'The asset can support ownership access, lending vaults, or future exit mechanisms.',
  },
  {
    title: 'Match with capital',
    copy: 'Buyers can access ownership, while eligible liquidity providers can fund asset-backed requests.',
  },
  {
    title: 'Settle and manage',
    copy: 'Payments, repayments, distributions, and enforcement events are tracked transparently.',
  },
];

export default function HowItWorks() {
  const router = useRouter();

  return (
    <div
      id='how-it-works'
      className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-14 bg-cream py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'
    >
      <div className='flex flex-col gap-6 lg:w-1/2'>
        <h2 className='font-medium text-3xl sm:text-5xl'>
          How Settley turns real assets into liquidity
        </h2>
        <p className='w-full lg:w-4/5 text-[#44403C]'>
          Settley gives owners a path to unlock capital, gives investors access
          to real-asset opportunities, and keeps the rules around ownership,
          repayment, and enforcement clear.
        </p>
        <div className='grid grid-cols-1 gap-4'>
          {steps.map((step, index) => (
            <div key={step.title} className='flex gap-4'>
              <div className='h-9 w-9 shrink-0 rounded-full bg-navy text-white flex items-center justify-center font-medium'>
                {index + 1}
              </div>
              <div>
                <p className='font-medium text-black'>{step.title}</p>
                <p className='text-[#44403C]'>{step.copy}</p>
              </div>
            </div>
          ))}
        </div>
        <Button
          onClick={() => router.push('/listings')}
          className='py-4 px-6 bg-navy text-white w-fit font-medium'
        >
          Explore Opportunities
          <Image
            src='/icons/white arrow.png'
            alt='arrow'
            width={33}
            height={1}
          />
        </Button>
      </div>

      <Image
        src='/images/own a property.png'
        alt='own a property'
        width={591}
        height={548}
        className='w-full lg:w-[500px] xl:w-[591px] h-auto object-cover'
      />

      {/* <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center gap-8 text-xl font-semibold'>
        <div className='shadow-2xl rounded-[10px] py-10 px-5 sm:px-10 bg-white flex flex-col items-center gap-7'>
          <PiHouseLineBold className='text-4xl' />
          Buy property instantly on the blockchain, whole or fractionalized.
        </div>
        <div className='shadow-2xl rounded-[10px] py-10 px-5 sm:px-10 bg-white flex items-center flex-col gap-7'>
          <TiClipboard className='text-4xl' />
          Simplify real-world property transactions with automated title
          management.
        </div>
        <div className='shadow-2xl rounded-[10px] py-10 px-5 sm:px-10 bg-white items-center flex flex-col gap-7'>
          <MdOutlinePerson className='text-4xl' />
          Our local entity acts as an escrow agent on your behalf when you buy
          property.
        </div>
      </div> */}
    </div>
  );
}
