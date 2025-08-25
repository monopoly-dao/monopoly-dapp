'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Page() {
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
            <div className='text-3xl font-semibold text-gray-800'>Premium</div>
            <div className='premium-gradient inline-flex items-center text-black px-4 py-2 rounded-full font-semibold text-sm mt-2'>
              ✨ Premium Member
            </div>
          </div>
        </div>
        <div className='card-hover-border bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 border-opacity-30 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden hover:bg-white hover:bg-opacity-100 hover:-translate-y-1 hover:border-gray-400 hover:border-opacity-40 shadow-lg md:p-6'>
          <div className='mb-4'>
            <div className='text-lg text-gray-600 font-medium mb-2'>
              Member Since
            </div>
            <div className='text-3xl font-semibold text-gray-800'>
              March 2024
            </div>
          </div>
        </div>
        <div className='card-hover-border bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 border-opacity-30 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden hover:bg-white hover:bg-opacity-100 hover:-translate-y-1 hover:border-gray-400 hover:border-opacity-40 shadow-lg md:p-6'>
          <div className='mb-4'>
            <div className='text-lg text-gray-600 font-medium mb-2'>
              Total Invested
            </div>
            <div className='text-3xl font-semibold text-gray-800'>$3,850</div>
          </div>
        </div>
      </div>
      {/* <!-- Membership Details --> */}
      <div className='bg-white bg-opacity-90 backdrop-blur-lg border border-gray-300 border-opacity-30 rounded-2xl p-8 mb-8 shadow-lg md:p-6'>
        <h2 className='text-2xl font-semibold mb-6 text-gray-800'>
          Membership Details
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>Member ID</div>
            <div className='text-gray-800 text-lg font-semibold'>
              #STL-001247
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>Join Date</div>
            <div className='text-gray-800 text-lg font-semibold'>
              March 15, 2024
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>
              Membership Tier
            </div>
            <div className='text-gray-800 text-lg font-semibold'>Premium</div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>
              Next Renewal
            </div>
            <div className='text-gray-800 text-lg font-semibold'>
              March 15, 2025
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>
              Properties Owned
            </div>
            <div className='text-gray-800 text-lg font-semibold'>
              2 Properties
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='text-gray-500 text-sm font-medium'>Tokens Held</div>
            <div className='text-gray-800 text-lg font-semibold'>
              150 Tokens
            </div>
          </div>
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

        <motion.div
          className='w-full max-w-[350px] h-auto mx-auto'
          animate={{ rotateY: 360 }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 13, // slower spin
          }}
          whileHover={{
            rotateY: 360,
            transition: {
              repeat: Infinity,
              ease: 'linear',
              duration: 4, // faster spin on hover
            },
          }}
        >
          <Image
            src='https://res.cloudinary.com/dpoygzdfl/image/upload/v1754416493/settley-email-confirmation_1_eoq3ll.png'
            alt='NFT 1'
            className='w-full max-w-[350px] h-auto object-cover rounded-xl'
            width={350}
            height={100}
          />
        </motion.div>
        {/* <p className='text-gray-600 mb-8 relative z-10'>
          Exclusive Settley membership NFTs — a showcase of your unique
          ownership and community status.
        </p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10'>
          
          <div className='group relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:border-gray-400 hover:scale-105 transition-all duration-300 cursor-pointer'>
            <img
              src='https://res.cloudinary.com/dpoygzdfl/image/upload/v1754416493/settley-email-confirmation_1_eoq3ll.png'
              alt='NFT 1'
              className='w-full h-52 object-cover'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4'>
              <div>
                <h3 className='text-white font-semibold text-lg'>
                  Settley Genesis #001
                </h3>
                <p className='text-gray-200 text-sm'>Minted: March 2024</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </main>
  );
}
