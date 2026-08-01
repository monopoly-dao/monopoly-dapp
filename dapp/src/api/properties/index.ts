import { PropertiesEndpoints } from './propertiesApiConstants';
import { Property, Wishlist } from './propertiesApiTypes';
import { globalApi } from '..';
import {
  INetworkSuccessResponse,
  PaginatedSuccessResponse,
} from '../../@types/appTypes';
import {
  DELETE_METHOD,
  GET_METHOD,
  POST_METHOD,
} from '../../constants/appConstants';

const propertiesApi = globalApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getProperties: build.query<
      PaginatedSuccessResponse<Property[]>,
      { page: number; limit: number }
    >({
      query: (payload) => ({
        url: PropertiesEndpoints.Get_Properties,
        method: GET_METHOD,
        params: payload,
      }),
      providesTags: ['Properties'],
    }),

    getProperty: build.query<INetworkSuccessResponse<Property>, string>({
      query: (payload) => ({
        url: PropertiesEndpoints.Get_Property.replace(':propertyId', payload),
        method: GET_METHOD,
      }),
      providesTags: (_r, _e, arg) => [{ type: 'Properties', id: arg }],
    }),

    getWishlist: build.query<INetworkSuccessResponse<Wishlist>, void>({
      query: () => ({
        url: PropertiesEndpoints.Get_Wishlist,
        method: GET_METHOD,
      }),
      providesTags: ['Wishlist'],
    }),

    addToWishlist: build.mutation<INetworkSuccessResponse<Wishlist>, string>({
      query: (propertyId) => ({
        url: PropertiesEndpoints.Add_Property_To_Wishlist.replace(
          ':propertyId',
          propertyId
        ),
        method: POST_METHOD,
      }),
      invalidatesTags: ['Wishlist'],
    }),

    removeFromWishlist: build.mutation<
      INetworkSuccessResponse<Wishlist>,
      string
    >({
      query: (propertyId) => ({
        url: PropertiesEndpoints.Remove_Property_From_Wishlist.replace(
          ':propertyId',
          propertyId
        ),
        method: DELETE_METHOD,
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
