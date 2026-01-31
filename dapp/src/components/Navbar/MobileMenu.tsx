'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FiUserPlus } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { LuLogIn } from 'react-icons/lu';
import { VscAccount } from 'react-icons/vsc';

import { authenticatedNavLinks, unauthentiatedNavLinks } from '.';
import LogoutDropdown from './LogoutDropdown';
import Button from '../buttons/Button';
import IconButton from '../buttons/IconButton';
import SettleyLogo from '../SettleyLogo';

type Props = {
  close: () => void;
};

export default function MobileMenu({ close }: Props) {
  const session = useSession();
  const isLoggedIn = session.data;
  const navLinks = isLoggedIn ? authenticatedNavLinks : unauthentiatedNavLinks;

  const router = useRouter();

  function closeAfterAnyAction() {
    setTimeout(() => {
      close();
    }, 500);
  }

  return (
    <div className='h-full w-full bg-settley-bg p-4'>
      {/* Redundant close button removed as it is handled by the container toggle */}

      <div
        className='text-dark mt-10 flex w-full flex-col items-center gap-6'
        onClick={closeAfterAnyAction}
      >
        <div className='items-center flex flex-col gap-6'>
          {navLinks.map((link) => {
            if (link.isLinkToSection)
              return (
                <Button
                  key={link.label}
                  onClick={() => router.push(link.route)}
                  variant='ghost'
                  className='text-settley-text bg-transparent !text-[14px] border-none font-inter font-medium text-left w-full justify-start px-0'
                >
                  {link.label}
                </Button>
              );
            else
              return (
                <Link
                  key={link.label}
                  href={link.route}
                  className='text-settley-text text-[14px] font-inter font-medium'
                >
                  {link.label}
                </Link>
              );
          })}
        </div>
        <div className='bg-medium-grey h-[0.5px] w-full' />
        {isLoggedIn && (
          <>
            <LogoutDropdown isMobileScreen />
            <Link
              className='text-white bg-navy rounded-full py-3 px-8 flex gap-2 font-medium items-center font-inter justify-center w-full'
              href='/dashboard'
            >
              <VscAccount className='text-lg' />
              Dashboard
            </Link>
          </>
        )}
        {!isLoggedIn && (
          <>
            <Link
              className='text-navy hover:bg-navy/5 transition-all text-[14px] w-full rounded-full py-2 px-5 flex gap-2 font-semibold justify-center items-center font-inter border-[0.8px] border-settley-primary'
              href='/login'
            >
              <LuLogIn className='text-base' />
              Login
            </Link>
            <Link
              className='text-[#FAFAFA] hover:bg-navy/90 transition-all text-[14px] w-full bg-navy rounded-full py-2 px-5 flex gap-2 font-semibold justify-center items-center font-inter'
              href='/signup'
            >
              <FiUserPlus className='text-base' />
              Sign Up
            </Link>
          </>
        )}
        <div className='bg-medium-grey h-[0.5px] w-full' />
      </div>

      <div className='my-10 flex justify-center'>
        <SettleyLogo colour='no-beta' />
      </div>
    </div>
  );
}
