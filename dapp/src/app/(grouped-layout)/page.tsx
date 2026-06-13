import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import FAQ from './_components/FAQ';
import HowItWorks from './_components/HowItWorks';
import PersonaSelector from './_components/PersonaSelector';
import TrendingProperties from './_components/TrendingProperties';

export const metadata: Metadata = {
  title: 'Buy a share in property. Raise without selling.',
  description:
    'Own a stake in real property, lend against it, or raise capital from it without buying or selling the whole asset.',
  openGraph: {
    title: 'Settley | Own property differently.',
    description:
      'Own a share. Fund property-backed opportunities. Raise capital. Settley makes property accessible from both sides.',
  },
  keywords: [
    'Settley',
    'fractional property ownership',
    'property investment',
    'raise against property',
    'SettleyCo',
    'Settley co',
  ],
};

export default function Page() {
  return (
    <div>
      <section className='mt-16 mb-14 flex flex-col gap-8 px-[5%] sm:px-[7%] lg:mt-24 lg:mb-20'>
        <h1 className='font-medium text-[38px] w-full leading-[44px] sm:leading-[62px] lg:leading-[88px] sm:text-[56px] lg:text-[78px] max-w-[900px]'>
          <div>Buy property.</div>
          <div>Lend against it.</div>
          <div>Raise without selling.</div>
        </h1>
        <p className='max-w-[680px] text-base sm:text-lg text-dark-grey'>
          Settley gives owners a way to raise capital, buyers a way to own a
          share, and lenders a way to fund property-backed opportunities without
          anyone buying or selling the whole asset.
        </p>
        <div className='flex flex-col gap-3 sm:flex-row'>
          <Link
            href='/listings'
            className='rounded-md border border-navy bg-navy px-6 py-3 text-center text-white'
          >
            Browse Properties
          </Link>
          <Link
            href='mailto:hello@settley.co?subject=Raise%20from%20my%20property'
            className='rounded-md border border-navy px-6 py-3 text-center text-navy'
          >
            Raise from my property
          </Link>
        </div>
      </section>

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
          <Link href='/listings' className='flex items-center gap-5'>
            See available properties{' '}
            <Image
              src='/icons/white arrow.png'
              alt='arrow'
              width={33}
              height={1}
            />
          </Link>
        </div>
      </div>

      <p className='px-[5%] py-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-dark-grey sm:px-[7%]'>
        Every property on Settley is legally structured before it goes live on
        the platform.
      </p>

      <PersonaSelector />

      <HowItWorks />

      <TrendingProperties />

      <div className='px-[5%] lg:px-[7%]'>
        <FAQ />
      </div>
    </div>
  );
}
