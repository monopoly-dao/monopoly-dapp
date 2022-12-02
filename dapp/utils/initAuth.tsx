import {useState} from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../config/firebase/auth';
import Login from '../pages/login';
import LoadingComponent from '../components/Loading'

type AuthState = {
    isLoading: boolean,
    uid: string,
}
// eslint-disable-next-line react/display-name
const withFirebaseAuth = (Component: any) => (props: JSX.IntrinsicAttributes) => {
    const [userData, setUserData] = useState<AuthState>({
        isLoading: true,
        uid: ''
    });
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserData({isLoading: false, uid: user.uid});
        } else {
            setUserData({isLoading: false, uid: ''})
        }
    })
    return(
        userData.isLoading 
            ? <LoadingComponent />
            : userData.uid
                ? <Component />
                : <Login />
    )
}

export default withFirebaseAuth