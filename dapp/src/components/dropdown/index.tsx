'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { SelectHTMLAttributes, Suspense, useCallback, useRef } from 'react';
import { PiCaretDownBold } from 'react-icons/pi';

import { cn } from '@/lib/utils';
import useDisclosure from '@/hooks/useDisclosure';
import useOnClickOutside from '@/hooks/useOnClickOutside';

export const dropdownAnimationVariants: Variants = {
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

export const centerAnchorDropdownVariants: Variants = {
  initial: {
    opacity: 0,
    y: -5,
    x: '-50%',
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    x: '-50%',
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    x: '-50%',
    transition: {
      duration: 0.2,
      ease: 'linear',
    },
  },
};
type DropdownOption = { label: string; value: string };

export interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  defaultLabel?: string;
  options: DropdownOption[];
  paramKey: string;
  deleteKeys?: string | string[];
  containerClassName?: string;
  menuContainerClassName?: string;
  anchor?: 'left' | 'center' | 'right';
  className?: string;
}

const Dropdown = ({
  options,
  paramKey,
  label,
  containerClassName,
  menuContainerClassName,
  className,
  deleteKeys,
  anchor = 'center',
  defaultLabel,
}: DropdownProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Value of the search parameter
  const paramValue = searchParams.get(paramKey);

  const {
    isOpen: isDropdownOpen,
    toggle: toggleDropdown,
    close: closeDropdown,
  } = useDisclosure();

  useOnClickOutside(ref, closeDropdown);

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (value: string) => {
      // Create an updatable search param
      const params = new URLSearchParams(searchParams.toString());

      value && params.set(paramKey, value);
      !value && params.delete(paramKey);

      if (deleteKeys) {
        if (typeof deleteKeys === 'string') {
          params.delete(deleteKeys);
        }

        if (Array.isArray(deleteKeys)) {
          deleteKeys.forEach((key) => params.delete(key));
        }
      }

      return params.toString();
    },
    [searchParams, deleteKeys, paramKey]
  );

  const handleChangeParamKey = useCallback(
    (option: DropdownOption) => {
      const params = createQueryString(option.value);

      router.replace(`?${params}`, {
        scroll: false,
      });

      closeDropdown();
    },
    [createQueryString, router, closeDropdown]
  );

  return (
    <Suspense>
      <div
        className={cn('relative w-full', [
          containerClassName && containerClassName,
        ])}
        ref={ref}
      >
        <button
          className={cn(
            'border-tertiary-grey relative flex w-full h-full cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-xs font-medium lg:text-sm xl:text-base',
            [className && className]
          )}
          onClick={toggleDropdown}
        >
          <span className='truncate'>{label}</span>
          <span
            className={cn(
              'ml-auto text-[#757679] transition-all duration-300',
              [isDropdownOpen && '-rotate-180']
            )}
          >
            <PiCaretDownBold />
          </span>
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              variants={
                anchor === 'center'
                  ? centerAnchorDropdownVariants
                  : dropdownAnimationVariants
              }
              initial='initial'
              exit='exit'
              animate='animate'
              key={`${paramKey}-dropdown`}
              className={cn(
                'absolute top-full z-[1] mt-1 flex w-max min-w-full flex-col items-start gap-2 rounded-lg bg-white px-6 py-4 shadow',
                [
                  anchor === 'left' && 'left-0',
                  anchor === 'center' && 'left-1/2',
                  anchor === 'right' && 'right-0',
                ],
                [menuContainerClassName && menuContainerClassName]
              )}
            >
              {defaultLabel && (
                <button
                  className={cn('text-sm hover:font-semibold', [
                    !paramValue && 'text-secondary-black font-medium',
                  ])}
                  onClick={() => handleChangeParamKey({ label: '', value: '' })}
                >
                  {defaultLabel}
                </button>
              )}
              {options.map((option) => (
                <button
                  key={option.label}
                  onClick={() => handleChangeParamKey(option)}
                  className={cn('text-sm hover:font-semibold', [
                    option.value === paramValue &&
                      'text-secondary-black font-bold',
                  ])}
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Suspense>
  );
};

export default Dropdown;
