'use client';

import { useRouter } from 'next/navigation';
import { IoArrowForward } from 'react-icons/io5';

import Button from '@/components/buttons/Button';

export default function ExploreOpportunities() {
  const router = useRouter();

  return (
    <div className='border border-[#18181b1a] rounded-lg p-6 bg-[#18181b0d]'>
      <h2 className='text-2xl font-bold mb-2'>Become a Property Owner Today</h2>
      <p className='mb-4 text-[71717a]'>
        Start your journey to property ownership with Settley. Discover
        affordable options and build your real estate portfolio.
      </p>
      <Button
        variant='ghost'
        className='bg-black px-8 py-2 text-white text-sm'
        rightIcon={IoArrowForward}
        onClick={() => router.push('/listings')}
      >
        Explore Ownership Opportunities
      </Button>
    </div>
  );
}
