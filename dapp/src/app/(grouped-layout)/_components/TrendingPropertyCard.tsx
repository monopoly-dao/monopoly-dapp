import Image from 'next/image';
import Link from 'next/link';

type Props = {
  image: string;
  caption: string;
  location?: string;
  propertyId?: string;
};

export default function TrendingPropertyCard({
  image,
  caption,
  location,
  propertyId,
}: Props) {
  return (
    <Link
      href={propertyId ? `/listing/${propertyId}` : '/listings'}
      className='w-full flex flex-col gap-5 rounded-[8px] border border-[#D6D3D1] bg-white p-3'
    >
      <Image
        src={image}
        alt={caption}
        width={304}
        height={171}
        quality={75}
        sizes='(min-width: 1024px) 31vw, (min-width: 640px) 50vw, 100vw'
        className='w-full h-[297px] object-cover'
      />
      <div className='flex flex-col gap-2 px-1 pb-2'>
        <div className='flex items-start justify-between gap-3'>
          <p className='text-lg font-medium text-black'>{caption}</p>
          <span className='rounded-full border border-[#D6D3D1] px-3 py-1 text-xs text-dark-grey'>
            Open
          </span>
        </div>
        {location && <p className='text-sm text-dark-grey'>{location}</p>}
        <p className='text-sm text-dark-grey'>
          Ownership terms available on the property page.
        </p>
      </div>
    </Link>
  );
}
