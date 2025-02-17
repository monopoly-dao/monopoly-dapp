export enum ProfileEndpoints {
  Get_Profile_Details = '/profile/:userFirebaseId',
  Create_Profile = '/profile/:userFirebaseId',
  Update_Profile = '/profile/:userFirebaseId',
  Get_Wallet_Stats = '/profile/walletStats/:userFirebaseId',
  Get_Holdings = '/profile/holdings/:userFirebaseId',
  Get_Transactions = '/transactions/:userFirebaseId',
}
