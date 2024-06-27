'use client';

import Link, { LinkProps } from 'next/link';
import { useRef } from 'react';

import { cn } from '@/lib/utils';
import useCheckLinkActive from '@/hooks/useCheckLinkActive';

/**
 * checks if the current path is active
 * @returns a boolean value
 */

type ActiveLinkProps = LinkProps &
  React.PropsWithChildren<{
    activeClassName?: string;
    inActiveClassName?: string;
    as?: string;
    className?: string;
    index?: boolean;
  }>;

/**
 * @param param0 Link Component that can tell if it's target is active
 * @returns A React component that can tell if it's target is active
 */
const ActiveLink: React.FC<ActiveLinkProps> = ({
  href,
  children,
  as,
  activeClassName,
  className,
  index,
  inActiveClassName,
  ...rest
}) => {
  const isActive = useCheckLinkActive(href.toString(), as, index);
  const linkRef = useRef<HTMLAnchorElement | null>(null);

  return (
    <Link
      href={href}
      ref={linkRef}
      className={cn(
        [className && className],
        [isActive && activeClassName && activeClassName],
        [inActiveClassName && inActiveClassName]
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
