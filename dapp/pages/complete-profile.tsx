import styles from '../styles/Profile.module.css';
import Box from '@mui/material/Box';
import Input from '../components/Input';
import { useState } from 'react';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import { getFirestore, collection, setDoc, getDoc, doc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { app } from '../config/firebase/auth';

type UserInfo = {
    firstName: string,
    lastName: string,
    phone: string,
    nationality: string,
    homeAddress: string,
}

export default function Login() {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        firstName: '',
        lastName: '',
        phone: '',
        nationality: '',
        homeAddress: ''
    })
    const [error, setError] = useState('');
    const router = useRouter();

    const db = getFirestore(app);
    const auth =  getAuth(app);

    const handleChange = (e: any) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
        console.log(userInfo);
    };

    const completeSignup = async () => {
        if (!auth) {
            router.push("/signup");
        }
        try {
            const userId = auth.currentUser?.uid;
            const usersRef = collection(db, "users");
            await setDoc(doc(usersRef, userId), userInfo);
            router.push('/dashboard');
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