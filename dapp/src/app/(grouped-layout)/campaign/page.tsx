import { Metadata } from 'next';
import Script from 'next/script';

import { siteConfig } from '@/constants/config';

import BecomeFoundingMember from './_components/BecomeFoundingMember';
import CampaignFAQs from './_components/CampaignFAQs';
import CampaignHeader from './_components/CampaignHeader';
import FoundersCollection from './_components/FoundersCollection';
import InvestmentVision from './_components/InvestmentVision';
import OwnHome from './_components/OwnHome';
import Revolutionary from './_components/Revolutionary';

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
  const campaignSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Settley Campaign',
    description: 'Join our early supporter program and be a founding member.',
    url: `${siteConfig.url}/campaign`,
    keywords: metadata.keywords,
    image: [`${siteConfig.url}/images/campaign-og.png`],
    // Additional properties can be added based on the content of the page
  };

  return (
    <section className='overflow-x-hidden'>
      <Script
        id='campaign-schema'
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(campaignSchema) }}
      />

      <CampaignHeader />

      <Revolutionary />

      <InvestmentVision />

      <OwnHome />

      <BecomeFoundingMember />

      <FoundersCollection />

      {/* <Partners /> */}

      {/* <Testimonials /> */}

      <CampaignFAQs />
    </section>
  );
}
