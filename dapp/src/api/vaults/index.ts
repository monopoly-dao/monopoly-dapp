import { globalApi } from '..';
import {
  Vault,
  Loan,
  LendPosition,
  AmountDueResponse,
  RequestLoanPayload,
  LendPayload,
  RepayPayload,
} from './vaultsApiTypes';
import { INetworkSuccessResponse } from '../../@types/appTypes';

const vaultsApiConstants = {
  Get_Vault: '/vaults/:propertyId',
  Request_Loan: '/vaults/:vaultId/loans/request',
  Lend: '/loans/:loanId/lend',
  Repay: '/loans/:loanId/repay',
  Get_Amount_Due: '/loans/:loanId/amount-due',
  Cancel_Borrow_Intent: '/loans/:loanId/borrow-intent',
  Get_User_Loans: '/loans/user/:address',
  Get_Loan_Intents: '/assets/:assetToken/loan-intents',
};

// Mock data
const mockVault: Vault = {
  id: 'vault_mock',
  propertyId: 'prop_mock',
  collateralToken: 'PROPERTY_TOKEN',
  stablecoinToken: 'USDC',
  maxLtvRatio: 0.6,
  loans: [
    {
      id: 'loan_01',
      vaultId: 'vault_mock',
      borrowerId: '0x1234',
      pledgedTokenAmount: '35000',
      requestedAmount: 50000,
      fundedAmount: 12000,
      interestRate: 12,
      termMonths: 6,
      status: 'REQUESTED',
      propertyName: '14 Riverside Court',
    },
  ],
};

const mockLoans: Loan[] = [
  {
    id: 'loan_01',
    vaultId: 'vault_1',
    borrowerId: 'user_1',
    pledgedTokenAmount: '35000',
    requestedAmount: 50000,
    fundedAmount: 50000,
    interestRate: 12,
    termMonths: 6,
    status: 'ACTIVE',
    repaymentDueDate: '2025-12-15',
    propertyName: '14 Riverside Court',
  },
];

const mockLendPositions: LendPosition[] = [
  {
    id: 'pos_01',
    loanId: 'loan_01',
    lenderId: 'user_1',
    amountFunded: 12000,
    claimed: false,
    interestRate: 12,
    termMonths: 6,
    status: 'ACTIVE',
    repaymentDueDate: '2025-12-15',
    propertyName: '14 Riverside Court',
  },
];

const mockAmountDue: AmountDueResponse = {
  loanId: 'loan_01',
  amountDue: '53000',
  source: 'calculated',
};

const vaultsApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getVault: build.query<INetworkSuccessResponse<Vault>, string>({
      query: (propertyId) => ({
        url: vaultsApiConstants.Get_Vault.replace(':propertyId', propertyId),
        method: 'GET',
      }),
      transformResponse: (): INetworkSuccessResponse<Vault> => ({
        data: mockVault,
        message: 'Success',
        status: 200,
      }),
      providesTags: ['Vault'],
    }),

    requestLoan: build.mutation<INetworkSuccessResponse<Loan>, { vaultId: string; payload: RequestLoanPayload }>({
      query: ({ vaultId, payload }) => ({
        url: vaultsApiConstants.Request_Loan.replace(':vaultId', vaultId),
        method: 'POST',
        data: payload,
      }),
      transformResponse: (): INetworkSuccessResponse<Loan> => ({
        data: mockVault.loans[0],
        message: 'Loan request created',
        status: 200,
      }),
      invalidatesTags: ['Vault'],
    }),

    lend: build.mutation<INetworkSuccessResponse<Loan>, { loanId: string; payload: LendPayload }>({
      query: ({ loanId, payload }) => ({
        url: vaultsApiConstants.Lend.replace(':loanId', loanId),
        method: 'POST',
        data: payload,
      }),
      transformResponse: (): INetworkSuccessResponse<Loan> => ({
        data: mockVault.loans[0],
        message: 'Loan funded',
        status: 200,
      }),
      invalidatesTags: ['Vault'],
    }),

    repay: build.mutation<INetworkSuccessResponse<void>, { loanId: string; payload: RepayPayload }>({
      query: ({ loanId, payload }) => ({
        url: vaultsApiConstants.Repay.replace(':loanId', loanId),
        method: 'POST',
        data: payload,
      }),
      transformResponse: (): INetworkSuccessResponse<void> => ({
        data: undefined,
        message: 'Repayment successful',
        status: 200,
      }),
      invalidatesTags: ['Vault'],
    }),

    getAmountDue: build.query<INetworkSuccessResponse<AmountDueResponse>, string>({
      query: (loanId) => ({
        url: vaultsApiConstants.Get_Amount_Due.replace(':loanId', loanId),
        method: 'GET',
      }),
      transformResponse: (): INetworkSuccessResponse<AmountDueResponse> => ({
        data: mockAmountDue,
        message: 'Success',
        status: 200,
      }),
    }),

    cancelBorrowIntent: build.mutation<INetworkSuccessResponse<void>, string>({
      query: (loanId) => ({
        url: vaultsApiConstants.Cancel_Borrow_Intent.replace(':loanId', loanId),
        method: 'DELETE',
      }),
      transformResponse: (): INetworkSuccessResponse<void> => ({
        data: undefined,
        message: 'Borrow intent cancelled',
        status: 200,
      }),
      invalidatesTags: ['Vault'],
    }),

    getUserLoans: build.query<INetworkSuccessResponse<Loan[]>, string>({
      query: (address) => ({
        url: vaultsApiConstants.Get_User_Loans.replace(':address', address),
        method: 'GET',
      }),
      transformResponse: (): INetworkSuccessResponse<Loan[]> => ({
        data: mockLoans,
        message: 'Success',
        status: 200,
      }),
    }),

    getUserLendPositions: build.query<INetworkSuccessResponse<LendPosition[]>, string>({
      query: (address) => ({
        url: vaultsApiConstants.Get_User_Loans.replace(':address', address),
        method: 'GET',
      }),
      transformResponse: (): INetworkSuccessResponse<LendPosition[]> => ({
        data: mockLendPositions,
        message: 'Success',
        status: 200,
      }),
    }),

    getLoanIntents: build.query<INetworkSuccessResponse<Loan[]>, string>({
      query: (assetToken) => ({
        url: vaultsApiConstants.Get_Loan_Intents.replace(':assetToken', assetToken),
        method: 'GET',
      }),
      transformResponse: (): INetworkSuccessResponse<Loan[]> => ({
        data: mockVault.loans,
        message: 'Success',
        status: 200,
      }),
    }),
  }),
});

export const {
  useGetVaultQuery,
  useRequestLoanMutation,
  useLendMutation,
  useRepayMutation,
  useGetAmountDueQuery,
  useCancelBorrowIntentMutation,
  useGetUserLoansQuery,
  useGetUserLendPositionsQuery,
  useGetLoanIntentsQuery,
} = vaultsApi;