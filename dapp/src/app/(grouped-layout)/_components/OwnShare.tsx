import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
// import { VscCheckAll } from 'react-icons/vsc';
import { FaCheck } from 'react-icons/fa6';

export default function OwnShare() {
  return (
    <div className='bg-[#FFFDF1] py-20 lg:py-28'>
      <div className='max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
        {/* Text Content */}
        <div className='flex flex-col gap-8 order-2 lg:order-1'>
          <h2 className='font-playfair text-4xl lg:text-5xl text-navy leading-tight font-medium'>
            Own a share of an actual property with real rights
          </h2>

          <div className='flex flex-col gap-6'>
            <p className='font-inter text-lg font-medium text-settley-text'>
              Your ownership means;
            </p>

            <ul className='flex flex-col gap-4'>
              <li className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-6 h-6 rounded-full bg-navy flex items-center justify-center mt-0.5'>
                  <FaCheck className='text-white text-xs' />
                </div>
                <span className='font-inter text-settley-text/80 leading-relaxed'>
                  Real legal rights backed by traditional deeds
                </span>
              </li>
              <li className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-6 h-6 rounded-full bg-navy flex items-center justify-center mt-0.5'>
                  <FaCheck className='text-white text-xs' />
                </div>
                <span className='font-inter text-settley-text/80 leading-relaxed'>
                  Share in property value and rental income
                </span>
              </li>
              <li className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-6 h-6 rounded-full bg-navy flex items-center justify-center mt-0.5'>
                  <FaCheck className='text-white text-xs' />
                </div>
                <span className='font-inter text-settley-text/80 leading-relaxed'>
                  Vote on property decisions
                </span>
              </li>
              <li className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-6 h-6 rounded-full bg-navy flex items-center justify-center mt-0.5'>
                  <FaCheck className='text-white text-xs' />
                </div>
                <span className='font-inter text-settley-text/80 leading-relaxed'>
                  Sell your share when you want (secondary market coming soon)
                </span>
              </li>
            </ul>
          </div>

          <div className='mt-2'>
            <Link
              className='bg-navy hover:bg-navy/90 transition-all text-white rounded-full font-medium flex items-center gap-2 w-fit py-4 px-8 group'
              href='/faqs'
            >
              Learn More
              <FaArrowRight className='text-sm group-hover:translate-x-1 transition-transform' />
            </Link>
          </div>
        </div>

        {/* Image Content */}
        <div className='relative w-full order-1 lg:order-2 flex justify-center lg:justify-end'>
          <Image
            src='/svg/house sketch.svg'
            alt='Property ownership illustration'
            width={591}
            height={548}
            className='w-full max-w-[500px] lg:max-w-none h-auto object-contain'
          />
        </div>
      </div>
    </div>
  );
}
