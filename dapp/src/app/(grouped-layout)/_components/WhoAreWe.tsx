import Image from 'next/image';

import Button from '@/components/buttons/Button';

export default function WhoAreWe() {
  return (
    <div className='flex flex-col gap-9'>
      <h2 className='font-medium text-3xl sm:text-5xl'>
        Real World Assets
        {/* brought Onchain */}
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-24'>
        <p className='col-span-1 w-full sm:w-[90%]'>
          We are your decentralised real estate agent, handling the end to end
          process of acquiring and managing real world assets globally to
          provide dynamic yield and a safer store of value.
          {/* using blockchain
          Technology. */}
        </p>
        <p className='col-span-1 w-full sm:w-[90%]'>
          Settley also offers a secondary marketplace for fractional digitalised
          real estate, even for properties not initially owned by the DAO. We
          aim to provide further liquidity to the real estate market.
          {/* and be a
          reputable blockchain investment with yield you can understand. */}
        </p>
      </div>

      <Button className='py-4 px-6 bg-navy text-white w-fit mt-4 font-medium'>
        Read More{' '}
        <Image src='/icons/white arrow.png' alt='arrow' width={33} height={1} />
      </Button>
    </div>
  );
}
