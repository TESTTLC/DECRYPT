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
import cronosBridgeImage from 'src/assets/images/cronos-bridge.png';
import okbBridgeImage from 'src/assets/images/okb-bridge.png';
import harmonyBridgeImage from 'src/assets/images/harmony-bridge.png';
import auroraBridgeImage from 'src/assets/images/aurora-bridge.png';
import kavaBridgeImage from 'src/assets/images/kava-bridge.png';
import iotexBridgeImage from 'src/assets/images/iotex-bridge.png';
import klaytnBridgeImage from 'src/assets/images/klaytn-bridge.png';
import cosmosBrigeImage from 'src/assets/images/cosmos-bridge.png';
import evmosBridgeImage from 'src/assets/images/evmos_bridge.png';
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

import { useWindowSize } from '../../hooks/useWindowSize';
import { Project } from '../../utils/types';

Modal.setAppElement('#root');

const NotificationModal: React.FC = () => {
  const { isMobileSize } = useWindowSize();

  const [imageUsed, setImageUsed] = useState('');
  const [imageUsedToken, setImageUsedToken] = useState('');
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(true);
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
      minHeight: '40rem',
      width: isMobileSize ? '20rem' : '30rem',
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="flex flex-col h-full w-1/2 rounded-xl items-baseline justify-end">
      <div className="flex w-full justify-end mb-4">
        {/* <button
            onClick={() => setIsNotificationModalOpen(true)}
            // onClick={onFromTokenSelect && onFromTokenSelect}
            className="flex text-white font-poppins items-center justify-center"
          >
            <img
              className="text-white font-poppins w-6 h-6 mr-2 object-cover"
              src={imageUsedToken}
            />

            <GoArrowDown className="h-4 w-4 ml-1" color="white" />

           
          </button> */}
        <Modal
          isOpen={isNotificationModalOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={() => setIsNotificationModalOpen(false)}
          style={customStyles}
          contentLabel="Modal"
          overlayClassName="Overlay"
          preventScroll={false}
        >
          <div className="z-50 flex flex-1 flex-col items-center h-full w-full relative px-6 pt-2 pb-4">
            <div className="flex flex-col h-20 w-full text-white font-poppins">
              <p className="font-poppins  mt-4 font-bold">
                Soon, V3 decryption will be fully released
              </p>
              <p>
                So, start warming up your legs because the race is about to
                begin! Every step will be important and will bring us closer to
                the goal!
              </p>
              <p className="font-poppins  mt-4 font-bold">The X Collection</p>
              <p>
                In December 2022, Decryption V3 will be released. Starting on 25
                November, The X NFT Collection will be available on NFT
                marketplaces such as OpenSea, Venly, and others.
              </p>
              <p>
                A NFT (TLChain's Key) will be provided to all holders of $TLC,
                $LSO, and $TLX, which can be used to unlock several perks on{' '}
                <a className="text-green-400" href="https://Decryption.com.">
                  Decryption.com.
                </a>
              </p>
              <p>
                Follow our Twitter channel and join our Discord server &nbsp;
                <a href="https://discord.gg/tlchain" className="text-green-400">
                  Discord server
                </a>
                &nbsp;for the latest announcements.
              </p>
              <p className="font-poppins  mt-4 font-bold">Club X</p>
              <p>
                The official opening of Club X, one of the world's most
                prestigious clubs, is set for 25 November.
              </p>
              <p>
                To become a member, you must own the most exclusive NFT from The
                X Collection (Decryption's Key).
              </p>

              <p className="font-poppins  mt-4 font-bold">TLChain ($TLC)</p>
              <p>
                The vesting program and the latest upgrade will begin at the end
                of November.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default NotificationModal;
