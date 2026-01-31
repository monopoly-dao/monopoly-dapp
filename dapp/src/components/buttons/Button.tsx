import * as React from 'react';
import { IconType } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

import { cn } from '@/lib/utils';

const ButtonVariant = [
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
  'warning',
  'outline-primary',
  'warning-ghost',
  'primary-ghost',
] as const;
const ButtonSize = ['sm', 'base', 'lg'] as const;

type ButtonProps = {
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: (typeof ButtonVariant)[number];
  size?: (typeof ButtonSize)[number];
  leftIcon?: IconType;
  rightIcon?: IconType;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
  fullWidth?: boolean;
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      type = 'button',
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'base',
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      fullWidth,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200',
          'rounded-full border disabled:cursor-not-allowed',
          [
            size === 'lg' && ['px-10 py-3', 'text-sm md:text-base'],
            size === 'base' && ['px-6 py-2', 'text-sm'],
            size === 'sm' && ['px-4 py-1.5', 'text-xs'],
            variant === 'ghost' && [
              'border-gray-200 bg-gray-200 text-navy',
              'active:bg-gray-300',
              'disabled:bg-gray-200',
            ],
            variant === 'primary' && [
              'bg-navy border-settley-primary text-white',
              'hover:bg-navy/90',
              'active:bg-navy',
              'disabled:bg-navy/20 disabled:border-settley-primary/10 disabled:text-white/90',
            ],
            variant === 'primary-ghost' && [
              'bg-navy/10 text-navy border-settley-primary/10',
              'hover:bg-navy/20',
              'active:bg-navy/10',
              'disabled:bg-navy/5',
            ],
            variant === 'warning' && [
              'bg-warning-700 border-warning-700 text-white',
              'active:bg-warning-700',
              'disabled:bg-warning-700',
            ],
            variant === 'warning-ghost' && [
              'bg-warning-100 text-warning-700 border-warning-100',
              'active:bg-warning-100',
              'disabled:bg-warning-100',
            ],
            variant === 'outline-primary' && [
              'text-navy border-settley-primary bg-transparent',
              'hover:bg-navy/5',
              'active:bg-navy/10',
              'disabled:bg-white',
            ],
            variant === 'outline' && [
              'text-navy border-navy bg-transparent',
              'hover:bg-navy/5',
              'active:bg-white',
              'disabled:bg-white',
            ],
            variant === 'dark' && [
              'text-white border-navy bg-navy',
              'hover:bg-navy/90',
              'active:bg-white active:text-navy',
              'disabled:bg-navy/20',
            ],
          ],
          isLoading && [
            'relative text-transparent transition-none',
            'hover:text-transparent disabled:cursor-wait',
          ],
          fullWidth && 'w-full',
          className
        )}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-navy': ['primary', 'dark', 'secondary'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-yellow': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            <ImSpinner2 className='animate-spin' />
          </div>
        )}
        {LeftIcon && (
          <LeftIcon className={cn('h-5 w-5', classNames?.leftIcon)} />
        )}
        {children}
        {RightIcon && (
          <RightIcon className={cn('h-5 w-5', classNames?.rightIcon)} />
        )}
      </button>
    );
  }
);

export default Button;
