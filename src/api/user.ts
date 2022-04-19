import { getRequest, patchRequest } from './api';

export const updateUserAPI = async (userData: FormData, userId: number) => {
  const url = `/user/${userId}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return patchRequest(url, userData, {
    withCredentials: true,
    headers: {
      'Access-Control-Allow-Credentials': true,
    },
  });
};

export const getUserAPI = async (id: number) => {
  const url = `/user/${id}`;
  return getRequest(url, {
    withCredentials: true,
    // headers: {
    //   'Access-Control-Allow-Credentials': true,
    // },
  });
};
