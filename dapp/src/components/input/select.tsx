'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useId, useMemo } from 'react';
import ReactSelect from 'react-select';

import { cn } from '@/lib/utils';

import InputLabel from '@/components/input/input-label';
import { SelectOption, SelectProps } from '@/components/input/types';

const Select = ({
  label,
  labelClassName,
  id,
  icon,
  required,
  setTouched,
  setValue,
  placeholder,
  value,
  options,
  disabled,
  variant = 'primary',
  name,
  error,
  touched,
  containerClassName,
  controlClassName,
  wrapperClassName,
}: SelectProps) => {
  const handleChange = async (option: SelectOption | null) => {
    // logic here
    if (setValue && option) {
      await setValue(option.value, true);
      await setTouched?.(true, true);
    }
  };

  const handleBlur = async () => {
    if (setTouched) {
      await setTouched(true, true);
    }
  };

  const selectedValue: SelectOption = useMemo(() => {
    if (!value || !options) {
      return { value: '', label: placeholder ? placeholder : 'Select Option' };
    }
    const findSelected = options.find((option) => option.value === value);

    if (!findSelected) {
      return { value: '', label: placeholder ? placeholder : 'Select Option' };
    }
    return findSelected;
  }, [options, value, placeholder]);

  return (
    <div className={cn('w-full', [wrapperClassName && wrapperClassName])}>
      <div className='relative space-y-2'>
        <div className='flex items-center gap-1'>
          {label && !!label.length && (
            <InputLabel className={labelClassName} id={id} label={label} />
          )}
          {required && <span className='text-danger'>*</span>}
        </div>
        {!!icon && <div className='absolute left-[5%] top-[45%]'>{icon}</div>}
        <ReactSelect
          placeholder={`${placeholder ? placeholder : 'Select Option'}`}
          value={selectedValue}
          options={options}
          onBlur={handleBlur}
          onFocus={handleBlur}
          id={id}
          onChange={handleChange}
          isDisabled={disabled}
          required={required}
          name={name}
          captureMenuScroll={true}
          instanceId={useId()}
          classNames={{
            option: (state) =>
              cn(
                'hover:bg-navy hover:text-white p-2 bg-transparent text-xs lg:text-sm focus:bg-navy focus-within:bg-navy',
                [state.isSelected && 'font-semibold'],
                [state.isFocused && 'bg-navy bg-opacity-80 text-white']
              ),
            control: () =>
              cn(
                `w-full rounded-lg bg-secondary-bg text-primary-bg-contrast px-2 py-2.5 md:py-3.5`,
                'text-xs outline-none transition-all duration-300 ease-in placeholder:text-xs md:px-4 lg:text-sm xl:placeholder:text-sm flex',
                [
                  variant === 'dark' && 'border-secondary-bg bg-secondary-bg',
                  variant === 'light' &&
                    'border-secondary-grey bg-secondary-grey',
                  variant === 'primary' &&
                    'border border-secondary-bg bg-secondary-bg',
                  variant === 'secondary' &&
                    'bg-tertiary-bg border-tertiary-bg border',
                ],
                [controlClassName && controlClassName],
                [touched && error && 'bg-warning-100 border-warning-700']
              ),
            placeholder: () =>
              'text-primary-bg-contrast text-xs md:text-sm lg:text-base',
            noOptionsMessage: () => 'text-xs lg:text-sm',
            dropdownIndicator: () => cn('text-primary-bg-contrast/90 p-0'),
            input: () => cn('p-0 text-primary-bg-contrast whitespace-nowrap'),
            menuList: () =>
              cn([
                'border',
                variant === 'primary' && 'border-secondary-bg bg-secondary-bg',
                variant === 'secondary' &&
                  'bg-tertiary-bg border-tertiary-bg border',
              ]),
            container: () => cn([containerClassName && containerClassName]),
            // singleValue: () => cn('text-primary-bg-contrast')
          }}
          styles={{
            option: () => ({}),
            control: () => {
              return {};
            },
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              padding: 0,
              margin: 0,
            }),
            dropdownIndicator: () => ({}),
            input: (baseStyles) => ({ ...baseStyles, margin: 0, padding: 0 }),
            indicatorSeparator: () => ({}),
            placeholder: () => ({}),
            menuList: (base) => ({ ...base, maxHeight: '10rem' }),
            singleValue: (base) => ({ ...base, color: 'inherit' }),
          }}
        />

        <AnimatePresence>
          {error && touched && !value && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ ease: 'easeOut', duration: 0.5 }}
              className='text-warning-700 pl-1 pt-1 text-xs font-semibold'
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Select;
