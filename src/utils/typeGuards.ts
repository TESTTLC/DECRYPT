import { StoreState } from './storeTypes';

export function isStoreState(obj: unknown): obj is StoreState {
  return (obj as StoreState).account !== undefined;
}

export function isErrorPayload(obj: unknown): obj is { message: string } {
  return (obj as { message: string }).message !== undefined;
}
