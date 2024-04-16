import { PropertiesEndpoints } from './propertiesApiConstants';
import { Property, Wishlist } from './propertiesApiTypes';
import { globalApi } from '..';
import { INetworkSuccessResponse } from '../../@types/appTypes';
import { GET_METHOD, POST_METHOD } from '../../constants/appConstants';

const propertiesApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProperties: build.query<INetworkSuccessResponse<Property[]>, void>({
      query: () => ({
        url: PropertiesEndpoints.Get_Properties,
        method: GET_METHOD,
      }),
      providesTags: ['Properties'],
    }),

    getProperty: build.query<{ propertyDetails: Property }, string>({
      query: (payload) => ({
        url: PropertiesEndpoints.Get_Property.replace(':propertyId', payload),
        method: GET_METHOD,
      }),
      providesTags: (_r, _e, arg) => [{ type: 'Properties', id: arg }],
    }),

    getWishlist: build.query<INetworkSuccessResponse<Wishlist>, string>({
      query: (payload) => ({
        url: PropertiesEndpoints.Get_Wishlist.replace(':userId', payload),
        method: GET_METHOD,
      }),
      providesTags: ['Wishlist'],
    }),

    addToWishlist: build.mutation<
      INetworkSuccessResponse<Wishlist>,
      { propertyId: string; userId: string }
    >({
      query: (payload) => ({
        url: PropertiesEndpoints.Add_Property_To_Wishlist.replace(
          ':propertyId',
          payload.propertyId
        ),
        method: POST_METHOD,
        data: {
          userId: payload.userId,
        },
      }),
      invalidatesTags: ['Wishlist'],
    }),

    removeFromWishlist: build.mutation<
      INetworkSuccessResponse<Wishlist>,
      { propertyId: string; userId: string }
    >({
      query: (payload) => ({
        url: PropertiesEndpoints.Remove_Property_From_Wishlist.replace(
          ':propertyId',
          payload.propertyId
        ),
        method: POST_METHOD,
        data: {
          userId: payload.userId,
        },
      }),
      invalidatesTags: ['Wishlist'],
    }),
  }),
});

export const {
  useGetPropertiesQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetPropertyQuery,
  useGetWishlistQuery,
} = propertiesApi;
