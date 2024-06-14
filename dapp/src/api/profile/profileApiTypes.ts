export type UserDetailsResponse = {
  id: string;
  firstName: string;
  lastName: string;
  userDetails: {
    _id: string;
    address: string;
    phone: string;
    email: string;
    preferredCurrency: string;
    twitter?: string;
    status: 'incomplete';
  };
};
