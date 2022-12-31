import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { changeChain } from 'src/utils/functions/MetaMask';
import { oldLinks } from 'src/utils/routes';
import { StoreState } from 'src/utils/storeTypes';
import { ChainsIds } from 'src/utils/types';

const useCurrentChain = () => {
  const location = useLocation();
  console.log('Location: ', location.pathname);
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const [chainId, setChainId] = useState<number>();

  const getChainId = useCallback(async () => {
    if (!provider) return;

    const { chainId: currentChainId } = await provider.getNetwork();
    setChainId(currentChainId);
  }, [provider]);

  useEffect(() => {
    getChainId();
  }, [getChainId, provider]);

  if (chainId) {
    console.log('Lets see: ', ethers.utils.hexlify(chainId));
  }

  if (
    location.pathname.includes('/oldStaking') ||
    location.pathname.includes('/authorityX')
  ) {
    changeChain(ChainsIds.OldTLC);
  } else if (chainId && ethers.utils.hexlify(chainId) === ChainsIds.OldTLC) {
    console.log("I'm in the old chain");
    changeChain('0x911');
  }

  useEffect(() => {
    if (window.ethereum) {
      //@ts-ignore
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.ethereum]);

  return { chainId };
};

export default useCurrentChain;
