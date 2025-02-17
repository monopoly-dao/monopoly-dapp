'use client';

import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

function useOnClickOutside(
  ref: React.RefObject<HTMLElement> | React.ForwardedRef<HTMLTableCellElement>,
  handler: (event: Event) => void
) {
  useIsomorphicLayoutEffect(() => {
    const handleEvent = (event: Event) => {
      if (
        event.type === 'mousedown' &&
        ref &&
        typeof ref !== 'function' &&
        ref.current &&
        !ref.current.contains(event.target as HTMLElement)
      ) {
        handler(event);
      } else if (
        event.type === 'keydown' &&
        event instanceof KeyboardEvent &&
        event.key === 'Escape'
      ) {
        handler(event);
      } else if (
        (event.type === 'focusin' || event.type === 'focus') &&
        ref &&
        typeof ref !== 'function' &&
        ref.current &&
        !ref.current.contains(event.target as HTMLElement)
      ) {
        handler(event);
      }
    };
    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('touchstart', handleEvent);
    document.addEventListener('keydown', handleEvent);
    document.addEventListener('focusin', handleEvent);
    return () => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('touchstart', handleEvent);
      document.removeEventListener('keydown', handleEvent);
      document.removeEventListener('focusin', handleEvent);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
