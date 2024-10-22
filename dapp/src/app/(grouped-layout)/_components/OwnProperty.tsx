'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/components/buttons/Button';

import owmProperty from '~/images/own a property.png';

export default function OwnProperty() {
  const router = useRouter();

  return (
    <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-14 bg-cream py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'>
      <div className='flex flex-col gap-5'>
        <h2 className='font-medium text-3xl sm:text-5xl'>
          With Settley, you can own a property in minutes
        </h2>
        <div className='w-full lg:w-4/5 flex flex-col gap-[2px]'>
          <p>
            Our blockchain technology lets you buy property anywhere in the
            world in an instant, whole or fractionalised.
          </p>
          <p>
            Settley simplifies real world property transactions using automated
            title management and trustless blockchain powered services.
          </p>
          {/* <p>
            Our local entity acts as an escrow agent on your behalf when you buy
            property.
          </p> */}
        </div>
        <Button
          onClick={() => router.push('/listings')}
          className='py-4 px-6 bg-navy text-white w-fit font-medium'
        >
          Explore Properties
          <Image
            src='/icons/white arrow.png'
            alt='arrow'
            width={33}
            height={1}
          />
        </Button>
      </div>

      <Image
        src={owmProperty}
        alt='own a property'
        width={591}
        height={548}
        unoptimized
        placeholder='blur'
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
