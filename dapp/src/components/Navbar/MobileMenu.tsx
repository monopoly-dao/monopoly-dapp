'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { IoMdClose } from 'react-icons/io';
import { VscAccount } from 'react-icons/vsc';

import { authenticatedNavLinks, unauthentiatedNavLinks } from '.';
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
    <div className='h-full w-full bg-white p-[22px]'>
      <div className='flex justify-end'>
        <button
          onClick={close}
          className='rounded-[100%] bg-gray-100 p-2 text-3xl'
        >
          <IconButton
            variant='ghost'
            icon={IoMdClose}
            className='text-3xl text-black block sm:hidden'
          />
        </button>
      </div>

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
                  className='text-[#1E1E1E] bg-transparent border-none font-craftwork text-base font-light'
                >
                  {link.label}
                </Button>
              );
            else
              return (
                <Link
                  key={link.label}
                  href={link.route}
                  className='text-[#1E1E1E] font-light font-craftwork'
                >
                  {link.label}
                </Link>
              );
          })}
        </div>
        <div className='bg-medium-grey h-[0.5px] w-full' />
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
            Login
          </Link>
        )}
        <div className='bg-medium-grey h-[0.5px] w-full' />
      </div>

      <div className='my-10 flex justify-center'>
        <SettleyLogo colour='new' />
      </div>
    </div>
  );
}
