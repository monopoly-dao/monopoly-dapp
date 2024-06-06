import { Stack } from '@mui/material';
import Image from 'next/image';

import styles from './CarouselItem.module.scss';

const CarouselItem = () => {
  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      gap='60px'
      // bgcolor={bgColor || "#d9f3ea"}
      className={styles.carouselItem}
    >
      <Image
        src='/svg/Featured image.svg'
        alt='carousel image'
        loading='lazy'
        width={200}
        height={200}
      />

      <Stack
        direction='column'
        width={{ xs: '100%', md: '55%' }}
        alignItems='flex-start'
      >
        <Stack
          direction='row'
          alignItems='center'
          gap={{ xs: '0px', sm: '60px' }}
          justifyContent='center'
        >
          <Stack direction='row' alignItems='center' justifyContent='center'>
            <Image
              src='/svg/fire icon.svg'
              alt='fire'
              width={20}
              height={20}
            />
            <p>1,239 SHARES LEFT</p>
            <p>• 10,000 TOTAL</p>
          </Stack>
          <p>40 OWNERS</p>
        </Stack>
        <h2>Condo overlooking the beach — Brazil</h2>
        <p>Londrina, Paraná (PR), 86062-590</p>
        <p>
          With direct access to the beach, you can spend your days lounging on
          the sand, swimming in the ocean, and soaking up the sun.
        </p>
        <button type='button' className='black-bg'>
          View Listing
        </button>
      </Stack>
    </Stack>
  );
};

export default CarouselItem;
