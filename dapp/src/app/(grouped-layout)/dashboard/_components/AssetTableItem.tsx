import { cn } from '@/lib/utils';

import { UserAssetsResponse } from '@/api/profile/profileApiTypes';
import { formatAmount } from '@/utils/utils';

type Props = {
  asset: UserAssetsResponse;
};

export default function AssetTableItem({ asset }: Props) {
  const tableClass = 'px-5 border-b border-medium-grey py-3 font-inter';

  return (
    <tr>
      <td className={cn([tableClass])}>
        <div className='flex items-center gap-2 font-medium'>
          {/* <TbWheel /> */}${asset.property.propertyDetails.symbol}
        </div>
      </td>
      <td className={cn('text-center', [tableClass])}>
        {formatAmount(asset.units)}
      </td>
      <td className={cn('text-right', [tableClass])}>
        ${formatAmount(asset.units)}
      </td>
    </tr>
  );
}
