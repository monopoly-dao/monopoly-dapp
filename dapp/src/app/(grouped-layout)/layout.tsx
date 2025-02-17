'use client';

import { PropsWithChildren } from 'react';

import Footer from './_components/Footer';
import Navbar from '../../components/Navbar';

export default function GroupedLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
