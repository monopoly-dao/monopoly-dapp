import Image from 'next/image';
import Link from 'next/link';
import { FaUmbrellaBeach } from 'react-icons/fa6';
import { MdPool } from 'react-icons/md';

import Button from '@/components/buttons/Button';

export default function Page() {
  return (
    <div>
      <div className='mt-8 sm:mb-32 px-[5%] sm:px-[7%]'>
        <Link href='/listings' className='text-sm font-n-montreal'>
          Back to search results
        </Link>
        <div className='grid mt-8 grid-cols-3 grid-rows-3 gap-4 h-[500px] sm:h-[800px]'>
          <div className='col-span-3 row-span-2'>
            <Image
              src='/images/mykonos.png'
              alt='apartment'
              width={200}
              height={200}
              quality={100}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='col-span-1 row-span-1'>
            <Image
              src='/images/interior.png'
              alt='apartment'
              width={200}
              height={200}
              quality={100}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='col-span-1 row-span-1'>
            <Image
              src='/images/interior1.png'
              alt='apartment'
              width={200}
              height={200}
              quality={100}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='col-span-1 row-span-1'>
            <Image
              src='/images/interior2.png'
              alt='apartment'
              width={200}
              height={200}
              quality={100}
              className='w-full h-full object-cover'
            />
          </div>
        </div>

        <div className='mt-12 flex flex-col-reverse sm:flex-row w-full justify-between gap-5'>
          <div className='w-full sm:w-3/5 flex flex-col gap-7'>
            <div>
              <p className='text-3xl font-medium'>
                Welcome To Your Dream Dubai Beachfront Resort!
              </p>
              <div className='flex items-center gap-4 mt-2 text-navy'>
                <div className='flex items-center gap-1'>
                  {/* <BiBed /> */}
                  <p>5 Beds</p>
                </div>
                <div className='flex items-center gap-1'>
                  {/* <BiBath />  */}
                  <p>3 Baths</p>
                </div>
                <div className='flex items-center gap-1'>
                  {/* <BiBath />  */}
                  <p>2000 sqft</p>
                </div>
              </div>
              <p className='mt-7 w-4/5'>
                {' '}
                This stunning beach house offers unparalleled ocean views and
                direct access to pristine sandy shores. Featuring spacious
                open-plan living areas, floor-to-ceiling windows, and a modern,
                gourmet kitchen, this home is perfect for entertaining and
                relaxation.
              </p>
            </div>
            <div className='h-[1px] w-full bg-medium-grey' />
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-xl'>Asset Symbol</p>
              <p className='font-medium text-[green]/60'>$SFC1</p>
            </div>
            <div className='h-[1px] w-full bg-medium-grey' />
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-xl'>Deed URL </p>
              <p className=''>
                https://dribbble.com/shots/22790290-Teraluxe-Homepage-Web-App-SaaS-Dashboard-Real-Estate
              </p>
            </div>
            <div className='h-[1px] w-full bg-medium-grey' />
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-xl'>Contract Address</p>
              <p className=' break-words'>
                0xBd0124f0751C8E6FE3962e95160d5d23Ba12c8B5
              </p>
            </div>
            <div className='h-[1px] w-full bg-medium-grey' />
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-xl'>Features</p>
              <div className='flex items-center gap-10 mt-2 text-lg text-navy'>
                <div className='flex items-center gap-1'>
                  <MdPool />
                  <p>Pool</p>
                </div>
                <div className='flex items-center gap-1'>
                  <MdPool />
                  <p>Ocean view</p>
                </div>
                <div className='flex items-center gap-1'>
                  <FaUmbrellaBeach />
                  <p>Deck</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-2 w-full sm:w-2/5 lg:w-1/4'>
            <p className='text-3xl '>$55</p>
            <div className=' text-sm'>1,239 Shares left. 10 owners</div>
            {/* <div className='flex items-center gap-4'>
              <Button
                variant='outline'
                leftIcon={FaRegBookmark}
                className='py-2 px-5 bg-transparent text-navy border-navy'
              >
                Share
              </Button>
              <Button
                variant='outline'
                leftIcon={CiShare2}
                className='py-2 px-5 bg-transparent text-navy border-navy'
              >
                Share
              </Button>
            </div> */}
            <Button
              variant='ghost'
              className='max-w-[258px] py-4 w-full bg-navy text-white border-navy'
            >
              Buy Property
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
