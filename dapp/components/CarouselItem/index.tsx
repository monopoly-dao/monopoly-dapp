import { Stack } from "@mui/material";
import styles from "./CarouselItem.module.scss";
import carouselImage from "../../public/assets/Featured image.svg";
import fireIcon from "../../public/assets/fire icon.svg";
import Image from "next/image";

const CarouselItem = ({ bgColor }: { bgColor?: string }) => {
  return (
    <Stack
      direction="row"
      gap="60px"
      // bgcolor={bgColor || "#d9f3ea"}
      className={styles.carouselItem}
    >
      <Image src={carouselImage} alt="carousel image" loading="lazy" />

      <Stack direction="column" width="55%" alignItems="flex-start">
        <Stack direction="row" alignItems="center" gap="60px">
          <Stack direction="row" alignItems="center">
            <Image src={fireIcon} alt="fire" />
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
        <button type="button" className="black-bg">
          View Listing
        </button>
      </Stack>
    </Stack>
  );
};

export default CarouselItem;
