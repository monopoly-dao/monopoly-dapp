import { Metadata } from 'next';
import Image from 'next/image';
import { FaCircleCheck } from 'react-icons/fa6';

import { siteConfig } from '@/constants/config';

import PaymentForm from '../_components/PaymentForm';

export const metadata: Metadata = {
  title: 'Campaign Payment',
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
    title: 'Settley | Campaign Payment',
    description: 'Join our early supporter program.',
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/campaign-og.png`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Settley | Campaign Payment',
    description: 'Join our early supporter program.',
    images: [`${siteConfig.url}/images/campaign-og.png`],
    creator: '@mubaraq__',
    site: '@SettleyApp',
  },
};

const list = [
  "Priority access to Settley's platform",
  'Exclusive investment opportunities',
  'Reduced fees on transactions',
  'Direct support from our founding team',
];

export default function Page() {
  return (
    <section className='grid grid-cols-1 bg-gradient-to-br from-[#F4F4F4] to-[#ECE9FF] lg:grid-cols-2 overflow-x-hidden items-center px-[5%] md:px-[10%] lg:px-[5%] gap-10 lg:gap-[7%] py-[100px] relative'>
      <div className='flex flex-col'>
        <h1 className='text-[#333333] font-bold text-4xl font-roboto lg:text-[50px] leading-[120%]'>
          Join our Early Supporter Program
        </h1>
        <p className='text-[#303030CC] text-lg mt-[10px] font-merriweather'>
          Be among the first to experience Settley's revolutionary
          {/* blockchain */} platform, transforming global property buying with
          enhanced security, transparency, and efficiency.
        </p>
        <div className='flex flex-col mt-[30px] gap-4'>
          {list.map((item, index) => (
            <div key={index} className='flex items-center gap-3'>
              <FaCircleCheck className='text-2xl text-[#231399]' />
              <p className='font-roboto text-[#333333CC]'>{item}</p>
            </div>
          ))}
        </div>
      </div>

      <PaymentForm />

      <Image
        src='/svg/blue-stripe.svg'
        alt='stripe'
        className='absolute z-[0] right-0 bottom-[250px] md:top-[300px] lg:top-[30px]'
        width={337}
        height={268}
      />

      <Image
        src='/svg/blue-stripe.svg'
        alt='stripe'
        className='absolute z-[0] right-0 bottom-[150px] md:bottom-[230px] lg:right-[-280px] lg:bottom-[260px]'
        width={337}
        height={268}
      />

      <Image
        src='/svg/blue-stripe.svg'
        alt='stripe'
        className='absolute z-[0] right-0 lg:right-[4%] bottom-0'
        width={337}
        height={268}
      />
    </section>
  );
}
