'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import { LuMenu } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';

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
    <div className='relative block lg:hidden' ref={ref}>
      <IconButton
        variant='ghost'
        icon={isMenuOpen ? IoMdClose : LuMenu}
        onClick={toggleMenu}
        className='text-3xl text-navy block lg:hidden'
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
            className='absolute right-[-12px] top-[120%] z-50 w-[calc(100vw-24px)]'
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className='flex w-full flex-col items-start rounded-[12px] bg-settley-bg border border-[#E5E5E5] shadow-lg overflow-hidden'
            >
              <MobileMenu close={closeMenu} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
