import Image from 'next/image';

export default function Header() {
  return (
    <div className='bg-navy py-20 min-h-[360px] -mt-[1px] flex px-[5%] relative'>
      <div className='w-full h-full opacity-20 absolute left-0 top-0'>
        <Image
          src='/images/header image.jpg'
          alt='building'
          width={400}
          height={360}
          className='w-full h-full min-h-[360px] object-cover'
        />
      </div>
      <div className='z-[2] w-full sm:w-3/5 flex gap-4 flex-col text-white'>
        <h1 className='font-bold text-3xl sm:text-5xl'>
          JOIN THE FUTURE OF PROPERTY OWNERSHIP
        </h1>
        <p className='text-xl'>
          Settley is redefining property ownership by leveraging decentralized
          finance.
        </p>
      </div>
    </div>
  );
}
