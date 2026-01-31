import { Metadata } from 'next';
import Link from 'next/link';

import { faqs } from '@/constants/appConstants';

import FAQItem from './_components/FAQItem';

import { siteConfig } from '@/constants/config';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'FAQs | Settley',
  description:
    'Frequently asked questions about shared property ownership, legal framework, and the Settley platform.',
};

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
    <div className='px-[5%] lg:px-[7%] mt-20 mb-24'>
      <Script
        id='faq-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className='text-[45px] w-full leading-[55px] text-center sm:leading-[75px] sm:text-[48px] mb-14 lg:mb-20 font-playfair font-bold text-navy'>
        FAQs
      </h1>

      <div>
        <h2 className='mb-4'>Operational</h2>
        <div className='grid grid-cols-1 gap-y-8'>
          {faqs.map((item, id) => (
            <FAQItem key={id} index={id} {...item} />
          ))}
        </div>
      </div>

      <div className='mt-20'>
        <p className='text-2xl sm:text-3xl mb-6'>Still have questions?</p>
        <Link
          href='mailto:temisan@settley.co'
          className='inline-flex items-center justify-center px-8 py-3 rounded-full border border-settley-primary text-navy hover:bg-navy hover:text-white font-medium transition-all'
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
