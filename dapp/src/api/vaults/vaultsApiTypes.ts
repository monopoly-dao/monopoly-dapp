export type LoanStatus =
  | 'REQUESTED'
  | 'FUNDING'
  | 'ACTIVE'
  | 'REPAID'
  | 'OVERDUE'
  | 'DEFAULTED'
  | 'CANCELLED';

export interface Loan {
  id: string;
  vaultId: string;
  borrowerId: string;
  pledgedTokenAmount: string;
  requestedAmount: number;
  fundedAmount: number;
  interestRate: number;
  termMonths: number;
  status: LoanStatus;
  repaymentDueDate?: string;
  blockchainTxHash?: string;
  onchainLoanId?: string;
  onchainIntentId?: string;
  propertyName?: string;
  positions?: LendPosition[];
}

export interface LendPosition {
  id: string;
  loanId: string;
  lenderId: string;
  amountFunded: number;
  claimed: boolean;
  blockchainTxHash?: string;
  onchainIntentId?: string;
  propertyName?: string;
  interestRate?: number;
  termMonths?: number;
  status?: LoanStatus;
  repaymentDueDate?: string;
}

export interface Vault {
  id: string;
  propertyId: string;
  collateralToken: string;
  stablecoinToken: string;
  maxLtvRatio: number;
  contractAddress?: string;
  loans: Loan[];
}

export interface AmountDueResponse {
  loanId: string;
  amountDue: string;
  source: 'onchain' | 'calculated';
}

export interface RequestLoanPayload {
  pledgedTokenAmount: number;
  requestedAmount: number;
  interestRate: number;
  termMonths: number;
}

export interface LendPayload {
  amountFunded: number;
}

export interface RepayPayload {
  amount: string;
}

// Additional types for Frontend_Plan_2.md

export interface SubgraphLoan {
  id: string;
  borrower: string;
  lender: string;
  assetToken: string;
  paymentToken: string;
  collateralAmount: string;
  principal: string;
  rateBps: string;
  liqPrice: string;
  startTime: string;
  maturity: string;
  status: 'ACTIVE' | 'REPAID' | 'LIQUIDATED';
}

export interface BorrowIntent {
  id: string;
  borrower: string;
  assetToken: string;
  paymentToken: string;
  collateralAmount: string;
  minLTVBps: string;
  maxRateBps: string;
  maxLiqPrice: string;
  duration: string;
  status: 'OPEN' | 'MATCHED' | 'CANCELLED';
}

export interface LendIntent {
  id: string;
  lender: string;
  assetToken: string;
  paymentToken: string;
  maxPrincipal: string;
  ltvBps: string;
  rateBps: string;
  liqPrice: string;
  status: 'OPEN' | 'MATCHED' | 'CANCELLED';
}

export interface LoanIntentsResponse {
  borrowIntents: BorrowIntent[];
  lendIntents: LendIntent[];
}

export interface Distribution {
  id: string;
  assetToken: string;
  amount: string;
  paymentToken: string;
  timestamp: string;
}

export interface WindDownState {
  active: boolean;
  navAtWindDown?: string;
  timestamp?: string;
}

export interface NavResponse {
  assetToken: string;
  value: string; // Wei-denominated, BigInt serialized
  publishedAt: number; // Unix timestamp
  valid: boolean;
}

export interface AssetSubmission {
  id: string;
  type: SubmissionType;
  streetAddress: string;
  city: string;
  stateOrProvince: string;
  country: string;
  postcode: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export type SubmissionType =
  | 'EQUITY_SALE'
  | 'FULL_SALE'
  | 'DEVELOPMENT'
  | 'DEBT_VAULT';

export interface CreateSubmissionPayload {
  type: SubmissionType;
  streetAddress: string;
  city: string;
  stateOrProvince: string;
  country: string;
  postcode: string;
  propertyType: string;
  targetFundingAmount?: number;
  askingPrice?: number;
  targetEquityPercent?: number;
  minInvestment?: number;
  maxInvestment?: number;
  currentValue?: number;
  interestRate?: number;
  termMonths?: number;
  yearBuilt?: number;
}