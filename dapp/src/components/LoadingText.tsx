import React from 'react';

import LoadingSkeleton from './LoadingSkeleton';

type LoadingTextProps = {
  value: string | number | undefined;
  isLoading: boolean;
};

const LoadingText = ({ value, isLoading }: LoadingTextProps) => {
  return (
    <>
      {value ? (
        value
      ) : value === 0 ? (
        0
      ) : !value && isLoading ? (
        <LoadingSkeleton containerClassName='w-24' />
      ) : (
        'Not set'
      )}
    </>
  );
};

export default LoadingText;
