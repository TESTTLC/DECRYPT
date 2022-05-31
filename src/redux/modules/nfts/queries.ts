import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BaseUser, NFT } from 'src/utils/storeTypes';

const baseUrl = process.env.REACT_APP_API_BACKEND;

interface NFTsResponse {
  message: 'string';
  nfts: NFT[];
}

interface NFTResponse {
  message: 'string';
  nft: NFT;
}
interface LastCreatedResponse {
  message: 'string';
  nft: NFT;
}

interface CreatorsResponse {
  message: 'string';
  creators: BaseUser[];
}

export const nftsApi = createApi({
  reducerPath: 'nftsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/nfts`,
    credentials: 'include', // for cookies
  }),
  tagTypes: ['NFT', 'USER'],
  endpoints: (builder) => ({
    /** If userId is provided, it will get all nfts for that specific user
     *  If userId is not provided, it will get all nfts
     */
    getNFTs: builder.query<NFTsResponse, void>({
      query: () => '/',
      providesTags: (result) =>
        result
          ? [
              ...result.nfts.map(({ id }) => ({ type: 'NFT', id } as const)),
              { type: 'NFT', id: 'LIST' },
            ]
          : [{ type: 'NFT', id: 'LIST' }],
    }),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getNFTsByUserId: builder.query<NFTsResponse, number>({
      query: (userId) => `/?userId=${userId}`,
      providesTags: (result) =>
        result
          ? [
              //identifier for the specific nft
              ...result.nfts.map(({ id }) => ({ type: 'NFT', id } as const)),
              { type: 'NFT', id: 'LIST_BY_USERID' },
            ]
          : //identifier for the entire list of nfts
            [{ type: 'NFT', id: 'LIST_BY_USERID' }],
    }),

    getTopCreators: builder.query<CreatorsResponse, void>({
      query: () => '/topCreators',
      providesTags: (result) =>
        result
          ? [
              ...result.creators.map(
                ({ id }) => ({ type: 'USER', id } as const),
              ),
              { type: 'USER', id: 'CREATORS_LIST' },
            ]
          : [{ type: 'USER', id: 'CREATORS_LIST' }],
    }),

    getLastCreated: builder.query<LastCreatedResponse, void>({
      query: () => '/lastCreated',
    }),

    createNFT: builder.mutation<NFTResponse, FormData>({
      query(body) {
        return {
          url: '/',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'NFT', id: result?.nft.id },
      ],
    }),
  }),
});

export const {
  useGetNFTsQuery,
  useGetNFTsByUserIdQuery,
  useGetLastCreatedQuery,
  useCreateNFTMutation,
  useGetTopCreatorsQuery,
} = nftsApi;
