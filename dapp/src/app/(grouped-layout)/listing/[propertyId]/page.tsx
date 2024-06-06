import Image from 'next/image';
import { CiShare2 } from 'react-icons/ci';
import { FaRegBookmark } from 'react-icons/fa';

import Button from '@/components/buttons/Button';

import ListingHeader from '../_components/ListingHeader';

export default function Page() {
  return (
    <div>
      <ListingHeader />
      <div className='mt-16 mb-16 sm:mb-32 px-[5%]'>
        <div className='grid grid-cols-2 lg:grid-cols-4 grid-rows-4 lg:grid-rows-2 gap-4 h-[500px] sm:h-[800px] lg:h-auto'>
          <div className='col-span-2 row-span-2'>
            <Image
              src='/images/apartment buildings.jpg'
              alt='apartment'
              width={200}
              height={200}
              quality={100}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='col-span-1 row-span-1'>
            <Image
              src='/images/Monaco.png'
              alt='apartment'
              width={200}
              height={200}
              quality={100}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='col-span-1 row-span-1'>
            <Image
              src='/svg/Beachfront property.svg'
              alt='apartment'
              width={200}
              height={200}
              quality={100}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='col-span-1 row-span-1'>
            <Image
              src='/svg/Featured image.svg'
              alt='apartment'
              width={200}
              height={200}
              quality={100}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='col-span-1 row-span-1'>
            <Image
              src='/images/school dorm.jpg'
              alt='apartment'
              width={200}
              height={200}
              quality={100}
              className='w-full h-full object-cover'
            />
          </div>
        </div>

        <div className='mt-12 flex flex-col-reverse sm:flex-row w-full justify-between gap-5'>
          <div className='w-full sm:w-3/5 flex flex-col gap-5'>
            <div>
              <p className='text-xl'>Overview</p>
              <p className='my-4'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
                corrupti autem dolorum, veniam aliquam quas at exercitationem
                culpa dolore non id assumenda hic quisquam. Tenetur quidem quod
                blanditiis mollitia repellendus.
              </p>
              <ul className='list-disc ml-10'>
                <li>3 Bedrooms</li>
                <li>3 Bathrooms</li>
              </ul>
            </div>
            <div className='h-[1px] w-full bg-medium-grey' />
            <div className='flex flex-col gap-4'>
              <p className='font-inter font-semibold text-lg'>Asset Symbol</p>
              <p className='font-inter'>$SFC1</p>
            </div>
            <div className='h-[1px] w-full bg-medium-grey' />
            <div className='flex flex-col gap-4'>
              <p className='font-inter font-semibold text-lg'>Deed URL </p>
              <p className='font-inter'>
                https://dribbble.com/shots/22790290-Teraluxe-Homepage-Web-App-SaaS-Dashboard-Real-Estate
              </p>
            </div>
            <div className='h-[1px] w-full bg-medium-grey' />
            <div className='flex flex-col gap-4'>
              <p className='font-inter font-semibold text-lg'>
                Contract Address
              </p>
              <p className='font-inter break-words'>
                0xBd0124f0751C8E6FE3962e95160d5d23Ba12c8B5
              </p>
            </div>
          </div>
          <div className='flex flex-col gap-6 w-full sm:w-2/5 lg:w-1/4'>
            <p className='text-3xl font-inter'>$55</p>
            <div className='font-inter text-sm'>
              1,239 Shares left • 10 owners
            </div>
            <div className='flex items-center gap-4'>
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
            </div>
            <Button
              variant='ghost'
              className='max-w-[400px] w-full bg-navy text-white border-navy'
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
