import { pathToFileURL } from 'url';
import path from 'path';
import { promises } from 'fs';

import {
  DappUI,
  getProxyProvider,
  refreshAccount,
  sendTransactions,
  useGetAccountInfo,
  useGetLoginInfo,
  useGetNetworkConfig,
  useGetPendingTransactions,
  useGetTransactionDisplayInfo,
} from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  ProxyProvider,
  DefaultSmartContractController,
  BigUIntValue,
  ApiNetworkProvider,
  Transaction,
  TransactionPayload,
  Balance,
  TransactionWatcher,
} from '@elrondnetwork/erdjs';
import { useEffect, useMemo, useState } from 'react';
import MainBridgeMainToken from 'src/contracts/MainBridgeMainToken.json';
import MainBridge from 'src/contracts/MainBridge.json';
import SideBridgeEGLD from 'src/contracts/SideBridgeEGLD.json';
import New_SideBridge from 'src/contracts/New_SideBridge.json';
import { FaArrowCircleDown } from 'react-icons/fa';
import {
  ELROND_LOCK_SC_ADDRESS,
  ELROND_TOKEN_SC_ABI,
  ELROND_TOKEN_SC_NAME,
  modalChains,
  modalCoins,
  WEGLD_TLC_SideBridgeContractAddress,
} from 'src/utils/globals';
import TLVAbi from 'src/contracts/ElrondTLV.json';
import { convertEsdtToWei, convertWeiToEsdt } from 'src/utils/functions/utils';
import { sendTxHashToBackend } from 'src/api';
import { useSelector } from 'react-redux';
import { BridgeState, StoreState } from 'src/utils/storeTypes';
import { TailSpin } from 'react-loader-spinner';
import { useBridgeContracts } from 'src/hooks/useBridgeContracts';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { useContracts } from 'src/hooks/useContracts';

import TokensModal from './TokensModal';

const {
  ExtensionLoginButton,
  WebWalletLoginButton,
  LedgerLoginButton,
  WalletConnectLoginButton,
} = DappUI;

interface IContractInteractor {
  contract: SmartContract;
  controller: DefaultSmartContractController;
}

const fee = 0.01;

const Elrond: React.FC = () => {
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const ethProvider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const bridgeState = useSelector<StoreState, BridgeState>(
    (state) => state.bridge,
  );
  const { isLoggedIn: isMaiarLoggedIn } = useGetLoginInfo();
  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();
  const {
    hasPendingTransactions,
    pendingTransactions,
    pendingTransactionsArray,
  } = useGetPendingTransactions();
  const [depositedAmount, setDepositedAmount] = useState(0);
  const provider = getProxyProvider();
  const [contractInteractor, setContractInteractor] = useState<
    IContractInteractor | undefined
  >();
  const [txSessionId, setTxSessionId] = useState<string>();
  const [currentTxHash, setCurrentTxHash] = useState<string>();
  const [amount, setAmount] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [approveDone, setApproveDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { tokenContract } = useContracts('EGLD');

  const { mainBridgeContract, sideBridgeContract } = useBridgeContracts(
    'EGLD',
    'TLC',
    'ELROND',
  );

  useEffect(() => {
    setApproveDone(false);
  }, [bridgeState.token, bridgeState.fromChain, bridgeState.toChain]);

  const deposit = async () => {
    console.log('HOW MANY TIMES DEPOSIT?');
    const pingTransaction = {
      value: new BigUIntValue(convertEsdtToWei(Number(amount))),
      data: 'deposit',
      receiver: ELROND_LOCK_SC_ADDRESS,
    };

    await refreshAccount();

    const { sessionId, error } = await sendTransactions({
      transactions: pingTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful',
      },
      redirectAfterSign: false,
    });

    if (sessionId) {
      setTxSessionId(sessionId);
    }
  };

  const test = async () => {
    const result = await sendTxHashToBackend('!23', '!231');
    console.log('Result: ', result);
  };

  //Send to backend or
  useEffect(() => {
    (async () => {
      if (hasPendingTransactions) {
        setIsLoading(true);

        if (!currentTxHash) {
          setCurrentTxHash(
            pendingTransactions[txSessionId].transactions[0].hash,
          );
        }
      } else if (currentTxHash && walletAddress) {
        const result = await sendTxHashToBackend(currentTxHash, walletAddress);
        setCurrentTxHash(undefined);
        console.log('Result: ', result);
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPendingTransactions]);

  const approveSide = async () => {
    try {
      setErrorMessage(undefined);

      if (Number(amount) > 0) {
        setIsLoading(true);
        const finalAmount = Number(amount) + fee;

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

  console.log('Address: ', address);

  const returnTokens = async () => {
    try {
      if (Number(amount) > 0 && ethProvider) {
        setIsLoading(true);
        console.log(
          'sideBridgeContract?.address: ',
          sideBridgeContract?.address,
        );

        const finalAmount = Number(amount) + fee;

        const sideContract = new ethers.Contract(
          WEGLD_TLC_SideBridgeContractAddress,
          SideBridgeEGLD.abi,
          ethProvider.getSigner(),
        );

        const tx = await sideContract.returnTokens(
          ethers.utils.parseUnits(finalAmount.toString(), 'ether'),
          address,
        );

        setIsLoading(false);
        setApproveDone(false);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Something went wrong');
      console.log('Err on returnTokens: ', error);
    }
  };

  // set contract interactor
  useEffect(() => {
    (async () => {
      const registry = await AbiRegistry.load({ urls: [ELROND_TOKEN_SC_ABI] });
      const abi = new SmartContractAbi(registry, [ELROND_TOKEN_SC_NAME]);
      const contract = new SmartContract({
        address: new Address(ELROND_LOCK_SC_ADDRESS),
        abi: abi,
      });
      const controller = new DefaultSmartContractController(abi, provider);

      setContractInteractor({
        contract,
        controller,
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!contractInteractor) return;

      const args = [new AddressValue(new Address(address))];
      const interaction =
        contractInteractor.contract.methods.getDepositAmount(args);
      const res = await contractInteractor.controller.query(interaction);

      if (!res || !res.returnCode.isSuccess() || res === undefined) return;

      const value = res.firstValue!.valueOf().toNumber();

      setDepositedAmount(convertWeiToEsdt(value));
    })();
  }, [contractInteractor, hasPendingTransactions, address]);

  const send = () => {
    if (bridgeState.fromChain === 'TLC') {
      if (approveDone) {
        returnTokens();
      } else {
        approveSide();
      }
    } else {
      deposit();
    }
  };

  const buttonText = useMemo(() => {
    if (bridgeState.fromChain === 'TLC') {
      if (approveDone) {
        return 'Send';
      } else {
        return 'Approve';
      }
    } else {
      return 'Send';
    }
  }, [approveDone, bridgeState.fromChain]);

  return (
    <div className="flex">
      {/* {chainError && <p className="text-red-500 text-sm">{chainError}</p>} */}
      {/* <button onClick={test}>TEST</button> */}
      <div className="relative items-center w-[44rem] xs:w-[22rem] h-[23rem] px-8 py-8 xs:px-4 rounded-lg bg-black bg-opacity-60">
        {!isMaiarLoggedIn ? (
          <div className="w-full flex items-center justify-center">
            <ExtensionLoginButton
              callbackRoute={'/crosschainbridge'}
              loginButtonText={'Connect with MAIAR'}
              loginButtonClassName={{ backgroundColor: 'red' }}
              style={{ backgroundColor: 'green' }}
            />
          </div>
        ) : (
          <>
            <div className="relative flex bg-black bg-opacity-60 w-full h-20 rounded-lg pt-1 px-6 items-center">
              <div className="flex w-1/2 flex-col h-full">
                <p className="text-gray-400 font-medium font-poppins text-sm">
                  From
                </p>
                <input
                  className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                  type="text"
                ></input>
              </div>
              <TokensModal
                chains={{
                  TLC: modalChains.TLC,
                  ELROND: modalChains.ELROND,
                }}
                coins={{ EGLD: modalCoins.EGLD }}
                // chains={{ TLC: modalChains.TLC }}
                type="from"
                chainType="ELROND"
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
                  value={amount}
                ></input>
              </div>
              <TokensModal
                chains={{
                  ELROND: modalChains.ELROND,
                  TLC: modalChains.TLC,
                }}
                coins={{ EGLD: modalCoins.EGLD }}
                // chains={{ BSC: modalChains.BSC }}
                type="to"
                chainType="ELROND"
              />
            </div>
            <p className="my-4 text-sm">
              You will spend{' '}
              <span className="text-green-400">{depositedAmount}</span> + {fee}
              (fee) as a total of {depositedAmount} EGLD
              {/* {bridgeState.token} */}
            </p>
            <div className="flex w-full space-x-8">
              {/* {currentChainId === getChainId(bridgeState.fromChain) ? ( */}
              {walletAddress ? (
                <button
                  // onClick={ approveDone ? send : approveSide}
                  onClick={send}
                  className="w-full flex h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
                  //   disabled={isLoading}
                >
                  {/* eslint-disable-next-line no-nested-ternary */}
                  {isLoading ? (
                    <>
                      <TailSpin color="#fff" height={18} width={18} />
                    </>
                  ) : (
                    `${buttonText}`
                  )}
                </button>
              ) : (
                <p>Please connect your Metamask wallet to receive the tokens</p>
              )}
            </div>
            {/* {errorMessage && (
          <p className="my-4 text-sm text-center">{errorMessage}</p>
        )} */}
          </>
        )}
      </div>
    </div>
  );
};

export default Elrond;
