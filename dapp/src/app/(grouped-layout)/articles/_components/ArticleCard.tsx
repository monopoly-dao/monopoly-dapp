'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface ArticleCardProps {
  id: string;
  title: string;
  dateCreated: Date | string;
  coverImage?: string;
  href?: string;
  children?: ReactNode;
}

export default function ArticleCard({
  id,
  title,
  dateCreated,
  coverImage,
  href = `/articles/${id}`,
  children,
}: ArticleCardProps) {
  const formattedDate = new Date(dateCreated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const cardContent = (
    <div className='w-full h-[320px] rounded-lg border border-gray-300 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300'>
      {/* Background Image */}
      {coverImage && (
        <div className='relative w-full h-[60%] bg-gray-200'>
          <Image
            src={coverImage}
            alt={title}
            fill
            quality={100}
            loading='lazy'
            className='object-cover'
          />
        </div>
      )}

      {/* Content Section */}
      <div className='flex flex-col gap-3 p-4 h-[40%]'>
        {/* Title */}
        <h3 className='font-bold text-lg line-clamp-2 text-gray-900'>
          {title}
        </h3>

        {/* Date Created */}
        <time className='text-xs text-gray-600'>{formattedDate}</time>

        {/* Optional Children */}
        {children && <div className='text-sm text-gray-700'>{children}</div>}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className='block'>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
