import React from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/buttons/Button';

type ActionButton = { text?: string; onClick: () => void };

const ModalActionButton = ({
  actions: { primary, secondary },
  fullWidth,
}: {
  actions: {
    secondary?: ActionButton;
    primary?: ActionButton;
  };
  fullWidth?: boolean;
}) => (
  <div className='!mt-8 flex flex-col-reverse gap-4 md:flex-row md:justify-end'>
    {secondary ? (
      <Button
        variant='ghost'
        className={cn('px-8 py-3 font-medium', { 'w-full': fullWidth })}
        onClick={secondary.onClick}
      >
        {secondary.text || 'Back'}
      </Button>
    ) : null}
    {primary ? (
      <Button
        className={cn('px-8 py-3', { 'w-full': fullWidth })}
        onClick={primary.onClick}
      >
        {primary.text || 'Proceed'}
      </Button>
    ) : null}
  </div>
);

export default ModalActionButton;
