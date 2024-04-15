export type Property = {
  id: string;
  name: string;
  description: string;
  photos: {
    url: string;
  }[];
  isFavourite: false;
  property: {
    _id: string;
    contractAddress: string;
    deedUrl: string;
  };
};
