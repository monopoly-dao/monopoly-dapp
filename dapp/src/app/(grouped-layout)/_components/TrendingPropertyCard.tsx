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
      <Image
        src={image}
        alt={caption}
        width={304}
        height={171}
        quality={100}
        className='w-full h-[297px] object-cover'
        unoptimized
      />
      <p className='text-black'>{caption}</p>
    </Link>
  );
}
