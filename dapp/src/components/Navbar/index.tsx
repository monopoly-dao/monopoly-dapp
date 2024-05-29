'use client';

import { Stack } from '@mui/material';
import Link from 'next/link';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CiMenuFries } from 'react-icons/ci';
import { IoWalletOutline } from 'react-icons/io5';
import { VscAccount } from 'react-icons/vsc';

import styles from './Navbar.module.scss';

import { cn } from '@/lib/utils';

import IconButton from '../buttons/IconButton';
import { InputSearch } from '../input';
import SettleyLogo from '../SettleyLogo';

const unauthentiatedNavLinks = [
  {
    label: 'Listings',
    route: '/listings',
  },
  {
    label: 'How it Works',
    route: '/',
  },
];

const authenticatedNavLinks = [
  {
    label: 'Profile.',
    route: '/profile',
  },
  {
    label: 'Wishlist.',
    route: '/wishlist',
  },
  {
    label: 'Logout.',
    route: '/logout',
  },
];

const Navbar = () => {
  const session = useSession();
  const isLoggedIn = session.data;
  const navLinks = isLoggedIn ? authenticatedNavLinks : unauthentiatedNavLinks;

  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      px='5%'
      py='15px'
      className={cn('bg-navy text-white', [styles.navbar])}
    >
      <SettleyLogo colour='white' />

      <InputSearch containerClassName='w-1/4 hidden sm:flex' />

      <div className='items-center hidden lg:flex text-sm gap-4'>
        {navLinks.map((link) => (
          <Link key={link.label} href={link.route} className='text-light-grey'>
            {link.label}
          </Link>
        ))}
      </div>

      <div className='items-center gap-4 hidden sm:flex whitespace-nowrap'>
        <Link
          className='text-light-grey flex gap-2 py-2 px-5 font-semibold items-center'
          href='/login'
        >
          <IoWalletOutline />
          Sign in
        </Link>
        <Link
          className='text-navy bg-yellow rounded-[6px] py-2 px-5 flex gap-2 font-semibold items-center'
          href='/signup'
        >
          <VscAccount /> Sign up
        </Link>
      </div>

      <IconButton
        variant='ghost'
        icon={CiMenuFries}
        className='text-3xl block sm:hidden'
      />
    </Stack>
  );
};

export default Navbar;
