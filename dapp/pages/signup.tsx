import styles from '../styles/Signup.module.css';
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
import signup from 'public/assets/woman.jpg';
import Image from 'next/image';
import google from 'public/assets/google.png';
import {auth} from '../config/firebase/auth';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/router';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e: any) => {
        e.target.name == 'email' ? setEmail(e.target.value) : setPassword(e.target.value);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleClose = (e: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
    }

    const gotoLogin = () => {
        router.push('/login');
    }

    const handleSubmit = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(newUserCredential => {
                const user = newUserCredential.user;
                router.push("/complete-profile");
            })
            .catch(error => {
                const errorCode = error.code;
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        setError("You already registered with this email address. Try logging in instead.")
                        break;
                    default:
                        setError(errorCode)
                }
            })
    }

    const handleGoogleSignUp = () => {
        const googleProvider = new GoogleAuthProvider();

        signInWithPopup(auth, googleProvider)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                if (result.user) {
                    router.push("/complete-profile");
                }

            })
            .catch(error => {
                const errorCode = error.code;
                switch (errorCode) {
                    case 'auth/email-already-in-use':
                        setError("You already registered with this email address. Try logging in instead.")
                        break;
                    case 'auth/cancelled-popup-request':
                        setError("Looks like you canceled your Google signup. Try again?")
                        break;
                    case 'auth/popup-closed-by-user':
                        setError("Looks like you canceled your Google signup. Try again?")
                        break;
                    default:
                        setError(errorCode)
                }
            })
    }
    return (
        <Box
            component="form"
            sx={{
            '& .MuiTextField-root': { width: 'inherit' },
            }}
            noValidate
            autoComplete="on"
        >
            <div className={styles.signup}>
            <div className={styles.left}>
            <Image src={signup} alt="signup splash" fill priority/>
            </div>
            <div className={styles.right}>
                <div className={styles.title}>
                    <h1>Get started<br/>with MonopolyDAO</h1>
                    <p>Create your account and start purchasing properties in minutes</p>
                </div>
                <div className={styles.form}>
                    <Input
                        required={true}
                        label="Email address"
                        value={email}
                        name="email"
                        handleChange={handleChange}
                    />
                    <Input
                        required={true}
                        label="Password"
                        value={password}
                        name="password"
                        handleChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        inputProps={{
                            endAdornment: <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>}}
                    />
                    <Button
                        type="contained"
                        handleClick={handleSubmit}
                    >
                        Sign up
                    </Button>
                    <h4 className={styles.h5} onClick={gotoLogin}>Already have an account? Log in</h4>
                </div>
                <div className={styles.divider}>
                    <Divider>OR</Divider>
                </div>
                <GoogleButton
                    type="contained"
                    handleClick={handleGoogleSignUp}
                >
                    <Image src={google} alt="google icon"width={35} height={35} />
                    &nbsp; &nbsp; Sign up with Google
                </GoogleButton>

                <Snackbar
                    open={!!error}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={error}
                    // action={action}
/>
            </div>
            </div>
        </Box>
    )
}