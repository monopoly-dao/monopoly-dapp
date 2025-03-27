'use client';

import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';

import { cn } from '@/lib/utils';

type Props = {
  amount: string;
  isNegative?: boolean;
};

export default function RatePercentageIndicator({ amount, isNegative }: Props) {
  const Icon = isNegative ? FaArrowDownLong : FaArrowUpLong;

  return (
    <span
      className={cn(
        'bg-[#34C75933] gap-[2px] w-fit rounded-[6px] flex items-center text-[8px] px-2 h-5 py-0 text-[#34C759]',
        [isNegative && 'text-[#FF1D45] bg-[#FF1D4533]']
      )}
    >
      <Icon className='' /> {amount}%
    </span>
  );
}
