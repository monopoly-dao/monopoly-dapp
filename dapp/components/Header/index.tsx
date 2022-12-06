import styles from './Header.module.css'
import Logo from '../Logo';
import Button from '../Button';
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react'
import * as nearAPI from 'near-api-js';
import { ConnectConfig } from 'near-api-js';


export default function Header() {
    
    const { keyStores, connect, WalletConnection } = nearAPI;
    const myKeyStore = new keyStores.BrowserLocalStorageKeyStore();
    const connectionConfig: ConnectConfig = {
        networkId: "testnet",
        keyStore: myKeyStore,
        nodeUrl: "https://rpc.testnet.near.org",
        walletUrl: "https://wallet.testnet.near.org",
        helperUrl: "https://helper.testnet.near.org",
        headers: {}
  };

    const nearWalletConnection = async() =>  await connect(connectionConfig)
        .then(nearConnection => {
        const walletConnection = new WalletConnection(nearConnection, null);
        return walletConnection
  });

    const [isWalletSignedIn, setIsWalletSignedIn] = useState<boolean>(false);
    
    const SignInToNear = async () => {
        const conn = await nearWalletConnection()
        conn.requestSignIn(
            "monopolydao.testnet",
            "MonopolyDAO"
          );
    }

    const isWalletActive = async () => { 
        const conn = await nearWalletConnection()
        conn.isSignedIn() ? setIsWalletSignedIn(true) : setIsWalletSignedIn(false);
    }

    useEffect(() => {
        isWalletActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    >{is}</Button>
            </div>
        </div>
    </div>
  )
}