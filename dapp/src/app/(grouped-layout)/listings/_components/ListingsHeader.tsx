import Image from 'next/image';

import header from '~/images/listings-header.png';

export default function ListingsHeader() {
  return (
    <div className='bg-navy pt-24 pb-48 min-h-[360px] flex px-[5%] relative mt-5'>
      <div className='w-full h-full absolute left-0 top-0'>
        <Image
          src={header}
          alt='building'
          width={400}
          height={360}
          quality={100}
          className='w-full h-full min-h-[360px] object-cover'
          unoptimized
          placeholder='blur'
        />
      </div>
      <div className='z-[2] w-full flex flex-col gap-16 items-center text-white'>
        <h1 className='text-center text-3xl sm:text-4xl lg:text-6xl w-full sm:w-1/2'>
          Discover properties from around the world
        </h1>
        {/* <PropertiesSearch /> */}
      </div>
    </div>
  );
}
