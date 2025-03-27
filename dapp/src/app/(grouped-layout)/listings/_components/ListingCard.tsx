import Image from 'next/image';
import Link from 'next/link';

import RatePercentageIndicator from '@/components/PercentageIndicator';
import WishlistButton from '@/components/WishlistButton';

import { Property } from '@/api/properties/propertiesApiTypes';
import { formatAmount } from '@/utils/utils';

type Props = {
  property: Property;
  wishlist: string[] | undefined;
};

export default function ListingCard({ property, wishlist }: Props) {
  const {
    propertyDetails: {
      name,
      symbol,
      stateOrProvince,
      country,
      bed,
      bath,
      squareFt,
      unitsLeft,
      units,
      photos,
    },
  } = property;

  const generateRandomNumbers = (): number => {
    return Math.floor(Math.random() * (30 - 5 + 1)) + 5;
  };

  return (
    <div className='w-full min-h-[426px] relative bg-white shadow-2xl'>
      <div onClick={(e) => e.stopPropagation()}>
        <WishlistButton
          propertyId={property._id}
          propertyName={property?.propertyDetails.name ?? ''}
          isFavourite={wishlist?.includes(property._id) ?? false}
        />
      </div>
      <Link href={`/listing/${property._id}`}>
        <Image
          src={photos[0].url}
          alt={name}
          width={300}
          height={220}
          quality={100}
          className='w-full h-[220px] object-cover'
          unoptimized
          loading='lazy'
        />

        <div className='py-6 px-4 w-full'>
          <div className='flex items-start justify-between gap-1'>
            <p className='text-navy font-medium w-3/4 truncate'>{name}</p>
            <p className='text-navy font-medium text-sm uppercase'>${symbol}</p>
          </div>
          <div className='mt-1 flex items-center gap-3 text-sm text-gray-500'>
            {/* <IoLocationOutline className='text-lg' /> */}
            {stateOrProvince}, {country}
          </div>
          <div className='mt-1 pb-4 border-b-[2px] border-medium-grey flex items-center justify-between'>
            <div className='flex items-center gap-4 text-sm text-navy'>
              <div className='flex items-center gap-1'>
                {/* <BiBed /> */}
                <p>{bed} Beds</p>
              </div>
              <div className='flex items-center gap-1'>
                {/* <BiBath />  */}
                <p>{bath} Bath</p>
              </div>
              <div className='flex items-center gap-1'>
                {/* <BiBath />  */}
                <p>{formatAmount(squareFt)} sqft</p>
              </div>
            </div>
          </div>
          <div className='mt-4 flex items-start justify-between'>
            <div className='flex flex-col gap-1'>
              <div className='flex items-end'>
                <p className='font-bold text-2xl'>$1</p>
                <p>/unit</p>
              </div>
              <p className='text-navy/40 font-inter text-xs'>
                {formatAmount(unitsLeft)}/{formatAmount(units)} units left
              </p>
            </div>
            <div className='flex flex-col gap-1 items-center'>
              <p className='font-inter text-gray-500'>Buy Now</p>
              <RatePercentageIndicator amount={`${generateRandomNumbers()}`} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
