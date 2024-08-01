import { Property } from '../properties/propertiesApiTypes';

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
    walletAddress: string;
    status: 'incomplete';
  };
};

export type WalletStatsResponse = {
  walletBalance: number;
  totalProperties: number;
  totalValue: number;
};

export type UserAssetsResponse = {
  property: Property;
  units: string;
  _id: string;
};

export type TransactionResponse = {
  _id: string;
  userFirebaseId: string;
  amount: {
    $numberDecimal: string;
  };
  property: Property;
  type: 'bought' | 'sold';
  txHash: string;
  created_at: string;
};
