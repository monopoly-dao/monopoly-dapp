import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Cities from './_components/Cities';
import FAQ from './_components/FAQ';
import HowItWorks from './_components/HowItWorks';
import TrendingProperties from './_components/TrendingProperties';
import WhoAreWe from './_components/WhoAreWe';

export const metadata: Metadata = {
  title: 'Buy, lend, or raise with property tokens',
  description:
    'Settley lets people buy property tokens, lend against property collateral, or raise money from a property without selling the whole asset.',
  keywords: [
    'Settley',
    'Real asset liquidity',
    'Tokenized property',
    'SettleyCo',
    'Settley co',
  ],
};

const pathways = [
  {
    title: 'I own property',
    copy: 'Turn eligible property into tokens and raise money without selling the whole asset.',
    next: 'See how an owner can list a property, set terms, and receive capital.',
    cta: 'Raise from my property',
    href: '/vaults#owners',
  },
  {
    title: 'I want to invest',
    copy: 'Browse properties and buy tokens tied to real ownership.',
    next: 'Go straight to available tokenized property opportunities.',
    cta: 'Browse Properties',
    href: '/listings',
  },
  {
    title: 'I deploy assets',
    copy: 'Bring property inventory to buyers and lenders with the right records in place.',
    next: 'See how documentation, ownership records, and market access fit together.',
    cta: 'List an Asset',
    href: '/vaults',
  },
  {
    title: 'I want to lend',
    copy: 'Fund property-backed loans with clear collateral, rates, and repayment dates.',
    next: 'See what a lender reviews before funding a loan.',
    cta: 'See lending path',
    href: '/vaults#lenders',
  },
];

export default function Page() {
  return (
    <div>
      <div className='mt-20 mb-24 flex flex-col gap-11 px-[5%] sm:px-[7%]'>
        <h1 className='font-medium text-[45px] w-full leading-[55px] sm:leading-[75px] lg:leading-[96px] sm:text-[60px] lg:text-[80px]'>
          <div>Buy property.</div>
          <div>Lend against it.</div>
          <div>Raise without selling.</div>
        </h1>
        <p className='max-w-3xl text-lg sm:text-xl text-[#44403C]'>
          Settley turns eligible property into tokens so buyers can own a
          share, lenders can fund property-backed loans, and owners can access
          capital without selling the whole asset.
        </p>
        <div className='flex flex-col sm:flex-row gap-4'>
          <Link
            href='/listings'
            className='bg-navy text-white rounded-[6px] py-4 px-6 w-fit font-medium'
          >
            Browse Properties
          </Link>
          <Link
            href='/vaults#owners'
            className='border border-navy text-navy rounded-[6px] py-4 px-6 w-fit font-medium'
          >
            Raise from my property
          </Link>
        </div>
      </div>

      <div className='relative'>
        <Image
          src='/images/landing-banner.png'
          alt='banner'
          width={1000}
          height={595}
          quality={100}
          className='w-full h-[250px] sm:h-[400px] lg:h-[595px] object-cover'
        />
        <div className='absolute bottom-0 bg-black/50 z-[2] py-8 text-white w-full flex justify-end pr-[10%]'>
          <Link href='/vaults#how-vaults-work' className='flex items-center gap-5'>
            See how the vault works{' '}
            <Image
              src='/icons/white arrow.png'
              alt='arrow'
              width={33}
              height={1}
            />
          </Link>
        </div>
      </div>

      <section
        id='pathways'
        className='bg-white py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%] flex flex-col gap-10'
      >
        <div className='max-w-3xl'>
          <h2 className='font-medium text-3xl sm:text-5xl'>Who are you?</h2>
          <p className='mt-5 text-[#44403C]'>
            Pick the path that matches what you want to do with property:
            buy it, lend against it, list it, or raise from it.
          </p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5'>
          {pathways.map((pathway) => (
            <div
              key={pathway.title}
              className='border border-[#D6D3D1] rounded-[8px] p-6 min-h-[310px] flex flex-col justify-between gap-6 bg-white'
            >
              <div>
                <p className='text-sm uppercase tracking-[0.14em] text-[#57534E]'>
                  {pathway.title}
                </p>
                <p className='mt-5 text-lg text-black'>{pathway.copy}</p>
                <p className='mt-5 text-sm text-[#57534E]'>{pathway.next}</p>
              </div>
              <Link
                href={pathway.href}
                className='font-medium text-navy underline underline-offset-4'
              >
                {pathway.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <HowItWorks />

      <TrendingProperties />

      <div className='bg-cream px-[5%] lg:px-[7%] py-12 sm:py-20 lg:py-28 flex flex-col gap-28'>
        <WhoAreWe />
        <Cities />
      </div>

      <div className='px-[5%] lg:px-[7%]'>
        <FAQ />
      </div>
    </div>
  );
}
