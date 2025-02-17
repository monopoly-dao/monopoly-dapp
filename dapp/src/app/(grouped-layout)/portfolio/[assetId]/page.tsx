import Image from 'next/image';

import Button from '@/components/buttons/Button';

export default function Page() {
  return (
    <div className='px-[5%] py-10'>
      <h1 className='leading-[50px] text-4xl mb-5'>Miami Beach House</h1>

      <div className='flex flex-col gap-5 sm:flex-row'>
        <div className='w-full sm:w-3/4 rounded-[10px]'>
          <Image
            src='/svg/auction houses.svg'
            alt='real estate'
            width={300}
            height={200}
            quality={100}
            className='w-full h-[400px] object-cover rounded-[10px]'
          />
        </div>
        <div className='w-full sm:w-1/4 flex flex-col gap-8'>
          <div className='w-full flex flex-row sm:flex-col gap-4'>
            <Button className='w-full' size='lg'>
              Buy
            </Button>
            <Button className='w-full' size='lg' variant='outline-primary'>
              Sell
            </Button>
          </div>
          <div className='text-xl'>
            <p>$100/token</p>
            <p>You have - 500 tokens</p>
          </div>
        </div>
      </div>
    </div>
  );
}
