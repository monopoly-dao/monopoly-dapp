import { INetworkSuccessResponse } from '@/@types/appTypes';

import { CampaignEndpoints } from './constants';
import { CampaignPaymentResponse } from './types';
import { globalApi } from '..';

const campaignApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    joinCampaign: build.mutation<
      void,
      {
        firstName: string;
        lastName: string;
        phone: string;
        email: string;
        country: string;
        walletAddress?: string;
        amount: number;
        type: string;
      }
    >({
      query: (data) => ({
        url: CampaignEndpoints.JoinCampaign,
        method: 'POST',
        data,
      }),
    }),

    getCampaignPayments: build.query<
      INetworkSuccessResponse<CampaignPaymentResponse[]>,
      { email: string }
    >({
      query: ({ email }) => ({
        url: CampaignEndpoints.GetAllPayments.replace(':email', email),
        method: 'GET',
      }),
      providesTags: ['CampaignPayments'],
    }),
  }),
});

export const { useJoinCampaignMutation, useGetCampaignPaymentsQuery } =
  campaignApi;
