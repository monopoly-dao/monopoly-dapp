import styles from './Header.module.css'
import Logo from '../Logo';
import Image from 'next/image';
import Button from '../Button';
import icon from 'public/assets/wallet.png';
import { useRouter } from 'next/router';

export default function Header() {
    const router = useRouter();
    
    const gotoLogin = (e: any) => {
        e.preventDefault();
        router.push('/signup');
    }

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
                <Button
                    type="contained"
                    handleClick={gotoLogin}
                    >Sign in</Button>
            </div>
        </div>
    </div>
  )
}
