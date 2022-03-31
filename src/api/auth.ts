import { BaseUser } from 'src/utils/storeTypes';

import { postRequest } from './api';

interface UserResponse {
  message: string;
  user: BaseUser;
}

export const loginAPI = async (email: string, password: string) => {
  const url = `/auth/login`;
  return postRequest<UserResponse>(
    url,
    {
      email,
      password,
    },
    { withCredentials: true },
  );
};

export const registerAPI = async (email: string, password: string) => {
  const url = `/auth/register`;
  return postRequest<UserResponse>(
    url,
    {
      email,
      password,
    },
    { withCredentials: true },
  );
};
