import { getServerSession } from 'next-auth';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

import { authOptions } from './_lib/auth';
import { NextAuthProvider } from '../components/next-auth-provider';
import { ReduxProvider } from '../components/redux-provider';

export const metadata = {
  title: 'MonopolyDAO',
  description: '',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <body>
        <NextAuthProvider session={session}>
          <ReduxProvider>
            <main>{children}</main>
            <Toaster position='top-right' />
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
