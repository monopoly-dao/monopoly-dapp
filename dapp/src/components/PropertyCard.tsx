'use client';

import Image from 'next/image';
import Link from 'next/link';

import WishlistButton from './WishlistButton';
import { Property } from '../api/properties/propertiesApiTypes';

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className='w-fit border border-gray-300 rounded-[12px] bg-white'>
      <Image
        src={property.photos[0].url}
        width={200}
        height={200}
        alt={property.name}
        className='w-full h-[250px] object-contain'
      />
      <div className='p-3 flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <Link href={`/property/${property.id}`} className='text-xl font-bold'>
            {property.name}
          </Link>
          <WishlistButton
            propertyId={property.id}
            isFavourite={property.isFavourite}
            propertyName={property.name}
          />
        </div>
        <p className='text-sm'>{property.description.substring(0, 40)}...</p>
      </div>
    </div>
  );
}
