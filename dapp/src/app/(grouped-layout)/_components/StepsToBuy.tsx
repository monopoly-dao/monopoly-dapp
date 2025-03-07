import Image from 'next/image';

import buyProperty from '~/images/buy house.jpg';
import signup from '~/images/sign up.png';
import testTokens from '~/images/test tokens.png';
import updateProfile from '~/images/update profile.jpg';

export default function StepsToBuy() {
  return (
    <section className='flex flex-col gap-6 bg-cream py-12 sm:py-20 lg:py-28 px-[5%] lg:px-[7%]'>
      <div className='flex flex-col gap-5'>
        <h2 className='font-medium text-3xl'>
          Seamless Property Ownership: How It All Comes Together
        </h2>
      </div>

      <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
        <div className='flex flex-col gap-5 col-span-1'>
          {/* <GoLaw className='text-3xl' /> */}
          <Image
            src={signup}
            alt='Sign up'
            width={100}
            height={100}
            placeholder='blur'
            className='w-full h-auto rounded-[16px] max-h-[150px] object-cover'
          />
          <div className='flex flex-col gap-2'>
            <p className='text-2xl'>Sign Up</p>
            <p>Create your Settley account in minutes.</p>
          </div>
        </div>
        <div className='flex flex-col gap-5 col-span-1'>
          {/* <GoLaw className='text-3xl' /> */}
          <Image
            src={updateProfile}
            alt='Update Profile'
            width={100}
            height={100}
            placeholder='blur'
            className='w-full h-auto rounded-[16px] max-h-[150px] object-cover'
          />
          <div className='flex flex-col gap-2'>
            <p className='text-2xl'>Update Profile</p>
            <p>Customize your profile and preferences.</p>
          </div>
        </div>
        <div className='flex flex-col gap-5 col-span-1'>
          {/* <GoLaw className='text-3xl' /> */}
          <Image
            src={testTokens}
            alt='Test Tokens'
            width={100}
            height={100}
            placeholder='blur'
            className='w-full h-auto rounded-[16px] max-h-[150px] object-cover'
          />
          <div className='flex flex-col gap-2'>
            <p className='text-2xl'>Get Test Tokens</p>
            <p>Receive free tokens to try out the platform.</p>
          </div>
        </div>
        <div className='flex flex-col gap-5 col-span-1'>
          {/* <GoLaw className='text-3xl' /> */}
          <Image
            src={buyProperty}
            alt='Buy Property'
            width={100}
            height={100}
            placeholder='blur'
            className='w-full max-h-[150px] object-cover rounded-[16px]'
          />
          <div className='flex flex-col gap-2'>
            <p className='text-2xl'>Buy Property</p>
            <p>Start investing in real estate assets.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
