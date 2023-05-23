import Image from "next/image";
import styles from "./SalesItem.module.scss";
import houses from "../../public/assets/auction houses.svg";

const SalesItem = () => {
  return (
    <div className={styles.salesItem}>
      <Image src={houses} alt={houses} />
      <p>200 left</p>
    </div>
  );
};

export default SalesItem;
