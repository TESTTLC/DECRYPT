import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_API_BACKEND;

interface GetLikesResponse {
  countLikes: number;
  likedByRequestingUser: boolean;
}

interface Item {
  contractAddress: string;
  contractNftId: number;
  type: 'NFT' | 'COLLECTION';
}

export const likesApi = createApi({
  reducerPath: 'likesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/likes`,
    credentials: 'include', // for cookies
  }),
  tagTypes: ['Like'],
  endpoints: (builder) => ({
    getLikes: builder.query<GetLikesResponse, Item>({
      query: ({ contractAddress, contractNftId, type }) =>
        `/?contractAddress=${contractAddress}&contractNftId=${contractNftId}&type=${type}`,

      //   providesTags: (result) =>
      //     result
      //       ? [
      //           ...result?.collections?.map(
      //             ({ id }) => ({ type: 'Collection', id } as const),
      //           ),
      //           { type: 'Collection', id: 'LIST' },
      //         ]
      //       : [{ type: 'Collection', id: 'LIST' }],
    }),

    likeItem: builder.mutation<GetLikesResponse, Item>({
      query(body) {
        return {
          url: '/',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        {
          type: 'Like',
          id: `${arg.contractAddress}/${arg.type}/${arg.contractNftId}`,
        },
      ],
    }),

    dislikeItem: builder.mutation<GetLikesResponse, Item>({
      query(body) {
        return {
          url: '/',
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        {
          type: 'Like',
          id: `${arg.contractAddress}/${arg.type}/${arg.contractNftId}`,
        },
      ],
    }),
  }),
});

export const { useGetLikesQuery, useLikeItemMutation, useDislikeItemMutation } =
  likesApi;
