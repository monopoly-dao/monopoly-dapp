import { useRouter } from "next/router";
import { createContext, useState } from 'react';

const AuthContext = createContext(undefined);
const { Provider } = AuthContext;

const AuthProvider = ({ children }: {children: any}) => {
  const [authState, setAuthState] = useState({
   token: "",
  });

  const setUserAuthInfo = ({ data }: {data: any}) => {
   const token = localStorage.setItem("token", data.data);

   setAuthState({
    token,
   });
 };

 // checks if the user is authenticated or not
 const isUserAuthenticated = () => {
  if (!authState.token) {
    return false;
  }
 };

 return (
   <Provider
     value={{
      authState,
      setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
      isUserAuthenticated,
    }}
   >
    {children}
   </Provider>
 );
};

export { AuthContext, AuthProvider };