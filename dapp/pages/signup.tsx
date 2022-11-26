
import firebase from 'firebase/compat/app';
import { useEffect } from 'react';
import { firebaseConfig } from '../config/firebase';

export default function Signup() {

    const fetchUI = async () => {
        firebase.initializeApp(firebaseConfig);
        const firebaseui = await import('firebaseui')
        const signOnUI = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
        console.log('Signon', signOnUI);
    }
    useEffect(()=> {
        if (typeof window !== 'undefined') {
            fetchUI();
        }
    }, [])
    return (
        <div>Hooha</div>
    )
}