import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import ActiveLink from '@/components/links/ActiveLink';

const profileLinks = [
  { route: '', label: 'Account Settings', index: true },
  { route: 'bookmarks', label: 'Bookmarks', index: false },
  { route: 'transactions', label: 'Transactions', index: false },
];

export const metadata: Metadata = {
  title: 'Settley | Account',
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
      <div className='flex items-center gap-2 sm:gap-6 border-b border-medium-grey'>
        {profileLinks.map((el) => (
          <ActiveLink
            key={el.label}
            href={`/profile${el.route && `/${el.route}`}`}
            className='-mb-[0.5px] cursor-pointer px-3 py-5 font-inter uppercase border-b border-transparent text-xs sm:text-base whitespace-nowrap'
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
