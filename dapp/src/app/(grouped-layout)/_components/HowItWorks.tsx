import Image from 'next/image';
import { VscCheckAll } from 'react-icons/vsc';

import howItWorks from '~/images/settley-how-it-works.png';

export default function HowItWorks() {
  return (
    <div
      id='how-it-works'
      className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-14 py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'
    >
      <div className='flex flex-col gap-5'>
        <h2 className='font-medium text-3xl sm:text-5xl'>How Settley Works</h2>
        <div className='w-full lg:w-4/5 flex flex-col gap-5'>
          <p>
            With Settley, you can own a share of actual property with real
            rights, from receiving rental income to making decisions about the
            property. Your ownership means;
          </p>
          <p className='flex items-center gap-3'>
            <VscCheckAll /> Real legal rights backed by traditional deeds
            {/* blockchain deeds */}
          </p>
          <p className='flex items-center gap-3'>
            <VscCheckAll />
            Share in property value and rental income
          </p>
          <p className='flex items-center gap-3'>
            <VscCheckAll />
            Vote on property decisions
          </p>
          <p className='flex items-center gap-3'>
            <VscCheckAll />
            Sell your share when you want (secondary market coming soon)
          </p>
        </div>
      </div>

      <Image
        src={howItWorks}
        alt='how it works'
        width={591}
        height={548}
        unoptimized
        placeholder='blur'
        className='w-full lg:w-[500px] xl:w-[591px] h-auto object-cover'
      />
    </div>
  );
}
