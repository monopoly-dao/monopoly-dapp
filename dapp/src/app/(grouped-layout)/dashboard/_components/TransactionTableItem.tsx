import { cn } from '@/lib/utils';

export default function TransactionTableItem() {
  const tableClass = 'px-5 border-b border-medium-grey py-3';

  return (
    <tr>
      <td className={cn([tableClass])}>123456</td>
      <td className={cn([tableClass])}>$MIAMI</td>
      <td className={cn([tableClass])}>1/11/2050</td>
      <td className={cn([tableClass])}>$55.0</td>
      <td className={cn([tableClass])}>14</td>
      <td className={cn([tableClass])}>
        <div>Complete</div>
      </td>
    </tr>
  );
}
