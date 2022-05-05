import { Web3Provider } from '@ethersproject/providers';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { marketplaceAddress } from 'src/utils/globals';
import { StoreState } from 'src/utils/storeTypes';

import { Marketplace, ThirdwebSDK } from '../../thirdweb-dev/sdk';

export const useMarketplaceSDK = () => {
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sdk, setSdk] = useState<ThirdwebSDK>();
  const [marketplace, setMarketplace] = useState<Marketplace>();

  const loadSDK = useCallback(async () => {
    if (provider && walletAddress) {
      const _sdk = new ThirdwebSDK(provider.getSigner());

      const _marketplace = _sdk.getMarketplace(marketplaceAddress);

      setSdk(_sdk);
      setMarketplace(_marketplace);
    }
  }, [provider, walletAddress]);

  useEffect(() => {
    loadSDK();
  }, [loadSDK]);

  return { sdk, marketplace, provider, walletAddress };
};
