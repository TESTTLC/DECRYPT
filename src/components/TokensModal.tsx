import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useWindowSize } from "../hooks/useWindowSize";
import { GoArrowDown } from "react-icons/all";
import ftmBridgeImage from "../assets/images/ftm-bridge.png";
import ethBridgeImage from "../assets/images/eth-bridge.png";
import bscBridgeImage from "../assets/images/bsc-bridge.png";
import solBridgeImage from "../assets/images/sol-bridge.png";
import tlcBridgeImage from "../assets/images/tlc-bridge.png";
import maticBridgeImage from "../assets/images/matic-bridge.png";
import tlxOldToken from "../assets/images/tlx-token-old.png";
import tlxNewToken from "../assets/images/tlx-token-new.png";
import atariToken from "../assets/images/atari-token.png";
import { Project } from "../utils/types";

Modal.setAppElement("#root");

interface Props {
  index?: number;
  tokens: Project[];
  type: "from" | "to";
}

const TokensModal: React.FC<Props> = ({ tokens, type }) => {
  const { isMobileSize } = useWindowSize();
  const [selectedChain, setSelectedChain] = useState(tokens[0].tag);
  const [imageUsed, setImageUsed] = useState("");
  const [imageUsedToken, setImageUsedToken] = useState("");
  const [selectedToken, setSelectedToken] = useState("TLX");

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
      width: isMobileSize ? "20rem" : "25rem",
    },
  };

  useEffect(() => {
    if (selectedChain === "BSC") {
      setImageUsed(bscBridgeImage);
    } else if (selectedChain === "ETH") {
      setImageUsed(ethBridgeImage);
    } else if (selectedChain === "FTM") {
      setImageUsed(ftmBridgeImage);
    } else if (selectedChain === "MATIC") {
      setImageUsed(maticBridgeImage);
    } else if (selectedChain === "SOL") {
      setImageUsed(solBridgeImage);
    } else if (selectedChain === "TLC") {
      setImageUsed(tlcBridgeImage);
    }

    if (selectedToken === "TLX" && type === "from") {
      setImageUsedToken(tlxOldToken);
    } else if (selectedToken === "TLX" && type === "to") {
      setImageUsedToken(tlxNewToken);
    } else if (selectedToken === "ATRI") {
      setImageUsedToken(atariToken);
    }
  }, [selectedChain, selectedToken, type]);

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
        <div className="flex items-center">
          <button
            onClick={() => {
              if (type === "from") {
                setSelectedToken(selectedToken === "TLX" ? "ATRI" : "TLX");
              }
            }}
            className="flex text-white font-poppins items-center justify-center"
          >
            <img
              className="text-white font-poppins w-6 h-6 mr-2 object-cover"
              src={imageUsedToken}
            />
            <p className="text-white font-poppins">
              {type === "from" ? selectedToken : "TLX"}
            </p>

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
          className="flex h-full justify-end items-center "
        >
          <img
            className="text-white font-poppins w-7 h-7 mr-1 object-cover"
            src={imageUsed}
          />
          <p className="text-white font-poppins">{selectedChain}</p>{" "}
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
              <li
                key={`${token.name}/${index}`}
                className="w-full hover:bg-gray-800 "
              >
                <button
                  className={` w-full flex ${
                    index === 0 || index === tokens.length
                      ? undefined
                      : "border-t-2"
                  } border-opacity-70 border-gray-600 h-16 items-center justify-center text-center`}
                  onClick={() => setSelectedChain(token.tag)}
                >
                  <img src={token.image} className="w-10 h-10" />
                  <p className="text-xl font-semibold">
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

export default TokensModal;
