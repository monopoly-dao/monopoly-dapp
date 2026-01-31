'use client';

import { Stack } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
import Button from '../buttons/Button';
import SettleyLogo from '../SettleyLogo';

export const unauthentiatedNavLinks = [
  {
    label: 'FAQs',
    route: '/faqs',
  },
  {
    label: 'Listings',
    route: '/listings',
  },
  {
    label: 'Docs',
    route: 'https://settley.gitbook.io/settley/',
  },
  {
    label: 'How it Works',
    route: '/#how-it-works',
    isLinkToSection: true,
  },
  {
    label: 'Campaign',
    route: '/campaign',
  },
  {
    label: 'Articles',
    route: '/articles',
  },
];

export const authenticatedNavLinks = [
  {
    label: 'FAQs',
    route: '/faqs',
  },
  {
    label: 'Listings',
    route: '/listings',
  },
  {
    label: 'Docs',
    route: 'https://settley.gitbook.io/settley/',
  },
  {
    label: 'How it Works',
    route: '/#how-it-works',
    isLinkToSection: true,
  },
  {
    label: 'Campaign',
    route: '/campaign',
  },
  {
    label: 'Articles',
    route: '/articles',
  },
];

const Navbar = () => {
  const session = useSession();
  const isLoggedIn = session.data;
  const navLinks = isLoggedIn ? authenticatedNavLinks : unauthentiatedNavLinks;
  const pathname = usePathname();

  const router = useRouter();

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

        <div className='items-center hidden lg:flex gap-6 lg:gap-8'>
          {navLinks.map((link) => {
            if (link.isLinkToSection)
              return (
                <Button
                  key={link.label}
                  onClick={() => router.push(link.route)}
                  variant='ghost'
                  className={cn(
                    'text-settley-text hover:text-settley-text-hover transition-colors bg-transparent p-0 border-none font-inter text-[14px] font-medium',
                    [pathname === link.route && 'text-settley-text-hover']
                  )}
                >
                  {link.label}
                </Button>
              );
            else
              return (
                <Link
                  key={link.label}
                  href={link.route}
                  className={cn(
                    'text-settley-text hover:text-settley-text-hover transition-colors text-[14px] font-inter font-medium',
                    [pathname === link.route && 'text-settley-text-hover']
                  )}
                >
                  {link.label}
                </Link>
              );
          })}
          {isLoggedIn && <LogoutDropdown />}
        </div>

        <div className='items-center gap-3 hidden lg:flex whitespace-nowrap'>
          {isLoggedIn && (
            <Link
              className='text-white text-[14px] bg-navy rounded-full py-2.5 px-8 flex gap-2 font-medium items-center font-inter hover:bg-navy/90 transition-all'
              href='/dashboard'
            >
              <VscAccount className='text-base' />
              Dashboard
            </Link>
          )}
          {!isLoggedIn && (
            <>
              <Link
                className='text-navy hover:bg-navy/5 transition-all text-[14px] rounded-full py-2 px-6 flex gap-2 font-semibold items-center font-inter border-[0.8px] border-settley-primary h-9'
                href='/login'
              >
                <LuLogIn className='text-base' />
                Login
              </Link>
              <Link
                className='text-[#FAFAFA] hover:bg-navy/90 transition-all text-[14px] bg-navy rounded-full py-2 px-6 flex gap-2 font-semibold items-center font-inter h-9 border-none'
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
