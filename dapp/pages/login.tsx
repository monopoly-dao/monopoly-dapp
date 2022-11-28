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
import signup from 'public/assets/red.jpg';
import Image from 'next/image';
import google from 'public/assets/google.png';
import {auth} from '../config/firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Snackbar from '@mui/material/Snackbar';
import { useRouter } from 'next/router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
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

    const gotoSignup = () => {
        router.push('/signup');
    }

    const handleSubmit = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                const user = userCredential.user;
                console.log(user);
                router.push("/dashboard");
            })
            .catch(error => {
                const errorCode = error.code;
                switch (errorCode) {
                    case 'auth/user-not-found':
                        setError("Username or password incorrect. Check your credentials, or sign up instead.")
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
            <Image src={signup} alt="signup splash" fill/>
            </div>
            <div className={styles.right}>
                <div className={styles.title}>
                    <h1>Welcome back!</h1>
                    <p>Log in to your account to manage your assets</p>
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
                        Log in
                    </Button>
                    <h4 className={styles.h5} onClick={gotoSignup}>Don&apos;t have an account? Sign up</h4>
                </div>
                <div className={styles.divider}>
                    <Divider>OR</Divider>
                </div>
                <GoogleButton
                    type="contained"
                >
                    <Image src={google} alt="google icon"width={35} height={35} />
                    &nbsp; &nbsp; Continue with Google
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