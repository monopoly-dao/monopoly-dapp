import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

export default function RealWorldAssets() {
  return (
    <div className='flex flex-col text-center bg-[#FFFDF1] my-10 lg:my-20 items-center justify-between gap-6 sm:gap-14 py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'>
      <div className='flex flex-col w-full sm:w-3/4 lg:w-1/2 xl:w-2/5 mx-auto gap-3 items-center justify-center'>
        <h3 className='text-2xl sm:text-4xl font-light font-merriweather'>
          Real World Assets
          {/* Brought Onchain */}
        </h3>
        <p className='font-roboto text-lg'>
          We are your decentralised real estate agent, handling the end to end
          process of acquiring and managing real world assets globally to
          provide dynamic yield and a safer store of value.
          {/* using blockchain
          Technology. */}
        </p>

        <Link
          className='bg-navy text-white rounded-[60px] font-medium flex items-center gap-1 w-fit py-4 px-7'
          href='/signup'
        >
          Join now
          <FaArrowRight className='text-2xl' />
        </Link>
      </div>
    </div>
  );
}
