'use client';

import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

// import './carousel.css';
import '../campaign/_components/carousel.css';

import IconButton from '@/components/buttons/IconButton';
import LoadingSkeleton from '@/components/LoadingSkeleton';

import { useGetPropertiesQuery } from '@/api/properties';
import LandingPropertyCard from './LandingPropertyCard';

export default function InvestmentVision() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(false);

  // We fetch a bit more to ensure we can scroll
  const { data: propertiesResponse, isLoading } = useGetPropertiesQuery({
    limit: 8,
    page: 1,
  });

  const properties = propertiesResponse?.data;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const updateVisibility = () => {
      setIsLeftVisible(container.scrollLeft <= 0);
      setIsRightVisible(
        Math.ceil(container.scrollLeft + container.clientWidth) >=
          container.scrollWidth
      );
    };

    container.addEventListener('scroll', updateVisibility);
    updateVisibility(); // Initial check

    return () => container.removeEventListener('scroll', updateVisibility);
  }, [properties]);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const scrollAmount = 370; // Card width + gap
    containerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className='py-20 lg:py-28'>
      <div className='max-w-7xl mx-auto px-4 lg:px-8'>
        {/* Header */}
        <div className='flex flex-col items-center text-center gap-4 mb-16 max-w-3xl mx-auto'>
          <h2 className='font-playfair text-4xl lg:text-5xl text-navy leading-tight font-medium text-navy'>
            With Settley, you can own a property in minutes
          </h2>
          <p className='font-inter text-lg text-settley-text/80'>
            Settley simplifies real world property transactions using automated
            title management.
          </p>
        </div>

        {/* Carousel Container */}
        <div className='relative'>
          <div
            ref={containerRef}
            className='flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory scroll-pl-4'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {isLoading &&
              Array(3)
                .fill('')
                .map((_, id) => (
                  <div
                    key={id}
                    className='w-[300px] md:w-[350px] shrink-0 h-[450px] bg-gray-100 rounded-2xl animate-pulse'
                  />
                ))}

            {properties?.map((property, idx) => (
              <div key={property._id} className='snap-start'>
                <LandingPropertyCard
                  property={property}
                  className='h-full'
                  badge={idx % 2 === 0 ? 'SELLING FAST' : 'COMING SOON'}
                  fundedPercentage={idx % 2 === 0 ? 65 : undefined}
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className='flex justify-end gap-3 mt-4'>
            <button
              onClick={() => scroll('left')}
              disabled={isLeftVisible}
              className='w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-white hover:text-navy hover:border-settley-primary transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gray-300'
            >
              <FaArrowLeft className='text-lg' />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={isRightVisible}
              className='w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-white hover:text-navy hover:border-settley-primary transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:border-gray-300'
            >
              <FaArrowRight className='text-lg' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
