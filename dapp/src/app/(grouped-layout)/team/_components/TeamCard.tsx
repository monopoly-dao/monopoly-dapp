import Link from 'next/link';
import { FaCircleUser, FaLinkedinIn } from 'react-icons/fa6';

type Props = {
  name: string;
  title: string;
  linkedin: string;
};

export default function TeamCard({ name, title, linkedin }: Props) {
  return (
    <div className='flex flex-col gap-4 items-center text-center'>
      <div className='w-20 h-20 rounded-full bg-navy/5 flex items-center justify-center'>
        <FaCircleUser className='text-5xl text-navy/40' />
      </div>
      <div className='flex flex-col gap-1'>
        <p className='text-2xl font-playfair font-bold text-navy'>{name}</p>
        <p className='text-xs font-inter font-medium text-settley-text/60 uppercase tracking-[2px]'>
          {title}
        </p>
      </div>
      <Link
        href={linkedin}
        target='_blank'
        className='text-navy hover:text-navy transition-colors'
      >
        <FaLinkedinIn className='text-xl' />
      </Link>
    </div>
  );
}
