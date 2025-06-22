import Image from 'next/image';

import { cn } from '@/lib/utils';

import { UserAssetsResponse } from '@/api/profile/profileApiTypes';
import { formatAmount } from '@/utils/utils';

type Props = {
  asset: UserAssetsResponse;
};

export default function AssetTableItem({ asset }: Props) {
  const tableClass = 'px-5 py-3 text-sm font-roboto text-[#353434]';

  return (
    <tr>
      <td className={cn([tableClass])}>
        <div className='flex items-center gap-2 font-medium'>
          <div className='w-8 h-8 flex-shrink-0'>
            <Image
              src={asset.property.propertyDetails.photos[0].url}
              alt={asset.property.propertyDetails.name}
              width={32}
              height={32}
              className='rounded-full w-8 h-8 object-cover flex-shrink-0 min-w-0'
            />
          </div>
          {asset.property?.propertyDetails.name}
        </div>
      </td>
      <td className={cn([tableClass])}>
        <div className='flex items-center gap-2'>
          {/* <TbWheel /> */}${asset.property?.propertyDetails.symbol}
        </div>
      </td>
      <td className={cn('', [tableClass])}>{formatAmount(asset.units)}</td>
      <td className={cn('', [tableClass])}>${formatAmount(asset.units)}</td>
    </tr>
  );
}
