'use client';

import { PropsWithChildren } from 'react';

import Navbar from '../../components/Navbar';

export default function GroupedLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />

      {children}
    </div>
  );
}
