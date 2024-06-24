import { Metadata } from 'next';
import Link from 'next/link';

import { faqs } from '@/constants/appConstants';

import FAQItem from '../_components/FAQItem';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
};

export default function Page() {
  return (
    <div className='px-[5%] lg:px-[7%] mt-20 mb-24'>
      <h1 className='text-[45px] w-full leading-[55px] sm:leading-[75px] sm:text-[48px] mb-14 lg:mb-20'>
        Frequently Asked Questions
      </h1>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-14'>
        {faqs.map((item, id) => (
          <FAQItem key={id} {...item} />
        ))}
      </div>

      <div className='mt-20'>
        <p className='text-2xl sm:text-3xl mb-6'>Still have questions?</p>
        <Link
          href='/faqs'
          className='border border-navy bg-white rounded-[4px] px-6 py-3 text-navy'
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
