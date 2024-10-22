'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { CiMenuFries } from 'react-icons/ci';

import useDisclosure from '@/hooks/useDisclosure';
import useOnClickOutside from '@/hooks/useOnClickOutside';

import MobileMenu from './MobileMenu';
import IconButton from '../buttons/IconButton';

export const dropdownAnimationVariants = {
  initial: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
};

export default function MobileMenuContainer() {
  const {
    isOpen: isMenuOpen,
    toggle: toggleMenu,
    close: closeMenu,
  } = useDisclosure();

  const ref = useRef(null);

  useOnClickOutside(ref, closeMenu);

  return (
    <div className='relative block md:hidden' ref={ref}>
      <IconButton
        variant='ghost'
        icon={CiMenuFries}
        onClick={toggleMenu}
        className='text-3xl text-black block sm:hidden'
      />

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={dropdownAnimationVariants}
            initial='initial'
            exit='exit'
            animate='animate'
            key='profile-dropdown'
            onClick={closeMenu}
            className='bg-medium-grey/50 absolute -right-[45%] -top-[40px] z-10 h-screen w-[98vw]'
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className='flex w-full flex-col items-start rounded-[12px] px-[21px] py-[18px] shadow'
            >
              <MobileMenu close={closeMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
