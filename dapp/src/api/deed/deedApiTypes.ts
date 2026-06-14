export type DeedDetailsResponse = {
  onwerAddresses: string[];
  propertyAddress: string;
  percentageHoldings: {
    walletAddress: string;
    percentageHolding: string;
  }[];
  propertyPhysicalAddress: string;
};
