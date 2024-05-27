'use client';

import { Stack } from '@mui/material';
// import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CiMenuFries } from 'react-icons/ci';

import styles from './Navbar.module.scss';

import { cn } from '@/lib/utils';
import Link from 'next/link';

const unauthentiatedNavLinks = [
  {
    label: 'Sign in.',
    route: '/login',
  },
  {
    label: 'Register.',
    route: '/signup',
  },
  {
    label: 'Portfolio.',
    route: '/portfolio',
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
      py='10px'
      className={cn('bg-navy text-white border-b-[0.5px] border-light-grey', [
        styles.navbar,
      ])}
    >
      <Stack
        direction='row'
        alignItems='center'
        gap='20px'
        width={{ xs: '100%', sm: '60%' }}
      >
        <p className='text-light-grey'>
          Settley<span>.</span>
        </p>
        {/* <input
          type="text"
          name="search"
          placeholder="Search property, assets and collections"
        /> */}
      </Stack>

      <Stack
        direction='row'
        gap={{ xs: '0px', sm: '30px', md: '60px' }}
        justifyContent='space-between'
        width={{ xs: '100%', sm: 'auto' }}
      >
        {navLinks.map((link) => (
          <Link key={link.label} href={link.route} className='text-light-grey'>
            {link.label}
          </Link>
        ))}
      </Stack>

      <CiMenuFries className='text-5xl' />
    </Stack>
  );
};

export default Navbar;
