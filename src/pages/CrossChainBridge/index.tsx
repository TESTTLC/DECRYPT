import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import GlowingWrapper from "../../components/GlowingWrapper";
import TokensModal from "../../components/TokensModal";
import { useBridgeContracts } from "../../hooks/useBridgeContracts";

import small_logo from "../assets/images/logo.png";

const CrossChainBridge: React.FC = () => {
  const { bridgeContract } = useBridgeContracts("BSC");

  const callBridgeFunc = async () => {
    const r = await bridgeContract?.functions.burnFreezed(
      "0xff8046Ae3b6E9c275728501856b5E0e37F59d6eb",
      1,
      30322
    );
    // console.log("R IS: ", r);
    // console.log("value is: ", ethers.utils.formatEther(r.value.toString()));
  };

  useEffect(() => {
    if (bridgeContract) {
      console.log("b c: ", bridgeContract);
      callBridgeFunc();
    }
  }, [bridgeContract]);

  return (
    <div className="flex flex-col flex-1 mt-10 items-center">
      <div className="flex flex-col">
        <GlowingWrapper>
          <div className="relative items-center w-[44rem] xs:w-[22rem] h-[22rem] px-8 py-8 xs:px-4 rounded-lg bg-gray-900">
            <GlowingWrapper>
              <div className="relative flex bg-gray-900 w-full h-20 rounded-lg pt-1 px-6 items-center">
                <div className="flex w-1/2 flex-col h-full">
                  <p className="text-gray-400 font-medium font-poppins text-sm">
                    From
                  </p>
                  <input
                    className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                    placeholder="Value"
                    type="text"
                  ></input>
                </div>
                <TokensModal
                  tokens={[
                    "BSC",
                    "ETH",
                    "FTM",
                    "SOL",
                    "MATIC",
                    // "Ethereum",
                    // "Fantom",
                    // "Solana",
                    // "Polygon",
                    // "Binance Smart Chain",
                  ]}
                  type="from"
                />
              </div>
            </GlowingWrapper>
            <div className="w-full flex items-center justify-center h-14">
              <FaArrowCircleDown
                className="h-6 w-6 bg-transparent self-center "
                color="gray"
              />
            </div>
            <GlowingWrapper>
              <div className="relative flex bg-gray-900 w-full h-20 rounded-lg pt-1 px-6 items-center">
                <div className="flex w-1/2 flex-col h-full">
                  <p className="text-gray-400 font-medium font-poppins text-sm">
                    To
                  </p>
                  <input
                    className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                    // placeholder="Conversion coming soon..."
                    type="text"
                    disabled
                  ></input>
                </div>
                <TokensModal tokens={["TLChain"]} type="to" />
              </div>
            </GlowingWrapper>
            <button className="mt-6 flex w-full h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center">
              Swap
            </button>
          </div>
        </GlowingWrapper>
      </div>
      <div className="w-[44rem] xs:w-[24rem] mt-10 text-sm">
        <p className="font-poppins text-gray-300">
          Because of the decentralized nature of Decryption Protocol and the
          instability of different blockchain mainnets, your cross-chain
          transaction could take 3-30 minutes to complete but your assets are
          perfectly safe with Decryption protocol.
        </p>
      </div>
    </div>
  );
};

export default CrossChainBridge;
