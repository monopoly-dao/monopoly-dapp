import Link from 'next/link';

import { faqs } from '@/constants/appConstants';

import FAQItem from './FAQItem';

export default function FAQ() {
  return (
    <div className='py-12 sm:py-20'>
      {/* <h2 className='text-3xl sm:text-5xl mb-14 lg:mb-20'>
        Frequently Asked Questions
      </h2> */}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-14'>
        {faqs.slice(0, 2).map((item, id) => (
          <FAQItem key={id} {...item} />
        ))}
      </div>

      <div className='mt-20'>
        <p className='text-2xl sm:text-3xl mb-6'>Still have questions?</p>
        <Link
          href='/faqs'
          className='border border-navy bg-white rounded-[4px] px-6 py-3 text-navy'
        >
          See More
        </Link>
      </div>
    </div>
  );
}
