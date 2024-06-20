import Image from 'next/image';

type Props = {
  image: string;
  caption: string;
};

export default function TrendingPropertyCard({ image, caption }: Props) {
  return (
    <div className='w-full flex flex-col gap-5'>
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
    </div>
  );
}
