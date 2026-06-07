'use client';

import { Stack } from '@mui/material';
import Link from 'next/link';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { VscAccount } from 'react-icons/vsc';

import styles from './Navbar.module.scss';

import { cn } from '@/lib/utils';

import MobileMenuContainer from './MobileMenuContainer';
import SettleyLogo from '../SettleyLogo';

export const unauthentiatedNavLinks = [
  {
    label: 'For Owners',
    route: '/vaults#owners',
  },
  {
    label: 'For Lenders',
    route: '/vaults#lenders',
  },
  {
    label: 'How Vaults Work',
    route: '/vaults#how-vaults-work',
  },
  {
    label: 'Browse Properties',
    route: '/listings',
  },
  {
    label: 'Protocol',
    route: '/protocol',
  },
];

export const authenticatedNavLinks = [
  {
    label: 'For Owners',
    route: '/vaults#owners',
  },
  {
    label: 'For Lenders',
    route: '/vaults#lenders',
  },
  {
    label: 'How Vaults Work',
    route: '/vaults#how-vaults-work',
  },
  {
    label: 'Browse Properties',
    route: '/listings',
  },
  {
    label: 'Protocol',
    route: '/protocol',
  },
];

const Navbar = () => {
  const session = useSession();
  const isLoggedIn = session.data;
  const navLinks = isLoggedIn ? authenticatedNavLinks : unauthentiatedNavLinks;

  return (
    <Stack
      component='nav'
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      className={cn(
        'bg-white text-white mt-12 z-[10] pt-2 pb-8 border-y px-[5%] sm:px-[7%] border-black',
        [styles.navbar]
      )}
    >
      <SettleyLogo colour='new' />

      {/* <InputSearch containerClassName='w-1/4 hidden sm:flex' /> */}

      <div className='items-center gap-11 hidden sm:flex whitespace-nowrap'>
        {/* <Link
          className='text-light-grey flex gap-2 py-2 px-5 font-semibold items-center'
          href='/login'
        >
          <IoWalletOutline />
          Sign in
        </Link> */}
        <div className='items-center hidden sm:flex gap-11'>
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.route}
              className='text-[#1E1E1E] font-light font-craftwork'
            >
              {link.label}
            </Link>
          ))}
        </div>
        {isLoggedIn && (
          <Link
            className='text-white bg-navy rounded-[6px] py-2 px-8 flex gap-2 font-semibold items-center font-craftwork'
            href='/dashboard'
          >
            <VscAccount />
            Dashboard
          </Link>
        )}
        {!isLoggedIn && (
          <Link
            className='text-white bg-navy rounded-[6px] py-2 px-8 flex gap-2 font-semibold items-center font-craftwork'
            href='/login'
          >
            {/* <VscAccount />  */}
            Login
          </Link>
        )}
      </div>

      <MobileMenuContainer />
    </Stack>
  );
};

export default Navbar;
