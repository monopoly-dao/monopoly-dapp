'use client';

import { useCallback, useState } from 'react';

export default function useDisclosure(props?: {
  onOpen?(): void;
  onClose?(): void;
  default?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(Boolean(props?.default));

  const handleOpen = useCallback(async () => {
    if (props && props.onOpen) {
      await props.onOpen();
    }

    setIsOpen(true);
  }, [props]);

  const handleClose = useCallback(async () => {
    if (props && props.onClose) {
      await props.onClose();
    }
    setIsOpen(false);
  }, [props]);

  const toggle = useCallback(async () => {
    setIsOpen((old) => !old);
  }, []);

  return Object.freeze({
    isOpen,
    open: handleOpen,
    close: handleClose,
    toggle,
  });
}
