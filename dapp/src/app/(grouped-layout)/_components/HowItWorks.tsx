'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/buttons/Button';

const steps = [
  {
    title: 'Tokenize an eligible asset',
    copy: 'Owners or deployers submit a property for checks, documents, and ownership structuring.',
  },
  {
    title: 'Create a lending vault',
    copy: 'A property-specific lending vault can sit beside the ownership structure, with terms tied to that property only.',
  },
  {
    title: 'Set the opportunity',
    copy: 'The structure defines what investors can do: own part of the property, lend against it, or both.',
  },
  {
    title: 'Capital chooses its path',
    copy: 'Buyers purchase property tokens. Lenders provide stablecoins and accept the property tokens as collateral.',
  },
  {
    title: 'Track rights and outcomes',
    copy: 'Ownership, distributions, repayment, and collateral enforcement events are tracked against the asset structure.',
  },
];

export default function HowItWorks() {
  const router = useRouter();

  return (
    <div
      id='vault-flow'
      className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-14 bg-cream py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'
    >
      <span id='how-it-works' className='sr-only' />
      <div className='flex flex-col gap-6 lg:w-1/2'>
        <h2 className='font-medium text-3xl sm:text-5xl'>
          What each user sees after they click
        </h2>
        <p className='w-full lg:w-4/5 text-[#44403C]'>
          A property can support multiple user paths without changing what the
          asset is. Buyers see property tokens. Owners see a way to raise
          without a full sale. Lenders see collateral, interest rate, repayment
          date, and what happens if the loan is not repaid.
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
          View Opportunities
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
    </div>
  );
}
