'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaUmbrellaBeach } from 'react-icons/fa6';
import { MdPool } from 'react-icons/md';

import useDisclosure from '@/hooks/useDisclosure';

import Button from '@/components/buttons/Button';
import LoadingText from '@/components/LoadingText';
import Tooltip from '@/components/Tooltip';

import { useGetPropertyQuery } from '@/api/properties';
import authenticatedFuncWrapper from '@/utils/authenticatedFuncWrapper';
import { handleErrors } from '@/utils/error';
import { formatAmount } from '@/utils/utils';

import BuyPropertyModal from '../_components/BuyPropertyModal';
import ListingImage from '../_components/ListingImage';
import YouMightAlsoLike from '../_components/YouMightAlsoLike';

export default function Page() {
  const { propertyId } = useParams();
  const {
    data: property,
    error,
    isLoading,
  } = useGetPropertyQuery(propertyId as string);

  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';
  const { isOpen: isBuyOpen, open: openBuy, close: closeBuy } = useDisclosure();

  if (error) handleErrors(error);

  return (
    <div>
      <div className='mt-8 sm:mb-32 px-[5%] sm:px-[7%]'>
        <Link href='/listings' className='text-sm font-n-montreal'>
          Back to search results
        </Link>
        <div className='grid mt-8 grid-cols-3 grid-rows-3 gap-4 h-[500px] sm:h-[800px]'>
          <div className='col-span-3 row-span-2'>
            <ListingImage
              src={property?.propertyDetails.photos[0].url ?? ''}
              alt={property?.propertyDetails.name ?? ''}
            />
          </div>
          <div className='col-span-1 row-span-1'>
            <ListingImage
              src={property?.propertyDetails.photos[1].url ?? ''}
              alt={property?.propertyDetails.name ?? ''}
            />
          </div>
          <div className='col-span-1 row-span-1'>
            <ListingImage
              src={property?.propertyDetails.photos[2].url ?? ''}
              alt={property?.propertyDetails.name ?? ''}
            />
          </div>
          <div className='col-span-1 row-span-1'>
            <ListingImage
              src={property?.propertyDetails.photos[3].url ?? ''}
              alt={property?.propertyDetails.name ?? ''}
            />
          </div>
        </div>

        <div className='mt-12 mb-16 flex flex-col-reverse sm:flex-row w-full justify-between gap-5'>
          <div className='w-full sm:w-3/5 flex flex-col gap-7'>
            <div>
              <p className='text-3xl font-medium'>
                <LoadingText
                  isLoading={isLoading}
                  value={property?.propertyDetails.name}
                />
              </p>
              <div className='flex items-center gap-4 mt-2 text-navy'>
                <div className='flex items-center gap-1'>
                  <p>
                    <LoadingText
                      isLoading={isLoading}
                      className='w-10'
                      value={property?.propertyDetails.bed}
                    />{' '}
                    Beds
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  <p>
                    <LoadingText
                      isLoading={isLoading}
                      className='w-10'
                      value={property?.propertyDetails.bath}
                    />{' '}
                    Baths
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  <p>
                    <LoadingText
                      isLoading={isLoading}
                      className='w-10'
                      value={formatAmount(property?.propertyDetails.squareFt)}
                    />{' '}
                    sqft
                  </p>
                </div>
              </div>
              <p className='mt-7 w-4/5'>
                <LoadingText
                  isLoading={isLoading}
                  className='w-full h-[80px]'
                  value={property?.propertyDetails.description}
                />
              </p>
            </div>
            <div className='h-[1px] w-full bg-medium-grey' />
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-xl'>Asset Symbol</p>
              <p className='font-medium text-[green]/60'>
                $
                <LoadingText
                  isLoading={isLoading}
                  className='w-10'
                  value={property?.propertyDetails.symbol}
                />
              </p>
            </div>
            <div className='h-[1px] w-full bg-medium-grey' />
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-xl flex items-center gap-2'>
                Property Title Deed
                <Tooltip caption='Click on View Title Deed to generate and download the deed document for this property.' />
              </p>
              <Link
                className='underline w-fit'
                href={`/deed/${property?._id}`}
                target='_blank'
              >
                View Title Deed
              </Link>
            </div>
            <div className='h-[1px] w-full bg-medium-grey' />
            <div className='flex flex-col gap-4'>
              <p className='font-medium text-xl flex items-center gap-2'>
                Contract Address
                <Tooltip caption='You can follow the link to view this property on the basescan blockchain explorer.' />
              </p>
              <Link
                href={`https://basescan.org/address/${property?.contractAddress}`}
                target='_blank'
                className='text-[blue] underline break-words'
              >
                <LoadingText
                  isLoading={isLoading}
                  className='w-10'
                  value={property?.contractAddress}
                />
              </Link>
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
            <p className='text-3xl '>$1</p>
            <div className=' text-sm'>
              {formatAmount(property?.propertyDetails.unitsLeft)} Units left.{' '}
              <LoadingText
                isLoading={isLoading}
                className='w-10'
                value={property?.propertyDetails.owners.length}
              />{' '}
              owners
            </div>
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
              onClick={() => {
                authenticatedFuncWrapper(openBuy, session.status);
              }}
              className='max-w-[258px] py-4 w-full bg-navy text-white border-navy'
            >
              Buy Property
            </Button>
          </div>
        </div>

        <YouMightAlsoLike />
      </div>

      <BuyPropertyModal
        isOpen={isBuyOpen}
        handleOpenModal={openBuy}
        handleCloseModal={closeBuy}
        propertyId={propertyId as string}
        userFirebaseId={userFirebaseId}
      />
    </div>
  );
}
