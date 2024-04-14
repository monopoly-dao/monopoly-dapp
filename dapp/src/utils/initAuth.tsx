import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';

import Login from '../app/login/page';
import LoadingComponent from '../components/Loading';
import { app } from '../../config/firebase/auth';

type AuthState = {
  isLoading: boolean;
  info: {
    uid?: string;
  };
};
// eslint-disable-next-line react/display-name
const withFirebaseAuth =
  // eslint-disable-next-line react/display-name
  (Component: React.ComponentType) => (props: JSX.IntrinsicAttributes) => {
    const [userData, setUserData] = useState<AuthState>({
      isLoading: true,
      info: {},
    });
    const auth = getAuth(app);

    const newProps = { ...userData.info, ...props };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({ isLoading: false, info: user });
      } else {
        setUserData({ isLoading: false, info: {} });
      }
    });
    return userData.isLoading ? (
      <LoadingComponent />
    ) : !userData.info?.uid ? (
      <Component {...newProps} />
    ) : (
      <Login />
    );
  };

export default withFirebaseAuth;
