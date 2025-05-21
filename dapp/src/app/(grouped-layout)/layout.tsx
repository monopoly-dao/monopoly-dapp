'use client';

import { PropsWithChildren } from 'react';

import Footer from './_components/Footer';
import Navbar from '../../components/Navbar';

export default function GroupedLayout({ children }: PropsWithChildren) {
  return (
    <div className='w-full max-w-[1540px] mx-auto'>
      <Navbar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
