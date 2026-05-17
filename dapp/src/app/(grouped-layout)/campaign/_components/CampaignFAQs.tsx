'use client';

import { campaignFAQs } from '@/constants/appConstants';
import ExpandableFAQ from '../../_components/ExpandableFAQ';

export default function CampaignFAQs() {
  return (
    <div className='bg-white py-20 px-[5%] max-w-5xl mx-auto'>
      <ExpandableFAQ items={campaignFAQs} title='Frequently Asked Questions' />
    </div>
  );
}
