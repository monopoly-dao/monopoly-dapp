import Image, { StaticImageData } from 'next/image';

type Props = {
  icon: StaticImageData;
  title: string;
  body: string;
};

export default function RevolutionaryCard({ icon, title, body }: Props) {
  return (
    <div className='border border-settley-primary/10 bg-white rounded-2xl p-6 w-full flex flex-col gap-12 shadow-sm hover:shadow-md transition-shadow duration-300'>
      <Image src={icon} alt={title} width={60} height={60} />

      <div>
        <p className='font-bold text-2xl py-[10px] border-b border-settley-primary/10 text-navy'>
          {title}
        </p>
        <p className='mt-4 font-inter font-light text-[15px] text-settley-text/80 leading-relaxed'>{body}</p>
      </div>
    </div>
  );
}
