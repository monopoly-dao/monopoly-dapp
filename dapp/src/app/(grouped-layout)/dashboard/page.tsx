import { PiHouseLine } from 'react-icons/pi';
import { PiCubeFill } from 'react-icons/pi';
import { TbWheel } from 'react-icons/tb';

import BookmarkSection from './_components/BookmarkSection';
import DashboardCard from './_components/DashboardCard';
import TransactionsSection from './_components/TransactionsSection';

export default function Page() {
  return (
    <div>
      <h2 className='text-3xl mt-12 font-inter mb-2'>Dashboard</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
        <DashboardCard
          title='Total Portfolio Value'
          amount='120,000.96'
          percentChange={100}
          icon={TbWheel}
        />
        <DashboardCard
          title='Total Portfolio Volume'
          amount='90,000'
          percentChange={-100}
          icon={PiHouseLine}
        />
        <DashboardCard
          title='Lorem Ipsum'
          amount='90,000'
          percentChange={100}
          icon={PiCubeFill}
        />
      </div>

      <div className='mt-20'>
        <BookmarkSection />
      </div>

      <div className='mt-20'>
        <TransactionsSection />
      </div>
    </div>
  );
}
