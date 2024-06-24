import { TbWheel } from 'react-icons/tb';

import { cn } from '@/lib/utils';

export default function AssetTableItem() {
  const tableClass = 'px-5 border-b border-medium-grey py-3';

  return (
    <tr>
      <td className={cn([tableClass])}>
        <div className='flex items-center gap-2'>
          <TbWheel />
          $MIAMI
        </div>
      </td>
      <td className={cn('text-center', [tableClass])}>12.5</td>
      <td className={cn('text-right', [tableClass])}>$12.5</td>
    </tr>
  );
}
