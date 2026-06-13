'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/buttons/Button';

export default function HowItWorks() {
  const router = useRouter();

  return (
    <div
      id='how-it-works'
      className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-14 bg-cream py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'
    >
      <div className='flex flex-col gap-5'>
        <h2 className='font-medium text-3xl sm:text-5xl'>
          How Settley works
        </h2>
        <div className='w-full lg:w-4/5 flex flex-col gap-5'>
          <div>
            <p className='font-semibold'>1. List or browse</p>
            <p className='text-dark-grey'>
              Owners list a property and set raise terms. Buyers browse
              opportunities with clear ownership terms attached.
            </p>
          </div>
          <div>
            <p className='font-semibold'>2. Structure and verify</p>
            <p className='text-dark-grey'>
              Settley handles the legal structure and ownership records for
              every property before it goes live.
            </p>
          </div>
          <div>
            <p className='font-semibold'>3. Own, lend, or raise</p>
            <p className='text-dark-grey'>
              Buyers receive a documented ownership stake. Lenders fund
              property-backed positions. Owners access capital without selling.
            </p>
          </div>
        </div>
        <Button
          onClick={() => router.push('/listings')}
          className='py-4 px-6 bg-navy text-white w-fit font-medium'
        >
          Browse Properties
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
        loading='eager'
      />
    </div>
  );
}
