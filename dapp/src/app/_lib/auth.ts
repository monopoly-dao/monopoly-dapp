import axios, { AxiosError } from 'axios';
import { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { INetworkSuccessResponse } from '../../@types/appTypes';
import { AUTH_BASE_URL } from '../../api';
import { AuthEndpoints } from '../../api/auth/authApiConstants';
import logger from '../../utils/logger';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Login Form',
      id: 'login',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          placeholder: 'example@example.com',
        },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const data: {
            email: string;
            password: string;
          } = {
            email: credentials?.email as string,
            password: credentials?.password as string,
          };
          const user = await axios.post<INetworkSuccessResponse<User>>(
            `${AUTH_BASE_URL}${AuthEndpoints.Login}`,
            data
          );

          return user.data.data;
        } catch (error) {
          console.log(error);

          if (error instanceof AxiosError) {
            if (
              error.response?.data &&
              typeof error.response.data === 'object'
            ) {
              if (
                error.response.data.message &&
                typeof error.response.data.message === 'string'
              ) {
                if (
                  error.response.data &&
                  typeof error.response.data.data === 'object' &&
                  'error' in error.response.data.data &&
                  typeof error.response.data.data.error === 'string'
                ) {
                  logger(error.response.data.data.error);
                  throw new Error(error.response.data.data.error);
                }
                if (
                  error.response.data.error.toLowerCase() ===
                  'Email or Password Incorrect'.toLowerCase()
                ) {
                  throw new Error('Invalid credentials. Please try again');
                }
              }
              logger(error.response.data.message);
              throw new Error(error.response.data.message);
            }
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60, // 330 days
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,
  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (trigger === 'update') {
        const updatedToken = token;

        updatedToken.data = session;

        return updatedToken;
      }

      user && (token.data = user);

      return token;
    },
    session: ({ session, token }) => {
      session.token = token.data.token;
      session.email = token.data.email;
      session.id = token.data.id;
      session.displayName = token.data.displayName;

      return session;
    },
  },
};
