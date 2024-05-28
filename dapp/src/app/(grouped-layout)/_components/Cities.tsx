import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

import TrendingPropertyCard from './TrendingPropertyCard';

export default function Cities() {
  return (
    <div className='flex flex-col gap-6 sm:gap-12'>
      <div className='flex justify-between items-start'>
        <h2 className='font-bold text-3xl sm:text-5xl'>Explore Cities</h2>
        <Link
          href='/'
          className='text-navy flex font-semibold items-center gap-2'
        >
          View All <IoIosArrowForward />
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8'>
        <TrendingPropertyCard
          image='/assets/auction houses.svg'
          caption='Lisbon, Portugal'
        />
        <TrendingPropertyCard
          image='/images/Montenegro.png'
          caption='Montenegro, Serbia'
        />
        <TrendingPropertyCard
          image='/images/Monaco.png'
          caption='Monaco, France'
        />
        <TrendingPropertyCard
          image='/assets/Beachfront property.svg'
          caption='Abu Dhabi, UAE'
        />
      </div>
    </div>
  );
}
