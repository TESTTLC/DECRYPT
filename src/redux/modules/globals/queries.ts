import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BACKEND;

interface HistoryResponse {
  addressesHistory: {
    day: string;
    count: number;
    total: number;
  }[];

  transactionsHistory: {
    day: string;
    count: number;
    total: number;
  }[];
}

export const globalsApi = createApi({
  reducerPath: 'globalsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/stats`,
    // credentials: 'include', // for cookies
  }),
  tagTypes: ['AddressesHistory'],
  endpoints: (builder) => ({
    getAddressesHistory: builder.query<HistoryResponse, void>({
      query: () => '/history',
    }),
  }),
});

export const { useGetAddressesHistoryQuery } = globalsApi;
