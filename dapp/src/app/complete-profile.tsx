import Box from '@mui/material/Box';
import { getAuth } from 'firebase/auth';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';

import styles from '../styles/Profile.module.css';

import Button from '../components/Button';
import Input from '../components/Input';
import { app } from '../config/firebase/auth';
import WithFirebaseAuth from '../utils/initAuth';

type UserInfo = {
  firstName: string;
  lastName: string;
  phone: string;
  nationality: string;
  homeAddress: string;
};

function CompleteProfile() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    lastName: '',
    phone: '',
    nationality: '',
    homeAddress: '',
  });

  const db = getFirestore(app);
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;

  const handleChange = (e: any) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const completeSignup = async () => {
    try {
      const usersRef = collection(db, 'users');
      await setDoc(doc(usersRef, userId), userInfo);
      router.push('/');
    } catch (error) {
      console.log('Error adding doc: ', error);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        maxWidth: '600px',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '20px auto',
        padding: '40px',
        background: 'white',
        borderRadius: '20px',
      }}
      noValidate
      autoComplete='on'
    >
      <div className={styles.title}>
        <h1>Complete your profile</h1>
      </div>
      <div className={styles.form}>
        <Input
          required={true}
          autofocus={true}
          label='First name'
          value={userInfo.firstName}
          name='firstName'
          handleChange={handleChange}
        />
        <Input
          required={true}
          label='Last name'
          value={userInfo.lastName}
          name='lastName'
          handleChange={handleChange}
        />
        <Input
          required={true}
          label='Phone number'
          value={userInfo.phone}
          name='phone'
          handleChange={handleChange}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
        <Input
          required={true}
          label='Nationality'
          value={userInfo.nationality}
          name='nationality'
          handleChange={handleChange}
        />
        <Input
          required={true}
          label='Home address'
          value={userInfo.homeAddress}
          name='homeAddress'
          handleChange={handleChange}
        />
        <Button type='contained' handleClick={completeSignup}>
          All done!
        </Button>
      </div>
    </Box>
  );
}

export default WithFirebaseAuth(CompleteProfile);
