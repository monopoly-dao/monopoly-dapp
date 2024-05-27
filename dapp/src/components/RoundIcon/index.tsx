import Image from 'next/image';

import styles from './RoundIcon.module.scss';

export type RoundIconProps = {
  src: string;
  alt: string;
  border?: boolean;
};

const RoundIcon = ({ src, alt, border }: RoundIconProps) => {
  return (
    <div
      className={styles.roundIcon}
      style={{ border: `${border && '1px solid #467483'}` }}
    >
      <Image src={src} alt={alt} width={200} height={200} />
    </div>
  );
};

export default RoundIcon;
