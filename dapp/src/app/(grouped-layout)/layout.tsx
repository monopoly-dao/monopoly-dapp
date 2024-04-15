'use client';

import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

import styles from '../../styles/Dashboard.module.scss';

import Navbar from '../../components/Navbar';

export default function GroupedLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Navbar />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        alignItems='center'
        justifyContent='space-between'
        className={styles.banner}
      >
        <p>Own property affordably from all over the world</p>

        <Stack direction='row' gap='40px'>
          <button role='button' className='black-bg'>
            Browse assets
          </button>
          <button role='button' className='transparent-bg'>
            Browse assets
          </button>
        </Stack>
      </Stack>
      {children}
    </div>
  );
}
