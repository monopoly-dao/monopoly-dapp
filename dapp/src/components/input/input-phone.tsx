'use client';

import { AnimatePresence, motion } from 'framer-motion';
import PhoneInput, { Value } from 'react-phone-number-input';

import 'react-phone-number-input/style.css';

import { cn } from '@/lib/utils';

import { InputLabel } from '@/components/input';
import { InputProps } from '@/components/input/types';

type Props = InputProps & {
  handleChange: (value: Value) => void;
};

export default function Phone({
  id,
  labelClassName,
  containerClassName,
  label,
  touched,
  error,
  type = 'tel',
  value,
  handleChange,
  required,
  ...rest
}: Props) {
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
        <div
          className={cn(
            'focus-within:border-yellow rounded-[6px] flex w-full flex-row items-center border border-gray-600 text-xs transition-all duration-300 ease-linear md:text-sm lg:text-base',
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
          <PhoneInput
            defaultCountry='NG'
            international
            countryCallingCodeEditable={false}
            type={type}
            value={value as string}
            id={id}
            {...rest}
            onChange={handleChange}
            // className={cn(
            //   'text-primary-bg-contrast placeholder:text-primary-bg-contrast placeholder:text-xs9 w-full border-0 bg-transparent px-2 py-2.5 text-sm shadow-none outline-none ring-0 focus:ring-0 md:px-4 md:py-3 md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base',
            //   [className && className],
            //   [inputClassName && inputClassName]
            // )}
            required={required}
          />
        </div>
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
