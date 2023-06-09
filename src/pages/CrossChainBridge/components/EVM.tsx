/* eslint-disable no-nested-ternary */
import { ethers } from 'ethers';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { TailSpin } from 'react-loader-spinner';
import { BridgeState, StoreState } from 'src/utils/storeTypes';
import { useBridgeContracts } from 'src/hooks/useBridgeContracts';
import { getChainId } from 'src/utils/functions/Contracts';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { getTransaction, initialize } from 'src/api/index';
import { isStableCoin } from 'src/utils/functions/utils';
import SideBridge from 'src/contracts/SideBridge.json';

import { ChainsIds } from '../../../utils/types';
import { changeChain } from '../../../utils/functions/MetaMask';
import { modalChains, modalCoins } from '../../../utils/globals';

import TokensModal from './TokensModal';

const fees = {
  TLC: 0.1,
  LSO: 0.1,
  USDT: 0.1,
  USDC: 0.1,
};

// const fee = 0.1;

const EVM: React.FC = () => {
  const bridgeState = useSelector<StoreState, BridgeState>(
    (state) => state.bridge,
  );
  const [totalBalance, setTotalBalance] = useState(0);
  const [amountToSend, setAmountToSend] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [approveDone, setApproveDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { mainBridgeContract, sideBridgeContract, tokenContract } =
    useBridgeContracts(
      bridgeState.token,
      bridgeState.fromChain,
      bridgeState.toChain,
    );

  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const [currentChainId, setCurrentChainId] = useState<string>();
  const [fee, setFee] = useState(
    bridgeState.token === 'TLC' || bridgeState.token === 'wTLC' ? 0.1 : 1,
  );

  useEffect(() => {
    if (bridgeState.token === 'TLC' || bridgeState.token === 'wTLC') {
      setFee(0.1);
    } else {
      setFee(1);
    }
    //   setFee(bridgeState.token === 'LSO' ? 5 : 1);
  }, [bridgeState.token]);

  const chainChange = useCallback(async () => {
    try {
      const chainToChange = getChainId(bridgeState.fromChain);
      await changeChain(chainToChange);
    } catch (error) {}
  }, [bridgeState.fromChain]);

  if (window && window?.ethereum) {
    //@ts-ignore
    window.ethereum.on('chainChanged', (chainId) => {
      localStorage.setItem('currentChainId', chainId.toString());
      window.location.reload();
    });
  }

  //   useEffect(() => {
  // chainChange();
  //   }, [chainChange]);

  useEffect(() => {
    setApproveDone(false);
  }, [bridgeState.token, bridgeState.fromChain, bridgeState.toChain]);

  useEffect(() => {
    if (window.ethereum) {
      //@ts-ignore
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentChainId(chainId);
      });
      setCurrentChainId(
        //@ts-ignore
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.ethereum, bridgeState.fromChain]);

  useEffect(() => {
    console.log('window.ethereum: ', window?.ethereum.networkVersion);
    console.log(
      'ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)): ',
      ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
    );
    if (window?.ethereum) {
      setCurrentChainId(
        //@ts-ignore
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
      );
    }
  });

  useEffect(() => {
    if (tokenContract && walletAddress) {
      // getBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenContract, walletAddress, currentChainId]);

  useEffect(() => {
    if (!localStorage.getItem('currentChainId')) {
      localStorage.setItem('currentChainId', ChainsIds.TLC);
    }
  }, []);

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
        const result = await tokenContract?.balanceOf(walletAddress);
        if (result) {
          const available = parseFloat(ethers.utils.formatEther(result));
          setTotalBalance(parseFloat(available.toFixed(3)));
        }
      }
    } catch (error) {
      console.log('Err: ', error);
    }
  };

  const approveMain = async () => {
    try {
      setErrorMessage(undefined);
      if (parseFloat(amountToSend) > 0) {
        setIsLoading(true);
        const finalAmount = parseFloat(amountToSend) + fee;
        const tx = await tokenContract?.functions.approve(
          mainBridgeContract?.address,
          ethers.utils.parseUnits(finalAmount.toString(), 'ether'),
        );
        await tx.wait();
        setIsLoading(false);
        setApproveDone(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Err on approve: ', error);
    }
  };

  const approveSide = async () => {
    try {
      setErrorMessage(undefined);
      if (parseFloat(amountToSend) > 0) {
        setIsLoading(true);
        const finalAmount = parseFloat(amountToSend) + fee;

        const tx = await tokenContract?.functions.approve(
          sideBridgeContract?.address,
          ethers.utils.parseUnits(finalAmount.toString(), 'ether'),
        );
        await tx.wait();
        setIsLoading(false);
        setApproveDone(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.log('Err on approveSide: ', error);
    }
  };

  const approve = () => {
    if (bridgeState.token === 'TLC') {
      approveSide();
      console.log('approve - 1');
    } else {
      if (isStableCoin(bridgeState.token) && bridgeState.fromChain === 'TLC') {
        console.log('approve - 2');
        approveSide();
      } else {
        console.log('approve - 3');
        approveMain();
      }
    }
    // bridgeState.toChain === 'TLC' ? approveSide : approveMain;
  };

  const receiveTokens = async () => {
    try {
      setErrorMessage(undefined);
      if (parseFloat(amountToSend) > 0) {
        setIsLoading(true);
        const finalAmount = parseFloat(amountToSend) + fee;
        let tx;

        if (bridgeState.token === 'TLC' && bridgeState.fromChain === 'TLC') {
          const overrides = {
            value: ethers.utils.parseEther(finalAmount.toString()),
          };
          console.log('0: ', mainBridgeContract?.address);
          console.log('1: ', sideBridgeContract?.address);
          tx = await mainBridgeContract?.receiveTokens(
            sideBridgeContract?.address,
            overrides,
          );
        } else {
          tx = await mainBridgeContract?.receiveTokens(
            ethers.utils.parseEther(finalAmount.toString()),
            sideBridgeContract?.address,
          );
        }
        await tx.wait();
        setIsLoading(false);
        setApproveDone(false);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);

      if (error.message.includes('whitelist')) {
        setErrorMessage('You are not whitelisted');
      } else if (error.message.includes('denied')) {
        setErrorMessage('');
      } else {
        setErrorMessage('Something went wrong');
      }
      console.log('Err on receiveTokens: ', error);
    }
  };

  const returnTokens = async () => {
    console.log('PRESSED RETURN TOKENS');
    try {
      if (parseFloat(amountToSend) > 0) {
        setIsLoading(true);
        console.log(
          'sideBridgeContract?.address: ',
          sideBridgeContract?.address,
        );

        const finalAmount = parseFloat(amountToSend) + fee;
        console.log('mainBridge?.address: ', mainBridgeContract?.address);
        const tx = await sideBridgeContract?.returnTokens(
          ethers.utils.parseUnits(finalAmount.toString(), 'ether'),
          mainBridgeContract?.address,
        );
        console.log('Tx is: ', tx);
        const receipt = await tx.wait();
        console.log('receipt: ', receipt);

        const iface = new ethers.utils.Interface(SideBridge.abi);
        const decodedData = iface.parseTransaction({
          data: tx.data,
          value: tx.value,
        });

        console.log('DecodedData: ', decodedData);

        setIsLoading(false);
        setApproveDone(false);
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);

      console.log('Err on returnTokens: ', error);
      if (error.message.includes('whitelist')) {
        setErrorMessage('You are not whitelisted');
      } else if (error.message.includes('denied')) {
        setErrorMessage('');
      } else {
        setErrorMessage('Something went wrong');
      }
      console.log('Err on returnTokens: ', error);
    }
  };

  const chainError = useMemo(() => {
    const neededChainId = getChainId(bridgeState.fromChain);

    console.log('currentChainId: ', currentChainId);
    console.log('neededChainId: ', neededChainId);
    if (currentChainId !== neededChainId) {
      return `You are on another chain. Please change your chain to ${bridgeState.fromChain} according to your "from" selection`;
    }
  }, [currentChainId, bridgeState.fromChain]);

  const showApproveButton = useMemo(() => {
    if (bridgeState.token === 'TLC' && bridgeState.fromChain === 'TLC') {
      return false;
    } else if (!approveDone) {
      return true;
    } else {
      return false;
    }
  }, [approveDone, bridgeState.token, bridgeState.fromChain]);

  const send = () => {
    if (bridgeState.toChain === 'TLC' && bridgeState.fromChain === 'TLC') {
      return;
    } else {
      if (bridgeState.toChain === 'TLC') {
        if (isStableCoin(bridgeState.token)) {
          receiveTokens();
        } else {
          returnTokens();
        }
      } else {
        if (isStableCoin(bridgeState.token)) {
          returnTokens();
        } else {
          receiveTokens();
        }
      }
    }
  };

  console.log('SidebridgeAddress: ', sideBridgeContract?.address);
  console.log('MainbridgeAddress: ', mainBridgeContract?.address);

  return (
    <>
      <div className="flex">
        {chainError && <p className="text-red-500 text-sm">{chainError}</p>}
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
              onChange={(e) => {
                setApproveDone(false);
                setAmountToSend(e.target.value);
              }}
              type="text"
            ></input>
          </div>
          <TokensModal
            chains={{
              TLC: modalChains.TLC,
              BSC: modalChains.BSC,
              FTM: modalChains.FTM,
              AVAX: modalChains.AVAX,
              MATIC: modalChains.MATIC,
              ETH: modalChains.ETH,
              CRONOS: modalChains.CRONOS,
              OKB: modalChains.OKB,
              HARMONY: modalChains.HARMONY,
              AURORA: modalChains.AURORA,
              KAVA: modalChains.KAVA,
              IOTEX: modalChains.IOTEX,
              KLAY: modalChains.KLAY,
              COSMOS: modalChains.COSMOS,
              EVMOS: modalChains.EVMOS,
            }}
            coins={{
              TLC: modalCoins.TLC,
              LSO: modalCoins.LSO,
              USDT: modalCoins.USDT,
              USDC: modalCoins.USDC,
            }}
            // chains={{ TLC: modalChains.TLC }}
            type="from"
            chainType="EVM"
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
            <p className="text-gray-400 font-medium font-poppins text-sm">To</p>
            <input
              className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
              type="text"
              value={amountToSend}
            ></input>
          </div>
          <TokensModal
            chains={{
              TLC: modalChains.TLC,
              BSC: modalChains.BSC,
              FTM: modalChains.FTM,
              AVAX: modalChains.AVAX,
              MATIC: modalChains.MATIC,
              ETH: modalChains.ETH,
              CRONOS: modalChains.CRONOS,
              OKB: modalChains.OKB,
              HARMONY: modalChains.HARMONY,
              AURORA: modalChains.AURORA,
              KAVA: modalChains.KAVA,
              IOTEX: modalChains.IOTEX,
              KLAY: modalChains.KLAY,
              COSMOS: modalChains.COSMOS,
              EVMOS: modalChains.EVMOS,
            }}
            coins={{
              TLC: modalCoins.TLC,
              LSO: modalCoins.LSO,
              USDT: modalCoins.USDT,
              USDC: modalCoins.USDC,
            }}
            // chains={{ BSC: modalChains.BSC }}
            type="to"
            chainType="EVM"
          />
        </div>
        <p className="my-4 text-sm">
          You will spend <span className="text-green-400">{amountToSend}</span>{' '}
          + {fee} (fee) as a total of {parseFloat(amountToSend) + fee}{' '}
          {bridgeState.token}
        </p>
        {/* <p className="mt-8 text-lg text-center">
          The bridge is currently deactivated
        </p> */}
        <div className="flex w-full space-x-8">
          {showApproveButton ? (
            <button
              onClick={approve}
              className="w-full flex h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center "
              disabled={
                isLoading ||
                currentChainId !== getChainId(bridgeState.fromChain)
              }
            >
              {isLoading ? (
                <>
                  <TailSpin color="#fff" height={18} width={18} />
                </>
              ) : (
                `Approve`
              )}
            </button>
          ) : (
            <button
              onClick={() => {
                send();
              }}
              // onClick={swap}
              className="w-full flex h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
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
          )}
        </div>
        {/* ) : (
              <p className="w-full text-center">
                Please connect to Selected "From" Chain
              </p>
            )} */}
        {errorMessage && (
          <p className="my-4 text-sm text-center">{errorMessage}</p>
        )}
      </div>
    </>
  );
};

export default EVM;
