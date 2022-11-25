import styles from '../Header/Header.module.css';
import hand from 'public/assets/hand.png';
import house from 'public/assets/House.png';
import Button from '../Button';
import Image from 'next/image';

export default function Jumbotron() {
    return (
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
    )
}