import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { INetworkSuccessResponse } from '@/@types/appTypes';
import { AUTH_BASE_URL } from '@/api';
import { UNAUTHENTICATED_API_REDUCER_PATH } from '@/constants/appConstants';

import { AuthEndpoints } from './authApiConstants';

export const unauthenticatedApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_BASE_URL,
  }),
  reducerPath: UNAUTHENTICATED_API_REDUCER_PATH,
  tagTypes: [],
  endpoints: (build) => ({
    campaignSignup: build.mutation<
      INetworkSuccessResponse<void>,
      { email: string }
    >({
      query: ({ email }) => ({
        url: AuthEndpoints.CampaignSignup,
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const { useCampaignSignupMutation } = unauthenticatedApi;
