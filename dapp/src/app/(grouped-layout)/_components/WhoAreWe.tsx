import Image from 'next/image';

import Button from '@/components/buttons/Button';

const possibilities = [
  'Tokenize eligible real assets with clear documentation and compliance checks',
  'Request liquidity against tokenized ownership without selling the whole asset',
  'Open asset-backed opportunities to buyers, investors, and liquidity providers',
  'Track ownership, repayment, distributions, and enforcement paths in one place',
];

export default function WhoAreWe() {
  return (
    <div className='flex flex-col gap-9'>
      <h2 className='font-medium text-3xl sm:text-5xl'>
        What Settley makes possible
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-24'>
        <p className='col-span-1 w-full sm:w-[90%]'>
          Real assets are valuable, but they are often slow to sell, hard to
          borrow against, and difficult for new investors to access. Settley
          turns eligible assets into structured ownership records and liquidity
          opportunities that can be understood by both owners and capital
          providers.
        </p>
        <p className='col-span-1 w-full sm:w-[90%]'>
          Asset owners can unlock capital without a full sale. Investors can
          access real-asset opportunities. Liquidity providers can fund
          asset-specific requests with clear collateral, terms, repayment dates,
          and enforcement paths.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
        {possibilities.map((item) => (
          <div key={item} className='border border-black/10 rounded-[8px] p-5'>
            <p>{item}</p>
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
