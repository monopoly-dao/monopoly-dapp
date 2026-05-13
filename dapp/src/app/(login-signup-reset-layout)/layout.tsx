import Image from 'next/image';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

import ArchitecturalShowcase from '../login2/_components/ArchitecturalShowcase';

export default function LoginSignupResetLayout({
  children,
}: PropsWithChildren) {
  return (
    <main className='w-full max-w-[1600px] mx-auto'>
      <div className='min-h-screen md:h-screen bg-[#F8F9FF] w-full relative md:overflow-hidden'>
        {/* <div className='py-5 ml-[5%]'>
          <SettleyLogo colour='no-beta' />
        </div> */}

        <div className='flex w-full h-full flex-col md:flex-row'>
          <ArchitecturalShowcase />
          {/* <div className='hidden md:block w-1/2 overflow-y-hidden'>
            <div className='max-w-[600px] mx-auto w-4/5 flex flex-col gap-10'>
              <Image
                src={layoutImage}
                alt='Settley'
                width={800}
                height={1000}
                className='w-full object-cover h-full aspect-[560/420]'
                placeholder='blur'
              />

              <div className='flex flex-col gap-4 text-center'>
                <p className='font-playfair text-4xl font-medium xl:text-5xl text-navy'>
                  Get Started With Settley
                </p>
                <p className='font-inter text-lg text-settley-text/80'>
                  Create your account and start purchasing properties in minutes
                </p>
              </div>
            </div>
          </div> */}
          {/* <div className='w-full sm:w-1/2 flex flex-col justify-between sm:items-center'>
            <div className='p-6 w-full sm:w-5/6 max-w-[500px] rounded-[16px] bg-white md:h-[80vh] overflow-y-auto sm:shadow'>
              {children}
            </div>
          </div> */}

          <section className='flex flex-col flex-1 py-[24px] h-full overflow-y-auto justify-center items-center'>
            <div className='md:hidden w-full flex justify-between items-center mb-[20px] md:px-[64px] px-[16px]'>
              <span className='font-headline-md text-headline-md font-bold text-primary tracking-tight'>
                Settley.
              </span>
              <Link
                href='/signup'
                className='font-label-md text-label-md text-primary hover:underline'
              >
                Sign Up
              </Link>
            </div>

            <div className='hidden md:flex justify-end absolute top-[24px] right-[64px] items-center gap-[8px]'>
              <span className='font-label-sm text-xs text-on-surface-variant tracking-wider'>
                Need to create an account?
              </span>
              <Link
                href='/signup'
                className='font-label-md text-sm font-semibold px-6 py-2 border border-outline-variant hover:bg-surface-container-low transition-colors duration-300'
              >
                Sign Up
              </Link>
            </div>

            <div className='block md:hidden w-full aspect-[4/3] overflow-hidden relative'>
              <Image
                alt='Luxury Modern Architecture'
                // className='h-full w-full object-cover opacity-90 grayscale-[20%] hover:grayscale-0 transition-all duration-700'
                // src='/images/mansion.jpg'
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuDhwaAaaFDzDWqmRsIQlBaOO4l4_vgEHtldykyoH6U0qM2fqcx60nQDgeTLjkVdlyeXqhH87-kROUZN66T95xdmnBvxQZ2cAAgLLhBfpeTm8MiDpKE3zh5pRQPm4XU_wskIxd9Gi9WjKfWZn5oxFPJUvvr9lBy20EfEsOKfd2P-GzMW2vZcJ87LAbH5me1UwzvhsBiryajIOzWPiLLN6y4mdzDN5SKIvnd2DRt6-FRXvif18NaHjd9PE3TiseEX86xC4viOH5K7PZM'
                width={500}
                height={200}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#f8f9ff] to-transparent z-[5]' />
            </div>

            <section className='md:px-[64px] px-[16px] hidden md:block'>
              {children}
            </section>

            <section className='md:px-[64px] px-[16px] block md:hidden rounded-xl -mt-12 relative z-[10] flex-grow'>
              <div className='rounded-xl shadow-sm p-6 bg-white'>
                {children}
              </div>
            </section>
          </section>
        </div>
      </div>

      <div className='fixed inset-0 pointer-events-none -z-10 overflow-hidden'>
        <div className='absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-surface-container rounded-full blur-[120px] opacity-30'></div>
        <div className='absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-secondary-fixed rounded-full blur-[120px] opacity-20'></div>
      </div>
    </main>
  );
}
