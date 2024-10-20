'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import LoadingSkeleton from '@/components/LoadingSkeleton';

type Props = {
  src: string;
  alt: string;
};

export default function ListingImage({ src, alt }: Props) {
  const [isImageFetching, setIsImageFetching] = useState(true);

  return (
    <>
      {isImageFetching && (
        <LoadingSkeleton containerClassName={cn('w-full h-full')} />
      )}
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        quality={100}
        className={cn('w-full h-full object-cover', [
          isImageFetching ? 'hidden' : 'block',
        ])}
        unoptimized
        onLoad={() => {
          setIsImageFetching(false);
        }}
      />
    </>
  );
}
