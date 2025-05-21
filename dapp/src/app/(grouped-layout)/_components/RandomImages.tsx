import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

interface Props {
  imageUrls: string[];
}

export default function RandomImages({ imageUrls }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    updateDimensions(); // Initial update

    window.addEventListener('resize', updateDimensions); // Update on window resize

    return () => {
      window.removeEventListener('resize', updateDimensions); // Clean up on unmount
    };
  }, []);

  const getRandomPosition = () => ({
    x: Math.random() * containerWidth,
    y: Math.random() * containerHeight,
  });

  const getRandomSize = () => 50 + Math.random() * 100; // Adjust min/max size as needed

  const getRandomOpacity = () => 0.3 + Math.random() * 0.7; // Adjust min/max opacity as needed

  const getRandomZIndex = () => Math.ceil(Math.random() * 10); // Z-index between 1 and 10

  return (
    <div
      ref={containerRef}
      className='w-full h-[500px] lg:h-[564px] xl:h-[464px] relative'
    >
      {containerWidth > 0 &&
        containerHeight > 0 && // Conditionally render images
        imageUrls.map((imageUrl, index) => {
          const position = getRandomPosition();
          const size = getRandomSize();
          const opacity = getRandomOpacity();
          const zIndex = getRandomZIndex();

          return (
            <Image
              key={index}
              src={imageUrl}
              alt=''
              width={size}
              height={size}
              style={{
                position: 'absolute',
                left: position.x - size / 2, // Center the image
                top: position.y - size / 2, // Center the image
                borderRadius: '50%',
                opacity: opacity,
                zIndex: zIndex,
                objectFit: 'cover', // Prevents image distortion
              }}
            />
          );
        })}
    </div>
  );
}
