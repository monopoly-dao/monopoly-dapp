export type Property = {
  id: string;
  contractAddress: string;
  deedUrl: string;
  name: string;
  description: string;
  photos: {
    url: string;
  }[];
  streetAddress: string;
  stateOrProvince: string;
  country: string;
  lat: string;
  lon: string;
  totalUnits: string;
  unitsAvailable: string;
  unitsSold: string;
  symbol: string;
  bed: string;
  bath: string;
  squareFt: string;
  owners: string[];
};

export type WishlistItem = Property;

export type Wishlist = {
  userFirebaseId: string;
  wishlist: WishlistItem[];
};
