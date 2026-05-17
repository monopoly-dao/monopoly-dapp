'use client';

import Link from 'next/link';
import Script from 'next/script';

import { faqs } from '@/constants/appConstants';
import ExpandableFAQ from '../_components/ExpandableFAQ';

export default function Page() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className='px-[5%] lg:px-[7%] mt-20 mb-24 max-w-5xl mx-auto'>
      <Script
        id='faq-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <ExpandableFAQ items={faqs} title='Frequently Asked Questions' />

      <div className='mt-20 text-center'>
        <p className='text-2xl sm:text-3xl mb-6 font-playfair font-bold text-[#272342]'>Still have questions?</p>
        <Link
          href='mailto:temisan@settley.co'
          className='inline-flex items-center justify-center px-8 py-3 rounded-full border border-[#272342] text-[#272342] hover:bg-[#272342] hover:text-white font-medium transition-all'
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
