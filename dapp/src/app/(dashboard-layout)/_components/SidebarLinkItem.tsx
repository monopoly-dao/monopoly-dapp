'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

import { cn } from '@/lib/utils';
import useCheckLinkActive from '@/hooks/useCheckLinkActive';
import { useHover } from '@/hooks/useOnHover';

import { SidebarLinksType } from './Sidebar';
import SidebarAnimatedContent from './sidebarAnimatedContent';

interface SidebarLinkItemProps extends SidebarLinksType {
  isOpen: boolean;
  href: string;
}

const variant: Variants = {
  initial: {
    x: '-10px',
    opacity: 0,
    y: '-50%',
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },

  animate: {
    x: 0,
    opacity: 1,
    y: '-50%',
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },

  exit: {
    x: '-10px',
    opacity: 0,
    y: '-50%',
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
};

const SidebarLinkItem = ({
  href,
  isOpen,
  icon: Icon,
  title,
}: // available,
SidebarLinkItemProps) => {
  const isActive = useCheckLinkActive(href);
  const ref = useRef<HTMLSpanElement | null>(null);
  const isHovering = useHover(ref);
  const router = useRouter();
  const handleNavigate = () => {
    router.push(href);
  };

  return (
    <>
      <span className={cn('relative inline-block w-full cursor-pointer')}>
        <p
          onClick={handleNavigate}
          className={cn('inline-block w-full rounded-lg px-4 py-3 text-navy', [
            isActive && 'bg-navy/5',
          ])}
        >
          <span
            className={cn(
              'flex max-w-full items-center gap-4 whitespace-nowrap font-general-sans font-medium md:text-xs lg:text-sm xl:gap-3'
            )}
            ref={ref}
          >
            <span
              className={cn(
                'duration-400 flex items-center justify-center transition-all ease-linear',
                [!isOpen && 'w-full']
              )}
            >
              <span
                className={cn(
                  'duration-400 inline-block transition-all ease-linear'
                )}
              >
                <Icon
                  className={cn('!h-6 !w-6 flex-shrink-0', [
                    isActive && 'text-primary',
                  ])}
                />
              </span>
            </span>
            <SidebarAnimatedContent isOpen={isOpen}>
              {title}
            </SidebarAnimatedContent>
          </span>
        </p>

        <AnimatePresence>
          {isHovering && !isOpen && (
            <motion.span
              variants={variant}
              initial='initial'
              animate='animate'
              exit='exit'
              role='tooltip'
              className='bg-primary absolute left-full top-1/2 z-10 ml-2 -translate-y-1/2 rounded-lg p-2 text-xs font-medium text-white shadow-sm'
              key='tooltip'
            >
              {title}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </>
  );
};

export default SidebarLinkItem;
