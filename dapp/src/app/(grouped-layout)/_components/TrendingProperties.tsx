import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

import TrendingPropertyCard from './TrendingPropertyCard';

export default function TrendingProperties() {
  return (
    <div className='flex flex-col gap-6 sm:gap-12'>
      <div className='flex justify-between items-start'>
        <h2 className='font-bold text-3xl sm:text-5xl'>Trending Properties</h2>
        <Link
          href='/listings'
          className='text-navy flex font-semibold items-center gap-2'
        >
          View All <IoIosArrowForward />
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8'>
        <TrendingPropertyCard
          image='/images/header image.jpg'
          caption='Abu Dhabi, UAE'
        />
        <TrendingPropertyCard
          image='/assets/Beachfront property.svg'
          caption='Monaco, France'
        />
        <TrendingPropertyCard
          image='/images/header image.jpg'
          caption='Madrid, Spain'
        />
        <TrendingPropertyCard
          image='/assets/auction houses.svg'
          caption='Baki, Azerbaijan'
        />
      </div>
    </div>
  );
}
