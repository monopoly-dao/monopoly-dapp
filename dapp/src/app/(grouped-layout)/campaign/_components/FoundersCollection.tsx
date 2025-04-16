import Image from 'next/image';
import Link from 'next/link';
import { IoMdCheckmark } from 'react-icons/io';

import settleyCard from '~/images/settley-card.png';

const list = [
  'Unique digital collectible',
  'Community access',
  'Future property tokens allocation',
  'Name in founding members registry',
];

export default function FoundersCollection() {
  return (
    <section className='py-20 bg-white px-[5%] md:px-[10%] lg:px-[5%] grid grid-cols-1 lg:grid-cols-2 gap-[5%] lg:gap-[7%] items-center'>
      <div className='col-span-1 w-full h-full'>
        <Image
          src={settleyCard}
          alt='settley'
          width={500}
          height={500}
          placeholder='blur'
          className='object-cover w-full h-full'
        />
      </div>
      <div className='col-span-1 w-full h-full flex flex-col justify-center gap-[30px] lg:pr-10 xl:pr-20'>
        <p className='font-roboto font-medium text-3xl md:text-4xl lg:text-5xl'>
          Settley Founder's Collection
        </p>
        <p className='font-merriweather text-[#000000B2]'>
          Exclusive digital collectibles that grant you membership benefits
          today and real property ownership tomorrow.
        </p>
        <div className='flex flex-col gap-4'>
          {list.map((item) => (
            <div className='flex items-center gap-3' key={item}>
              <IoMdCheckmark className='text-base text-[#231399]' />
              <p className='text-sm font-roboto text-[#000000B2]'>{item}</p>
            </div>
          ))}
        </div>

        <div className='w-full h-[1px] bg-[#E1E2E166]' />

        <Link
          href='/campaign/payment'
          className='rounded-[30px] bg-[#231399] text-white py-[10px] px-5 font-inter font-medium text-sm w-fit'
        >
          Get Explore Pass
        </Link>
      </div>
    </section>
  );
}
