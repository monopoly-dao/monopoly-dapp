'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { NotebookPen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineCalendar } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { IoWalletOutline } from 'react-icons/io5';
import { RiHome6Fill } from 'react-icons/ri';

import { cn } from '@/lib/utils';

import IconButton from '@/components/buttons/IconButton';
import { dropdownAnimationVariants } from '@/components/Navbar/MobileMenuContainer';
import SettleyLogo from '@/components/SettleyLogo';

// Adjust the import path as needed

// const sidebarVariants = {
//   closed: { x: '-100%' },
//   open: { x: 0 },
// };

// const backdropVariants = {
//   closed: { opacity: 0 },
//   open: { opacity: 1 },
// };

const MobileSidebar = () => {
  const [open, setOpen] = useState(false);
  // const router = useRouter();
  const pathname = usePathname();

  const navLinks = [
    {
      id: 1,
      icon: RiHome6Fill,
      title: 'Dashboard',
      href: '/dashboard',
      available: true,
    },
    {
      id: 2,
      icon: IoWalletOutline,
      title: 'My Properties',
      href: '/my-properties',
      available: false,
    },
    {
      id: 6,
      icon: IoWalletOutline,
      title: 'Membership',
      href: '/membership',
      available: false,
    },
    {
      id: 3,
      icon: HiOutlineCalendar,
      title: 'Transactions',
      href: '/transactions',
      available: false,
    },
    {
      id: 4,
      icon: NotebookPen,
      title: 'Wishlist',
      href: '/wishlist',
      available: true,
    },
    {
      id: 5,
      icon: FaUserCircle,
      title: 'Account Settings',
      href: '/settings',
      available: true,
    },
  ];

  function closeAfterAnyAction() {
    setTimeout(() => {
      setOpen(false);
    }, 500);
  }

  return (
    <>
      {!open && (
        <IconButton
          variant='ghost'
          icon={CiMenuFries}
          onClick={() => setOpen(true)}
          className='text-3xl text-black block sm:hidden'
        />
      )}

      <div>
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                variants={dropdownAnimationVariants}
                initial='initial'
                exit='exit'
                animate='animate'
                key='profile-dropdown'
                onClick={() => setOpen(false)}
                className='bg-medium-grey/50 fixed left-[1%] transform -translate-x-1/2 top-0 z-10 h-screen w-[98vw]'
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className='flex w-full flex-col items-start rounded-[12px] px-[21px] py-[18px] shadow'
                >
                  <div className='h-full w-full bg-white p-[22px]'>
                    <div className='flex justify-end'>
                      <button
                        onClick={() => setOpen(false)}
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
                        {navLinks.map((link) => (
                          <Link
                            key={link.title}
                            // onClick={() => router.push(link.href)}
                            href={link.href}
                            // variant='ghost'
                            className={cn(
                              'text-[#1E1E1E] bg-transparent !text-base border-none font-craftwork',
                              [pathname === link.href && 'font-bold']
                            )}
                          >
                            {link.title}
                          </Link>
                        ))}
                      </div>
                      <div className='bg-medium-grey h-[0.5px] w-full' />
                    </div>

                    <div className='my-10 flex justify-center'>
                      <SettleyLogo colour='no-beta' />
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MobileSidebar;
