import { motion } from 'framer-motion';
import Link from 'next/link';
import { GoCheckCircle } from 'react-icons/go';

import { multiStepVariants } from '@/utils/variants';

export default function PaymentSuccess() {
  return (
    <motion.form
      variants={multiStepVariants}
      initial='initial'
      exit='exit'
      animate='animate'
      className='flex flex-col justify-center items-center text-center gap-4'
    >
      <GoCheckCircle className='text-[40px] mb-10 text-[#272343]' />

      <p className='text-black font-roboto font-semibold text-[26px]'>
        Thank You
      </p>
      <p className='font-merriweather text-sm text-[#181818CC]'>
        Your payment is currently being processed. Welcome to the Settley early
        supporter program!
      </p>
      <p className='font-merriweather text-sm text-[#181818CC]'>
        We'll send a confirmation email with more details about next steps as
        soon as we confirm your payment.
      </p>

      <div className='mb-14 mt-4 col-span-2 flex flex-col items-center gap-5 w-full'>
        <Link
          className='!rounded-[100px] bg-navy text-white w-full uppercase font-roboto py-3'
          href='/'
        >
          EXPLORE SETTLEY
        </Link>
      </div>
    </motion.form>
  );
}
