import Image from 'next/image';
import hand from 'public/assets/hand.png';
import house from 'public/assets/House.png';

import styles from '../Header/Header.module.css';

import Button from '../buttons/Button';

export default function Jumbotron() {
  return (
    <div className={styles.main}>
      <div className={styles.herotext}>
        <h1>
          Own property.
          <br /> Pay in fractions.
        </h1>
        <p>
          Join a community of people crowd-funding to own great property around
          the world. Connect, review deals, interact with property owners, and{' '}
        </p>
        <Button>connect wallet</Button>
      </div>
      <div className={styles.hero}>
        <div className={styles.secondHero}></div>
        <div className={styles.house}>
          <Image src={house} alt='house' width={200} height={200} />
        </div>
        <div className={styles.handWrapper}>
          <div className={styles.hand}>
            <Image src={hand} alt='hand' width={200} height={200} />
          </div>
        </div>
      </div>
    </div>
  );
}
