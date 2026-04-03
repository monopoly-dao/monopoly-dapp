'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export interface ArticleCardProps {
  slug: string;
  title: string;
  dateCreated: Date | string;
  coverImage?: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  href?: string;
  children?: ReactNode;
}

export default function ArticleCard({
  slug,
  title,
  dateCreated,
  coverImage,
  excerpt,
  author,
  tags,
  href = `/articles/${slug}`,
  children,
}: ArticleCardProps) {
  const formattedDate = new Date(dateCreated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  // Generate excerpt from content if not provided
  const displayExcerpt = excerpt || (children as string) || '';

  const cardContent = (
    <article
      className='w-full h-[320px] rounded-lg border border-gray-300 bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300'
      itemScope
      itemType='https://schema.org/Article'
    >
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
            itemProp='image'
          />
        </div>
      )}

      {/* Content Section */}
      <div className='flex flex-col gap-3 p-4 h-[40%] overflow-hidden'>
        {/* Title */}
        <h3
          className='font-bold text-lg line-clamp-2 text-gray-900'
          itemProp='headline'
        >
          {title}
        </h3>

        {/* Excerpt */}
        {displayExcerpt && (
          <p className='text-sm text-gray-600 line-clamp-2'>{displayExcerpt}</p>
        )}

        {/* Author and Date */}
        <div className='flex items-center gap-2 mt-auto'>
          <time
            className='text-xs text-gray-500'
            dateTime={new Date(dateCreated).toISOString()}
            itemProp='datePublished'
          >
            {formattedDate}
          </time>
          {author && (
            <>
              <span className='text-gray-300'>•</span>
              <span
                className='text-xs text-gray-600'
                itemProp='author'
                itemScope
                itemType='https://schema.org/Person'
              >
                <span itemProp='name'>{author}</span>
              </span>
            </>
          )}
        </div>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className='flex flex-wrap gap-1 mt-1'>
            {tags.slice(0, 2).map((tag, index) => (
              <Link
                key={index}
                href={`/tags/${encodeURIComponent(
                  tag.toLowerCase().replace(/\s+/g, '-')
                )}`}
                className='text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded hover:bg-gray-200 transition-colors'
                onClick={(e) => e.stopPropagation()}
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </article>
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
