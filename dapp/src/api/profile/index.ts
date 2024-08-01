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
import {
  GET_METHOD,
  POST_METHOD,
  PUT_METHOD,
} from '../../constants/appConstants';

const profileApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getUserDetails: build.query<
      INetworkSuccessResponse<UserDetailsResponse>,
      string
    >({
      query: (payload) => ({
        url: ProfileEndpoints.Get_Profile_Details.replace(
          ':userFirebaseId',
          payload
        ),
        method: GET_METHOD,
      }),
      providesTags: ['Profile'],
    }),

    createUserDetails: build.mutation<
      INetworkSuccessResponse<UserDetailsResponse>,
      { userFirebaseId: string; data: FormData }
    >({
      query: (payload) => ({
        url: ProfileEndpoints.Create_Profile.replace(
          ':userFirebaseId',
          payload.userFirebaseId
        ),
        method: POST_METHOD,
        data: payload.data,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateUserDetails: build.mutation<
      INetworkSuccessResponse<UserDetailsResponse>,
      { userFirebaseId: string; data: FormData }
    >({
      query: (payload) => ({
        url: ProfileEndpoints.Update_Profile.replace(
          ':userFirebaseId',
          payload.userFirebaseId
        ),
        method: PUT_METHOD,
        data: payload.data,
      }),
      invalidatesTags: ['Profile'],
    }),

    getWalletStats: build.query<
      INetworkSuccessResponse<WalletStatsResponse>,
      string
    >({
      query: (payload) => ({
        url: ProfileEndpoints.Get_Wallet_Stats.replace(
          ':userFirebaseId',
          payload
        ),
        method: GET_METHOD,
      }),
      providesTags: ['WalletStats'],
    }),

    getUserAssets: build.query<
      PaginatedSuccessResponse<UserAssetsResponse[]>,
      { page: number; limit: number; userFirebaseId: string }
    >({
      query: (payload) => ({
        url: ProfileEndpoints.Get_Holdings.replace(
          ':userFirebaseId',
          payload.userFirebaseId
        ),
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
      {
        page: number;
        limit: number;
        userFirebaseId: string;
        sort: Record<string, 'asc' | 'desc'>;
      }
    >({
      query: (payload) => ({
        url: ProfileEndpoints.Get_Transactions.replace(
          ':userFirebaseId',
          payload.userFirebaseId
        ),
        method: GET_METHOD,
        params: {
          page: payload.page,
          limit: payload.limit,
          sort: payload.sort,
        },
      }),
      providesTags: ['Transactions'],
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useCreateUserDetailsMutation,
  useUpdateUserDetailsMutation,
  useGetWalletStatsQuery,
  useGetUserAssetsQuery,
  useGetUserTransactionsQuery,
} = profileApi;
