import { AnimatePresence, motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import { useRef } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { SlLogout } from 'react-icons/sl';

import { cn } from '@/lib/utils';
import useDisclosure from '@/hooks/useDisclosure';
import useOnClickOutside from '@/hooks/useOnClickOutside';

import { useGetUserDetailsQuery } from '@/api/profile';

import { dropdownAnimationVariants } from './MobileMenuContainer';
import LoadingText from '../LoadingText';

type Props = {
  isMobileScreen?: boolean;
};

export default function LogoutDropdown({ isMobileScreen }: Props) {
  const { isOpen, close, toggle } = useDisclosure();
  const ref = useRef(null);

  const session = useSession();
  const userFirebaseId = session.data?.userFirebaseId ?? '';

  const { data: userResponse, isLoading } =
    useGetUserDetailsQuery(userFirebaseId);
  const userDetails = userResponse?.data.userDetails;

  const ArrowIcon = isOpen ? IoIosArrowUp : IoIosArrowDown;

  useOnClickOutside(ref, close);

  return (
    <div className='relative' ref={ref}>
      <button
        onClick={(e) => {
          toggle();
          e.stopPropagation();
        }}
        className='text-[#1E1E1E] bg-transparent sm:text-xs lg:text-sm border-none font-roboto text-base flex items-center gap-3'
      >
        <div>
          Hi{userDetails && ','}{' '}
          <LoadingText
            isLoading={isLoading}
            value={userDetails?.username}
            placeholder=''
          />
        </div>
        <ArrowIcon />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownAnimationVariants}
            initial='initial'
            exit='exit'
            animate='animate'
            key='profile-dropdown'
            className={cn(
              'mt-7 flex w-full min-w-max flex-col items-start gap-2 rounded-b-lg bg-white px-6 py-4 shadow',
              [!isMobileScreen && 'absolute right-0 top-full z-10']
            )}
          >
            <button
              onClick={() => {
                close();
                signOut();
              }}
              className='text-navy flex items-center font-inter text-sm gap-3'
            >
              <SlLogout />
              Log Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
