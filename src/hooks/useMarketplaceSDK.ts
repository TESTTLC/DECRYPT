import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { marketplaceAddress } from 'src/utils/globals';
import { StoreState } from 'src/utils/storeTypes';
import detectEthereumProvider from '@metamask/detect-provider';

import { Marketplace, ThirdwebSDK } from '../../thirdweb-dev/sdk';

export const useMarketplaceSDK = () => {
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentProvider, setCurrentProvider] = useState<any>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sdk, setSdk] = useState<ThirdwebSDK>();
  const [marketplace, setMarketplace] = useState<Marketplace>();
  const [currentChainId, setCurrentChainId] = useState<string>('');
  // const [currentChainId, setCurrentChainId] = useState<string>(
  //   //@ts-ignore
  //   window?.ethereum?.networkVersion
  //     ? //@ts-ignore
  //       ethers.utils.hexlify(parseInt(window?.ethereum?.networkVersion, 10))
  //     : undefined,
  // );

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

  const detectProvider = async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p: any = await detectEthereumProvider();
    setCurrentProvider(p);
    if (p && p.chainId) {
      //@ts-ignore
      setCurrentChainId(p.chainId);
    }
  };
  detectProvider();

  useEffect(() => {
    if (window.ethereum) {
      detectProvider();
      //@ts-ignore
      window.ethereum.on('chainChanged', (chainId: string) => {
        window?.location.reload();
      });
    }
  }, []);

  return { sdk, marketplace, provider, walletAddress, currentChainId };
};
