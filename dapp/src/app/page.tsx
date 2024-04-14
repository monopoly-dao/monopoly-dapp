'use client';

import { Stack } from '@mui/material';

import styles from '../styles/Dashboard.module.scss';

import SubscriptionForm from './_components/SubscriptionForm';
import Carousel from '../components/Carousel';
import Navbar from '../components/Navbar';
import WithFirebaseAuth from '../utils/initAuth';

function Dashboard() {
  return (
    <div>
      {/* <Header signInDetails={signInDetails} /> */}
      {/* <Marquee /> */}
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

      <Carousel />

      <SubscriptionForm />
    </div>
  );
}

export default WithFirebaseAuth(Dashboard);
