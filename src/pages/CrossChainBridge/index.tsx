/* eslint-disable no-nested-ternary */
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { BridgeState, StoreState } from 'src/utils/storeTypes';
import { useBridgeContracts } from 'src/hooks/useBridgeContracts';
import { getChain, getChainId } from 'src/utils/functions/Contracts';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { updateBridgeState } from 'src/redux/modules/bridge/actions';

import { ChainsIds } from '../../utils/types';
import { changeChain } from '../../utils/functions/MetaMask';
import { useContracts } from '../../hooks/useContracts';
import { modalChains } from '../../utils/globals';
import { getTransaction, initialize } from '../../api/index';

import TokensModal from './components/TokensModal';
import EVM from './components/EVM';
import Elrond from './components/Elrond';

const CrossChainBridge: React.FC = () => {
  const dispatch = useDispatch();
  const bridgeState = useSelector<StoreState, BridgeState>(
    (state) => state.bridge,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col">
        <div className="w-[44rem] xs:w-[22rem] mt-10 text-sm mb-4">
          <p className="font-poppins text-gray-300">
            Before leaving the page, wait for the conversion to be complete. A
            smart contract is used to automate the process, eliminating the
            possibility of manual intervention in the conversion process.
          </p>
        </div>
        <div className="flex w-full justify-between mb-4 h-10 space-x-4">
          <button
            onClick={() => {
              setSelectedIndex(0);
              if (selectedIndex !== 0) {
                dispatch(
                  updateBridgeState({
                    ...bridgeState,
                    fromChain: modalChains.TLC.tag,
                    toChain: modalChains.BSC.tag,
                  }),
                );
              }
            }}
            className={`flex flex-[0.5] items-center justify-center  bg-opacity-70 text-center rounded-lg
            ${
              selectedIndex === 0
                ? 'bg-gradient-to-br from-green-400 to-blue-600'
                : 'bg-black'
            }
            `}
          >
            EVM chains
          </button>
          <button
            onClick={() => {
              setSelectedIndex(1);
              if (selectedIndex !== 1) {
                dispatch(
                  updateBridgeState({
                    token: 'EGLD',
                    fromChain: modalChains.TLC.tag,
                    toChain: modalChains.ELROND.tag,
                  }),
                );
              }
            }}
            className={`flex flex-[0.5] items-center justify-center  bg-opacity-70 text-center rounded-lg
            ${
              selectedIndex === 1
                ? 'bg-gradient-to-br from-green-400 to-blue-600'
                : 'bg-black'
            }
            `}
          >
            Elrond chain
          </button>
        </div>
        {selectedIndex === 0 && <EVM />}
        {selectedIndex === 1 && <Elrond />}
        <div className="w-[44rem] xs:w-[22rem] mt-10 text-sm">
          <p className="font-poppins text-gray-300">
            Because of the decentralized nature of Decryption Protocol and the
            instability of different blockchain mainnets, your cross-chain
            transaction could take up to 1 minute to complete but your assets
            are perfectly safe with Decryption protocol.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CrossChainBridge;
