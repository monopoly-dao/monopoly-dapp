import { MdOutlinePerson } from "react-icons/md";
import { PiHouseLineBold } from 'react-icons/pi';
import { TiClipboard } from 'react-icons/ti';

export default function HowItWorks() {
  return (
    <div className='flex flex-col gap-6 sm:gap-12'>
      <h2 className='font-bold text-3xl sm:text-5xl'>
        Own a Property in minutes
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 text-center gap-8 text-xl font-semibold'>
        <div className='shadow-2xl rounded-[10px] py-10 px-5 sm:px-10 bg-white flex flex-col items-center gap-7'>
          <PiHouseLineBold className='text-4xl' />
          Buy property instantly on the blockchain, whole or fractionalized.
        </div>
        <div className='shadow-2xl rounded-[10px] py-10 px-5 sm:px-10 bg-white flex items-center flex-col gap-7'>
          <TiClipboard className='text-4xl' />
          Simplify real-world property transactions with automated title
          management.
        </div>
        <div className='shadow-2xl rounded-[10px] py-10 px-5 sm:px-10 bg-white items-center flex flex-col gap-7'>
          <MdOutlinePerson className='text-4xl' />
          Our local entity acts as an escrow agent on your behalf when you buy
          property.
        </div>
      </div>
    </div>
  );
}
