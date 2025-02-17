import NextAuth from 'next-auth/next';

import { authOptions } from '../../../_lib/auth';

const handler = NextAuth(authOptions);
export {
  handler as DELETE,
  handler as GET,
  handler as OPTIONS,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
