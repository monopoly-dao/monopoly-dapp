import Image from 'next/image';
import { FaCircleCheck } from 'react-icons/fa6';

import PaymentForm from './PaymentForm';

const list = [
  "Priority access to Settley's platform",
  'Exclusive investment opportunities',
  // 'Reduced fees on transactions',
  'Direct support from our founding team',
];

export default function BecomeFoundingMember() {
  return (
    <section className='grid grid-cols-1 bg-gradient-to-br from-[#F4F4F4] to-[#ECE9FF] lg:grid-cols-2 overflow-x-hidden items-center px-[5%] md:px-[10%] lg:px-[5%] gap-10 lg:gap-[7%] py-[100px] relative'>
      <div className='flex flex-col'>
        <h1 className='text-[#333333] text-4xl font-merriweather lg:text-[50px] leading-[120%]'>
          Join the First 1,000 <br />
          Property Owners
        </h1>
        <p className='text-[#303030CC] text-lg mt-[10px] font-roboto'>
          {/* Be among the first to experience Settley's revolutionary
         platform, transforming global property buying with
          enhanced security, transparency, and efficiency. */}
          237 members joined | 763 spots remaining | Closes Dec 31
        </p>
        <div className='flex flex-col mt-[30px] gap-4'>
          {list.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <FaCircleCheck className='text-2xl text-navy' />
              <p className='font-roboto text-[#333333CC]'>{item}</p>
            </div>
          ))}
        </div>
      </div>

      <PaymentForm isOnHomepage />

      <Image
        src='/svg/navy-blue-strip.svg'
        alt='stripe'
        className='absolute z-[0] right-0 bottom-[250px] md:top-[300px] lg:top-[30px]'
        width={337}
        height={268}
      />

      <Image
        src='/svg/navy-blue-strip.svg'
        alt='stripe'
        className='absolute z-[0] right-0 bottom-[150px] md:bottom-[230px] lg:right-[-280px] lg:bottom-[260px]'
        width={337}
        height={268}
      />

      <Image
        src='/svg/navy-blue-strip.svg'
        alt='stripe'
        className='absolute z-[0] right-0 lg:right-[4%] bottom-0'
        width={337}
        height={268}
      />
    </section>
  );
}
