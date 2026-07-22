import { globalApi } from '..';
import {
  Vault,
  Loan,
  LendPosition,
  AmountDueResponse,
  RequestLoanPayload,
  LendPayload,
  RepayPayload,
  NavResponse,
  Distribution,
  WindDownState,
  LoanIntentsResponse,
  AssetSubmission,
  CreateSubmissionPayload,
} from './vaultsApiTypes';
import { INetworkSuccessResponse } from '../../@types/appTypes';

const vaultsApiConstants = {
  Get_Vault: '/vaults/:propertyId',
  Request_Loan: '/vaults/:vaultId/loans/request',
  Lend: '/loans/:loanId/lend',
  Repay: '/loans/:loanId/repay',
  Get_Amount_Due: '/loans/:loanId/amount-due',
  Cancel_Borrow_Intent: '/loans/:loanId/borrow-intent',
  Cancel_Lend_Intent: '/loans/:loanId/lend-intent',
  Get_User_Loans: '/loans/user/:address',
  Get_Loan_Intents: '/assets/:assetToken/loan-intents',
  Get_Nav: '/assets/:assetToken/nav',
  Get_Distributions: '/assets/:assetToken/distributions',
  Get_WindDown: '/assets/:assetToken/winddown',
  Create_Submission: '/submissions',
  Get_User_Submissions: '/submissions/user/:userId',
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

// Mock NAV
const mockNav: NavResponse = {
  assetToken: '0xCollateralToken',
  value: '284000000000000000000000', // 284,000 in 1e18
  publishedAt: Math.floor(Date.now() / 1000) - 10800, // 3h ago
  valid: true,
};

// Mock distributions
const mockDistributions: Distribution[] = [
  {
    id: 'dist_01',
    assetToken: '0xCollateralToken',
    amount: '1240.00',
    paymentToken: 'USDC',
    timestamp: '2025-06-12T00:00:00Z',
  },
  {
    id: 'dist_02',
    assetToken: '0xCollateralToken',
    amount: '1190.00',
    paymentToken: 'USDC',
    timestamp: '2025-05-12T00:00:00Z',
  },
];

// Mock wind-down state
const mockWindDown: WindDownState = {
  active: false,
};

// Mock loan intents (from subgraph)
const mockLoanIntents: LoanIntentsResponse = {
  borrowIntents: [
    {
      id: '4',
      borrower: '0xborrower',
      assetToken: '0xCollateralToken',
      paymentToken: '0xUSDC',
      collateralAmount: '35000',
      minLTVBps: '6000',
      maxRateBps: '1200',
      maxLiqPrice: '100000000',
      duration: '180',
      status: 'OPEN',
    },
  ],
  lendIntents: [
    {
      id: '2',
      lender: '0xlender',
      assetToken: '0xCollateralToken',
      paymentToken: '0xUSDC',
      maxPrincipal: '30000000000',
      ltvBps: '6500',
      rateBps: '1000',
      liqPrice: '100000000',
      status: 'OPEN',
    },
  ],
};

// Mock submissions
const mockSubmissions: AssetSubmission[] = [
  {
    id: 'sub_01',
    type: 'DEBT_VAULT',
    streetAddress: '14 Riverside Court',
    city: 'Austin',
    stateOrProvince: 'TX',
    country: 'USA',
    postcode: '78701',
    status: 'PENDING',
    createdAt: '2025-06-01T00:00:00Z',
  },
];

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

    getLoanIntents: build.query<INetworkSuccessResponse<LoanIntentsResponse>, string>({
      query: (assetToken) => ({
        url: vaultsApiConstants.Get_Loan_Intents.replace(':assetToken', assetToken),
        method: 'GET',
      }),
      transformResponse: (): INetworkSuccessResponse<LoanIntentsResponse> => ({
        data: mockLoanIntents,
        message: 'Success',
        status: 200,
      }),
    }),

    getNav: build.query<INetworkSuccessResponse<NavResponse>, string>({
      query: (assetToken) => ({
        url: vaultsApiConstants.Get_Nav.replace(':assetToken', assetToken),
        method: 'GET',
      }),
      transformResponse: (): INetworkSuccessResponse<NavResponse> => ({
        data: mockNav,
        message: 'Success',
        status: 200,
      }),
    }),

    getDistributions: build.query<INetworkSuccessResponse<Distribution[]>, string>({
      query: (assetToken) => ({
        url: vaultsApiConstants.Get_Distributions.replace(':assetToken', assetToken),
        method: 'GET',
      }),
      transformResponse: (): INetworkSuccessResponse<Distribution[]> => ({
        data: mockDistributions,
        message: 'Success',
        status: 200,
      }),
    }),

    getWindDown: build.query<INetworkSuccessResponse<WindDownState | null>, string>({
      query: (assetToken) => ({
        url: vaultsApiConstants.Get_WindDown.replace(':assetToken', assetToken),
        method: 'GET',
      }),
      transformResponse: (): INetworkSuccessResponse<WindDownState | null> => ({
        data: mockWindDown,
        message: 'Success',
        status: 200,
      }),
    }),

    cancelLendIntent: build.mutation<INetworkSuccessResponse<void>, string>({
      query: (loanId) => ({
        url: vaultsApiConstants.Cancel_Lend_Intent.replace(':loanId', loanId),
        method: 'DELETE',
      }),
      transformResponse: (): INetworkSuccessResponse<void> => ({
        data: undefined,
        message: 'Lend intent cancelled',
        status: 200,
      }),
      invalidatesTags: ['Vault'],
    }),

    createSubmission: build.mutation<INetworkSuccessResponse<AssetSubmission>, CreateSubmissionPayload>({
      query: (payload) => ({
        url: vaultsApiConstants.Create_Submission,
        method: 'POST',
        data: payload,
      }),
      transformResponse: (): INetworkSuccessResponse<AssetSubmission> => ({
        data: mockSubmissions[0],
        message: 'Submission created',
        status: 200,
      }),
      invalidatesTags: ['Vault'],
    }),

    getUserSubmissions: build.query<INetworkSuccessResponse<AssetSubmission[]>, string>({
      query: (userId) => ({
        url: vaultsApiConstants.Get_User_Submissions.replace(':userId', userId),
        method: 'GET',
      }),
      transformResponse: (): INetworkSuccessResponse<AssetSubmission[]> => ({
        data: mockSubmissions,
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
  useCancelLendIntentMutation,
  useGetUserLoansQuery,
  useGetUserLendPositionsQuery,
  useGetLoanIntentsQuery,
  useGetNavQuery,
  useGetDistributionsQuery,
  useGetWindDownQuery,
  useCreateSubmissionMutation,
  useGetUserSubmissionsQuery,
} = vaultsApi;