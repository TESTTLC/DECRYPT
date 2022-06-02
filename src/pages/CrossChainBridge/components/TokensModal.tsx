import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { GoArrowDown } from 'react-icons/all';
import ftmBridgeImage from 'src/assets/images/ftm-bridge.png';
import ethBridgeImage from 'src/assets/images/eth-bridge.png';
import bscBridgeImage from 'src/assets/images/bsc-bridge.png';
import solBridgeImage from 'src/assets/images/sol-bridge.png';
import tlcBridgeImage from 'src/assets/images/tlc-bridge.png';
import maticBridgeImage from 'src/assets/images/matic-bridge.png';
import avaxBridgeImage from 'src/assets/images/avax-token.png';
import elrondBridgeImage from 'src/assets/images/elrond-bridge.png';
import elrondCoinImage from 'src/assets/images/egld-coin.png';
import usdtBridgeImage from 'src/assets/images/USDT-logo.png';
import usdcCoinImage from 'src/assets/images/USDC-logo.png';
import tlxNewToken from 'src/assets/images/tlx-token-new.png';
import lsoLogo from 'src/assets/images/LSO-logo.png';
import tlcLogo from 'src/assets/images/TLC-logo.png';
import { modalChains, modalCoins } from 'src/utils/globals';
import { useDispatch, useSelector } from 'react-redux';
import { updateBridgeState } from 'src/redux/modules/bridge/actions';
import { BridgeState, StoreState } from 'src/utils/storeTypes';

import { useWindowSize } from '../../../hooks/useWindowSize';
import { Project } from '../../../utils/types';

Modal.setAppElement('#root');

interface Props {
  index?: number;
  chains: Partial<typeof modalChains>;
  coins: Partial<typeof modalCoins>;
  type: 'from' | 'to';
  chainType?: 'ELROND' | 'EVM';
}

const TokensModal: React.FC<Props> = ({ chains, type, chainType, coins }) => {
  const { isMobileSize } = useWindowSize();
  const bridgeState = useSelector<StoreState, BridgeState>(
    (state) => state.bridge,
  );
  const dispatch = useDispatch();
  const selectedChain =
    type === 'from' ? bridgeState.fromChain : bridgeState.toChain;

  const [imageUsed, setImageUsed] = useState('');
  const [imageUsedToken, setImageUsedToken] = useState('');
  const [isTokensModalOpen, setIsTokensModalOpen] = useState(false);
  // const [selectedToken, setSelectedToken] = useState(bridgeState.token);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      // bottom: "auto",
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      // backgroundColor: "#080220",
      backgroundColor: '#080220',
      opacity: 1,
      backgroundOpacity: 1,
      borderWidth: 0,
      padding: 0,
      zIndex: 999,
      minHeight: '25rem',
      width: isMobileSize ? '20rem' : '25rem',
    },
  };

  useEffect(() => {
    if (bridgeState.token === 'EGLD') {
      changeToken('LSO');
    }
  }, []);

  useEffect(() => {
    if (selectedChain === 'BSC') {
      setImageUsed(bscBridgeImage);
    } else if (selectedChain === 'ETH') {
      setImageUsed(ethBridgeImage);
    } else if (selectedChain === 'FTM') {
      setImageUsed(ftmBridgeImage);
    } else if (selectedChain === 'MATIC') {
      setImageUsed(maticBridgeImage);
    } else if (selectedChain === 'SOL') {
      setImageUsed(solBridgeImage);
    } else if (selectedChain === 'TLC') {
      setImageUsed(tlcBridgeImage);
    } else if (selectedChain === 'AVAX') {
      setImageUsed(avaxBridgeImage);
    } else if (selectedChain === 'ELROND') {
      setImageUsed(elrondCoinImage);
    }

    if (bridgeState.token === 'TLC') {
      setImageUsedToken(tlcLogo);
    } else if (bridgeState.token === 'LSO') {
      setImageUsedToken(lsoLogo);
    } else if (bridgeState.token === 'USDT') {
      setImageUsedToken(usdtBridgeImage);
    } else if (bridgeState.token === 'EGLD') {
      setImageUsedToken(elrondCoinImage);
    } else if (bridgeState.token === 'USDC') {
      setImageUsedToken(usdcCoinImage);
    }
  }, [selectedChain, bridgeState.token, type]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const updateState = (params: { chain?: string; token?: string }) => {
    if (type === 'from') {
      //   let { toChain } = bridgeState;
      //   if (params.chain === 'TLC') {
      //     toChain = bridgeState.fromChain;
      //   } else {
      //     toChain = 'TLC';
      //   }
      dispatch(
        updateBridgeState({
          // ...(params.chain !== 'TLC' && {
          //   toChain: 'TLC',
          // }),
          // ...(params.chain === bridgeState.toChain && {
          //   toChain: bridgeState.fromChain,
          // }),
          // ...(params.chain && { toChain }),
          ...(params.chain &&
            params.chain !== 'TLC' && {
              toChain: 'TLC',
            }),
          ...(params.chain && { fromChain: params.chain }),
          ...(params.token && { token: params.token }),
        }),
      );
    } else if (type === 'to') {
      dispatch(
        updateBridgeState({
          // ...(params.chain !== 'TLC' && {
          //   fromChain: 'TLC',
          // }),
          // ...(params.chain === bridgeState.fromChain && {
          //   fromChain: bridgeState.toChain,
          // }),
          // ...(params.chain && { fromChain }),
          ...(params.chain &&
            params.chain !== 'TLC' && {
              fromChain: 'TLC',
            }),
          ...(params.chain && { toChain: params.chain }),
          ...(params.token && { token: params.token }),
        }),
      );
    }
  };

  const changeToken = (token: string) => {
    if (chainType === 'EVM') {
      console.log('EVM here with token: ', token);
      updateState({ token });
      //   if (bridgeState.token === 'TLC') {
      //     updateState({ ...bridgeState, token: 'LSO' });
      //   } else {
      //     updateState({ ...bridgeState, token: 'TLC' });
      //   }
    }
  };

  return (
    <div className="flex flex-col h-full w-1/2 rounded-xl items-baseline justify-end">
      <div className="flex w-full justify-end mb-4">
        <div className="flex items-center">
          <button
            onClick={() => setIsTokensModalOpen(true)}
            // onClick={onFromTokenSelect && onFromTokenSelect}
            className="flex text-white font-poppins items-center justify-center"
          >
            <img
              className="text-white font-poppins w-6 h-6 mr-2 object-cover"
              src={imageUsedToken}
            />
            <p className="text-white font-poppins">{bridgeState.token}</p>
            <GoArrowDown className="h-4 w-4 ml-1" color="white" />

            {/* {type === 'from' ? (
              <GoArrowDown className="h-4 w-4 ml-2 mt-1" color="white" />
            ) : null} */}
          </button>
          <Modal
            isOpen={isTokensModalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={() => setIsTokensModalOpen(false)}
            style={customStyles}
            contentLabel="Modal"
            overlayClassName="Overlay"
            preventScroll={false}
          >
            <div className="z-50 flex flex-1 flex-col items-center h-full w-full relative px-6 pt-2 pb-4">
              <div className="flex flex-col h-20 w-full text-white font-poppins">
                <p className="font-poppins text-md mt-4 ">Switch to</p>
              </div>
              <ul className="flex flex-col w-full text-white font-poppins justify-center items-center">
                {Object.values(coins).map((token, index) => (
                  <li
                    key={`${token.tag}/${index}`}
                    className="w-full hover:bg-gray-800 "
                  >
                    <button
                      className={`w-full flex ${
                        index === 0 || index === Object.values(coins).length - 1
                          ? undefined
                          : 'border-t-2'
                      } border-opacity-70 border-gray-600 h-16 items-center justify-center text-center`}
                      onClick={() => changeToken(token.tag)}
                    >
                      <img src={token.image} className="w-8 h-8 mr-2" />
                      <p className="text-xl font-semibold">{token.tag}</p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Modal>

          <div className="h-8 w-1 bg-gray-800 mx-6" />
        </div>
        <button
          onClick={openModal}
          // className="mt-6 flex w-full h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
          className="flex h-full justify-end items-center "
        >
          <img
            className="text-white font-poppins w-7 h-7 mr-1 object-cover"
            src={imageUsed}
          />
          <p className="text-white font-poppins">{selectedChain}</p>{' '}
          <GoArrowDown className="h-4 w-4 ml-1" color="white" />
        </button>
      </div>
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
            <p className="font-poppins text-md mt-4 ">Switch to</p>
          </div>
          <ul className="flex flex-col w-full text-white font-poppins justify-center items-center">
            {Object.values(chains).map((chain, index) => (
              <li
                key={`${chain.name}/${index}`}
                className="w-full hover:bg-gray-800 "
              >
                <button
                  className={` w-full flex ${
                    index === 0 || index === Object.values(chains).length - 1
                      ? undefined
                      : 'border-t-2'
                  } border-opacity-70 border-gray-600 h-16 items-center justify-center text-center`}
                  onClick={() => updateState({ chain: chain.tag })}
                >
                  <img src={chain.image} className="w-8 h-8 mr-2" />
                  <p className="text-xl font-semibold">
                    {chain.tag} ({chain.name})
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default TokensModal;
