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
  const property = data?.propertyDetails;

  const { data: wishlistResponse } = useGetWishlistQuery(userId ?? '');
  const wishlist = wishlistResponse?.data?.wishlist;
  const wishlistPropertyIds = wishlist?.map((item) => item._id);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const numberOfPhotos = property?.photos.length ?? 0;

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

  return (
    <div className='px-[7%] py-10'>
      <div className='w-full'>
        {property && (
          <Image
            src={property.photos[currentImageIndex].url}
            alt={property.name}
            width={800}
            height={500}
            className='w-full h-[500px] object-contain rounded-[12px] border border-gray-300'
          />
        )}
      </div>
      <div className='my-5 flex items-center gap-4'>
        {property &&
          property.photos.map((photo, index) => (
            <Image
              key={photo.url}
              src={photo.url}
              alt={property.name}
              width={50}
              height={50}
              onClick={() => switchPhoto(index)}
              className={`w-[50px] h-[50px] object-contain cursor-pointer rounded-[12px] border ${
                currentImageIndex === index ? 'border-black' : 'border-gray-300'
              }`}
            />
          ))}
      </div>
      <div className='flex items-start justify-between gap-5'>
        <div className=''>
          <h1>{property?.name}</h1>
          <p>{property?.description}</p>
        </div>
        {property && (
          <WishlistButton
            propertyId={property.id}
            propertyName={property.name}
            isFavourite={wishlistPropertyIds?.includes(property.id) ?? false}
            size='large'
          />
        )}
      </div>
    </div>
  );
}
