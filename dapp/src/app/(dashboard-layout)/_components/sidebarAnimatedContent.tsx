'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

interface SidebarAnimatedContentProps extends PropsWithChildren {
  isOpen: boolean;
  className?: string;
}

const variant: Variants = {
  initial: {
    width: '0px',
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },

  animate: {
    width: 'auto',
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },

  exit: {
    width: '0px',
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
};

const SidebarAnimatedContent = ({
  children,
  isOpen,
  className,
}: SidebarAnimatedContentProps) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.span
          variants={variant}
          initial='initial'
          animate='animate'
          exit='exit'
          key='animated-text'
          className={cn('flex flex-shrink-0 items-center overflow-hidden', [
            className && className,
          ])}
        >
          <span className='relative inline-flex aspect-[39/10] flex-shrink-0 items-center'>
            {children}
          </span>
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default SidebarAnimatedContent;
