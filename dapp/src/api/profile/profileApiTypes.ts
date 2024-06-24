export type UserDetailsResponse = {
  userFirebaseId: string;
  firstName: string;
  lastName: string;
  userDetails: {
    _id: string;
    address: string;
    phone: string;
    username: string;
    // email: string;
    // preferredCurrency: string;
    twitter?: string;
    status: 'incomplete';
  };
};
