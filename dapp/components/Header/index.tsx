import styles from './Header.module.css'
import Logo from '../Logo';
import Image from 'next/image';
import Button from '../Button';
import icon from 'public/assets/wallet.png';

export default function Header() {

    const Icon = () => 
        <>
            <Image src={icon} alt="wallet icon" />
        </>

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
                <Button type="contained" icon={Icon}>connect wallet</Button>
            </div>
        </div>
    </div>
  )
}
