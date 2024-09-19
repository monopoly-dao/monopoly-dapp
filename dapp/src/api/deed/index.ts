import { INetworkSuccessResponse } from '@/@types/appTypes';
import { GET_METHOD } from '@/constants/appConstants';

import { DeedEndpoints } from './deedApiConstansts';
import { DeedDetailsResponse } from './deedApiTypes';
import { globalApi } from '..';

const deedApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getDeedDetails: build.query<
      INetworkSuccessResponse<DeedDetailsResponse>,
      { propertyId: string }
    >({
      query: ({ propertyId }) => ({
        url: DeedEndpoints.Get_Deed_Details.replace(':propertyId', propertyId),
        method: GET_METHOD,
      }),
      providesTags: (_r, _e, { propertyId }) => [
        { type: 'DeedDetails', id: propertyId },
      ],
    }),
  }),
});

export const { useGetDeedDetailsQuery } = deedApi;
