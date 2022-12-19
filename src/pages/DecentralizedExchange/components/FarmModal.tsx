import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-modal';
import { StoreState } from 'src/utils/storeTypes';
import { Contract, ethers } from 'ethers';
import { GoArrowDown } from 'react-icons/all';
import { formatEther, parseEther } from 'ethers/lib/utils';
import {
  MasterchefContractAddress,
  TempUsdt,
  TempUsdc,
  usdt_tlc_pool_eth,
  usdc_tlc_pool_eth,
} from 'src/utils/globals';
import { Web3Provider } from '@ethersproject/providers';
import MasterChef from 'src/contracts/Masterchef.json';
import ERC20 from 'src/contracts/ERC20.json';

import { useWindowSize } from '../../../hooks/useWindowSize';
import { Project } from '../../../utils/types';

Modal.setAppElement('#root');

interface Props {
  index?: number;
  title: string;
  modalIsOpen: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setModalOpen: any;
  stakingType: boolean;
  poolId: number;
}

const FarmModal: React.FC<Props> = ({
  title,
  modalIsOpen,
  setModalOpen,
  stakingType,
  poolId,
}) => {
  const { isMobileSize } = useWindowSize();
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );

  const [bal, setBal] = useState('0');
  const [tokenAmount, setTokenAmount] = useState(0);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#080220',
      opacity: 1,
      backgroundOpacity: 1,
      borderWidth: 0,
      padding: 0,
      zIndex: 999,
      // minHeight: '25rem',
      width: isMobileSize ? '20rem' : '25rem',
      height: '230px',
    },
  };

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAmountChange = (e: any) => {
    setTokenAmount(e.target.value);
  };

  //   useEffect(() => {
  //     if (defaultToken) {
  //       setSelectedToken(defaultToken);
  //     }
  //   }, [defaultToken]);
  //   console.log('defaultToken: ', defaultToken);

  useEffect(() => {
    async function fetchData() {
      if (provider) {
        if (stakingType) {
          if (poolId == 0) {
            const tlc_usdt_cont = new Contract(
              TempUsdt,
              ERC20.abi,
              provider.getSigner(),
            );
            const amount = await tlc_usdt_cont.balanceOf(walletAddress);
            setBal(formatEther(amount.toString()));
          } else {
            const tlc_usdc_cont = new Contract(
              TempUsdc,
              ERC20.abi,
              provider.getSigner(),
            );
            const amount = await tlc_usdc_cont.balanceOf(walletAddress);
            setBal(formatEther(amount.toString()));
          }

          // setBal(rewards);
        } else {
          const masterChef_cont = new Contract(
            MasterchefContractAddress,
            MasterChef.abi,
            provider.getSigner(),
          );
          const amount = await masterChef_cont.userInfo(poolId, walletAddress);
          setBal(formatEther(amount[0]));
          // const rewards = await userPoolInfo(poolId, address);
          // setBal(rewards);
        }
      }
    }
    fetchData();
  }, [stakingType, poolId, walletAddress, provider, modalIsOpen]);

  const depositToken = async () => {
    if (!walletAddress || !provider) return;
    const amount = parseEther(tokenAmount.toString());
    const masterChef_cont = new Contract(
      MasterchefContractAddress,
      MasterChef.abi,
      provider.getSigner(),
    );

    const tx = await masterChef_cont.deposit(poolId, amount.toString());
    setModalOpen(false);
  };

  const withdrawToken = async () => {
    if (!walletAddress || !provider) return;
    const amount = parseEther(tokenAmount.toString());
    const masterChef_cont = new Contract(
      MasterchefContractAddress,
      MasterChef.abi,
      provider.getSigner(),
    );

    const tx = await masterChef_cont.withdraw(poolId, amount.toString());
    setModalOpen(false);
  };
  return (
    <div className="flex flex-col h-full w-1/2 rounded-xl items-baseline justify-end">
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        overlayClassName="Overlay"
        preventScroll={false}
      >
        <div className="z-50 flex flex-1 flex-col items-center h-full w-full relative px-6 pt-2 pb-4">
          <div className="flex flex-col h-20 w-full text-white font-poppins">
            <p className="font-poppins text-md mt-10 ">{title}</p>
            <p className="font-poppins text-md mt-4 mb-4 ">
              Your LP token amount: {bal}
            </p>
            <input
              className="w-full h-2/3 text-lg m-px  font-poppins text-black focus:outline-none"
              onChange={handleAmountChange}
              value={tokenAmount}
              type="number"
            ></input>
            {stakingType ? (
              <button
                className="flex xs:col-span-2 md:col-span-2 md:w-full h-10 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center mt-4"
                onClick={() => depositToken()}
              >
                Confirm
              </button>
            ) : (
              <button
                className="flex xs:col-span-2 md:col-span-2 md:w-full h-10 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center mt-4"
                onClick={() => withdrawToken()}
              >
                Confirm
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FarmModal;
