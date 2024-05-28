import Image from 'next/image';

type Props = {
  image: string;
  caption: string;
};

export default function TrendingPropertyCard({ image, caption }: Props) {
  return (
    <div className='w-full flex flex-col gap-2'>
      <Image
        src={image}
        alt={caption}
        width={304}
        height={171}
        quality={100}
        className='w-full h-[170px] rounded-[10px] object-cover'
      />
      <p className='text-2xl font-bold text-navy'>{caption}</p>
    </div>
  );
}
