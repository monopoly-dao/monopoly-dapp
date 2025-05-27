import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { TbBath, TbBed } from 'react-icons/tb';
import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';

import { Property } from '@/api/properties/propertiesApiTypes';
import { formatAmount } from '@/utils/utils';

type Props = {
  property: Property;
  width?: 'fixed' | 'variable';
  link?: boolean;
};

export default function InvestmentPropertyCard({
  property,
  link,
  width = 'fixed',
}: Props) {
  const router = useRouter();

  function handleRouting() {
    if (!link) return;
    router.push(`/listing/${property._id}`);
  }

  return (
    <div
      className={cn(
        'h-[480px] rounded-[20px] border p-[10px] border-[#00000033] md:h-[543px]',
        [
          width === 'variable' && 'w-full',
          width === 'fixed' && 'w-[320px] md:w-[420px]',
          link &&
            'cursor-pointer hover:shadow-lg transition-shadow duration-300',
        ]
      )}
    >
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=''
        containerClass='container-with-dots w-full h-[60%] rounded-[20px]'
        dotListClass=''
        draggable
        focusOnSelect={false}
        infinite
        itemClass=''
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=''
        slidesToSlide={1}
        swipeable
      >
        {property.propertyDetails.photos.map((photo) => (
          <Image
            key={photo.url}
            src={photo.url}
            alt={property.propertyDetails.name || ''}
            width={320}
            height={400}
            className='w-full h-[258px] md:h-[296px] object-cover rounded-[20px]'
            priority
          />
        ))}
      </Carousel>

      <div className='flex flex-col gap-[10px] justify-between h-[35%] mt-4'>
        <div className='flex flex-col gap-[5px]'>
          <p className='font-roboto text-xs text-[#1F1B20]'>
            Added on 06/12/2024 by Rothmore Property
          </p>
          <p className='font-roboto font-medium text-[26px] truncate'>
            {property.propertyDetails.name}
          </p>
          <div className='flex items-center gap-5 text-[#000000B2]'>
            <div className='flex items-center gap-[5px]'>
              <TbBed className='text-2xl' />
              <p className='font-roboto text-sm'>
                {property.propertyDetails.bed}
              </p>
            </div>
            <div className='flex items-center gap-[5px]'>
              <TbBath className='text-2xl' />
              <p className='font-roboto text-sm'>
                {property.propertyDetails.bath}
              </p>
            </div>
            <p className='font-roboto text-sm'>
              {formatAmount(property.propertyDetails.squareFt)} sqft
            </p>
          </div>
        </div>

        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-[5px]'>
            <p className='font-roboto text-[10px] text-[#1F1B20B2]'>Per unit</p>
            <p className='font-roboto font-medium text-lg'>$1</p>
          </div>
          <div className='flex flex-col gap-[5px]'>
            <p className='font-roboto text-[10px] text-[#1F1B20B2]'>Price</p>
            <p className='font-roboto font-medium text-lg'>
              ${formatAmount(property.propertyDetails.units)}
            </p>
          </div>
        </div>

        <Button className='rounded-[20px]' onClick={handleRouting}>
          Buy Now
        </Button>
      </div>
    </div>
  );
}
