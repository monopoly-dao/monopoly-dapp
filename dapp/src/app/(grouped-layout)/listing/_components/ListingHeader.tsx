import Image from 'next/image';
import { IoLocationOutline } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';

import Button from '@/components/buttons/Button';

export default function ListingHeader() {
  return (
    <div className='bg-navy py-20 min-h-[360px] -mt-[1px] flex px-[5%] relative'>
      <div className='w-full h-full opacity-20 absolute left-0 top-0'>
        <Image
          src='/images/header image.jpg'
          alt='building'
          width={400}
          height={360}
          className='w-full h-full min-h-[360px] object-cover'
        />
      </div>
      <div className='z-[2] w-full font-inter flex flex-col text-white'>
        <h1 className='font-bold font-inter w-full lg:w-3/5 text-3xl sm:text-5xl linear-gradient'>
          Penthouse in Ibiza
        </h1>
        <div className='text-xl mt-6 font-inter flex items-center flex-wrap gap-3'>
          <IoLocationOutline className='text-xl' />
          Londrina, Paraná (PR) •{' '}
          <div className='flex items-center gap-2'>
            <VscAccount /> 40 owners
          </div>
        </div>
        <div className='mt-3 flex items-center gap-3'>
          <div className='rounded-[4px] h-2 w-[195px] bg-white'>
            <div className='h-full w-3/4 bg-yellow rounded-[4px]' />
          </div>
          <p className='font-medium text-sm font-inter'>1,238 Units left</p>
        </div>
        <div className='mt-7 flex items-center justify-between'>
          <Button variant='light' className='text-navy bg-white py-2 px-5'>
            Buy Property
          </Button>
          {/* <Button
            variant='outline'
            leftIcon={CiShare2}
            className='py-2 px-5 bg-transparent text-white border-white'
          >
            Share
          </Button> */}
        </div>
      </div>
    </div>
  );
}
