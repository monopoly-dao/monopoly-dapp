import styles from '../styles/Profile.module.css';
import Box from '@mui/material/Box';
import Input from '../components/Input';
import { useState, useEffect } from 'react';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase/auth';
import * as nearAPI from 'near-api-js';
import WithFirebaseAuth from '../utils/initAuth'
import { ConnectConfig } from 'near-api-js';

type UserInfo = {
    firstName: string,
    lastName: string,
    phone: string,
    nationality: string,
    homeAddress: string,
}

function CompleteProfile() {
    const [error, setError] = useState('');
    const router = useRouter();
    const [connection, setConnection] = useState<any>(null);
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

    const SignInToNear = async () => {
        const nearConnection = await connect(connectionConfig);

        const walletConnection = new WalletConnection(nearConnection, null);
        walletConnection.requestSignIn(
            "monopolydao.testnet",
            "MonopolyDAO", // optional title
          );

    }

    const [userInfo, setUserInfo] = useState<UserInfo>({
        firstName: '',
        lastName: '',
        phone: '',
        nationality: '',
        homeAddress: ''
    })

    const db = getFirestore(app);
    const auth =  getAuth(app);
    const userId = auth.currentUser?.uid;

    const handleChange = (e: any) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
        console.log(userInfo);
    };

    const completeSignup = async () => {
        try {
            const usersRef = collection(db, "users");
            await setDoc(doc(usersRef, userId), userInfo);
            SignInToNear();
            router.push('/');
        } catch (error) {
            console.log("Error adding doc: ", error);
        }
    }

    return (
        <Box
            component="form"
            sx={{
            maxWidth: '600px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            margin: '20px auto',
            padding: '40px',
            background: 'white',
            borderRadius: '20px'
            }}
            noValidate
            autoComplete="on"
        >
                <div className={styles.title}>
                    <h1>Complete your profile</h1>
                </div>
                <div className={styles.form}>
                    <Input
                        required={true}
                        autofocus={true}
                        label="First name"
                        value={userInfo.firstName}
                        name="firstName"
                        handleChange={handleChange}
                    />
                    <Input
                        required={true}
                        label="Last name"
                        value={userInfo.lastName}
                        name="lastName"
                        handleChange={handleChange}
                    />
                    <Input
                        required={true}
                        label="Phone number"
                        value={userInfo.phone}
                        name="phone"
                        handleChange={handleChange}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                    <Input
                        required={true}
                        label="Nationality"
                        value={userInfo.nationality}
                        name="nationality"
                        handleChange={handleChange}
                    />
                    <Input
                        required={true}
                        label="Home address"
                        value={userInfo.homeAddress}
                        name="homeAddress"
                        handleChange={handleChange}
                    />
                    <Button
                        type="contained"
                        handleClick={completeSignup}
                    >
                        All done!
                    </Button>
                </div>
        </Box>
    )
}

export default WithFirebaseAuth(CompleteProfile);