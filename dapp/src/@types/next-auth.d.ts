import { ExternalProvider } from '@ethersproject/providers';
import { DefaultJWT } from 'next-auth/jwt';

declare global {
  interface Window {
    ethereum?: ExternalProvider;
  }
}

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token: string;
    userFirebaseId: string;
    email: string;
  }

  interface User {
    token: string;
    userFirebaseId: string;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  //   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    data: {
      token: string;
      userFirebaseId: string;
      email: string;
    };
  }
}
