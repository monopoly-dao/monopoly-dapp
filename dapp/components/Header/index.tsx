import styles from './Header.module.css'
import Logo from '../Logo';
import Button from '../Button';
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react'

export default function Header({walletConnection}) {
    const router = useRouter();
    console.log('WHHHHHH', walletConnection)
    const [connection, setConnection] = useState<any>(null);
    
    const SignInToNear = async () => {
        walletConnection.requestSignIn(
            "monopolydao.testnet",
            "MonopolyDAO"
          );
    }

    const isWalletSignedIn = () => { 

        // let status = walletConnection?.isWalletSignedIn();
        // console.log('sytatus', status);
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
                    handleClick={SignInToNear}
                    >Connect Wallet</Button>
            </div>
        </div>
    </div>
  )
}