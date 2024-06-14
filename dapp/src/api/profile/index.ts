import { ProfileEndpoints } from './profileApiConstants';
import { UserDetailsResponse } from './profileApiTypes';
import { globalApi } from '..';
import { INetworkSuccessResponse } from '../../@types/appTypes';
import { GET_METHOD, PUT_METHOD } from '../../constants/appConstants';

const profileApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getUserDetails: build.query<
      INetworkSuccessResponse<UserDetailsResponse>,
      string
    >({
      query: (payload) => ({
        url: ProfileEndpoints.Get_Profile_Details.replace(':userId', payload),
        method: GET_METHOD,
      }),
      providesTags: ['Profile'],
    }),

    updateUserDetails: build.mutation<
      INetworkSuccessResponse<UserDetailsResponse>,
      { userId: string; data: FormData }
    >({
      query: (payload) => ({
        url: ProfileEndpoints.Update_Profile.replace(':id', payload.userId),
        method: PUT_METHOD,
        data: payload.data,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetUserDetailsQuery, useUpdateUserDetailsMutation } =
  profileApi;
