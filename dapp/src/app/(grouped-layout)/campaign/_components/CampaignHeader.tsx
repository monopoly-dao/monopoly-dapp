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
          <div className='border border-settley-primary/20 rounded-full py-2 px-4 font-inter text-xs font-medium text-navy/60'>
            Exclusive Pre-Launch Community
          </div>
          <h1 className='text-4xl w-full leading-[35px] sm:leading-[45px] lg:leading-[60px] sm:text-[34px] lg:text-[54px]'>
            <div>Join the First 1,000</div>
            <div>property Owners</div>
          </h1>
          <p className='text-settley-text font-inter w-[90%] sm:w-4/5 lg:w-3/5'>
            Own Property in Spain from $50 <br /> Real estate. Real returns.
            Real community.
          </p>
          <div className='text-center gap-[10px] flex flex-col items-center justify-center font-inter text-sm'>
            <Link
              className='bg-navy text-white rounded-full font-medium flex items-center gap-2 w-fit py-4 px-8 hover:bg-navy/90 transition-all'
              href='/campaign/payment'
            >
              Join Now - $50+ <FaArrowRight className='text-xl' />
            </Link>
            <p className='font-inter text-xs italic text-settley-text/60'>
              Closes December 31, 2025
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
