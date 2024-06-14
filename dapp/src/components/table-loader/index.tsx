import { cn } from '@/lib/utils';

import Skeleton from '@/components/Skeleton';

type TableLoaderProps = {
  className?: string;
};

const TableLoader = ({ className }: TableLoaderProps) => {
  return (
    <div className={cn('flex flex-col gap-5', [className && className])}>
      <Skeleton className='w-full rounded-lg py-8' />
      <Skeleton className='w-full py-7' />
      <Skeleton className='w-full py-7' />
      <Skeleton className='w-full py-7' />
      <Skeleton className='w-full py-7' />
      <Skeleton className='w-full py-7' />
      <Skeleton className='w-full py-7' />
      <Skeleton className='w-full py-7' />
      <Skeleton className='w-full py-7' />
      <Skeleton className='w-full py-7' />
    </div>
  );
};

export default TableLoader;
