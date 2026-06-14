import { useRef } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';

import useDisclosure from '@/hooks/useDisclosure';
import useOnClickOutside from '@/hooks/useOnClickOutside';

import IconButton from './buttons/IconButton';

type Props = {
  caption: string;
};

export default function Tooltip({ caption }: Props) {
  const tooltip = useDisclosure();
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, tooltip.close);

  return (
    <div ref={ref} className='relative'>
      <IconButton
        variant='ghost'
        icon={RiErrorWarningLine}
        onClick={tooltip.open}
        onMouseEnter={tooltip.open}
        onMouseLeave={tooltip.close}
        classNames={{ icon: 'text-base' }}
      />

      {tooltip.isOpen && (
        <span className='absolute leading-[15px] -left-[150px] md:left-0 -top-10 text-[10px] font-normal font-inter z-[5] bg-medium-grey p-2 rounded-[8px] w-[300px]'>
          {caption}
        </span>
      )}
    </div>
  );
}
