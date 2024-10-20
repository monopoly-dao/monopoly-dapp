import axios, { AxiosError } from 'axios';
import { getServerSession, NextAuthOptions, Session, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import 'firebase/firestore';

import { INetworkSuccessResponse } from '../../@types/appTypes';
import { AUTH_BASE_URL, BASE_URL } from '../../api';
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
          if (error instanceof AxiosError) {
            if (
              error.response?.data &&
              typeof error.response.data === 'string'
            ) {
              const errorMsg = error.response.data;
              if (errorMsg.includes('Firebase: Error')) {
                logger(errorMsg);
                throw new Error(errorMsg.replace('Firebase: Error ', ''));
              }
              logger(error.response.data);
              throw new Error(error.response.data);
            }
          }
        }

        return null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID as string,
      clientSecret: process.env.TWITTER_CLIENT_SECRET as string,
      version: '2.0', // opt-in to Twitter OAuth 2.0
    }),
  ],

  pages: {
    error: '/login',
    signIn: '/login',
    signOut: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 20 * 60, // 20 minutes
  },
  secret: `${process.env.NEXTAUTH_SECRET}`,
  callbacks: {
    jwt: async ({ token, user, trigger, session, account, profile }) => {
      if (trigger === 'update') {
        const updatedToken = token;

        updatedToken.data = session;

        return updatedToken;
      }

      if (account?.provider === 'twitter' && profile) {
        if (
          'data' in profile &&
          typeof profile.data === 'object' &&
          profile.data &&
          'username' in profile.data &&
          typeof profile.data.username === 'string'
        ) {
          const credentialsSession = (await getServerSession(
            authOptions
          )) as Session;
          const newToken = {
            data: {
              token: credentialsSession.token,
              email: credentialsSession.email,
              userFirebaseId: credentialsSession.userFirebaseId,
            },
          };

          await axios.post(
            `${BASE_URL}/profile/connect-twitter/${newToken.data.userFirebaseId}`,
            {
              twitterUsername: profile.data.username,
            },
            {
              headers: {
                Authorization: `Bearer ${newToken.data.token}`,
              },
            }
          );
          return newToken;
        }
      }

      user && (token.data = user);

      // google sign in handler
      if (!('userFirebaseId' in token.data)) {
        try {
          const r = await axios.post(`${AUTH_BASE_URL}/google-signin`, {
            email: token.email,
          });
          const result = r.data as {
            token: string;
            userFirebaseId: string;
            email: string;
          };
          token.data = result;
          return token;
        } catch (e) {
          return token;
        }
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.token = token.data.token;
      session.email = token.data.email;
      session.userFirebaseId = token.data.userFirebaseId;
      return session;
    },
  },
};
