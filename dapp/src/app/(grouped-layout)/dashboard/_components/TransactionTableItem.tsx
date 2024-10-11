import Link from 'next/link';
import { IoIosLink } from 'react-icons/io';

import { cn } from '@/lib/utils';

import { TransactionResponse } from '@/api/profile/profileApiTypes';
import {
  formatAmount,
  formatISODatetoDashSeparatedDateString,
} from '@/utils/utils';

type Props = {
  transaction: TransactionResponse;
};

export default function TransactionTableItem({ transaction }: Props) {
  const tableClass = 'px-5 border-b border-medium-grey py-3 font-mono';

  return (
    <tr>
      <td className={cn([tableClass])}>
        <div className='flex items-center'>
          <Link
            href={`https://basescan.org/tx/${transaction.txHash}`}
            className='underline flex items-center'
            target='_blank'
          >
            <IoIosLink />
            <p className='w-40 truncate'>{transaction.txHash}</p>
          </Link>
        </div>
      </td>
      <td className={cn([tableClass])}>
        ${transaction.property?.propertyDetails.symbol}
      </td>
      <td className={cn([tableClass])}>
        <p className='min-w-24'>
          {formatISODatetoDashSeparatedDateString(transaction.created_at)}
        </p>
      </td>
      <td className={cn([tableClass])}>
        ${formatAmount(transaction.amount.$numberDecimal)}
      </td>
      <td className={cn([tableClass])}>
        {formatAmount(transaction.amount.$numberDecimal)}
      </td>
      <td className={cn([tableClass])}>
        <div>Complete</div>
      </td>
    </tr>
  );
}
