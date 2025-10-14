import { campaignFAQs } from '@/constants/appConstants';

import FAQItem from '../../faqs/_components/FAQItem';

export default function CampaignFAQs() {
  return (
    <div className='bg-white py-20'>
      <div className='flex pb-8 flex-col items-center justify-center gap-[10px] bg-white mx-auto w-[90%] md:w-2/3 lg:w-1/2 xl:w-2/5 text-center'>
        <p className='font-merriweather text-3xl text-[#0D0D0D] lg:text-4xl'>
          Frequently Asked Questions
        </p>
      </div>

      <div className='grid grid-cols-1 gap-y-8 mt-10 mx-auto w-[90%] md:w-4/5 lg:w-2/3 xl:w-1/2'>
        {campaignFAQs.map((item, id) => (
          <FAQItem key={id} index={id} {...item} />
        ))}
      </div>
    </div>
  );
}
