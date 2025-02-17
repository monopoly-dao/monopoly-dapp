import Image from 'next/image';
import Link from 'next/link';

export default function RealEstateCard() {
  return (
    <Link href='/portfolio/gff374-dff' className='w-full flex flex-col gap-3'>
      <div className='w-full rounded-[10px]'>
        <Image
          src='/svg/auction houses.svg'
          alt='real estate'
          width={300}
          height={200}
          quality={100}
          className='w-full h-[200px] object-cover rounded-[10px]'
        />
      </div>
      <div>
        <p>Miami Beach House</p>
        <p className='text-sm text-light-grey'>Miami, Florida</p>
      </div>
    </Link>
  );
}
