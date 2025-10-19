'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa6';

import campaignHero from '~/images/Campaign-hero.png';

export default function CampaignHeader() {
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start end', 'center 1'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.6, 1]);

  return (
    <div>
      <div className='overflow-hidden'>
        <motion.div
          initial={{ opacity: 0, y: 300 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1,
            ease: 'easeOut',
            duration: 2,
            type: 'spring',
            staggerChildren: 0.5,
          }}
          className='mt-10 mb-20 flex flex-col gap-6 px-[5%] sm:px-[7%] text-center items-center'
        >
          <div className='border border-navy rounded-[16px] py-2 px-3 font-roboto text-xs font-medium'>
            Exclusive Pre-Launch Community
          </div>
          <h1 className='!font-merriweather text-4xl w-full leading-[35px] sm:leading-[45px] lg:leading-[60px] sm:text-[34px] lg:text-[54px]'>
            {/* <div>Own Real Assets,</div>
          <div>Share with Your Circle</div> */}
            {/* <div>Own a Property</div>
            <div>In Minutes</div> */}
            {/* <div>Join the Future of</div>
            <div>Real Estate Investment</div> */}
            <div>Join the First 1,000</div>
            <div>property Owners</div>
          </h1>
          <p className='text-[#1F1B20] font-merriweather w-[90%] sm:w-4/5 lg:w-3/5'>
            {/* Real Ownership. Real Assets. Real Simple. */}
            {/* Join us in reshaping property ownership—building the Amazon of real
            estate, making premium European properties accessible through
            collective investment. */}
            Own Property in Spain from $50 <br /> Real estate. Real returns.
            Real community.
          </p>
          <div className='text-center gap-[10px] flex flex-col items-center justify-center font-roboto text-sm'>
            <Link
              className='bg-navy text-white rounded-[60px] font-medium flex items-center gap-1 w-fit py-4 px-7'
              href='/campaign/payment'
            >
              Join Now - $50+ <FaArrowRight className='text-2xl' />
            </Link>
            <p className='font-roboto text-xs italic'>
              {/* Limited to first 1000 members */}Closes December 31, 2025
            </p>
          </div>
        </motion.div>
      </div>

      <div className='my-[50px] px-[1%] overflow-hidden rounded-[20px]'>
        <motion.div
          //   initial={{ scale: 1.8 }}
          //   animate={{ scale: 1 }}
          transition={{ ease: 'easeOut' }}
          className='rounded-[20px]'
          style={{ scale }}
          ref={imageContainerRef}
        >
          <Image
            src={campaignHero}
            alt='banner'
            width={1000}
            height={640}
            // quality={100}
            placeholder='blur'
            // priority
            className='w-full aspect-[1403/640] object-cover rounded-[20px]'
          />
        </motion.div>
      </div>
    </div>
  );
}
