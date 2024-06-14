import { useMediaQuery } from '@mui/material';
import Carousel from 'react-material-ui-carousel';

import styles from './Carousel.module.scss';

import CarouselItem from '../CarouselItem';

const AppCarousel = () => {
  const smallScreen = useMediaQuery('(max-width: 650px)');

  return (
    <Carousel
      className={styles.carousel}
      navButtonsAlwaysVisible
      indicatorIconButtonProps={{
        style: {
          marginTop: '10px',
        },
      }}
      navButtonsProps={{
        style: {
          backgroundColor: '#ffffff',
          color: '#467483',
          width: smallScreen ? '50px' : '60px',
          height: smallScreen ? '50px' : '60px',
          boxShadow: '0px 4px 9px 2px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <CarouselItem key='1' />
      <CarouselItem key='2' />
      <CarouselItem key='3' />
    </Carousel>
  );
};

export default AppCarousel;
