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

import { useGetWalletStatsQuery } from '@/api/profile';
import { useGetPropertyQuery } from '@/api/properties';
import authenticatedFuncWrapper from '@/utils/authenticatedFuncWrapper';
import { handleErrors } from '@/utils/error';
import { formatAmount } from '@/utils/utils';

import BuyPropertyModal from '../_components/BuyPropertyModal';
import ListingImage from '../_components/ListingImage';
import YouMightAlsoLike from '../_components/YouMightAlsoLike';
import { Property } from '@/api/properties/propertiesApiTypes';

export default function PropertyDetailClient({
  initialData,
}: {
  initialData?: Property;
}) {
  const { propertyId } = useParams();
  const {
    data: property,
    error,
    isLoading,
  } = useGetPropertyQuery(propertyId as string, {
    // initialData: initialData
  });

  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';
  const { isOpen: isBuyOpen, open: openBuy, close: closeBuy } = useDisclosure();

  const { data: walletStatsResponse } = useGetWalletStatsQuery(userFirebaseId);
  const walletStats = walletStatsResponse?.data;
  const balance = walletStats?.walletBalance ?? 0;

  if (error) handleErrors(error);

  const displayProperty = property || initialData;

  return (
    <div>
      <div className='mt-8 sm:mb-32 px-[5%] sm:px-[7%] font-inter'>
        <Link
          href='/listings'
          className='text-sm font-inter hover:text-navy transition-colors'
        >
          Back to search results
        </Link>
        <div className='grid mt-8 grid-cols-3 grid-rows-3 gap-4 h-[500px] sm:h-[800px]'>
          <div className='col-span-3 row-span-2 rounded-2xl overflow-hidden'>
            <ListingImage
              src={displayProperty?.propertyDetails.photos[0].url ?? ''}
              alt={displayProperty?.propertyDetails.name ?? ''}
            />
          </div>
          <div className='col-span-1 row-span-1 rounded-2xl overflow-hidden'>
            <ListingImage
              src={displayProperty?.propertyDetails.photos[1].url ?? ''}
              alt={displayProperty?.propertyDetails.name ?? ''}
            />
          </div>
          <div className='col-span-1 row-span-1 rounded-2xl overflow-hidden'>
            <ListingImage
              src={displayProperty?.propertyDetails.photos[2].url ?? ''}
              alt={displayProperty?.propertyDetails.name ?? ''}
            />
          </div>
          <div className='col-span-1 row-span-1 rounded-2xl overflow-hidden'>
            <ListingImage
              src={displayProperty?.propertyDetails.photos[3].url ?? ''}
              alt={displayProperty?.propertyDetails.name ?? ''}
            />
          </div>
        </div>

        <div className='mt-12 mb-16 flex flex-col-reverse sm:flex-row w-full justify-between gap-5'>
          <div className='w-full sm:w-3/5 flex flex-col gap-7'>
            <div>
              <LoadingText
                isLoading={isLoading && !displayProperty}
                className='text-4xl font-playfair font-bold text-navy'
                value={displayProperty?.propertyDetails.name}
              />
              <div className='flex items-center gap-4 mt-2 text-navy/60 font-medium'>
                <div className='flex items-center gap-1'>
                  <p>
                    <LoadingText
                      isLoading={isLoading && !displayProperty}
                      className='w-10'
                      value={displayProperty?.propertyDetails.bed}
                    />{' '}
                    Beds
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  <p>
                    <LoadingText
                      isLoading={isLoading && !displayProperty}
                      className='w-10'
                      value={displayProperty?.propertyDetails.bath}
                    />{' '}
                    Baths
                  </p>
                </div>
                <div className='flex items-center gap-1'>
                  <p>
                    <LoadingText
                      isLoading={isLoading && !displayProperty}
                      className='w-10'
                      value={formatAmount(
                        displayProperty?.propertyDetails.squareFt
                      )}
                    />{' '}
                    sqft
                  </p>
                </div>
              </div>
              <p className='mt-7 w-4/5 text-settley-text leading-relaxed'>
                <LoadingText
                  isLoading={isLoading && !displayProperty}
                  className='w-full h-[80px]'
                  value={displayProperty?.propertyDetails.description}
                />
              </p>
            </div>
            <div className='h-[1px] w-full bg-navy/5' />
            <div className='flex flex-col gap-4'>
              <p className='font-bold text-xl text-navy'>Asset Symbol</p>
              <p className='font-bold text-2xl text-navy'>
                $
                <LoadingText
                  isLoading={isLoading && !displayProperty}
                  className='w-10'
                  value={displayProperty?.propertyDetails.symbol}
                />
              </p>
            </div>
            <div className='h-[1px] w-full bg-navy/5' />
            <div className='flex flex-col gap-4'>
              <p className='font-bold text-xl flex items-center gap-2 text-navy'>
                Property Title Deed
                <Tooltip caption='Click on View Title Deed to generate and download the deed document for this property.' />
              </p>
              <Link
                className='underline w-fit text-settley-text hover:text-navy transition-colors font-medium border-b border-settley-text'
                href={`/deed/${displayProperty?._id}`}
                target='_blank'
              >
                View Title Deed
              </Link>
            </div>
            <div className='h-[1px] w-full bg-navy/5' />
            <div className='flex flex-col gap-4'>
              <p className='font-bold text-xl flex items-center gap-2 text-navy'>
                Contract Address
                <Tooltip caption='You can follow the link to view this property on the basescan blockchain explorer.' />
              </p>
              <Link
                href={`https://basescan.org/address/${displayProperty?.contractAddress}`}
                target='_blank'
                className='text-navy underline break-words font-medium hover:text-navy transition-colors'
              >
                <LoadingText
                  isLoading={isLoading && !displayProperty}
                  className='w-10'
                  value={displayProperty?.contractAddress}
                />
              </Link>
            </div>
            <div className='h-[1px] w-full bg-navy/5' />
            <div className='flex flex-col gap-4'>
              <p className='font-bold text-xl text-navy'>Features</p>
              <div className='flex items-center gap-10 mt-2 text-lg text-settley-text font-medium'>
                <div className='flex items-center gap-2'>
                  <MdPool className='text-navy' />
                  <p>Pool</p>
                </div>
                <div className='flex items-center gap-2'>
                  <MdPool className='text-navy' />
                  <p>Ocean view</p>
                </div>
                <div className='flex items-center gap-2'>
                  <FaUmbrellaBeach className='text-navy' />
                  <p>Deck</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-6 w-full sm:w-2/5 lg:w-1/4 bg-white p-8 rounded-2xl border border-settley-primary/5 shadow-sm h-fit'>
            <div className='flex flex-col gap-1'>
              <p className='text-4xl font-bold text-navy'>
                $1{' '}
                <span className='text-sm font-medium text-settley-text/60'>
                  / UNIT
                </span>
              </p>
              <div className='text-sm font-medium text-settley-text/60 bg-navy/5 py-1 px-3 rounded-full w-fit'>
                {formatAmount(displayProperty?.propertyDetails.unitsLeft)} Units
                left
              </div>
            </div>

            <div className='flex items-center gap-2 text-navy font-bold'>
              <LoadingText
                isLoading={isLoading && !displayProperty}
                className='w-10'
                value={displayProperty?.propertyDetails.owners.length}
              />{' '}
              owners participating
            </div>

            <Button
              variant='primary'
              onClick={() => {
                authenticatedFuncWrapper(openBuy, session.status);
              }}
              className='py-4 w-full text-lg shadow-lg shadow-settley-primary/20'
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
        propertyId={displayProperty?._id as string}
        userFirebaseId={userFirebaseId}
        balance={balance}
      />
    </div>
  );
}
