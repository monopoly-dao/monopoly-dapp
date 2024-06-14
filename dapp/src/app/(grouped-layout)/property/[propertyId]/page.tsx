'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import {
  useGetPropertyQuery,
  useGetWishlistQuery,
} from '../../../../api/properties';
import WishlistButton from '../../../../components/WishlistButton';

export default function Page() {
  const { propertyId } = useParams();

  const session = useSession();
  const userId = session.data?.id;

  const { data } = useGetPropertyQuery(propertyId as string);
  const property = data;

  const { data: wishlistResponse } = useGetWishlistQuery(userId ?? '');
  const wishlist = wishlistResponse?.data?.wishlist;
  const wishlistPropertyIds = wishlist?.map((item) => item._id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const numberOfPhotos = property?.propertyDetails.photos.length ?? 0;

  function switchPhoto(photoIndex: number) {
    setCurrentImageIndex(photoIndex);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentImageIndex + 1;
      if (nextIndex > numberOfPhotos - 1) nextIndex = 0;
      setCurrentImageIndex(nextIndex);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex, numberOfPhotos]);

  const propertyDetails = property?.propertyDetails;

  return (
    <div className='px-[7%] py-10'>
      <div className='w-full'>
        {propertyDetails && (
          <Image
            src={propertyDetails?.photos[currentImageIndex].url}
            alt={propertyDetails?.name}
            width={800}
            height={500}
            className='w-full h-[500px] object-contain rounded-[12px] border border-gray-300'
          />
        )}
      </div>
      <div className='my-5 flex items-center gap-4'>
        {propertyDetails &&
          propertyDetails.photos.map((photo, index) => (
            <Image
              key={photo.url}
              src={photo.url}
              alt={propertyDetails.name}
              width={50}
              height={50}
              onClick={() => switchPhoto(index)}
              className={`w-[50px] h-[50px] object-cover cursor-pointer rounded-[12px] border ${
                currentImageIndex === index ? 'border-black' : 'border-gray-300'
              }`}
            />
          ))}
      </div>
      <div className='flex items-start justify-between gap-5'>
        <div className=''>
          <h1>{propertyDetails?.name}</h1>
          <p>{propertyDetails?.description}</p>
        </div>
        {property && (
          <WishlistButton
            propertyId={property._id}
            propertyName={propertyDetails?.name ?? ''}
            isFavourite={wishlistPropertyIds?.includes(property._id) ?? false}
            size='large'
          />
        )}
      </div>
    </div>
  );
}
