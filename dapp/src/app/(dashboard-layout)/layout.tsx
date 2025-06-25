import { PropsWithChildren } from 'react';

import MobileSidebar from './_components/MobileSidebar';
import Sidebar from './_components/Sidebar';

// import MobileNavigation from '@/app/(authenticated-layout)/_components/mobile-nav/MobileNavigation';

export default async function AuthenticatedLayout({
  children,
}: PropsWithChildren) {
  return (
    <section>
      <div className='h-[100dvh] md:h-screen w-full'>
        <div className='grid h-full w-full md:grid-cols-[auto_1fr] md:grid-rows-1'>
          <div className='hidden md:block'>
            <Sidebar />
          </div>

          <main className='col-span-1 relative col-start-2 grid h-full w-full grid-cols-1 grid-rows-[auto_1fr] overflow-hidden bg-white'>
            <div className='flex justify-end md:hidden absolute top-6 right-[5%]'>
              <MobileSidebar />
            </div>

            <div className='min-h-[100dvh] md:min-h-0 h-full md:h-screen px-[5%] lg:px-10 xl:px-20 py-6 w-full overflow-hidden bg-navy/5'>
              {children}
            </div>

            {/* <MobileNavigation /> */}
          </main>
        </div>
      </div>
    </section>
  );
}
