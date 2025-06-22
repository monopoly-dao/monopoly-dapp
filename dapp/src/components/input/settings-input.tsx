import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { BiSolidEditAlt } from 'react-icons/bi';

import { cn } from '@/lib/utils';

import { InputProps } from './types';

export default function SettingsInput({
  id,
  //   labelClassName,
  className,
  inputClassName,
  //   containerClassName,
  label,
  touched,
  error,
  type = 'text',
  value,
  // variant = 'primary',
  required,
  ...rest
}: InputProps) {
  delete rest.initialError;
  delete rest.initialTouched;
  delete rest.initialValue;

  return (
    <div>
      <div
        className={cn(
          'flex items-center focus-within:border-navy justify-between bg-white rounded-[8px] border border-gray-200 px-3 py-4 shadow-sm',
          [touched && error && 'bg-[red]/10 border-[red]']
        )}
      >
        <div>
          <label className='block text-gray-400 text-xs font-normal whitespace-nowrap'>
            {label}
          </label>
        </div>
        <input
          // className='bg-transparent text-2xl font-normal text-gray-800 outline-none border-none p-0 m-0 w-full'
          type={type}
          value={value}
          id={id}
          {...rest}
          className={cn(
            'text-primary-bg-contrast text-right placeholder:text-primary-bg-contrast placeholder:text-xs px-3 w-full border-0 bg-transparent text-sm shadow-none outline-none ring-0 focus:ring-0 md:text-sm md:placeholder:text-sm  lg:placeholder:text-base',
            [className && className],
            [inputClassName && inputClassName]
          )}
          required={required}
          //   value={value}
          //   onChange={onChange}
          //   placeholder={placeholder}
          //   disabled={!editable}
          //   {...props}
        />

        <BiSolidEditAlt className='text-medium-grey' />
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
