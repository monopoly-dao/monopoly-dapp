import Image from 'next/image';
import { BsLinkedin } from 'react-icons/bs';
import { ImQuotesLeft } from 'react-icons/im';

type Props = {
  content: string;
  name: string;
  avatar: string;
};

export default function TestimonialCard({ content, name, avatar }: Props) {
  return (
    <div className='rounded-[12px] border border-[#E4D3CF] bg-[#FDF9FF] relative w-full'>
      <div className='p-10 flex flex-col gap-12 mb-32'>
        <ImQuotesLeft className='text-[#231399] text-[40px]' />
        <p className='font-roboto text-[#333333] text-lg'>{content}</p>
      </div>
      <div className='w-full absolute bottom-0 bg-[#FAF0FF] py-[30px] px-10 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Image
            src={avatar}
            alt={name}
            width={60}
            height={60}
            className='object-cover rounded-[8px]'
          />
          <div className='flex flex-col'>
            <p className='font-roboto text-lg text-[#1A3129]'>{name}</p>
            <p></p>
          </div>
        </div>
        <BsLinkedin className='text-4xl' />
      </div>
    </div>
  );
}
