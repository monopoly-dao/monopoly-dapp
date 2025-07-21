import { CampaignEndpoints } from './constants';
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
      }
    >({
      query: (data) => ({
        url: CampaignEndpoints.JoinCampaign,
        method: 'POST',
        data,
      }),
    }),
  }),
});

export const { useJoinCampaignMutation } = campaignApi;
