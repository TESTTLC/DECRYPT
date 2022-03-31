import { Collection } from 'src/utils/storeTypes';

import { getRequest } from './api';

const collection = '/collections';
const createCollectionROute = '/collections';

export const getSingleCollectionAPI = async (id: number) => {
  const url = `/collections/${id}`;
  return getRequest<Collection>(url);
};

export const getUserCollectionsAPI = async (userId: number) => {
  const url = `/collections`;
  return getRequest<Collection>(url, {
    params: {
      userId,
    },
  });
};
