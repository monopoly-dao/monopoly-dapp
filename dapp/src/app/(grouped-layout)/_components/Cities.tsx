import Link from 'next/link';

import TrendingPropertyCard from './TrendingPropertyCard';

export default function Cities() {
  return (
    <div className='flex flex-col gap-6 sm:gap-12'>
      <div className='flex justify-between items-start'>
        <div>
          <h2 className='font-medium text-3xl sm:text-4xl'>Explore Cities</h2>
          <p className='mt-5 w-full sm:w-4/5'>
            Discover the cities with the most sought after properties and asset
            owners right now.
          </p>
        </div>
        <Link
          href='/listings'
          className='text-black flex font-medium items-center gap-2 underline whitespace-nowrap'
        >
          View All
          {/* <IoIosArrowForward /> */}
        </Link>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
        <TrendingPropertyCard
          image='/svg/auction houses.svg'
          caption='Lisbon, Portugal'
        />
        <TrendingPropertyCard
          image='/images/Montenegro.png'
          caption='Belgrade, Serbia'
        />
        <TrendingPropertyCard
          image='/images/Monaco.png'
          caption='Monaco, France'
        />
      </div>
    </div>
  );
}
