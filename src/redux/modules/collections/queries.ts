import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Collection } from 'src/utils/storeTypes';

interface CollectionsResponse {
  message: 'string';
  collections: Collection[];
}

interface CollectionResponse {
  message: 'string';
  collection: Collection;
}

export const collectionsApi = createApi({
  reducerPath: 'collectionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:4000/collections`,
    credentials: 'include', // for cookies
  }),
  tagTypes: ['Collection'],
  endpoints: (builder) => ({
    /** If userId is provided, it will get all collections for that specific user
     *  If userId is not provided, it will get all collections
     */
    getCollections: builder.query<CollectionsResponse, void>({
      query: () => '/',
      providesTags: (result) =>
        result
          ? [
              ...result.collections.map(
                ({ id }) => ({ type: 'Collection', id } as const),
              ),
              { type: 'Collection', id: 'LIST' },
            ]
          : [{ type: 'Collection', id: 'LIST' }],
    }),

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getCollectionsByUserId: builder.query<CollectionsResponse, number>({
      query: (userId) => `/?userId=${userId}`,
      providesTags: (result) =>
        result
          ? [
              //identifier for the specific collection
              ...result.collections.map(
                ({ id }) => ({ type: 'Collection', id } as const),
              ),
              { type: 'Collection', id: 'LIST_BY_USERID' },
            ]
          : //identifier for the entire list of collections
            [{ type: 'Collection', id: 'LIST_BY_USERID' }],
    }),

    createCollection: builder.mutation<CollectionResponse, FormData>({
      query(body) {
        return {
          url: '/',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Collection', id: result?.collection.id },
      ],
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionsByUserIdQuery,
  useCreateCollectionMutation,
} = collectionsApi;
