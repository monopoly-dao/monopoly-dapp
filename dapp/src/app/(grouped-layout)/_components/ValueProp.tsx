import Image from 'next/image';

import shareValue from '~/images/increase-income.jpg';
import legalRight from '~/images/legal right.jpg';
import sellShare from '~/images/sell share.jpg';
import vote from '~/images/vote counts.jpg';

export default function ValueProp() {
  return (
    <section className='flex flex-col gap-6 py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'>
      <div className='flex flex-col gap-5'>
        <h2 className='font-medium text-3xl'>
          Why Settley? Unlocking a New Era of Property Ownership
        </h2>
      </div>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        <div className='flex flex-col gap-5 col-span-1'>
          {/* <GoLaw className='text-3xl' /> */}
          <Image
            src={legalRight}
            alt='Legal Right'
            width={100}
            height={100}
            placeholder='blur'
            className='w-full h-auto rounded-[16px] max-h-[150px] object-cover'
          />
          <div className='flex flex-col gap-2'>
            <p className='text-2xl'>Real Legal Rights</p>
            <p>Acquire verified ownership rights.</p>
          </div>
        </div>
        <div className='flex flex-col gap-5 col-span-1'>
          {/* <GoLaw className='text-3xl' /> */}
          <Image
            src={shareValue}
            alt='Share Value'
            width={100}
            height={100}
            placeholder='blur'
            className='w-full h-auto rounded-[16px] max-h-[150px] object-cover'
          />
          <div className='flex flex-col gap-2'>
            <p className='text-2xl'>Share Value & Income</p>
            <p>Benefit from property appreciation and rental income.</p>
          </div>
        </div>
        <div className='flex flex-col gap-5 col-span-1'>
          {/* <GoLaw className='text-3xl' /> */}
          <Image
            src={vote}
            alt='Vote'
            width={100}
            height={100}
            placeholder='blur'
            className='w-full h-auto rounded-[16px] max-h-[150px] object-cover'
          />
          <div className='flex flex-col gap-2'>
            <p className='text-2xl'>Vote on Decisions</p>
            <p>Participate in property management choices.</p>
          </div>
        </div>
        <div className='flex flex-col gap-5 col-span-1'>
          {/* <GoLaw className='text-3xl' /> */}
          <Image
            src={sellShare}
            alt='Sell Share'
            width={100}
            height={100}
            placeholder='blur'
            className='w-full max-h-[150px] object-cover rounded-[16px]'
          />
          <div className='flex flex-col gap-2'>
            <p className='text-2xl'>Sell Your Share</p>
            <p>Easily liquidate your investment.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
