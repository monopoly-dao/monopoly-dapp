import { IconType } from 'react-icons';
import { IoArrowDown, IoArrowUp } from 'react-icons/io5';

import LoadingText from '@/components/LoadingText';

import { formatAmount } from '@/utils/utils';

type Props = {
  title: string;
  amount?: string | number;
  percentChange: number;
  icon?: IconType;
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
    <div className='w-full p-6 border shadow flex rounded-lg items-start gap-4 justify-between bg-white'>
      <div className='flex flex-col gap-4 font-inter'>
        <p className='font-roboto text-base font-medium text-[#1C1917]'>
          {title}
        </p>
        <p className='text-2xl font-medium font-general-sans'>
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
      {Icon && <Icon className='text-3xl' />}
    </div>
  );
}
