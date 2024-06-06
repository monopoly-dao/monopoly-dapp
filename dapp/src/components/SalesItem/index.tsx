import Image from 'next/image';

import styles from './SalesItem.module.scss';

const SalesItem = () => {
  return (
    <div className={styles.salesItem}>
      <Image
        src='/svg/auction houses.svg'
        alt='houses'
        width={200}
        height={200}
      />
      <p>200 left</p>
    </div>
  );
};

export default SalesItem;
