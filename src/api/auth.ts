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
    {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': true,
      },
    },
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
    {
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Credentials': true,
      },
    },
  );
};

export const activateAccountAPI = async (
  email: string,
  activationCode: number,
) => {
  const url = `/auth/activateAccount/${email}`;
  return postRequest<UserResponse>(
    url,
    {
      activationCode,
    },
    {
      withCredentials: true,
    },
  );
};

export const sendActivationCodeAPI = async (email: string) => {
  const url = `/auth/sendActivationCode/${email}`;
  return postRequest(url);
};
