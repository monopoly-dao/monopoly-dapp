import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import ActiveLink from '@/components/links/ActiveLink';

const profileLinks = [
  { route: '', label: 'Dashboard', index: true },
  { route: 'transactions', label: 'Transactions', index: false },
  { route: 'settings', label: 'Account Settings', index: false },
  { route: 'bookmarks', label: 'Wishlist', index: false },
];

export const metadata: Metadata = {
  title: 'Dashboard',
  keywords: [
    'Settley',
    'Profile',
    'Account',
    'Settley Profile',
    'Settley Account',
    'SettleyCo',
    'Settley co',
  ],
};

export default function ProfileLayout({ children }: PropsWithChildren) {
  return (
    <div className='px-[5%] lg:px-[7%] mt-14'>
      <div className='flex items-center gap-4 border-b border-medium-grey w-full overflow-x-auto no-scrollbar'>
        {profileLinks.map((el) => (
          <ActiveLink
            key={el.label}
            href={`/dashboard${el.route && `/${el.route}`}`}
            className='-mb-[0.5px] cursor-pointer px-6 py-5 font-inter uppercase border-b border-transparent text-xs sm:text-base whitespace-nowrap'
            activeClassName='text-secondary font-bold border-black'
            index={el.index}
          >
            {el.label}
          </ActiveLink>
        ))}
      </div>

      {children}
    </div>
  );
}
