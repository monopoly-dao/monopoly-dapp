import styles from './Header.module.css'
import Logo from '../Logo';
import Image from 'next/image';
import Button from '../../components/Button';
import hand from 'public/assets/hand.png';
import house from 'public/assets/house.png';

export default function Header() {
  return (
    <div>
        <div className={styles.header}>
            <div className={styles.left}>
                <Logo />
                <p>What is MonopolyDAO?</p>
                <p>How it works</p>
            </div>
            <div className={styles.right}>
                <p>Log in</p>
                <Button type="contained">connect wallet</Button>
            </div>
        </div>
        <div className={styles.main}>
            <div className={styles.herotext}>
                <h1>Own property.<br/> Pay in fractions.</h1>
                <p>Join a community of people crowd-funding to own great property around the world. Connect, review deals, interact with property owners, and </p>
                <Button type="contained">connect wallet</Button>
            </div>
            <div className={styles.hero}>
            <div className={styles.secondHero}>
            </div>
                <div className={styles.house}>
                    <Image src={house} alt="house" width={200}/>
                </div>
                <div className={styles.handWrapper}>
                    <div className={styles.hand}>
                        <Image src={hand} alt="hand" layout="responsive"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
