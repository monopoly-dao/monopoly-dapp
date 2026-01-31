'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { TbBath, TbBed } from 'react-icons/tb';

import { cn } from '@/lib/utils';
import { Property } from '@/api/properties/propertiesApiTypes';
import { formatAmount } from '@/utils/utils';

type Props = {
  property: Property;
  className?: string;
  badge?: 'SELLING FAST' | 'COMING SOON';
  fundedPercentage?: number;
};

export default function LandingPropertyCard({
  property,
  className,
  badge = 'SELLING FAST',
  fundedPercentage,
}: Props) {
  const router = useRouter();

  const handleRouting = () => {
    router.push(`/listing/${property._id}`);
  };

  return (
    <article
      onClick={handleRouting}
      className={cn(
        'group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:-translate-y-1 transition-transform duration-300 w-[300px] md:w-[350px] shrink-0',
        className
      )}
      itemScope
      itemType='https://schema.org/RealEstateListing'
    >
      {/* Image Container */}
      <div className='relative w-full aspect-[4/3] overflow-hidden'>
        <div className='absolute top-4 left-4 z-10'>
          <div className='bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-black shadow-sm'>
            {badge}
          </div>
        </div>
        <Image
          src={property.propertyDetails.photos[0]?.url || '/placeholder.jpg'}
          alt={property.propertyDetails.name}
          fill
          className='object-cover transition-transform duration-500 group-hover:scale-110'
          itemProp='image'
        />
      </div>

      {/* Content */}
      <div className='flex flex-col p-5 gap-4 flex-1'>
        {/* Header */}
        <div className='flex flex-col gap-1'>
          <p className='text-xs text-muted-foreground'>
            Added on {new Date().toLocaleDateString()} by Rothmore Property
          </p>
          <h3
            className='font-merriweather font-bold text-xl text-navy line-clamp-1'
            itemProp='name'
          >
            {property.propertyDetails.name}
          </h3>
          <p className='text-muted-foreground text-sm line-clamp-1'>
            {property.propertyDetails.country || 'Manchester, UK'}
          </p>
        </div>

        {/* Stats */}
        <div className='flex items-center gap-6 text-sm text-gray-600'>
          <div className='flex items-center gap-1.5'>
            <TbBed className='text-lg' />
            <span>{property.propertyDetails.bed} Bed</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <TbBath className='text-lg' />
            <span>{property.propertyDetails.bath} Bath</span>
          </div>
        </div>

        {/* Funded Bar (Optional) */}
        {fundedPercentage !== undefined && (
          <div className='flex flex-col gap-1.5'>
            <div className='flex justify-between text-xs font-medium'>
              <span className='text-navy'>Funded</span>
              <span>{fundedPercentage}%</span>
            </div>
            <div className='w-full h-2 bg-secondary/30 rounded-full overflow-hidden'>
              <div
                className='h-full bg-navy rounded-full'
                style={{ width: `${fundedPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Footer: Price & Button */}
        <div className='flex items-end justify-between mt-auto pt-4 border-t border-gray-100'>
          <div className='flex flex-col'>
            <span className='text-[10px] text-gray-500 uppercase tracking-wide'>
              Price
            </span>
            <span className='font-bold text-lg text-navy'>
              ${formatAmount(property.propertyDetails.units)}
            </span>
          </div>

          <button className='bg-navy text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-navy/90 transition-colors'>
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
