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
  const actionLabel =
    transaction.type === 'bought' ? 'Tokens bought' : 'Tokens sold';

  return (
    <tr>
      <td className={cn([tableClass])}>#{transaction._id}</td>
      <td className={cn([tableClass])}>
        ${transaction.property.propertyDetails.symbol}
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
        <div>{actionLabel}</div>
      </td>
    </tr>
  );
}
