import React from 'react';

import { cn } from '@/lib/utils';

import LoadingSkeleton from './LoadingSkeleton';

type LoadingTextProps = {
  value: string | number | undefined;
  isLoading: boolean;
  className?: string;
  placeholder?: string;
};

const LoadingText = ({
  value,
  isLoading,
  className,
  placeholder = 'Not set',
}: LoadingTextProps) => {
  return (
    <>
      {value ? (
        value
      ) : value === 0 ? (
        0
      ) : !value && isLoading ? (
        <LoadingSkeleton containerClassName={cn('w-24', [className])} />
      ) : (
        placeholder
      )}
    </>
  );
};

export default LoadingText;
