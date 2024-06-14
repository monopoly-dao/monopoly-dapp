'use client';

import Image from 'next/image';
import Link from 'next/link';

import WishlistButton from './WishlistButton';
import { Property } from '../api/properties/propertiesApiTypes';

type PropertyCardProps = {
  property: Property;
  wishlist: string[] | undefined;
};

export default function PropertyCard({
  property,
  wishlist,
}: PropertyCardProps) {
  const { propertyDetails } = property;

  return (
    <div className='w-full border border-gray-300 rounded-[12px] bg-white'>
      <Image
        src={propertyDetails.photos[0].url}
        width={200}
        height={200}
        alt={propertyDetails.name}
        quality={100}
        loading='lazy'
        className='w-full h-[250px] object-cover'
      />
      <div className='p-3 flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <Link
            href={`/property/${property._id}`}
            className='text-xl font-bold'
          >
            {propertyDetails.name}
          </Link>
          <WishlistButton
            propertyId={property._id}
            isFavourite={wishlist?.includes(property._id) ?? false}
            propertyName={propertyDetails.name}
          />
        </div>
        <p className='line-clamp-2'>{propertyDetails.description}...</p>
        <div className='text-xs flex flex-col gap-1'>
          <p>{propertyDetails.streetAddress}</p>
          <p>{propertyDetails.stateOrProvince}</p>
          <p>{propertyDetails.country}</p>
        </div>
      </div>
    </div>
  );
}
