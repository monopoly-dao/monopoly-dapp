'use client';

import { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// import './carousel.css';
import '../campaign/_components/carousel.css';

import IconButton from '@/components/buttons/IconButton';
import LoadingSkeleton from '@/components/LoadingSkeleton';

import { useGetPropertiesQuery } from '@/api/properties';

import InvestmentPropertyCard from '../campaign/_components/InvestmentPropertyCard';

export default function InvestmentVision() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const { data: propertiesResponse, isLoading } = useGetPropertiesQuery({
    limit: 10,
    page: 1,
  });

  const properties = propertiesResponse?.data;

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const options = {
      root: container,
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        // Check if it's the first element
        if (entry.target === container.firstElementChild) {
          setIsLeftVisible(entry.isIntersecting);
        }
        // Check if it's the last element
        if (entry.target === container.lastElementChild) {
          setIsRightVisible(entry.isIntersecting);
        }
      });
    }, options);

    // Observe first and last elements
    if (container.firstElementChild) {
      observer.observe(container.firstElementChild);
    }
    if (container.lastElementChild) {
      observer.observe(container.lastElementChild);
    }

    return () => observer.disconnect();
  }, [properties]);

  return (
    <div className='py-20'>
      <div className='flex pb-8 flex-col items-center justify-center gap-[10px] bg-white mx-auto w-[90%] md:w-2/3 lg:w-1/2 xl:w-2/5 text-center'>
        <p className='font-rmerriweather text-3xl text-[#0D0D0D] lg:text-4xl'>
          With Settley, you can own a property in minutes
        </p>
        <p className='font-merriweather font-light text-[#0D0D0D]'>
          Settley simplifies real world propery transactions using automated
          title management.
          {/* and trustless blockchain powered services. */}
        </p>
      </div>

      <div className='relative'>
        <div
          ref={containerRef}
          className='mt-12 flex items-center gap-5 overflow-x-auto'
        >
          {isLoading &&
            Array(5)
              .fill('')
              .map((_, id) => (
                <LoadingSkeleton
                  key={id}
                  containerClassName='w-[350px] h-[400px]'
                />
              ))}
          {properties?.map((property) => (
            <InvestmentPropertyCard key={property._id} property={property} />
          ))}
        </div>

        <div className='flex justify-end items-center gap-3 mt-12 text-2xl pr-8 lg:pr-16'>
          <IconButton
            variant='ghost'
            disabled={isLeftVisible}
            icon={FaArrowLeft}
            className='disabled:!text-gray-300'
            classNames={{ icon: 'disabled:!text-gray-300' }}
            onClick={() =>
              containerRef.current?.scrollBy({
                left: -400,
                behavior: 'smooth',
              })
            }
          />

          <div className='w-[1px] h-[15px] bg-[#F3F2F3]' />

          <IconButton
            variant='ghost'
            disabled={isRightVisible}
            icon={FaArrowRight}
            className='disabled:!text-gray-300'
            classNames={{ icon: 'disabled:!text-gray-300' }}
            onClick={() =>
              containerRef.current?.scrollBy({
                left: 400,
                behavior: 'smooth',
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
