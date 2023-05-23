import Carousel from "react-material-ui-carousel";
import CarouselItem from "../CarouselItem";
import styles from "./Carousel.module.scss";

const AppCarousel = () => {
  return (
    <Carousel
      className={styles.carousel}
      navButtonsAlwaysVisible
      indicatorIconButtonProps={{
        style: {
          marginTop: "10px",
        },
      }}
      navButtonsProps={{
        style: {
          backgroundColor: "#ffffff",
          color: "#467483",
          width: "60px",
          height: "60px",
          boxShadow: "0px 4px 9px 2px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <CarouselItem key="1" />
      <CarouselItem key="2" />
      <CarouselItem key="3" />
    </Carousel>
  );
};

export default AppCarousel;
