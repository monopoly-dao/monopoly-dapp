'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';

import InputLabel from '@/components/input/input-label';
import { MultilineProps } from '@/components/input/types';

const MultiLine = ({
  id,
  error,
  touched,
  label,
  labelClassName,
  required,
  rows,
  variant,
  inputClassName,
  containerClassName,
  className,
  ...rest
}: MultilineProps) => {
  delete rest.initialError;
  delete rest.initialTouched;
  delete rest.initialValue;
  return (
    <div className='w-full'>
      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-1'>
          {label && !!label.length && (
            <InputLabel className={labelClassName} id={id} label={label} />
          )}
          {required && <span className='text-primary-red'>*</span>}
        </div>
        <div
          className={cn(
            'flex w-full flex-row items-center rounded-[8px] border text-xs transition-all duration-300 ease-linear md:text-sm lg:text-base',
            [
              variant === 'primary' && 'border-secondary-grey bg-white',
              variant === 'secondary' && 'bg-secondary-grey',
            ],
            [touched && error && 'bg-warning-100 border-warning-700'],
            [containerClassName && containerClassName]
          )}
        >
          <textarea
            id={id}
            rows={rows}
            {...rest}
            className={cn(
              'placeholder:text-secondary-grey text-primary-black w-full border-0 bg-transparent px-2 py-2.5 text-xs shadow-none outline-none ring-0 placeholder:text-xs focus:ring-0 md:px-4 md:py-3.5 md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base',
              [className && className],
              [inputClassName && inputClassName]
            )}
          />
        </div>
      </div>
      <AnimatePresence>
        {error && touched && (
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
};

export default MultiLine;
