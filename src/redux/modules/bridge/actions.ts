import { createAction } from '@reduxjs/toolkit';
import { BridgeState } from 'src/utils/storeTypes';

export const updateBridgeState = createAction<Partial<BridgeState>>(
  'bridge/updateBridgeState',
);
