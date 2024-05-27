import React from 'react';

import LoadingSkeleton from './LoadingSkeleton';

type LoadingTextProps = {
  value: string | number | undefined;
};

const LoadingText = ({ value }: LoadingTextProps) => {
  return (
    <>
      {value === 0 ? 0 : value ?? <LoadingSkeleton containerClassName='w-24' />}
    </>
  );
};

export default LoadingText;
