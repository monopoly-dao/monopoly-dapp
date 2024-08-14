'use client';

import { Stack } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { VscAccount } from 'react-icons/vsc';

import styles from './Navbar.module.scss';

import { cn } from '@/lib/utils';

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
    label: 'How it Works',
    route: '/#how-it-works',
    isLinkToSection: true,
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
    label: 'How it Works',
    route: '/#how-it-works',
    isLinkToSection: true,
  },
];

const Navbar = () => {
  const session = useSession();
  const isLoggedIn = session.data;
  const navLinks = isLoggedIn ? authenticatedNavLinks : unauthentiatedNavLinks;

  const router = useRouter();

  return (
    <Stack
      component='nav'
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      className={cn(
        'bg-white text-white mt-6 lg:mt-12 z-[10] pt-2 pb-8 border-y px-[5%] sm:px-[7%] border-black',
        [styles.navbar]
      )}
    >
      <SettleyLogo colour='new' />

      {/* <InputSearch containerClassName='w-1/4 hidden sm:flex' /> */}

      <div className='items-center gap-5 lg:gap-11 hidden sm:flex whitespace-nowrap'>
        {/* <Link
          className='text-light-grey flex gap-2 py-2 px-5 font-semibold items-center'
          href='/login'
        >
          <IoWalletOutline />
          Sign in
        </Link> */}
        <div className='items-center hidden sm:flex gap-5 lg:gap-11'>
          {navLinks.map((link) => {
            if (link.isLinkToSection)
              return (
                <Button
                  key={link.label}
                  onClick={() => router.push(link.route)}
                  variant='ghost'
                  className='text-[#1E1E1E] bg-transparent p-0 border-none font-craftwork text-xs lg:text-base font-light'
                >
                  {link.label}
                </Button>
              );
            else
              return (
                <Link
                  key={link.label}
                  href={link.route}
                  className='text-[#1E1E1E] font-light text-xs lg:text-base font-craftwork'
                >
                  {link.label}
                </Link>
              );
          })}
        </div>
        {isLoggedIn && (
          <>
            <LogoutDropdown />
            <Link
              className='text-white text-xs lg:text-base bg-navy rounded-[6px] py-2 px-8 flex gap-2 font-semibold items-center font-craftwork'
              href='/dashboard'
            >
              <VscAccount />
              Dashboard
            </Link>
          </>
        )}
        {!isLoggedIn && (
          <Link
            className='text-white text-xs lg:text-base bg-navy rounded-[6px] py-2 px-8 flex gap-2 font-semibold items-center font-craftwork'
            href='/login'
          >
            {/* <VscAccount />  */}
            Login / Signup
          </Link>
        )}
      </div>

      <MobileMenuContainer />
    </Stack>
  );
};

export default Navbar;
