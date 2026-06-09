'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';

import { cn } from '@/lib/utils';

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
  required,
  labelBg = 'bg-[#F8F9FF] md:bg-[#F8F9FF] max-md:bg-white',
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
        {type === 'password' && (
          <div
            className={cn(
              'focus-within:border-black focus-within:ring-1 focus-within:ring-black rounded-full relative flex w-full h-[56px] flex-row items-center border border-[#C6C6CD] bg-white transition-all duration-300 ease-linear',
              [touched && error && 'bg-[red]/5 border-[red] focus-within:border-[red] focus-within:ring-[red]'],
              [containerClassName && containerClassName]
            )}
          >
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  'absolute left-6 top-0 -translate-y-1/2 px-2 text-xs font-normal text-[#8E8E93] transition-all font-inter pointer-events-none select-none z-10',
                  labelBg,
                  [touched && error && 'text-[red]'],
                  [labelClassName && labelClassName]
                )}
              >
                {label}
                {required && <span className='text-danger ml-0.5'>*</span>}
              </label>
            )}
            <input
              type={hidden ? 'password' : 'text'}
              value={value}
              autoComplete='off'
              id={id}
              {...rest}
              className={cn(
                'w-full border-0 bg-transparent py-4 pl-6 pr-12 text-sm text-slate-900 outline-none ring-0 placeholder:text-sm placeholder:text-slate-400',
                'focus:ring-0 md:text-sm lg:text-base',
                [className && className],
                [inputClassName && inputClassName]
              )}
              required={required}
            />

            <span className='absolute right-5 cursor-pointer select-none flex items-center justify-center text-xl text-slate-400 hover:text-slate-950 transition-colors duration-200'>
              <span onClick={toggleVisibility}>
                {!hidden ? <RxEyeClosed /> : <RxEyeOpen />}
              </span>
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
              'focus-within:border-black focus-within:ring-1 focus-within:ring-black rounded-full relative flex w-full h-[56px] flex-row items-center border border-[#C6C6CD] bg-white transition-all duration-300 ease-linear',
              [touched && error && 'bg-[red]/5 border-[red] focus-within:border-[red] focus-within:ring-[red]'],
              [containerClassName && containerClassName]
            )}
          >
            {label && (
              <label
                htmlFor={id}
                className={cn(
                  'absolute left-6 top-0 -translate-y-1/2 px-2 text-xs font-normal text-[#8E8E93] transition-all font-inter pointer-events-none select-none z-10',
                  labelBg,
                  [touched && error && 'text-[red]'],
                  [labelClassName && labelClassName]
                )}
              >
                {label}
                {required && <span className='text-danger ml-0.5'>*</span>}
              </label>
            )}
            <input
              type={type}
              value={value}
              id={id}
              {...rest}
              className={cn(
                'text-slate-900 placeholder:text-slate-400 placeholder:text-sm w-full border-0 bg-transparent py-4 px-6 text-sm shadow-none outline-none ring-0 focus:ring-0 md:text-sm lg:text-base lg:placeholder:text-base',
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
            className='pl-6 pt-1 text-xs font-semibold text-red-600'
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
