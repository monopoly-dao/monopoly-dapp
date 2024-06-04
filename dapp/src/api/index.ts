// 'use client';

import { createApi } from '@reduxjs/toolkit/query/react';
// import { createApi } from '@reduxjs/toolkit/query';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

import {
  AXIOS_TIMEOUT_MSG,
  AXIOS_TIMEOUT_TIME,
  GLOBAL_API_REDUCER_PATH,
} from '../constants/appConstants';

// TODO: convert hardcoded base urls to env;
export const AUTH_BASE_URL = 'https://settley-auth.fly.dev';
export const BASE_URL = 'https://settley.fly.dev';

// initialize an empty api service that we'll inject endpoints into later as needed
axios.defaults.timeout = AXIOS_TIMEOUT_TIME;
axios.defaults.timeoutErrorMessage = AXIOS_TIMEOUT_MSG;
axios.defaults.maxContentLength = Infinity;
axios.defaults.maxBodyLength = Infinity;

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async (args, _api, _extraOptions) => {
    // let session: Session | null = null;
    const { url, method, data, params } = args;

    try {
      // session = await getSession();
      // const token = session && session.accessToken;

      const result = await axios({
        url: url,
        method,
        data,
        params,
        baseURL: baseUrl,
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        timeout: AXIOS_TIMEOUT_TIME,
        timeoutErrorMessage: AXIOS_TIMEOUT_MSG,
      });

      return { data: result?.data ? result.data : null };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      if (
        err?.response?.data &&
        typeof err.response.data === 'object' &&
        err.response.data &&
        'message' in err.response.data &&
        typeof err.response.data.message === 'string' &&
        err?.response?.data?.message === 'Unauthorized request'
      ) {
        toast.error('Session expired. Please login again');
        signOut();
      }

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const globalApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL as string,
  }),
  reducerPath: GLOBAL_API_REDUCER_PATH,
  endpoints: () => ({}),
  tagTypes: ['Properties', 'Wishlist', 'Profile'],
});
