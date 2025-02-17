import Link from 'next/link';
import { FaCircleUser, FaLinkedinIn } from 'react-icons/fa6';

type Props = {
  name: string;
  title: string;
  linkedin: string;
};

export default function TeamCard({ name, title, linkedin }: Props) {
  return (
    <div className='flex flex-col gap-2 justify-self-start sm:justify-self-center'>
      <FaCircleUser className='text-4xl text-gray-500' />
      <p className='text-2xl'>{name}</p>
      <p className='text-lg text-dark-grey'>{title}</p>
      <Link href={linkedin} target='_blank'>
        <FaLinkedinIn className='text-2xl' />
      </Link>
    </div>
  );
}
