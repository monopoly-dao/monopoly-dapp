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
          'bg-white text-white mt-6 lg:mt-12 z-[10] pt-2 pb-5 border-y px-[5%] border-black',
          [styles.navbar]
        )}
      >
        <SettleyLogo colour='new' />

        {/* <InputSearch containerClassName='w-1/4 hidden sm:flex' /> */}

        <div className='items-center hidden sm:flex gap-6 lg:gap-8'>
          {navLinks.map((link) => {
            if (link.isLinkToSection)
              return (
                <Button
                  key={link.label}
                  onClick={() => router.push(link.route)}
                  variant='ghost'
                  className={cn(
                    'text-[#1E1E1E] bg-transparent p-0 border-none font-roboto text-xs lg:text-sm',
                    [pathname === link.route && 'text-navy']
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
                    'text-[#1E1E1E] text-xs lg:text-sm font-roboto',
                    [pathname === link.route && 'text-navy']
                  )}
                >
                  {link.label}
                </Link>
              );
          })}
          {isLoggedIn && <LogoutDropdown />}
        </div>

        <div className='items-center gap-3 hidden sm:flex whitespace-nowrap'>
          {isLoggedIn && (
            <Link
              className='text-white text-xs lg:text-base bg-navy rounded-[6px] py-2 px-8 flex gap-2 font-semibold items-center font-craftwork'
              href='/dashboard'
            >
              <VscAccount />
              Dashboard
            </Link>
          )}
          {!isLoggedIn && (
            <>
              <Link
                className='text-navy text-xs lg:text-sm rounded-[6px] py-2 px-4 flex gap-2 font-semibold items-center font-craftwork border border-medium-grey'
                href='/login'
              >
                <LuLogIn className='text-base' />
                Login
              </Link>
              <Link
                className='text-white text-xs lg:text-sm bg-navy rounded-[6px] py-2 px-4 flex gap-2 font-semibold items-center font-craftwork'
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
          <Link href='/dashboard/settings' className='underline font-mono'>
            link
          </Link>{' '}
          to complete your profile and receive your test tokens
        </div>
      )}
    </>
  );
};

export default Navbar;
