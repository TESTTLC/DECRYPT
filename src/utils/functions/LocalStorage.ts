import { User } from '@auth0/auth0-react';

import { headerPayloadName } from '../globals';

export const isUserInLocalStorage = () => {
  return localStorage.getItem('user') ? true : false;
};
export const getUserFromLocalStorage = () => {
  return localStorage.getItem('user');
};
export const addUserInLocalStorage = (user: Partial<User>) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const addHeaderPayloadToLocalStorageWithExpiry = (
  headerPayloadValue: string,
  // expiryDate: Date,
  expiryDate: number,
) => {
  return localStorage.setItem(
    headerPayloadName,
    JSON.stringify({ value: headerPayloadValue, expiry: expiryDate }),
  );
};

export const getHeaderPayloadFromLocalStorage = () => {
  return localStorage.getItem(headerPayloadName);
};
