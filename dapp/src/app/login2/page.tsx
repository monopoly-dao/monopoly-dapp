'use client';

import ArchitecturalShowcase from './_components/ArchitecturalShowcase';
import AuthenticationArea from './_components/AuthenticationArea';

export default function Page() {
  return (
    <>
      <div className='flex md:h-screen flex-col md:flex-row'>
        <ArchitecturalShowcase />
        <AuthenticationArea />
      </div>
      {/* Visual Polish: Subtle Background Gradients */}
      <div className='fixed inset-0 pointer-events-none -z-10 overflow-hidden'>
        <div className='absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-surface-container rounded-full blur-[120px] opacity-30'></div>
        <div className='absolute -bottom-[10%] -right-[10%] w-[30%] h-[30%] bg-secondary-fixed rounded-full blur-[120px] opacity-20'></div>
      </div>
    </>
  );
}
