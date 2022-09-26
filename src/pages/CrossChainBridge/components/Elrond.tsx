import { pathToFileURL } from 'url';
import path from 'path';
import { promises } from 'fs';

import {
  DappUI,
  getAccountProvider,
  getProxyProvider,
  refreshAccount,
  sendTransactions,
  useGetAccountInfo,
  useGetLoginInfo,
  useGetNetworkConfig,
  useGetPendingTransactions,
} from '@elrondnetwork/dapp-core';
import {
  Address,
  AddressValue,
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  //@ts-ignore
  DefaultSmartContractController,
  BigUIntValue,
  ArgSerializer,
  //@ts-ignore
  GasLimit,
  BytesValue,
  //@ts-ignore
  Egld,
  U64Value,
} from '@elrondnetwork/erdjs';
import { useEffect, useMemo, useState } from 'react';
import SideBridgeEGLD from 'src/contracts/SideBridgeEGLD.json';
import { FaArrowCircleDown } from 'react-icons/fa';
import {
  ELROND_EGLD_LOCK_SC_ADDRESS,
  ELROND_TLC_LOCK_TOKEN_SC_ADDRESS,
  ELROND_TLC_TOKEN_ID,
  ELROND_TOKEN_SC_ABI,
  ELROND_TOKEN_SC_NAME,
  modalChains,
  modalCoins,
  TLChain_wEGLD_SideBridgeContractAddress,
} from 'src/utils/globals';
import { getChainId } from 'src/utils/functions/Contracts';
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

// const fee = 1;

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
  const maiarProvider = getAccountProvider();

  const { network } = useGetNetworkConfig();
  const { address } = useGetAccountInfo();
  const {
    hasPendingTransactions,
    pendingTransactions,
    pendingTransactionsArray,
  } = useGetPendingTransactions();
  const [depositedAmount, setDepositedAmount] = useState(0);
  const provider = getProxyProvider();

  //   const [contractInteractor, setContractInteractor] = useState<
  //     IContractInteractor | undefined
  //   >();

  const [txSessionId, setTxSessionId] = useState<string>();
  const [currentTxHash, setCurrentTxHash] = useState<string>();
  const [amount, setAmount] = useState('0');
  const [amountToWrap, setAmountToWrap] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [approveDone, setApproveDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const [fee, setFee] = useState(0.01);

  useEffect(() => {
    if (bridgeState.token === 'EGLD') {
      setFee(0.01);
    } else {
      setFee(1);
    }
  }, [bridgeState.token]);

  const { tokenContract } = useContracts(bridgeState.token);
  const { mainBridgeContract, sideBridgeContract } = useBridgeContracts(
    bridgeState.token,
    bridgeState.fromChain,
    bridgeState.toChain,
  );

  useEffect(() => {
    setApproveDone(false);
  }, [bridgeState.token, bridgeState.fromChain, bridgeState.toChain]);

  const deposit = async () => {
    const pingTransaction = {
      value: new BigUIntValue(convertEsdtToWei(Number(amount) + fee)),
      data: 'deposit',
      receiver: ELROND_EGLD_LOCK_SC_ADDRESS,
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

  const burn = async () => {
    if (Number(amount) === 0) return;

    const finalAmount = Number(amount) + fee;

    const tokenIdArg = BytesValue.fromUTF8(ELROND_TLC_TOKEN_ID);
    const burnAmountArg = new BigUIntValue(Egld(finalAmount).valueOf());
    const burnFunctionArg = BytesValue.fromUTF8('burnTlcToken');
    const args = [tokenIdArg, burnAmountArg, burnFunctionArg];

    const { argumentsString } = new ArgSerializer().valuesToString(args);
    const data = `ESDTTransfer@${argumentsString}`;
    const tx = {
      receiver: ELROND_TLC_LOCK_TOKEN_SC_ADDRESS,
      gasLimit: new GasLimit(60000000),
      data: data,
    };

    await refreshAccount();

    const { sessionId, error } = await sendTransactions({
      transactions: tx,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Ping transaction',
        errorMessage: 'An error has occured during Ping',
        successMessage: 'Ping transaction successful',
      },
      redirectAfterSign: false,
    });

    console.log('sessionId', sessionId);
    console.log('error', error);

    if (error) {
      setErrorMessage(error);
    }

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

  const returnTokens = async () => {
    try {
      setErrorMessage(undefined);
      if (Number(amount) > 0 && ethProvider) {
        setIsLoading(true);
        console.log(
          'sideBridgeContract?.address: ',
          sideBridgeContract?.address,
        );

        const finalAmount = Number(amount) + fee;

        const sideContract = new ethers.Contract(
          TLChain_wEGLD_SideBridgeContractAddress,
          SideBridgeEGLD.abi,
          ethProvider.getSigner(),
        );

        const tx = await sideContract?.returnTokens(
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

  const approveMain = async () => {
    try {
      setErrorMessage(undefined);
      if (Number(amount) > 0) {
        setIsLoading(true);
        const finalAmount = Number(amount) + fee;
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

  const receiveTokens = async () => {
    try {
      console.log('On Receive TOKENS');
      setErrorMessage(undefined);
      if (Number(amount) > 0 && ethProvider) {
        setIsLoading(true);
        console.log(
          'Side Bridge Contract on receiveTokens: ',
          sideBridgeContract?.address,
        );
        console.log(
          'Main Bridge Contract on receiveTokens: ',
          mainBridgeContract?.address,
        );
        const finalAmount = Number(amount) + fee;
        let tx;

        if (bridgeState.token === 'TLC' && bridgeState.fromChain === 'TLC') {
          const overrides = {
            value: ethers.utils.parseEther(finalAmount.toString()),
          };

          tx = await mainBridgeContract?.receiveTokens(address, overrides);
        } else {
          tx = await mainBridgeContract?.receiveTokens(
            ethers.utils.parseEther(finalAmount.toString()),
            address,
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

  //   const chainError = useMemo(() => {
  //     const neededChainId = getChainId('TLC');
  //     if (bridgeState.fromChain === 'TLC'){

  //     }

  //     if (currentChainId !== neededChainId) {
  //       return `You are on the another chain. Please change your chain to ${bridgeState.fromChain} according to your "from" selection`;
  //     }
  //   }, [currentChainId, bridgeState.fromChain]);

  //   // set contract interactor
  //   useEffect(() => {
  //     (async () => {
  //       const registry = await AbiRegistry.load({ urls: [ELROND_TOKEN_SC_ABI] });
  //       const abi = new SmartContractAbi(registry, [ELROND_TOKEN_SC_NAME]);
  //       const contract = new SmartContract({
  //         address: new Address(ELROND_TLC_LOCK_TOKEN_SC_ADDRESS),
  //         abi: abi,
  //       });
  //       const controller = new DefaultSmartContractController(abi, provider);

  //       setContractInteractor({
  //         contract,
  //         controller,
  //       });
  //     })();
  //   }, []);

  //   useEffect(() => {
  //     (async () => {
  //       if (!contractInteractor) return;

  //       const args = [new AddressValue(new Address(address))];
  //       const interaction =
  //         contractInteractor.contract.methods.getDepositAmount(args);
  //       const res = await contractInteractor.controller.query(interaction);

  //       if (!res || !res.returnCode.isSuccess() || res === undefined) return;

  //       const value = res.firstValue!.valueOf().toNumber();

  //       setDepositedAmount(convertWeiToEsdt(value));
  //     })();
  //   }, [contractInteractor, hasPendingTransactions, address]);

  const send = () => {
    if (bridgeState.token === 'TLC') {
      if (bridgeState.fromChain === 'TLC') {
        receiveTokens();
        // if (approveDone) {
        // receiveTokens();
        // } else {
        //   approveMain();
        // }
      } else {
        //TODO: Transfer to wTLC on Elrond Chain
        // deposit();
        burn();
      }
    } else {
      if (bridgeState.fromChain === 'TLC') {
        if (approveDone) {
          returnTokens();
        } else {
          approveSide();
        }
      } else {
        deposit();
      }
    }
  };

  const buttonText = useMemo(() => {
    if (bridgeState.fromChain === 'TLC' && bridgeState.token === 'EGLD') {
      if (approveDone) {
        return 'Send';
      } else {
        return 'Approve';
      }
    } else {
      return 'Send';
    }
  }, [approveDone, bridgeState.fromChain, bridgeState.token]);

  return (
    <div className="flex">
      {/* {chainError && <p className="text-red-500 text-sm">{chainError}</p>} */}
      {/* <button onClick={test}>TEST</button> */}
      <div className="relative items-center w-[44rem] xs:w-[22rem] min-h-[23rem] px-8 py-8 xs:px-4 rounded-lg bg-black bg-opacity-60">
        {!isMaiarLoggedIn ? (
          <div className="w-full flex items-center justify-center">
            <div className="bg-black px-4 py-2 rounded-lg">
              <ExtensionLoginButton
                callbackRoute={'/crosschainbridge'}
                loginButtonText={'Connect with MAIAR'}
              />
            </div>
          </div>
        ) : (
          <>
            {/* <button
              onClick={() =>
                maiarProvider.logout({ callbackUrl: window.location.href })
              }
            >
              disconnect
            </button> */}
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
                coins={{ EGLD: modalCoins.EGLD, TLC: modalCoins.TLC }}
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
                coins={{ EGLD: modalCoins.EGLD, TLC: modalCoins.TLC }}
                // chains={{ BSC: modalChains.BSC }}
                type="to"
                chainType="ELROND"
              />
            </div>
            <p className="my-4 text-sm">
              You will spend <span className="text-green-400">{amount}</span> +{' '}
              {fee}
              (fee) as a total of {Number(amount) + fee} {bridgeState.token}
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

            {errorMessage && (
              <p className="my-4 text-sm text-center">{errorMessage}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Elrond;
