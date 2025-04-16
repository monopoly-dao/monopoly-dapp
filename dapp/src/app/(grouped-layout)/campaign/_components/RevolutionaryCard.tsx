import Image, { StaticImageData } from 'next/image';

type Props = {
  icon: StaticImageData;
  title: string;
  body: string;
};

export default function RevolutionaryCard({ icon, title, body }: Props) {
  return (
    <div className='border border-[#00000033] bg-[#FDF9FF] rounded-[20px] p-5 w-full flex flex-col gap-16'>
      <Image src={icon} alt={title} width={60} height={60} />

      <div>
        <p className='font-roboto font-medium text-3xl py-[10px] border-b border-black'>
          {title}
        </p>
        <p className='mt-4 font-merriweather font-light text-[15px]'>{body}</p>
      </div>
    </div>
  );
}
