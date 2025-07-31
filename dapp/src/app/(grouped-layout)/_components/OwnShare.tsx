import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import { VscCheckAll } from 'react-icons/vsc';

export default function OwnShare() {
  return (
    <div className='flex overflow-hidden flex-col bg-[#FFFDF1] my-10 lg:my-20 lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-14 py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'>
      <div className='flex flex-col gap-5'>
        <h2 className='text-3xl sm:text-5xl font-merriweather'>
          Own a share of an actual property with real rights
        </h2>
        <div className='w-full font-roboto text-lg lg:w-4/5 flex flex-col gap-4 mt-6'>
          <p className='mb-2 text-xl'>Your ownership means;</p>
          <p className='flex items-center gap-3'>
            <div className='w-6 h-6 bg-black text-white rounded-[100%] flex items-center justify-center'>
              <VscCheckAll />
            </div>
            Real legal rights backed by traditional deeds
            {/* and blockchain deeds */}
          </p>
          <p className='flex items-center gap-3'>
            <div className='w-6 h-6 bg-black text-white rounded-[100%] flex items-center justify-center'>
              <VscCheckAll />
            </div>
            Share in property value and rental income
          </p>
          <p className='flex items-center gap-3'>
            <div className='w-6 h-6 bg-black text-white rounded-[100%] flex items-center justify-center'>
              <VscCheckAll />
            </div>
            Vote on property decisions
          </p>
          <p className='flex items-center gap-3'>
            <div className='w-6 h-6 bg-black text-white rounded-[100%] flex items-center justify-center'>
              <VscCheckAll />
            </div>
            Sell your share when you want (secondary market coming soon)
          </p>
        </div>

        <Link
          className='bg-navy text-white rounded-[60px] font-medium flex items-center gap-1 w-fit py-3 text-sm px-7'
          href='/faqs'
        >
          Learn More
          <FaArrowRight className='text-xl' />
        </Link>
      </div>

      <Image
        src='/svg/house sketch.svg'
        alt='how it works'
        width={591}
        height={548}
        className='w-full lg:w-1/2 xl:w-[591px] h-auto lg:scale-[1.3] xl:scale-150 object-cover'
      />
    </div>
  );
}
