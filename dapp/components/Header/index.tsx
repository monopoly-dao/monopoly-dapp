import styles from './Header.module.css'
import Logo from '../Logo';
import Button from '../Button';
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
                <Logo color="black"/>
            </div>
            <div className={styles.right}>
                <p>What is MonopolyDAO?</p>
                <p>How it works</p>
                <Button
                    type="contained"
                    handleClick={gotoLogin}
                    >Connect Wallet</Button>
            </div>
        </div>
    </div>
  )
}
