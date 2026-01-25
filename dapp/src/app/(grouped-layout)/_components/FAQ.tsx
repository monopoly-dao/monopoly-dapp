import Link from 'next/link';
import Image from 'next/image';

import JMHouse from '~/images/JM_Mishref_House.png';

import { faqs } from '@/constants/appConstants';

import FAQItem from './FAQItem';

export default function FAQ() {
  return (
    <section className='relative py-24 w-full overflow-hidden'>
      {/* Background with Overlay */}
      <div className='absolute inset-0 z-0'>
        {/* Fallback dark color if image fails or while loading */}
        <div className='absolute inset-0 bg-[#0B1221]' />
        <Image
          src={JMHouse}
          alt='FAQ Background'
          fill
          className='object-cover opacity-60'
          priority
        />
        {/* Dark overlay for text readability */}
        <div className='absolute inset-0 bg-black/50 backdrop-blur-[1px]' />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 md:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start'>

          {/* Left Column: Heading & Questions */}
          <div className='flex flex-col gap-12'>
            <h2 className='font-playfair text-4xl lg:text-5xl text-white font-medium leading-tight'>
              Frequently Asked Questions
            </h2>

            <div className='flex flex-col gap-10'>
              {faqs.slice(0, 3).map((item, id) => (
                <FAQItem key={id} {...item} />
              ))}
            </div>
          </div>

          {/* Right Column: Support Card (Sticky on Desktop potentially, or just static) */}
          <div className='hidden md:block sticky top-24'>
            <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col gap-6 items-start max-w-sm ml-auto'>
              <h3 className='font-playfair text-2xl text-white'>
                Still have questions?
              </h3>
              <p className='font-inter text-white/70 font-light'>
                Can't find the answer you're looking for? Please chat to our friendly team.
              </p>
              <Link
                href='/faqs'
                className='inline-flex items-center justify-center px-6 py-3 rounded-full border-[0.8px] border-white text-white font-inter text-sm hover:bg-white hover:text-navy transition-colors duration-300'
              >
                See More
              </Link>
            </div>
          </div>

          {/* Mobile Support Card (Visible only on mobile) */}
          <div className='md:hidden mt-8'>
            <div className='bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col gap-4 items-start'>
              <h3 className='font-playfair text-xl text-white'>
                Still have questions?
              </h3>
              <Link
                href='/faqs'
                className='w-full text-center px-6 py-3 rounded-full border-[0.8px] border-white text-white font-inter text-sm hover:bg-white hover:text-navy transition-colors duration-300'
              >
                See More
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
