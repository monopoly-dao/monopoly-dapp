import Image from 'next/image';

import styles from './ArticleItem.module.scss';

type ArticleItemProps = {
  src: string;
  alt: string;
  text: string;
};

const ArticleItem = ({ src, alt, text }: ArticleItemProps) => {
  return (
    <div className={styles.articleItem}>
      <Image src={src} alt={alt} loading='lazy' width={200} height={200} />
      <p>{text}</p>
    </div>
  );
};

export default ArticleItem;
