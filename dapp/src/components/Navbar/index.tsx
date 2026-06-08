'use client';

import { Stack } from '@mui/material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FiUserPlus } from 'react-icons/fi';
import { LuLogIn } from 'react-icons/lu';
import { VscAccount } from 'react-icons/vsc';

import styles from './Navbar.module.scss';

import { cn } from '@/lib/utils';

import { useGetUserDetailsQuery } from '@/api/profile';

import LogoutDropdown from './LogoutDropdown';
import MobileMenuContainer from './MobileMenuContainer';
import SettleyLogo from '../SettleyLogo';

export const unauthentiatedNavLinks = [
  {
    label: 'For Homeowners',
    route: '/homeowners',
  },
  {
    label: 'For Sellers',
    route: '/sellers',
  },
  {
    label: 'For Developers',
    route: '/developers',
  },
  {
    label: 'Browse Properties',
    route: '/listings',
  },
  {
    label: 'How Vaults Work',
    route: '/vaults',
  },
  {
    label: 'Protocol',
    route: '/protocol',
  },
  {
    label: 'FAQs',
    route: '/faqs',
  },
];

export const authenticatedNavLinks = [
  {
    label: 'For Homeowners',
    route: '/homeowners',
  },
  {
    label: 'For Sellers',
    route: '/sellers',
  },
  {
    label: 'For Developers',
    route: '/developers',
  },
  {
    label: 'Browse Properties',
    route: '/listings',
  },
  {
    label: 'How Vaults Work',
    route: '/vaults',
  },
  {
    label: 'Protocol',
    route: '/protocol',
  },
  {
    label: 'FAQs',
    route: '/faqs',
  },
];

const Navbar = () => {
  const session = useSession();
  const isLoggedIn = session.data;
  const navLinks = isLoggedIn ? authenticatedNavLinks : unauthentiatedNavLinks;
  const pathname = usePathname();

  const userFirebaseId = session.data?.userFirebaseId ?? '';

  const { data: userResponse, isLoading } = useGetUserDetailsQuery(
    userFirebaseId,
    {
      skip: !isLoggedIn,
    }
  );
  const userDetails = userResponse?.data.userDetails;
  const isProfileComplete =
    userDetails?.username &&
    userResponse?.data.firstName &&
    userResponse.data.lastName;

  return (
    <>
      <Stack
        component='nav'
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        className={cn(
          'text-navy sticky top-0 z-50 pt-5 pb-5 px-[5%] transition-all duration-300',
          'bg-settley-bg/80 backdrop-blur-md border-b border-black/5',
          [styles.navbar]
        )}
      >
        <SettleyLogo colour='no-beta' />

        {/* <InputSearch containerClassName='w-1/4 hidden sm:flex' /> */}

        <div className='items-center hidden lg:flex gap-[clamp(10px,1.6vw,32px)]'>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.route}
              className={cn(
                'text-settley-text hover:text-settley-text-hover transition-colors text-[clamp(12px,1.1vw,14px)] font-inter font-medium whitespace-nowrap',
                [pathname === link.route && 'text-settley-text-hover']
              )}
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn && <LogoutDropdown />}
        </div>

        <div className='items-center gap-[clamp(8px,1vw,12px)] hidden lg:flex whitespace-nowrap'>
          {isLoggedIn && (
            <Link
              className='text-white text-[clamp(12px,1.1vw,14px)] bg-navy rounded-full py-2 xl:py-2.5 px-[clamp(12px,1.8vw,32px)] flex gap-2 font-medium items-center font-inter hover:bg-navy/90 transition-all'
              href='/dashboard'
            >
              <VscAccount className='text-base' />
              Dashboard
            </Link>
          )}
          {!isLoggedIn && (
            <>
              <Link
                className='text-navy hover:bg-navy/5 transition-all text-[clamp(12px,1.1vw,14px)] rounded-full py-2 px-[clamp(10px,1.5vw,24px)] flex gap-1.5 xl:gap-2 font-semibold items-center font-inter border-[0.8px] border-settley-primary h-9'
                href='/login'
              >
                <LuLogIn className='text-base' />
                Login
              </Link>
              <Link
                className='text-[#FAFAFA] hover:bg-navy/90 transition-all text-[clamp(12px,1.1vw,14px)] bg-navy rounded-full py-2 px-[clamp(10px,1.5vw,24px)] flex gap-1.5 xl:gap-2 font-semibold items-center font-inter h-9 border-none'
                href='/signup'
              >
                <FiUserPlus className='text-base' />
                Sign Up
              </Link>
            </>
          )}
        </div>

        <MobileMenuContainer />
      </Stack>

      {isLoggedIn && !isLoading && !isProfileComplete && (
        <div className='bg-navy py-4 text-white w-full text-center font-mono'>
          Follow this{' '}
          <Link href='/settings' className='underline font-mono'>
            link
          </Link>{' '}
          to complete your profile and receive your test tokens
        </div>
      )}
    </>
  );
};

export default Navbar;
