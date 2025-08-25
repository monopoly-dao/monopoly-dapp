'use client';

import { LucideIcon, NotebookPen } from 'lucide-react';
import { IconType } from 'react-icons';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineCalendar } from 'react-icons/hi';
import { IoWalletOutline } from 'react-icons/io5';
import { RiHome6Fill } from 'react-icons/ri';

import { cn } from '@/lib/utils';
import useMediaQuery from '@/hooks/useMediaQuery';

import SettleyLogo from '@/components/SettleyLogo';

import SidebarLink from './SidebarLink';
export type SidebarLinksType = {
  id: number;
  icon: LucideIcon | IconType;
  title: string;
  href?: string | undefined;
  base?: string;
  sublinks?: SidebarLinksSublinkType[] | undefined;
  available: boolean;
};

export type SidebarLinksSublinkType = {
  title: string;
  href: string;
  id: string;
  index?: boolean;
};

const sideBarLinks: SidebarLinksType[] = [
  {
    id: 1,
    icon: RiHome6Fill,
    title: 'Dashboard',
    href: '/dashboard',
    available: true,
  },
  {
    id: 2,
    icon: IoWalletOutline,
    title: 'My Properties',
    href: '/my-properties',
    available: false,
  },
  {
    id: 3,
    icon: IoWalletOutline,
    title: 'Membership',
    href: '/membership',
    available: false,
  },
  {
    id: 4,
    icon: HiOutlineCalendar,
    title: 'Transactions',
    href: '/transactions',
    available: false,
  },
  {
    id: 5,
    icon: NotebookPen,
    title: 'Wishlist',
    href: '/wishlist',
    available: true,
  },
  {
    id: 6,
    icon: FaUserCircle,
    title: 'Account Settings',
    href: '/settings',
    available: true,
  },
];

type Props = {
  closeSidebar?: () => void;
};

export default function Sidebar({ closeSidebar }: Props) {
  const isLaptop = useMediaQuery(`(min-width: 1024px)`);
  const isMobile = useMediaQuery(`(max-width: 767px)`);

  const isOpen = isLaptop || isMobile;

  return (
    <aside
      className={cn(
        'no-scrollbar w-[5.5rem] py-5 transition-all duration-200 ease-linear lg:w-24 xl:w-24 2xl:w-32 px-3',
        [isOpen && 'w-full md:w-40 lg:w-fit xl:w-60 2xl:w-64 max-w-64']
      )}
    >
      <div className='flex w-full items-center gap-2 break-words px-1 md:px-4 text-xl text-white'>
        <SettleyLogo colour='no-beta' />
        {/* {isOpen && <CedeLogo />}
        {!isOpen && (
          <Link href='/' className='flex justify-center w-full mt-5 mb-3'>
            <Image
              src='/svg/cede hq.svg'
              alt='Cede Logo'
              width={30}
              height={30}
            />
          </Link>
        )} */}
      </div>

      <nav className='mt-8 mb-10'>
        <ul className='flex flex-col gap-3'>
          {sideBarLinks.map((link) => {
            return (
              <SidebarLink
                {...link}
                key={link.id}
                isOpen={isOpen}
                closeSidebar={closeSidebar}
              />
            );
          })}
        </ul>
      </nav>

      {/* <div className='mt-12 px-3'>
        {isOpen && <ProfileLink />}
        {!isOpen && (
          <Link
            href='/profile'
            className='w-full flex justify-center text-[#949494] text-2xl'
          >
            <FaRegUser />
          </Link>
        )}
      </div> */}

      {/* <LogoutModal
        isOpen={isLogoutOpen}
        handleOpenModal={openLogout}
        handleCloseModal={closeLogout}
      /> */}
    </aside>
  );
}
