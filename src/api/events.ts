import { Collection } from 'src/utils/storeTypes';
import { Activity } from 'src/utils/types';

import { getRequest } from './api';

const route = '/events';

export const getSalesActivity = async (walletAddress: string) => {
  const url = `${route}/activity/${walletAddress}`;
  const result = await getRequest<Activity>(url);

  return result.data;
};
