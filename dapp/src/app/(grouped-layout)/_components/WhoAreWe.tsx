import Image from 'next/image';

import Button from '@/components/buttons/Button';

const possibilities = [
  'Tokenize eligible real assets with clear documentation and compliance checks',
  'Buy property tokens with clearer rights and records',
  'Request or fund loans backed by property collateral on configurable terms',
  'Track ownership, repayment, distributions, and enforcement paths in one place',
];

export default function WhoAreWe() {
  return (
    <div id='infrastructure' className='flex flex-col gap-9'>
      <h2 className='font-medium text-3xl sm:text-5xl'>
        What Settley makes possible
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-24'>
        <p className='col-span-1 w-full sm:w-[90%]'>
          Real assets are valuable, but they are hard to divide, slow to sell,
          and difficult for new investors to access. Settley makes it easier to
          buy property tokens or lend against real estate collateral.
        </p>
        <p className='col-span-1 w-full sm:w-[90%]'>
          Owners can raise money without a full sale. Buyers can own property
          exposure. Lenders can provide stablecoins against clear collateral,
          rates, repayment dates, and enforcement paths.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {possibilities.map((item, index) => (
          <div
            key={item}
            className='border border-[#D6D3D1] bg-white rounded-[8px] p-5 shadow-sm flex gap-4 items-start'
          >
            <span className='h-8 w-8 shrink-0 rounded-full bg-navy text-white flex items-center justify-center text-sm font-medium'>
              {index + 1}
            </span>
            <p className='text-[#1C1917] font-medium leading-relaxed'>{item}</p>
          </div>
        ))}
      </div>

      <Button className='py-4 px-6 bg-navy text-white w-fit mt-4 font-medium'>
        Learn More{' '}
        <Image src='/icons/white arrow.png' alt='arrow' width={33} height={1} />
      </Button>
    </div>
  );
}
