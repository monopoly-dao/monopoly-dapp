export type Property = {
  _id: string;
  contractAddress: string;
  deedUrl: string;
  propertyDetails: {
    _id: string;
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
  };
};

export type WishlistItem = Property;

export type Wishlist = {
  userId: string;
  wishlist: WishlistItem[];
};
