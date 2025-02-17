import { IconType } from 'react-icons';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import LoadingText from '@/components/LoadingText';

import { formatAmount } from '@/utils/utils';

type Props = {
  title: string;
  amount?: string | number;
  percentChange: number;
  icon: IconType;
  isLoading: boolean;
  isMoney?: boolean;
};

export default function DashboardCard({
  title,
  amount,
  percentChange,
  icon: Icon,
  isLoading,
  isMoney,
}: Props) {
  const isChangePositive = percentChange >= 0;
  const _absoluteChange = Math.abs(percentChange);

  const _ArrowIcon = isChangePositive ? IoArrowUp : IoArrowDown;

  return (
    <div className='w-full p-6 border shadow flex rounded-lg items-start gap-4 justify-between'>
      <div className='flex flex-col gap-1 font-inter'>
        <p className='font-inter text-sm font-medium text-medium-grey'>
          {title}
        </p>
        <p className='text-3xl font-bold font-inter'>
          {isMoney && '$'}
          <LoadingText
            isLoading={isLoading}
            placeholder='0'
            value={formatAmount(amount)}
          />
        </p>
        {/* <div className='font-inter text-sm flex items-center'>
          <span
            className={cn('px-3 mr-1 py-1 flex items-center gap-1 w-fit', [
              isChangePositive ? 'bg-light-green' : 'bg-light-red',
            ])}
          >
            <ArrowIcon />
            {absoluteChange}%
          </span>{' '}
          vs last month
        </div> */}
      </div>
      <Icon className='text-3xl' />
    </div>
  );
}
