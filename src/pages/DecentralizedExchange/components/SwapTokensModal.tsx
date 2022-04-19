import React, { useState } from 'react';
import Modal from 'react-modal';
import { GoArrowDown } from 'react-icons/all';

import { useWindowSize } from '../../../hooks/useWindowSize';
import { Project } from '../../../utils/types';

Modal.setAppElement('#root');

interface Props {
  index?: number;
  tokens: Project[];
  onTokenChange: (token: string) => void;
}

const SwapTokensModal: React.FC<Props> = ({ tokens, onTokenChange }) => {
  const { isMobileSize } = useWindowSize();
  const [selectedToken, setSelectedToken] = useState(tokens[0]);

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
      minHeight: '25rem',
      width: isMobileSize ? '20rem' : '25rem',
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
        <button
          onClick={openModal}
          className="flex h-full justify-end items-center"
        >
          <img
            className={`${
              selectedToken.tag === 'TLLP'
                ? 'w-8 h-8 object-contain'
                : 'w-6 h-6 object-cover'
            }`}
            src={selectedToken.image}
          />
          <p className="ml-2 text-white font-poppins">{selectedToken.tag}</p>{' '}
          <GoArrowDown className="h-4 w-4 ml-2 mb-1" color="white" />
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
            {tokens.map((token, index) => (
              <li
                key={`${token.name}/${index}`}
                className="w-full hover:bg-gray-800 "
              >
                <button
                  className={`w-full flex ${
                    index === 0 || index === tokens.length
                      ? undefined
                      : 'border-t-2'
                  } border-opacity-70 border-gray-600 h-16 items-center justify-center text-center`}
                  onClick={() => {
                    setSelectedToken(token);
                    onTokenChange(token.tag);
                    closeModal();
                  }}
                >
                  <img
                    src={token.image}
                    className={`${
                      token.tag === 'TLLP'
                        ? 'w-8 h-8 object-contain'
                        : 'w-6 h-6 object-cover'
                    }`}
                    alt={`${token.name}`}
                  />
                  <p className="ml-2 text-xl font-semibold ">
                    {token.tag} ({token.name})
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

export default SwapTokensModal;
