import Image from 'next/image';
import Link from 'next/link';

type Props = {
  image: string;
  caption: string;
  propertyId: string;
};

export default function TrendingPropertyCard({
  image,
  caption,
  propertyId,
}: Props) {
  return (
    <Link
      href={`/listing/${propertyId}`}
      className='w-full flex flex-col gap-5'
    >
      <div className='relative'>
        <Image
          src={image}
          alt={caption}
          width={304}
          height={171}
          quality={100}
          className='w-full h-[297px] object-cover'
          unoptimized
        />
        <span className='absolute left-4 top-4 bg-white text-navy rounded-[4px] px-3 py-2 text-xs font-medium uppercase tracking-[0.08em]'>
          Asset Opportunity
        </span>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-black font-medium'>{caption}</p>
        <p className='text-[#44403C]'>
          Review ownership access, liquidity potential, and asset-specific
          terms.
        </p>
      </div>
    </Link>
  );
}
