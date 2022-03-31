import { Web3Provider } from '@ethersproject/providers';
import { createAction } from '@reduxjs/toolkit';

export const setProvider = createAction<Web3Provider | undefined>(
  'globals/setProvider',
);
export const openSidebar = createAction('globals/openSidebar');
export const closeSidebar = createAction('globals/closeSidebar');
export const setIsLoading = createAction<boolean>('globals/setIsLoading');
