import Image from 'next/image';
import { BiBath, BiBed } from 'react-icons/bi';
import { FaRegBookmark } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

import IconButton from '@/components/buttons/IconButton';

export default function ListingCard() {
  return (
    <div className='w-full h-[450px] rounded-[12px] bg-white shadow'>
      <Image
        src='/images/mansion.jpg'
        alt='mansion'
        width={300}
        height={220}
        className='w-full h-[220px] object-cover rounded-t-[12px]'
      />
      <div className='py-6 px-4'>
        <p className='text-navy font-bold text-xl'>Property name</p>
        <div className='mt-2 flex items-center gap-3 text-sm text-gray-500'>
          <IoLocationOutline className='text-lg' />
          Mumbai, India
        </div>
        <div className='mt-6 pb-6 border-b-[2px] border-medium-grey flex items-center justify-between'>
          <div className='flex items-center gap-4 text-lg'>
            <div className='flex items-center gap-1'>
              <BiBed /> <p>2 Beds</p>
            </div>
            <div className='flex items-center gap-1'>
              <BiBath /> <p>1 Bath</p>
            </div>
          </div>
          <IconButton
            variant='ghost'
            icon={FaRegBookmark}
            className='text-2xl'
          />
        </div>
        <div className='mt-4 flex items-end justify-between'>
          <div className='flex items-end'>
            <p className='font-bold text-2xl'>$500</p>
            <p>/unit</p>
          </div>
          <p className='text-navy/40'>2000 units left</p>
        </div>
      </div>
    </div>
  );
}
