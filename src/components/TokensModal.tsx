import React, { useState } from "react";
import Modal from "react-modal";
import { useWindowSize } from "../hooks/useWindowSize";
import { GoArrowDown } from "react-icons/all";

Modal.setAppElement("#root");

interface Props {
  index?: number;
  //   coinTag: string;
  tokens: string[];
  type: "from" | "to";
}

const TokensModal: React.FC<Props> = ({ tokens, type }) => {
  const { isMobileSize } = useWindowSize();
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [coinTag, setCoinTag] = useState("TLX");

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      // bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      // backgroundColor: "#080220",
      backgroundColor: "#080220",
      opacity: 1,
      backgroundOpacity: 1,
      borderWidth: 0,
      padding: 0,
      zIndex: 999,
      minHeight: "25rem",
      width: "25rem",
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
      <div className="flex w-full justify-end">
        <div className="flex justify-start items-start">
          <button
            onClick={() => {
              if (type === "from") {
                setCoinTag(coinTag === "TLX" ? "ATRI" : "TLX");
              }
            }}
            className="flex text-white font-poppins"
          >
            {type === "from" ? coinTag : "TLX"}

            {type === "from" ? (
              <GoArrowDown className="h-4 w-4 ml-2 mt-1" color="white" />
            ) : null}
          </button>
          <div className="h-8 w-1 bg-gray-800 mx-6" />
        </div>
        <button
          onClick={openModal}
          type="button"
          // className="mt-6 flex w-full h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
          className="flex h-ful justify-end items-end pb-4"
        >
          <p className="text-white font-poppins">{selectedToken}</p>{" "}
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
        // className="Modal"
        preventScroll={false}
      >
        <div className="z-50 flex flex-1 flex-col items-center h-full w-full relative px-6 pt-2 pb-4">
          <div className="flex flex-col h-20 w-full text-white font-poppins">
            <p className="font-poppins text-md mt-4 ">Switch to</p>
          </div>
          <ul className="flex flex-col w-full text-white font-poppins justify-center items-center">
            {tokens.map((token, index) => (
              <li className="w-full hover:bg-gray-800 ">
                <button
                  className={` w-full flex ${
                    index === 0 || index === tokens.length
                      ? undefined
                      : "border-t-2"
                  } border-opacity-70 border-gray-600 h-16 items-center justify-center text-center`}
                  onClick={() => setSelectedToken(token)}
                >
                  <p className="text-xl font-semibold">{token}</p>
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
