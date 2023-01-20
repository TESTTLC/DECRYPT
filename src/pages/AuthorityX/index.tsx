import { useCallback, useEffect, useMemo, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import {
  OldLSOTokenContractAddress,
  OldTLXTokenContractAddress,
  vestingLockContractAddress,
  vestingUnLockContractAddress,
} from 'src/utils/globals';
import tlcImage from 'src/assets/images/tlc-bridge.png';
import lsoImage from 'src/assets/images/LSO-logo.png';
import authorityXLogo from 'src/assets/images/authority-x.png';
import tlxImage from 'src/assets/images/TLX-logo.png';
import useCurrentChain from 'src/hooks/useCurrentChain';
import { Contract, ethers } from 'ethers';
import { ChainsIds } from 'src/utils/types';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import { Web3Provider } from '@ethersproject/providers';
import VestingLock from 'src/contracts/VestingLock.json';
import VestingUnlock from 'src/contracts/VestingUnlock.json';
import TLXToken from 'src/contracts/TheLuxuryToken.json';
import LUSOToken from 'src/contracts/LuxandiaToken.json';
import { formatEther } from 'ethers/lib/utils';
import { TailSpin } from 'react-loader-spinner';

// import TokensModal from '../CrossChainBridge/components/TokensModal';
const fromTokens = {
  TLX: {
    name: 'The Luxury',
    tag: 'TLX',
    image: tlxImage,
  },
  LSO: {
    name: 'Luxandia',
    tag: 'LSO',
    image: lsoImage,
  },
};

const unlockDates = [
  '28 Feb 2023',
  '31 Mar 2023',
  '30 Apr 2023',
  '31 May 2023',
  '30 Jun 2023',
  '31 Jul 2023',
  '31 Aug 2023',
  '30 Sep 2023',
  '31 Oct 2023',
  '30 Nov 2023',
  '31 Dec 2023',
  '31 Jan 2024',
  '29 Feb 2024',
  '31 Mar 2024',
];

const AuthorityX = () => {
  const { chainId } = useCurrentChain();

  const chainError = useMemo(() => {
    if (!chainId)
      return 'Please connect wallet and connect to Old TLChain - 5177';
    if (ethers.utils.hexlify(chainId) !== ChainsIds.OldTLC) {
      return 'Please connect wallet and connect to Old TLChain - 5177';
    } else {
      return '';
    }
  }, [chainId]);

  const vestingChainIdError = useMemo(() => {
    if (!chainId || ethers.utils.hexlify(chainId) !== ChainsIds.TLC) {
      return 'To see vesting status, please change your chain to TLChain Mainnet - 2321';
    }
  }, [chainId]);

  const [selectedToken, setSelectedToken] = useState(fromTokens.TLX);
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );

  const [lockVestingContract, setLockVestingContract] = useState<Contract>();
  const [unlockVestingContract, setUnlockVestingContract] =
    useState<Contract>();
  const [lsoContract, setLsoContract] = useState<Contract>();
  const [tlxContract, setTlxContract] = useState<Contract>();
  const [vestingStatus, setVestingStatus] = useState([]);
  const [vestingAmount, setVestingAmount] = useState(0);
  const [amountToSend, setAmountToSend] = useState('0');
  const [amountToReceive, setAmountToReceive] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const connectToContracts = useCallback(async () => {
    if (!provider) return;

    const tlxC = new Contract(
      OldTLXTokenContractAddress,
      TLXToken.abi,
      provider.getSigner(),
    );
    const lsoC = new Contract(
      OldLSOTokenContractAddress,
      LUSOToken.abi,
      provider.getSigner(),
    );

    setTlxContract(tlxC);
    setLsoContract(lsoC);

    const lockC = new Contract(
      vestingLockContractAddress,
      VestingLock.abi,
      provider.getSigner(),
    );
    const unlockC = new Contract(
      vestingUnLockContractAddress,
      VestingUnlock.abi,
      provider.getSigner(),
    );

    setLockVestingContract(lockC);
    setUnlockVestingContract(unlockC);
  }, [provider]);

  useEffect(() => {
    connectToContracts();
  }, [connectToContracts]);

  const send = async () => {
    if (!lockVestingContract) return;
    const value = ethers.utils.parseEther(amountToSend);

    try {
      setIsLoading(true);
      if (selectedToken.tag === 'LSO' && lsoContract) {
        const approve = await lsoContract?.approve(
          vestingLockContractAddress,
          value,
        );
        const approveTx = await approve?.wait();
        if (approveTx) {
          console.log('approveTx', approveTx);
          const tx = await lockVestingContract?.receiveLUSOTokens(value);
          await tx?.wait();
          const result = await tx.wait();
          console.log('Result is: ', result);
        }
        setIsLoading(false);
      } else if (selectedToken.tag === 'TLX' && tlxContract) {
        const approve = await tlxContract?.approve(
          vestingLockContractAddress,
          value,
        );
        const approveTx = await approve?.wait();
        if (approveTx) {
          console.log('approveTx', approveTx);
          const tx = await lockVestingContract?.receiveTLXTokens(value);
          await tx?.wait();
          const result = await tx.wait();
          console.log('Result is: ', result);
        }
        setIsLoading(false);
      }
    } catch (error) {
      console.log('Error transforming to X token', error);
      setIsLoading(false);
    }
  };

  const getVestingStatus = useCallback(async () => {
    if (!unlockVestingContract) return;
    const result = await unlockVestingContract?.userVestingStatus();
    setVestingStatus(result);
    console.log('Vesting status', result);
  }, [unlockVestingContract]);

  const getVestingAmount = useCallback(async () => {
    if (!unlockVestingContract) return;
    const result = await unlockVestingContract?.vestingTotalAmount();
    setVestingAmount(result);
    console.log('Vesting amount', result);
  }, [unlockVestingContract]);

  useEffect(() => {
    getVestingStatus();
    getVestingAmount();
  }, [getVestingStatus, getVestingAmount]);

  const vestingValues = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any[] = [];
    for (let i = 0; i < 14; i++) {
      const availability = vestingStatus[i] === 1;
      console.log('availability', availability);
      values.push({
        date: unlockDates[i],
        availability,
        value: availability ? vestingAmount : 0,
      });
    }
    return values;
  }, [vestingAmount, vestingStatus]);

  const unlockTokens = async () => {
    if (!unlockVestingContract) return;
    const indexes: number[] = [];
    vestingValues.forEach((value, index) => {
      if (value.availability) {
        indexes.push(index);
      }
    });

    await unlockVestingContract?.unlockTokens(indexes[0]);
  };

  useEffect(() => {
    if (selectedToken.tag === 'LSO') {
      setAmountToSend(amountToSend);
      setAmountToReceive((Number(amountToSend) / 400).toString());
    } else if (selectedToken.tag === 'TLX') {
      setAmountToSend(amountToSend);
      setAmountToReceive(amountToSend);
    }
  }, [amountToReceive, amountToSend, selectedToken]);

  return (
    <div>
      <div className="flex flex-col flex-1 items-center">
        <div className="flex flex-col">
          <div className="w-[44rem] xs:w-[22rem] mt-10 text-sm mb-4">
            <p className="font-poppins text-gray-300">
              $TLX and $LSO come together in a novel formula to achieve a
              revolutionary approach to the future. The Authority X platform
              facilitates the transformation of $TLX and $LSO assets into X
              asset.
            </p>
          </div>
          <div className="flex">
            {chainError && <p className="text-red-500 text-sm">{chainError}</p>}
          </div>
          <div className="relative items-center w-[44rem] xs:w-[22rem] h-[23rem] px-8 py-8 xs:px-4 rounded-lg bg-black bg-opacity-60">
            {/* 111111111111 */}
            <div className="relative flex bg-black bg-opacity-60 w-full h-20 rounded-lg pt-1 px-6 items-center">
              <div className="flex w-1/2 flex-col h-full">
                <p className="text-gray-400 font-medium font-poppins text-sm">
                  From
                </p>
                <input
                  className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                  type="text"
                  value={amountToSend}
                  onChange={(e) => {
                    if (selectedToken.tag === 'LSO') {
                      const amount = Number(e.target.value) / 400;
                      setAmountToReceive(amount.toString());
                    } else {
                      setAmountToReceive(e.target.value);
                    }
                    setAmountToSend(e.target.value);
                  }}
                ></input>
              </div>

              <button
                onClick={() => {
                  setSelectedToken(
                    selectedToken.tag === 'LSO'
                      ? fromTokens.TLX
                      : fromTokens.LSO,
                  );
                }}
                className="flex text-white font-poppins items-center justify-center"
              >
                <img
                  className="text-white font-poppins w-6 h-6 mr-2 object-cover"
                  src={selectedToken.image}
                />
                <p className="text-white font-poppins">{selectedToken.tag}</p>

                <div className="h-8 w-1 bg-gray-800 mx-6" />

                <button className="flex h-full justify-end items-center ">
                  <img
                    className="text-white font-poppins w-7 h-7 mr-1 object-cover"
                    src={tlcImage}
                  />
                  <p className="text-white font-poppins">Old TLChain - 5177</p>{' '}
                </button>
              </button>
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
                  value={amountToReceive}
                  disabled
                  //   onChange={(e) => setAmountToSend(e.target.value)}
                ></input>
              </div>

              <button
                // onClick={onFromTokenSelect && onFromTokenSelect}
                className="flex text-white font-poppins items-center justify-center"
              >
                <img
                  className="text-white font-poppins w-6 h-6 mr-2 object-cover"
                  src={authorityXLogo}
                />
                <p className="text-white font-poppins">X</p>

                <div className="h-8 w-1 bg-gray-800 mx-6" />

                <button className="flex h-full justify-end items-center ">
                  <img
                    className="text-white font-poppins w-7 h-7 mr-1 object-cover"
                    src={tlcImage}
                  />
                  <p className="text-white font-poppins">TLChain</p>{' '}
                </button>
              </button>
            </div>

            <div className="flex w-full space-x-8">
              <button
                onClick={async () => {
                  await send();
                  getVestingStatus();
                  getVestingAmount();
                }}
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
            </div>
            <p className="font-poppins text-green-400 mt-6">Attention!</p>
            <p className="text-gray-300 text-sm font-poppins">
              There is no turning back. $TLX and $LSO become X in a spectacular
              burst of technology innovation
            </p>
          </div>
          <div className="px-8 mt-12">
            <p className="font-poppins text-xl font-semibold mb-1 text-center">
              Vesting status
            </p>
            <p className="text-gray-300 text-sm font-poppins mb-4 text-center">
              <p className="text-red-500 text-sm">{vestingChainIdError}</p>
            </p>
            {vestingChainIdError ? (
              ''
            ) : (
              <p className="text-center font-medium mb-1 text-lg">
                Total amount:{' '}
                <span className="text-green-400">
                  {' '}
                  {formatEther(vestingAmount)}
                </span>
              </p>
            )}
            <div className="grid grid-cols-2">
              {vestingValues?.map((item, index) => {
                return (
                  <div>
                    <p className="my-1 text-center">
                      {item.date} - {item.value} -{' '}
                      {item.availability === false ? 'Not done' : 'Done'}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex flex-col items-center justify-center mt-4">
              <button
                onClick={unlockTokens}
                className="w-1/2 flex h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <TailSpin color="#fff" height={18} width={18} />
                  </>
                ) : (
                  'Unlock'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorityX;
