/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BridgeState, StoreState } from 'src/utils/storeTypes';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { updateBridgeState } from 'src/redux/modules/bridge/actions';

import { modalChains } from '../../utils/globals';

import EVM from './components/EVM';
import Elrond from './components/Elrond';

const CrossChainBridge: React.FC = () => {
  const dispatch = useDispatch();
  const bridgeState = useSelector<StoreState, BridgeState>(
    (state) => state.bridge,
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showBridge, setShowBridge] = useState(true);

  return (
    <div className="flex flex-col flex-1 items-center">
      {/* {!showBridge && (
        <div className="w-full mt-20 flex flex-col items-center">
          <p className="mb-2">Password to unlock the bridge</p>
          <input
            className="bg-black px-4 py-1 bg-opacity-60 rounded-xl w-64 h-8"
            onChange={onPwChange}
            type="password"
          />
        </div>
      )} */}
      {/* {showBridge && ( */}
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
      {/* )} */}
    </div>
  );
};

export default CrossChainBridge;
