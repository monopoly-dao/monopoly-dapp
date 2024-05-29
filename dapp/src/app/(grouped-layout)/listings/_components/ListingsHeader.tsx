import Image from 'next/image';

type Props = {
  image: string;
  title: string;
  caption: string;
};

function HeaderProperty({ image, title, caption }: Props) {
  return (
    <div className='w-full h-[284px] relative rounded-[12px] flex flex-col justify-end p-6 bottom-fade'>
      <Image
        src={image}
        alt='apartment'
        quality={100}
        width={300}
        height={280}
        className='w-full h-full absolute object-cover top-0 left-0 rounded-[12px] bottom-fade'
      />
      <div className='flex flex-col z-[2] text-light-grey gap-3'>
        <p className='text-2xl font-bold'>{title}</p>
        <p className='font-medium'>{caption}</p>
      </div>
    </div>
  );
}

export default function ListingsHeader() {
  return (
    <div className='bg-navy py-20 min-h-[360px] -mt-[1px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-[5%] relative'>
      <HeaderProperty
        image='/images/apartment buildings.jpg'
        title='Jackson Heights'
        caption='$ 50,000'
      />
      <div className='hidden sm:block'>
        <HeaderProperty
          image='/images/mansion.jpg'
          title='Crestville'
          caption='$ 50,000'
        />
      </div>
      <div className='hidden lg:block'>
        <HeaderProperty
          image='/images/school dorm.jpg'
          title='Oxford Projects'
          caption='$ 50,000'
        />
      </div>
    </div>
  );
}
