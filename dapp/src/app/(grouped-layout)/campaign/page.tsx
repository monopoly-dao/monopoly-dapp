import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

import { siteConfig } from '@/constants/config';

import BecomeFoundingMember from './_components/BecomeFoundingMember';
import CampaignFAQs from './_components/CampaignFAQs';
import FoundersCollection from './_components/FoundersCollection';
import InvestmentVision from './_components/InvestmentVision';
import OwnHome from './_components/OwnHome';
import Partners from './_components/Partners';
import Revolutionary from './_components/Revolutionary';
import Testimonials from './_components/Testimonials';

import campaignHero from '~/images/Campaign-hero.png';

export const metadata: Metadata = {
  title: 'Campaign',
  description: 'Join our early supporter program.',
  keywords: [
    'Settley',
    'Campaign',
    'Settley campaign',
    'Settley Join our early supporter program',
    'Settley co',
  ],
  openGraph: {
    url: `${siteConfig.url}/campaign`,
    title: 'Settley | Campaign',
    description: 'Join our early supporter program.',
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/campaign-og.png`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Settley | Campaign',
    description: 'Join our early supporter program.',
    images: [`${siteConfig.url}/images/campaign-og.png`],
    creator: '@mubaraq__',
    site: '@SettleyApp',
  },
};

export default function Page() {
  return (
    <section className='overflow-x-hidden'>
      <div className='mt-10 mb-20 flex flex-col gap-6 px-[5%] sm:px-[7%] text-center items-center'>
        <div className='border border-navy rounded-[16px] py-2 px-3 font-roboto text-xs font-medium'>
          Exclusive Pre-Launch Community
        </div>
        <h1 className='font-semibold !font-roboto text-4xl w-full leading-[35px] sm:leading-[45px] lg:leading-[60px] sm:text-[34px] lg:text-[54px]'>
          <div>Join the Future of </div>
          <div>Real Estate Investment</div>
        </h1>
        <p className='text-dark-grey font-merriweather w-[90%] sm:w-4/5 lg:w-3/5'>
          Join us in reshaping property ownership—building the Amazon of real
          estate, making premium European properties accessible through
          collective investment.
        </p>
        <div className='text-center gap-[10px] flex flex-col items-center justify-center font-roboto text-sm'>
          <Link
            className='bg-navy text-white rounded-[60px] font-medium flex items-center gap-1 w-fit py-4 px-7'
            href='/campaign/payment'
          >
            Join the Founding Community <FaArrowRight className='text-2xl' />
          </Link>
          <p className='font-roboto text-xs italic'>
            Limited to first 100 members
          </p>
        </div>
      </div>

      <div className='my-[50px] px-[1%]'>
        <Image
          src={campaignHero}
          alt='banner'
          width={1000}
          height={640}
          // quality={100}
          placeholder='blur'
          // priority
          className='w-full aspect-[1403/640] object-cover rounded-[20px]'
        />
      </div>

      <Revolutionary />

      <InvestmentVision />

      <OwnHome />

      <BecomeFoundingMember />

      <FoundersCollection />

      <Partners />

      <Testimonials />

      <CampaignFAQs />
    </section>
  );
}
