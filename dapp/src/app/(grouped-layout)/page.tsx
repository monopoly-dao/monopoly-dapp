import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import Cities from './_components/Cities';
import FAQ from './_components/FAQ';
import HowItWorks from './_components/HowItWorks';
import TrendingProperties from './_components/TrendingProperties';
import WhoAreWe from './_components/WhoAreWe';

export const metadata: Metadata = {
  title: 'Buy property tokens, lend, or borrow against real estate',
  description:
    'Settley lets investors buy property tokens or lend against real estate collateral, while owners can raise money without selling the whole asset.',
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
    title: 'I own an asset',
    copy: 'Bring eligible property onchain and raise money against it without forcing a full sale.',
    next: 'You will see how a property can be tokenized, placed beside a lending vault, and used as collateral.',
    cta: 'Raise Against My Asset',
    href: '#vault-flow',
  },
  {
    title: 'I want to invest',
    copy: 'Browse properties and buy tokens that represent ownership.',
    next: 'You will go to available tokenized property opportunities.',
    cta: 'Explore Opportunities',
    href: '/listings',
  },
  {
    title: 'I deploy assets',
    copy: 'Package property inventory for buyers and lenders.',
    next: 'You will see how documentation, ownership records, and market access fit together.',
    cta: 'List an Asset',
    href: '#infrastructure',
  },
  {
    title: 'I want to lend',
    copy: 'Lend stablecoins against property collateral with agreed rates and repayment dates.',
    next: 'You will see what a lender reviews: collateral, rate, repayment date, and enforcement path.',
    cta: 'See Lending Path',
    href: '#lending-path',
  },
];

export default function Page() {
  return (
    <div>
      <div className='mt-20 mb-24 flex flex-col gap-11 px-[5%] sm:px-[7%]'>
        <h1 className='font-medium text-[45px] w-full leading-[55px] sm:leading-[75px] lg:leading-[96px] sm:text-[60px] lg:text-[80px]'>
          <div>Buy property tokens,</div>
          <div>lend, or borrow</div>
          <div>against real estate</div>
        </h1>
        <p className='max-w-3xl text-lg sm:text-xl text-[#44403C]'>
          Settley helps people own property through tokens, lend against real
          estate collateral, or raise money from a property without selling the
          whole asset.
        </p>
        <div className='flex flex-col sm:flex-row gap-4'>
          <Link
            href='#opportunities'
            className='bg-navy text-white rounded-[6px] py-4 px-6 w-fit font-medium'
          >
            Explore Opportunities
          </Link>
          <Link
            href='#vault-flow'
            className='border border-navy text-navy rounded-[6px] py-4 px-6 w-fit font-medium'
          >
            Raise Against My Asset
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
          <Link href='#vault-flow' className='flex items-center gap-5'>
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
            Pick the role that matches your job. Each path tells you what
            happens next, so buyers, owners, lenders, and deployers do not have
            to decode protocol language first.
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
