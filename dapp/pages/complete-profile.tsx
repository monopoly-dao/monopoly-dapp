import styles from '../styles/Profile.module.css';
import Box from '@mui/material/Box';
import Input from '../components/Input';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '../components/Button';
import GoogleButton from '../components/GoogleButton';
import Divider from '@mui/material/Divider';
import Image from 'next/image';
import google from 'public/assets/google.png';
import {auth} from '../config/firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/router';

type UserInfo = {
    firstName: string,
    lastName: string,
    phone: string,
    nationality: string,
    homeAddress: string
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

    const handleChange = (e: any) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
        console.log(userInfo);
    };

    const completeSignup = () => {
        router.push('/dashboard');
    }

    const handleSubmit = () => {
        return 'hey'
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