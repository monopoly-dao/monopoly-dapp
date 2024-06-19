import Image from 'next/image';
import React from 'react';

import ModalActionButton from '@/components/modal/modal-action-button';

type ActionButton = { text?: string; onClick: () => void };

const ModalContent = ({
  title,
  type,
  message,
  actions,
  imageSrc,
}: {
  type: 'success' | 'fail';
  title: string;
  imageSrc?: string;
  message: string | React.ReactNode;
  actions: {
    secondary?: ActionButton;
    primary?: ActionButton;
  };
}) => {
  const IMAGE_MAPPER: Record<typeof type, string> = {
    success: '/images/success-tick.png',
    fail: '/images/fail-tick.png',
  };

  return (
    <div className='space-y-8'>
      <div className='flex flex-col items-center gap-6'>
        <Image
          src={imageSrc || IMAGE_MAPPER[type]}
          alt='Tick Image'
          width={90}
          height={90}
        />
        <div className='space-y-3 text-center text-sm'>
          <h3 className='font-medium '>{title}</h3>
          {typeof message === 'string' ? <p>{message}</p> : message}
        </div>
      </div>
      <ModalActionButton actions={actions} fullWidth />
    </div>
  );
};

export default ModalContent;
