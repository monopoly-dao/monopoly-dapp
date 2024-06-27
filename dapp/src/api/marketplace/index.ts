import { INetworkSuccessResponse } from '@/@types/appTypes';
import { POST_METHOD } from '@/constants/appConstants';

import { MarketplaceEndpoints } from './marketplaceApiConstants';
import { globalApi } from '..';

const marketplaceApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    enterPosition: build.mutation<
      INetworkSuccessResponse<void>,
      { userFirebaseId: string; propertyId: string; units: number }
    >({
      query: (payload) => ({
        url: MarketplaceEndpoints.enterPosition,
        method: POST_METHOD,
        data: payload,
      }),
      invalidatesTags: (_r, _e, arg) => [
        { type: 'Properties', id: arg.propertyId },
        'WalletStats',
        'Transactions',
        'Holdings',
      ],
    }),
  }),
});

export const { useEnterPositionMutation } = marketplaceApi;
