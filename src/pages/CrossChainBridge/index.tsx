import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { BridgeState, StoreState } from 'src/utils/storeTypes';
import { useBridgeContracts } from 'src/hooks/useBridgeContracts';

import { ChainsIds } from '../../utils/types';
import { changeChain } from '../../utils/functions/MetaMask';
import { useContracts } from '../../hooks/useContracts';
import {
  BSCChildBridgeContractAddress,
  modalChains,
  modalCoins,
  BSCBridgeContractAddress,
} from '../../utils/globals';
import { getTransaction, initialize } from '../../api/index';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import TokensModal from './components/TokensModal';

const gasFee = 5;
const CrossChainBridge: React.FC = () => {
  const bridgeState = useSelector<StoreState, BridgeState>(
    (state) => state.bridge,
  );
  const [totalBalance, setTotalBalance] = useState(0);
  const [amountToSend, setAmountToSend] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const { mainBridgeContract, childBridgeContract } = useBridgeContracts(
    bridgeState.token,
    bridgeState.fromChain,
    bridgeState.toChain,
  );

  const { tokenContract } = useContracts('LSO');
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const [currentChainId, setCurrentChainId] = useState<string>();

  useEffect(() => {
    chainChange();
  }, []);

  useEffect(() => {
    if (window.ethereum) {
      //@ts-ignore
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentChainId(chainId);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.ethereum]);

  useEffect(() => {
    if (tokenContract && walletAddress) {
      getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenContract, walletAddress, currentChainId]);

  const chainChange = async () => {
    try {
      await changeChain(ChainsIds.TLC);
    } catch (error) {}
  };

  const initializeSwap = async () => {
    if (walletAddress && totalBalance > 0) {
      setIsLoading(true);
      const transaction = await initialize(walletAddress);
      if (transaction) {
        const available =
          transaction.totalAmount - transaction.totalMintedAmount;

        setTotalBalance(parseFloat(available.toFixed(3)));
      }

      setIsLoading(false);
    }
  };

  const getBalance = async () => {
    try {
      const transaction = await getTransaction(walletAddress ?? '');
      if (transaction && transaction.totalAmount) {
        const available =
          transaction.totalAmount - transaction.totalMintedAmount;

        setTotalBalance(parseFloat(available.toFixed(3)));
      } else {
        const result = await tokenContract.balanceOf(walletAddress);
        if (result) {
          const available = parseFloat(ethers.utils.formatEther(result));
          setTotalBalance(parseFloat(available.toFixed(3)));
        }
      }
    } catch (error) {
      console.log('Err: ', error);
    }
  };

  const approve = async () => {
    try {
      if (parseFloat(amountToSend) > 0) {
        setIsLoading(true);
        const finalAmount = parseFloat(amountToSend) + gasFee;
        const tx = await tokenContract.functions.approve(
          mainBridgeContract?.address,
          ethers.utils.parseUnits(finalAmount.toString(), 'ether'),
        );
        await tx.wait();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Err on approve: ', error);
    }
  };

  const swap = async () => {
    try {
      if (parseFloat(amountToSend) > 0) {
        console.log(
          'childBridgeContract?.address: ',
          childBridgeContract?.address,
        );
        setIsLoading(true);
        const finalAmount = parseFloat(amountToSend) + gasFee;
        const tx = await mainBridgeContract?.receiveTokens(
          ethers.utils.parseUnits(finalAmount.toString(), 'ether'),
          childBridgeContract?.address,
        );
        await tx.wait();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Err on swap: ', error);
    }
  };

  const returnTokens = async () => {
    try {
      if (parseFloat(amountToSend) > 0) {
        console.log(
          'childBridgeContract?.address: ',
          childBridgeContract?.address,
        );
        setIsLoading(true);
        const finalAmount = parseFloat(amountToSend) + gasFee;
        const tx = await childBridgeContract?.returnTokens(
          walletAddress,
          ethers.utils.parseUnits(finalAmount.toString(), 'ether'),
          mainBridgeContract?.address,
        );
        await tx.wait();
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Err on swap: ', error);
    }
  };

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
        <div className="flex">
          {/* <p className="text-green-400 font-poppins font-semibold text-lg mb-4">
            {amountToSend} TLX
          </p>
          <p className="text-white font-poppins font-semibold text-lg mb-4">
            &nbsp;available on BSC
          </p> */}
        </div>
        <div className="relative items-center w-[44rem] xs:w-[22rem] h-[23rem] px-8 py-8 xs:px-4 rounded-lg bg-black bg-opacity-60">
          <div className="relative flex bg-black bg-opacity-60 w-full h-20 rounded-lg pt-1 px-6 items-center">
            <div className="flex w-1/2 flex-col h-full">
              <p className="text-gray-400 font-medium font-poppins text-sm">
                From
              </p>
              <input
                className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                value={amountToSend}
                onChange={(e) => setAmountToSend(e.target.value)}
                type="text"
                // disabled
              ></input>
            </div>
            <TokensModal
              chains={{ TLC: modalChains.TLC }}
              type="from"
              // onFromTokenSelect={() => setFromToken()}
            />
          </div>
          <div className="w-full flex items-center justify-center h-14">
            <FaArrowCircleDown
              className="h-6 w-6 bg-transparent self-center "
              color="gray"
            />
          </div>
          <div className="relative flex bg-black bg-opacity-60 w-full h-20 rounded-lg pt-1 px-6 items-center">
            <div className="flex w-1/2 flex-col h-full">
              <p className="text-gray-400 font-medium font-poppins text-sm">
                To
              </p>
              <input
                className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                type="text"
                value={amountToSend}
              ></input>
            </div>
            <TokensModal chains={{ BSC: modalChains.BSC }} type="to" />
          </div>
          <p className="my-4 text-sm">
            You will spend{' '}
            <span className="text-green-400">{amountToSend}</span> + 5 (gas fee)
            as a total of {parseFloat(amountToSend) + 5} {bridgeState.token}
          </p>
          <div className="flex w-full space-x-8">
            <button
              onClick={approve}
              className="flex-[0.5] flex h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <TailSpin color="#fff" height={18} width={18} />
                </>
              ) : (
                `Approve`
              )}
            </button>
            <button
              // onClick={bridgeState.toChain !== 'TLC' ? swap : returnTokens}
              onClick={swap}
              className="flex flex-[0.5] h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <TailSpin color="#fff" height={18} width={18} />
                </>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="w-[44rem] xs:w-[22rem] mt-10 text-sm">
        <p className="font-poppins text-gray-300">
          Because of the decentralized nature of Decryption Protocol and the
          instability of different blockchain mainnets, your cross-chain
          transaction could take up to 1 minute to complete but your assets are
          perfectly safe with Decryption protocol.
        </p>
      </div>
    </div>
  );
};

export default CrossChainBridge;
