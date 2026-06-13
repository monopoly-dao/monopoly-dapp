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
      <LoadingSkeleton
        containerClassName={cn('w-full h-full', [
          isImageFetching ? 'block' : 'hidden',
        ])}
      />
      <Image
        src={src}
        alt={alt}
        width={200}
        height={200}
        quality={80}
        sizes='(min-width: 1024px) 33vw, 100vw'
        className={cn('w-full h-full object-cover', [
          isImageFetching ? 'hidden' : 'block',
        ])}
        onLoad={() => {
          setIsImageFetching(false);
        }}
      />
    </>
  );
}
