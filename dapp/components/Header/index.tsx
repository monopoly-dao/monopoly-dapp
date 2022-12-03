import styles from './Header.module.css'
import Logo from '../Logo';
import Button from '../Button';
import { useRouter } from 'next/router';
import * as nearAPI from 'near-api-js';
import { ConnectConfig } from 'near-api-js';
import {useEffect, useState} from 'react'

Header.getInitialProps = async () => {
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

    const nearConnection = await connect(connectionConfig);
    const walletConnection = new WalletConnection(nearConnection, null);
    return { walletConnection: walletConnection };

}

export default function Header(walletConnection: any) {
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
                    >{isWalletSignedIn()? "Signed in" : "Connect Wallet"}</Button>
            </div>
        </div>
    </div>
  )
}