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
  propertyName?: string;
}

export interface LendPosition {
  id: string;
  loanId: string;
  lenderId: string;
  amountFunded: number;
  claimed: boolean;
  blockchainTxHash?: string;
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