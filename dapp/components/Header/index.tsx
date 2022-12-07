import styles from './Header.module.css'
import Logo from '../Logo';
import WalletButton from '../WalletButton';
import { useRouter } from 'next/router';
import {useEffect, useState} from 'react'
import * as nearAPI from 'near-api-js';
import { ConnectConfig } from 'near-api-js';
import Image from 'next/image'

type signInDetails = {
    name: string,
    photo: string,
}
export default function Header({signInDetails}: {signInDetails: signInDetails}) {
    const imageSize = 40;
    const {  name, photo } = signInDetails;
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
        if (!isWalletSignedIn) {
        conn.requestSignIn(
            "monopolydao.testnet",
            "MonopolyDAO"
          );
          isWalletActive();
        }
        isWalletActive();
        return conn.signOut();
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
                <WalletButton
                    type="contained"
                    handleClick={SignInToNear}
                    >{isWalletSignedIn ? <><span className={styles.connected}></span>Wallet connected</> : <><span className={styles.disconnected}></span>Connect wallet</>}</WalletButton>
                    <div className={styles.avatar}>
                    <Image src={photo} width={imageSize} height={imageSize} alt="avatar"   style={{ objectFit: "contain" }}/>
                </div>
            </div>
        </div>
    </div>
  )
}