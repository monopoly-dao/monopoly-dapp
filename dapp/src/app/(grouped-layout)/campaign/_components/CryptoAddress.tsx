import { motion } from 'framer-motion';
import Image from 'next/image';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { IoCopyOutline } from 'react-icons/io5';
import { LuBitcoin } from 'react-icons/lu';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';

import { useAppDispatch } from '@/store';

import { setCampaignPaymentStage } from '@/slices/campaignPaymentSlice';
import { multiStepVariants } from '@/utils/variants';

export default function CryptoAddress() {
  const dispatch = useAppDispatch();

  return (
    <motion.form
      variants={multiStepVariants}
      initial='initial'
      exit='exit'
      animate='animate'
      className='grid grid-cols-2 gap-x-3 gap-y-5'
    >
      <div className='col-span-2 flex flex-col gap-1'>
        <Button
          variant='ghost'
          className='w-fit bg-transparent px-0 font-roboto border-none'
          leftIcon={IoIosArrowRoundBack}
          onClick={() => dispatch(setCampaignPaymentStage('crypto'))}
          type='button'
        >
          Back
        </Button>
      </div>

      <div
        className='col-span-2 rounded-[8px] border border-[#D0D5DD] py-[10px] font-roboto px-[14px] flex items-center gap-2 text-navy'
        style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}
      >
        <LuBitcoin className='text-2xl text-primary-orange' /> Bitcoin (BTC)
      </div>

      <div className='flex flex-col gap-[6px] col-span-2'>
        <p className='text-[#344054] text-sm font-medium'>
          Send to this address
        </p>
        <div
          className='rounded-[8px] border border-[#D0D5DD] py-[10px] font-roboto px-[14px] flex items-center gap-2 justify-between text-navy'
          style={{ boxShadow: '0px 1px 2px 0px rgba(16, 24, 40, 0.05)' }}
        >
          <p className='w-3/4 truncate'>
            bcajfkbkj123487djwh84rioc8usyg7u3bfiievh8wqu
          </p>
          <IconButton
            variant='ghost'
            className='text-2xl'
            icon={IoCopyOutline}
          />
        </div>
      </div>

      <div className='flex justify-center col-span-2'>
        <Image
          src='/images/QR code.png'
          alt='QR code'
          width={200}
          height={200}
        />
      </div>

      <p className='font-roboto col-span-2 text-center text-sm text-[#344054]'>
        After sending, click the button below to confirm your payment
      </p>

      <div className='mb-14 col-span-2 flex flex-col items-center gap-5'>
        <Button
          className='!rounded-[100px] w-full uppercase font-roboto py-3'
          type='submit'
          onClick={() => dispatch(setCampaignPaymentStage('success'))}
        >
          I’ve completed my payement
        </Button>
      </div>
    </motion.form>
  );
}
