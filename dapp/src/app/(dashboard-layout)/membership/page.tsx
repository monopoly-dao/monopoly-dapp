'use client';

import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import LoadingSkeleton from '@/components/LoadingSkeleton';

import { useGetCampaignPaymentsQuery } from '@/api/campaign';
import { formatAmount } from '@/utils/utils';

import { ShareableImage } from './_components/ShareableImage';

export default function Page() {
  const [hovered, setHovered] = useState(false);
  const { data: session } = useSession();
  const { data, isLoading } = useGetCampaignPaymentsQuery({
    email: session?.email || '',
  });

  const payments = data?.data || [];
  const hasPaymentBeenMade = payments.length > 0;

  const earliestPayment =
    payments.length > 0
      ? payments.reduce((earliest, current) => {
          return moment(current.createdAt).isBefore(moment(earliest.createdAt))
            ? current
            : earliest;
        }, payments[0]).createdAt
      : '';

  const totalPayments =
    payments.length > 0
      ? payments.reduce((acc, current) => {
          return Number(acc) + Number(current.amount);
        }, 0)
      : 0;

  return (
    <main className='flex-1 max-w-full h-full overflow-y-auto font-general-sans'>
      <header className='mb-12 md:mt-12'>
        <h1 className='font-merriweather font-light text-3xl'>Membership</h1>
      </header>
      {/* <!-- Overview Cards --> */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:gap-4'>
        <div className='card-hover-border bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 border-opacity-30 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden hover:bg-white hover:bg-opacity-100 hover:-translate-y-1 hover:border-gray-400 hover:border-opacity-40 shadow-lg md:p-6'>
          <div className='mb-4'>
            <div className='text-lg text-gray-600 font-medium mb-2'>
              Membership Status
            </div>
            <div className='text-3xl font-semibold text-gray-800'>
              {isLoading && '...'}
              {!isLoading && !hasPaymentBeenMade && 'Standard'}
              {!isLoading && hasPaymentBeenMade && 'Premium'}
            </div>
            <div className='premium-gradient inline-flex items-center text-black px-4 py-2 rounded-full font-semibold text-sm mt-2'>
              {isLoading && '...'}
              {!isLoading && !hasPaymentBeenMade && 'Standard Member'}
              {!isLoading && hasPaymentBeenMade && '✨ Premium Member'}
            </div>
          </div>
        </div>
        <div className='card-hover-border bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 border-opacity-30 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden hover:bg-white hover:bg-opacity-100 hover:-translate-y-1 hover:border-gray-400 hover:border-opacity-40 shadow-lg md:p-6'>
          <div className='mb-4'>
            <div className='text-lg text-gray-600 font-medium mb-2'>
              Member Since
            </div>
            <div className='text-3xl font-semibold text-gray-800'>
              {isLoading && '...'}
              {!isLoading && !hasPaymentBeenMade && '-'}
              {!isLoading &&
                hasPaymentBeenMade &&
                moment(earliestPayment).format('MMM YYYY')}
            </div>
          </div>
        </div>
        <div className='card-hover-border bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 border-opacity-30 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden hover:bg-white hover:bg-opacity-100 hover:-translate-y-1 hover:border-gray-400 hover:border-opacity-40 shadow-lg md:p-6'>
          <div className='mb-4'>
            <div className='text-lg text-gray-600 font-medium mb-2'>
              Total Invested
            </div>
            <div className='text-3xl font-semibold text-gray-800'>
              {isLoading && '...'}
              {!isLoading && `$${formatAmount(totalPayments.toString())}`}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Membership Details --> */}
      <div className='bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 border-opacity-30 rounded-2xl p-8 mb-8 shadow-lg md:p-6'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-800'>
          Membership Details
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4'>
          {/* <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>Member ID</div>
            <div className='text-gray-800 text-lg font-semibold'>
              #STL-001247
            </div>
          </div> */}
          <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>Join Date</div>
            <div className='text-gray-800 text-lg font-semibold'>
              {isLoading && '...'}
              {!isLoading && !hasPaymentBeenMade && 'Not a premium member'}
              {!isLoading &&
                hasPaymentBeenMade &&
                moment(earliestPayment).format('MMM DD, YYYY')}
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>
              Membership Tier
            </div>
            <div className='text-gray-800 text-lg font-semibold'>
              {isLoading && '...'}
              {!isLoading && !hasPaymentBeenMade && 'Standard'}
              {!isLoading && hasPaymentBeenMade && 'Premium'}
            </div>
          </div>
          {/* <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>
              Next Renewal
            </div>
            <div className='text-gray-800 text-lg font-semibold'>
              March 15, 2025
            </div>
          </div> */}
          {/* <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>
              Properties Owned
            </div>
            <div className='text-gray-800 text-lg font-semibold'>
              2 Properties
            </div>
          </div> */}
          {/* <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>Tokens Held</div>
            <div className='text-gray-800 text-lg font-semibold'>
              150 Tokens
            </div>
          </div> */}
        </div>
      </div>
      {/* <!-- NFT Collection --> */}
      <div className='backdrop-blur-lg border border-gray-300 border-opacity-30 rounded-2xl p-8 shadow-2xl md:p-6 relative overflow-hidden'>
        {/* Decorative background shapes */}
        <div className='absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-tr from-purple-400 to-pink-300 rounded-full blur-3xl opacity-30 animate-pulse'></div>
        <div className='absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-bl from-yellow-300 to-pink-400 rounded-full blur-3xl opacity-30 animate-pulse'></div>
        <h2 className='text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2 relative z-10'>
          🖼️ Your NFT Collection
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {isLoading && <LoadingSkeleton height={250} className='h-[250px]' />}

          {!isLoading && !hasPaymentBeenMade && 'Not a premium member'}
          {!isLoading && hasPaymentBeenMade && (
            <div
              className='flex flex-col relative'
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              style={{ minHeight: 220 }}
            >
              {/* NFT 1 Image */}
              <motion.div
                animate={hovered ? { rotateY: 360 } : { rotateY: 0 }}
                transition={{
                  duration: 0.7,
                  ease: 'easeInOut',
                  repeat: hovered ? Infinity : 0,
                  repeatType: 'loop',
                  repeatDelay: 0,
                }}
              >
                <Image
                  src='https://res.cloudinary.com/dpoygzdfl/image/upload/v1754416493/settley-email-confirmation_1_eoq3ll.png'
                  alt='NFT 1'
                  className={`w-full h-fit object-contain rounded-b-[12px] transition-all duration-700 `}
                  width={600}
                  height={200}
                />
              </motion.div>
              {/* Settley Ticket Text */}

              <div className='mt-8'>
                <ShareableImage
                  memberSince={moment(earliestPayment).format('MMM YYYY')}
                  status={hasPaymentBeenMade ? 'Premium' : 'Standard'}
                  totalInvested={`$${formatAmount(totalPayments.toString())}`}
                />
              </div>

              {/* Spinning NFT 2 Image (appears on hover) */}
              {/* <motion.div
              className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[350px] h-auto z-20 pointer-events-none'
              animate={
                hovered
                  ? { opacity: 1, scale: 1, rotateY: 360 }
                  : { opacity: 0, scale: 0.8, rotateY: 0 }
              }
              transition={{
                duration: 0.7,
                ease: 'easeInOut',
                repeat: hovered ? Infinity : 0,
                repeatType: 'loop',
                repeatDelay: 0,
              }}
              style={{ willChange: 'transform' }}
            >
              <Image
                src='https://res.cloudinary.com/dpoygzdfl/image/upload/v1754416493/settley-email-confirmation_1_eoq3ll.png'
                alt='NFT 2'
                className='w-full max-w-[350px] h-auto object-cover rounded-xl shadow-2xl'
                width={350}
                height={100}
              />
            </motion.div> */}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
