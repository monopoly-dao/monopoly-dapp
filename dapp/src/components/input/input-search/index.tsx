'use client';

import { useFormik } from 'formik';
import { LucideIcon, Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

import { initialValues, validationSchema } from './validation';

export interface InputSearchProp
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  touched?: boolean;
  error?: string;
  inputClassName?: string;
  containerClassName?: string;
  updateQuery?: boolean;
  icon?: IconType | LucideIcon;
}

const InputSearch = ({
  isLoading,
  disabled,
  variant = 'primary',
  touched,
  error,
  className,
  inputClassName,
  containerClassName,
  updateQuery,
  icon: Icon,
  ...rest
}: InputSearchProp) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formik = useFormik({
    initialValues: {
      ...initialValues,
      search: searchParams.get('search') || '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (updateQuery) {
        const params = new URLSearchParams(searchParams);
        if (values.search) {
          params.set('search', values.search);
        } else {
          params.delete('search');
        }

        router.replace(`?${params.toString()}`, { scroll: false });
        return;
      }

      const params = new URLSearchParams();
      if (values.search) {
        params.set('search', values.search);
      } else {
        params.delete('search');
      }

      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    },
  });

  const SearchIcon = Icon ?? Search;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn(
        'relative flex w-full flex-row items-center outline-none rounded-[6px] border text-xs transition-all duration-300 ease-linear md:text-sm lg:text-base',
        [
          variant === 'primary' && 'border-tertiary-bg !bg-secondary-bg',
          variant === 'secondary' && 'bg-secondary-grey',
        ],
        [touched && error && 'bg-[red]/10'],
        [containerClassName && containerClassName]
      )}
    >
      <input
        placeholder='Search'
        type='text'
        inputMode='search'
        id='search'
        onChange={formik.handleChange}
        className={cn(
          '!border-tertiary-bg !bg-secondary-bg text-primary-bg-contrast w-full rounded-[6px] border-0',
          'px-2 py-2.5 pl-10 text-xs shadow-none outline-none ring-0',
          'placeholder:text-xs placeholder:text-gray-500 focus:ring-0 sm:pl-[3.5rem] md:px-4 md:pl-12 md:text-sm md:placeholder:text-sm lg:text-base lg:placeholder:text-base',
          [className && className],
          [inputClassName && inputClassName]
        )}
        disabled={disabled || isLoading}
        value={formik.values.search}
        {...rest}
      />
      <SearchIcon className='text-black absolute left-3' size={16} />
      {isLoading && (
        <div className='text-amali-green absolute right-6 top-1/2 -translate-y-1/2'>
          <ImSpinner2 className='animate-spin' />
        </div>
      )}
    </form>
  );
};

export default InputSearch;
