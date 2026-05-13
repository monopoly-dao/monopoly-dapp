'use client';

import Image from 'next/image';

export default function ArchitecturalShowcase() {
  return (
    <section
      className='hidden md:flex md:w-1/2 lg:w-3/5 bg-primary-container overflow-hidden relative clip-path-hero'
      style={{ clipPath: 'polygon(0 0, 100% 0, 92% 100%, 0% 100%)' }}
    >
      <div className='absolute inset-0 z-0'>
        <Image
          alt='Luxury Modern Architecture'
          className='h-full w-full object-cover opacity-90 grayscale-[20%] hover:grayscale-0 transition-all duration-700'
          // src='/images/mansion.jpg'
          src='https://lh3.googleusercontent.com/aida-public/AB6AXuCPC0MoCrzgG32xzxLZkT9qjzGWD-xlCpIEcy_BHDflG4Ml_z3DJurbpVWjXQSmbf1QNElhu7Cwy_pTOR0RGVinvPH0Qd9I2zLwxpaAecChV9NKyxI4SeVyh04iPmJv7c8F4cHSGMmoC0LaaFBrBfn61WShgj2U9P_AkPNjurHqG7PdUprMGZA_Gtv2vDkMTb_eFBQlVdc7qlZcu4RjiRSGXRsCXjOJrlp69WvTGwsxIORegvdhY_tjz7dENx--jWNsnU5_MAYmsJ4'
          width={800}
          height={400}
        />
        {/* Subtle overlay for text readability */}
        <div className='absolute inset-0 bg-gradient-to-t from-primary-container/60 to-transparent'></div>
      </div>
      {/* Floating Content on Image */}
      <div className='relative z-10 flex flex-col justify-end p-[64px] text-white max-w-2xl'>
        <h1 className='font-display-lg text-display-lg font-bold leading-tight mb-[8px] text-surface'>
          Redefining Modern Living.
        </h1>
        <p className='font-body-lg text-body-lg text-surface-variant max-w-md'>
          Access the world's most exclusive properties with the precision of
          modern technology and the weight of heritage real estate.
        </p>
      </div>
      {/* Settley Logo (Anchor) */}
      <div className='absolute top-[64px] left-[64px] z-20'>
        <span className='font-playfair text-headline-md text-2xl font-bold text-white tracking-tight'>
          Settley.
        </span>
      </div>
    </section>
  );
}
