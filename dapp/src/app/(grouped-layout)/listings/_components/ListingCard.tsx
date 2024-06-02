import Image from 'next/image';
import Link from 'next/link';
import { BiBath, BiBed } from 'react-icons/bi';
import { FaRegBookmark } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

import IconButton from '@/components/buttons/IconButton';

type Props = {
  name: string;
  image: string;
  location: string;
  beds: number;
  baths: number;
  unitsLeft: number;
  pricePerUnit: number;
  symbol: string;
};

export default function ListingCard({
  name,
  location,
  image,
  beds,
  baths,
  unitsLeft,
  pricePerUnit,
  symbol,
}: Props) {
  return (
    <Link
      href={`/listing/${symbol}`}
      className='w-full min-h-[450px] rounded-[12px] bg-white shadow'
    >
      <Image
        src={image}
        alt='mansion'
        width={300}
        height={220}
        quality={100}
        className='w-full h-[220px] object-cover rounded-t-[12px]'
      />
      <div className='py-6 px-4 w-full'>
        <div className='flex items-start justify-between gap-1'>
          <p className='text-navy font-bold w-3/4 truncate text-xl'>{name}</p>
          <p className='text-[green] font-bold uppercase'>${symbol}</p>
        </div>
        <div className='mt-2 flex items-center gap-3 text-sm text-gray-500'>
          <IoLocationOutline className='text-lg' />
          {location}
        </div>
        <div className='mt-6 pb-6 border-b-[2px] border-medium-grey flex items-center justify-between'>
          <div className='flex items-center gap-4 text-lg'>
            <div className='flex items-center gap-1'>
              <BiBed /> <p>{beds} Beds</p>
            </div>
            <div className='flex items-center gap-1'>
              <BiBath /> <p>{baths} Bath</p>
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
            <p className='font-bold text-2xl'>${pricePerUnit}</p>
            <p>/unit</p>
          </div>
          <p className='text-navy/40'>{unitsLeft} units left</p>
        </div>
      </div>
    </Link>
  );
}
