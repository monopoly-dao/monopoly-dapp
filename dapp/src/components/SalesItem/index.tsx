import Image from "next/image";
import styles from "./SalesItem.module.scss";
import houses from "../../public/assets/auction houses.svg";

const SalesItem = () => {
  return (
    <div className={styles.salesItem}>
      <Image
        src={"/assets/auction houses.svg"}
        alt={"houses"}
        width={200}
        height={200}
      />
      <p>200 left</p>
    </div>
  );
};

export default SalesItem;
