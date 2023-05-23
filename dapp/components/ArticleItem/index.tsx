import styles from "./ArticleItem.module.scss";
import Image from "next/image";

type ArticleItemProps = {
  src: string;
  alt: string;
  text: string;
};

const ArticleItem = ({ src, alt, text }: ArticleItemProps) => {
  return (
    <div className={styles.articleItem}>
      <Image src={src} alt={alt} loading="lazy" />
      <p>{text}</p>
    </div>
  );
};

export default ArticleItem;
