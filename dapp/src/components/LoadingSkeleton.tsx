import Skeleton, { SkeletonProps } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css';

import { cn } from '@/lib/utils';

const LoadingSkeleton = ({
  className,
  containerClassName,
  baseColor = '#6B3B9010',
  duration = 1,
  ...rest
}: SkeletonProps) => {
  return (
    <Skeleton
      className={cn('inline-block', [className && className])}
      containerClassName={cn('inline-block', [
        containerClassName && containerClassName,
      ])}
      style={{ lineHeight: 'inherit' }}
      baseColor={baseColor}
      duration={duration}
      {...rest}
    />
  );
};

export default LoadingSkeleton;
