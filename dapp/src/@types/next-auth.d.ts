import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    token: string;
    id: string;
    email: string;
    displayName: string;
  }

  interface User {
    token: string;
    id: string;
    email: string;
    displayName: string;
  }
}

declare module 'next-auth/jwt' {
  //   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    data: {
      token: string;
      id: string;
      email: string;
      displayName: string;
    };
  }
}
