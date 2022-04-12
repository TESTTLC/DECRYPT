// import Cookies from 'universal-cookie';
import { createUnparsedSourceFile } from 'typescript';
import Cookies from 'universal-cookie';

import { headerPayloadName } from '../globals';

import {
  addHeaderPayloadToLocalStorageWithExpiry,
  getHeaderPayloadFromLocalStorage,
} from './LocalStorage';
import { addMinutesToCurrentDateTime } from './utils';

const cookies = new Cookies();

export const addHeaderPayloadToCookies = async () => {
  const headerPayload = getHeaderPayloadFromLocalStorage();
  const newExpiryDate = addMinutesToCurrentDateTime(30);
  const newExpiryCookiesDate = new Date(addMinutesToCurrentDateTime(30));

  if (headerPayload) {
    const headerPayloadValue = JSON.parse(headerPayload).value;
    if (JSON.parse(headerPayload).expiry >= new Date(new Date().getTime())) {
      addHeaderPayloadToLocalStorageWithExpiry(
        headerPayloadValue,
        newExpiryDate,
      );
    }

    cookies.set(headerPayloadName, headerPayloadValue, {
      path: '/',
      secure: true,
      sameSite: 'none',
      expires: newExpiryCookiesDate,
    });
  }
};

export const getHeaderPayloadFromCookies = async () => {
  const headerPayloadCookie = cookies.get(headerPayloadName);

  return headerPayloadCookie;
};
