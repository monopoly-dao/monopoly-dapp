import React from 'react';

import { cn } from '@/lib/utils';

import LoadingSkeleton from './LoadingSkeleton';

type LoadingTextProps = {
  value: string | number | undefined;
  isLoading: boolean;
  className?: string;
};

const LoadingText = ({ value, isLoading, className }: LoadingTextProps) => {
  return (
    <>
      {value ? (
        value
      ) : value === 0 ? (
        0
      ) : !value && isLoading ? (
        <LoadingSkeleton containerClassName={cn('w-24', [className])} />
      ) : (
        'Not set'
      )}
    </>
  );
};

export default LoadingText;
