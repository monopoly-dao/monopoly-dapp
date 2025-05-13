'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

import { cn } from '@/lib/utils';

import { InputLabel } from '@/components/input';
import { InputProps } from '@/components/input/types';

export default function Input({
  id,
  labelClassName,
  className,
  inputClassName,
  containerClassName,
  label,
  touched,
  error,
  type = 'text',
  value,
  // variant = 'primary',
  required,
  ...rest
}: InputProps) {
  const [hidden, setHidden] = useState<boolean>(true);

  const toggleVisibility = () => {
    setHidden((prevState) => !prevState);
  };

  delete rest.initialError;
  delete rest.initialTouched;
  delete rest.initialValue;

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center gap-1'>
          {label && (
            <InputLabel className={labelClassName} id={id} label={label} />
          )}
          {required && <span className='text-danger'>*</span>}
        </div>
        {type === 'password' && (
          <div
            className={cn(
              'focus-within:border-navy rounded-[6px] relative flex w-full flex-row items-center border border-gray-500 text-xs transition-all duration-300 ease-linear md:text-sm lg:text-base',
              // [
              //   variant === 'primary' && 'bg-secondary-bg border-secondary-bg',
              //   variant === 'secondary' && 'bg-tertiary-bg border-tertiary-bg',
              //   variant === 'dark' && 'border-secondary-grey bg-primary-grey',
              //   variant === 'light' &&
              //     'border-secondary-grey bg-secondary-grey',
              // ],
              [touched && error && 'bg-[red]/10 border-[red]'],
              [containerClassName && containerClassName]
            )}
          >
            <input
              type={hidden ? 'password' : 'text'}
              value={value}
              autoComplete='off'
              id={id}
              {...rest}
              className={cn(
                'w-full border-0 bg-transparent py-2.5 pl-2 pr-[20%] text-sm shadow-none outline-none ring-0 placeholder:text-xs placeholder:text-gray-600',
                'focus:ring-0 md:py-3 md:pl-4 md:pr-[15%] md:text-sm md:placeholder:text-sm lg:pr-[8.33%] lg:text-base lg:placeholder:text-base',
                [className && className],
                [inputClassName && inputClassName]
              )}
              required={required}
            />

            <span className='absolute right-0 -translate-x-1/2 cursor-pointer'>
              {!hidden ? (
                <span
                  onClick={toggleVisibility}
                  className='text-tertiary-grey select-none text-xl font-medium'
                >
                  <RxEyeClosed />
                </span>
              ) : (
                <span
                  onClick={toggleVisibility}
                  className='text-tertiary-grey select-none text-xl font-medium'
                >
                  <RxEyeOpen />
                </span>
              )}
            </span>
          </div>
        )}

        {(type === 'email' ||
          type === 'date' ||
          type === 'number' ||
          type === 'time' ||
          type === 'text') && (
          <div
            className={cn(
              'focus-within:border-navy rounded-[6px] flex w-full flex-row items-center border border-gray-500 text-xs transition-all duration-300 ease-linear md:text-sm lg:text-base',
              // [
              //   variant === 'primary' && 'bg-secondary-bg border-secondary-bg',
              //   variant === 'secondary' && 'bg-tertiary-bg border-tertiary-bg',
              //   variant === 'dark' && 'border-secondary-grey bg-primary-grey ',
              //   variant === 'light' &&
              //     'border-secondary-grey bg-secondary-grey',
              // ],
              [touched && error && 'bg-[red]/10 border-[red]'],
              [containerClassName && containerClassName]
            )}
          >
            <input
              type={type}
              value={value}
              id={id}
              {...rest}
              className={cn(
                'text-primary-bg-contrast placeholder:text-primary-bg-contrast placeholder:text-xs9 w-full border-0 bg-transparent px-2 py-2.5 text-sm shadow-none outline-none ring-0 focus:ring-0 md:px-4 md:py-3 md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base',
                [className && className],
                [inputClassName && inputClassName]
              )}
              required={required}
            />
          </div>
        )}
      </div>
      <AnimatePresence>
        {error && error !== 'ignore' && touched && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            className='pl-1 pt-1 text-xs font-semibold text-red-700'
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
