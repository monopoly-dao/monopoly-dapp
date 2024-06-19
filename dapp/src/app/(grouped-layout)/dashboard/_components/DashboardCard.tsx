import { IconType } from 'react-icons';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import { cn } from '@/lib/utils';

type Props = {
  title: string;
  amount: string | number;
  percentChange: number;
  icon: IconType;
};

export default function DashboardCard({
  title,
  amount,
  percentChange,
  icon: Icon,
}: Props) {
  const isChangePositive = percentChange >= 0;
  const absoluteChange = Math.abs(percentChange);

  const ArrowIcon = isChangePositive ? IoArrowUp : IoArrowDown;

  return (
    <div className='w-full p-6 border border-medium-grey flex items-center gap-4 justify-between'>
      <div className='flex flex-col gap-1 font-inter'>
        <p className='font-inter'>{title}</p>
        <p className='text-2xl font-inter'>{amount}</p>
        <div className='font-inter text-sm flex items-center'>
          <span
            className={cn('px-3 mr-1 py-1 flex items-center gap-1 w-fit', [
              isChangePositive ? 'bg-light-green' : 'bg-light-red',
            ])}
          >
            <ArrowIcon />
            {absoluteChange}%
          </span>{' '}
          vs last month
        </div>
      </div>
      <Icon className='text-3xl' />
    </div>
  );
}
