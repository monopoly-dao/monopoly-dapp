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
  const tableClass = 'px-5 border-b border-medium-grey py-3';

  return (
    <tr>
      <td className={cn([tableClass])}>
        <div className='flex items-center'>
          <Link
            href={`https://sepolia.etherscan.io/tx/${transaction.txHash}`}
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
        {formatISODatetoDashSeparatedDateString(transaction.created_at)}
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
