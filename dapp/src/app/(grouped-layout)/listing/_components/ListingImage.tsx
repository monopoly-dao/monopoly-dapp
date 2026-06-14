'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import LoadingSkeleton from '@/components/LoadingSkeleton';

type Props = {
  src: string;
  alt: string;
};

export default function ListingImage({ src, alt }: Props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const showSkeleton = !isImageLoaded && !!src;

  return (
    <>
      {showSkeleton && (
        <LoadingSkeleton containerClassName={cn('w-full h-full')} />
      )}
      {src && (
        <img
          src={src}
          alt={alt}
          className={cn('w-full h-full object-cover', [
            showSkeleton ? 'hidden' : 'block',
          ])}
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)}
        />
      )}
    </>
  );
}
