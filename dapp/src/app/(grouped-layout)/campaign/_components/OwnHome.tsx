import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

import OwnHomeCard from './OwnHomeCard';

import card from '~/images/card.png';
import community from '~/images/community-icon.png';
import home from '~/images/home-icon.png';
import womanWithKey from '~/images/woman-with-key.png';

const data = [
  {
    icon: card,
    title: 'Purchase a Digital Collectible',
    content:
      "Select from our tiered Founder's Collection passes and get immediate membership benefits.",
  },
  {
    icon: community,
    title: 'Join the community',
    content:
      'Your purchase contributes to our property acquisition fund and gives you voting influence.',
  },
  {
    icon: home,
    title: 'Receive Property Token',
    content:
      "When we purchase the selected property, you'll receive tokens representing your ownership share.",
  },
];

const steps = [
  'You commit funds (starting from just $10) to our pre-purchase pool by purchasing a digital collectible.',
  'You indicate your location and property preferences through our voting system.',
  'When the fundraising goal is met, Settley purchases ONE property based on community preferences and available funds.',
  'All contributors receive ownership tokens proportional to their investment in the acquired property.',
];

export default function OwnHome() {
  return (
    <div className='px-[5%] py-20'>
      <div className='flex flex-col gap-10'>
        <div className='flex items-center justify-between'>
          <div className='font-medium text-3xl lg:text-4xl'>
            <p className='font-roboto'>Own a home</p>
            <p className='font-roboto bg-clip-text text-transparent bg-gradient-to-r from-[#A035D3] to-[#7438CC]'>
              in 3 simple steps
            </p>
          </div>
          <Link
            className='bg-white text-navy rounded-[20px] font-inter text-sm font-medium flex items-center gap-[6px] w-fit py-[10px] px-5 border'
            href='/campaign/payment'
          >
            Join Now <FaArrowRight className='text-sm' />
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {data.map((item) => (
            <OwnHomeCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <div className='mt-20 rounded-[20px] bg-gradient-to-br from-[#ae54eb] to-[#060b55] p-5 grid grid-cols-1 lg:grid-cols-2'>
        <div className='relative col-span-1 w-full h-full'>
          <Image
            src={womanWithKey}
            alt='collectible'
            width={600}
            height={700}
            quality={100}
            placeholder='blur'
            className='lg:absolute lg:h-3/5 xl:h-4/5 object-cover lg:object-right bottom-0'
          />
        </div>
        <div className='py-7 lg:py-16 lg:pr-20 flex flex-col text-white gap-8'>
          <p className='font-roboto font-medium text-3xl md:text-4xl lg:text-5xl'>
            Settley brings collective power to real estate investment.
          </p>
          <div className='flex flex-col gap-4 font-medium'>
            {steps.map((step, i) => (
              <div key={step} className='flex items-start gap-6'>
                <div>
                  <p className='text-navy bg-white rounded-[100%] w-6 h-6 flex items-center justify-center'>
                    {i + 1}
                  </p>
                </div>
                <p className='font-roboto font-medium'>{step}</p>
              </div>
            ))}
          </div>
          <div className='bg-[#E1E2E166] w-full h-[1px]' />
          <div className='flex items-center gap-[13px]'>
            <div className='flex flex-col gap-1'>
              <p className='font-roboto text-2xl'>
                <span className='font-semibold text-5xl'>$1</span>/Unit
              </p>
              <p className='font-roboto'>Starting at $10</p>
            </div>
            <Link
              href='/campaign/payment'
              className='bg-white rounded-[20px] py-[10px] px-5 text-navy font-inter font-medium text-sm'
            >
              Join now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
