import { getRequest, patchRequest, postRequest } from './api';

export const updateUserAPI = async (userData: FormData, userId: number) => {
  const url = `/user/${userId}`;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return patchRequest(url, userData, {
    withCredentials: true,
  });
};

export const updatePasswordAPI = async (password: string, userId: number) => {
  const url = `/user/password/${userId}`;
  console.log('password: ', password);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return patchRequest(
    url,
    { password },
    {
      withCredentials: true,
    },
  );
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
