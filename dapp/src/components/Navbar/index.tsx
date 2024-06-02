'use client';

import { Stack } from '@mui/material';
import Link from 'next/link';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CiMenuFries } from 'react-icons/ci';

import styles from './Navbar.module.scss';

import { cn } from '@/lib/utils';

import IconButton from '../buttons/IconButton';
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
      className={cn(
        'bg-white text-white mt-12 pt-2 pb-8 border-y px-[5%] sm:px-[7%] border-black',
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
            <Link key={link.label} href={link.route} className='text-[#1E1E1E]'>
              {link.label}
            </Link>
          ))}
        </div>
        <Link
          className='text-navy bg-yellow/50 rounded-[6px] py-2 px-8 flex gap-2 font-semibold items-center'
          href='/login'
        >
          {/* <VscAccount />  */}
          Login
        </Link>
      </div>

      <IconButton
        variant='ghost'
        icon={CiMenuFries}
        className='text-3xl text-black block sm:hidden'
      />
    </Stack>
  );
};

export default Navbar;
