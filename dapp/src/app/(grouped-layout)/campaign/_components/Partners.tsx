import dynamic from 'next/dynamic';
import Image from 'next/image';

const Marquee = dynamic(() => import('react-fast-marquee'), { ssr: true });

const partners = [
  '/svg/Oscar.svg',
  '/svg/United.svg',
  '/svg/Health_Care.svg',
  '/svg/kaiser.svg',
];

export default function Partners() {
  return (
    <div className='py-20 bg-white border-t'>
      <div className='flex pb-8 flex-col items-center justify-center gap-[10px] bg-white mx-auto w-[90%] md:w-2/3 lg:w-1/2 xl:w-2/5 text-center'>
        <p className='font-roboto font-medium text-3xl text-[#0D0D0D] lg:text-4xl'>
          Our Partners
        </p>
        <p className='font-merriweather font-light text-[#0D0D0D]'>
          Secure, pooled investment: Your commitment contributes to funding a
          premium property, carefully selected based on community input and
          funding goals.
        </p>
      </div>

      <div className='mt-16'>
        <Marquee autoFill style={{}}>
          {partners.map((item, index) => (
            <div key={index} className='flex gap-10 px-16'>
              <Image
                src={item}
                alt={item}
                width={100}
                height={42}
                className='h-[42px] w-auto object-cover'
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
