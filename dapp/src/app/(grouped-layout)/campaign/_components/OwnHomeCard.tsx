import Image, { StaticImageData } from 'next/image';

type Props = {
  icon: StaticImageData;
  title: string;
  content: string;
};

export default function OwnHomeCard({ icon, title, content }: Props) {
  return (
    <div className='border border-[#0000001A] flex items-center gap-4 rounded-[12px] w-full p-5'>
      <Image src={icon} alt={title} width={40} height={40} placeholder='blur' />
      <div className='flex flex-col gap-1'>
        <p className='font-roboto font-medium text-navy'>{title}</p>
        <p className='text-[13px] font-roboto text-[#334155]'>{content}</p>
      </div>
    </div>
  );
}
