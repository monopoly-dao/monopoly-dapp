import { ProfileEndpoints } from './profileApiConstants';
import {
  TransactionResponse,
  UserAssetsResponse,
  UserDetailsResponse,
  WalletStatsResponse,
} from './profileApiTypes';
import { globalApi } from '..';
import {
  INetworkSuccessResponse,
  PaginatedSuccessResponse,
} from '../../@types/appTypes';
import { GET_METHOD, PUT_METHOD } from '../../constants/appConstants';

const profileApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getUserDetails: build.query<
      INetworkSuccessResponse<UserDetailsResponse>,
      void
    >({
      query: () => ({
        url: ProfileEndpoints.Get_Profile_Details,
        method: GET_METHOD,
      }),
      providesTags: ['Profile'],
    }),

    updateUserDetails: build.mutation<
      INetworkSuccessResponse<UserDetailsResponse>,
      FormData
    >({
      query: (data) => ({
        url: ProfileEndpoints.Update_Profile,
        method: PUT_METHOD,
        data,
      }),
      invalidatesTags: ['Profile'],
    }),

    getWalletStats: build.query<
      INetworkSuccessResponse<WalletStatsResponse>,
      void
    >({
      query: () => ({
        url: ProfileEndpoints.Get_Wallet_Stats,
        method: GET_METHOD,
      }),
      providesTags: ['WalletStats'],
    }),

    getUserAssets: build.query<
      PaginatedSuccessResponse<UserAssetsResponse[]>,
      { page: number; limit: number }
    >({
      query: (payload) => ({
        url: ProfileEndpoints.Get_Holdings,
        method: GET_METHOD,
        params: {
          page: payload.page,
          limit: payload.limit,
        },
      }),
      providesTags: ['Holdings'],
    }),

    getUserTransactions: build.query<
      PaginatedSuccessResponse<TransactionResponse[]>,
      { page: number; limit: number }
    >({
      query: (payload) => ({
        url: ProfileEndpoints.Get_Transactions,
        method: GET_METHOD,
        params: {
          page: payload.page,
          limit: payload.limit,
        },
      }),
      providesTags: ['Transactions'],
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useGetWalletStatsQuery,
  useGetUserAssetsQuery,
  useGetUserTransactionsQuery,
} = profileApi;
