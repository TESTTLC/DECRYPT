import React from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import GlowingWrapper from "../../components/GlowingWrapper";
import TokensModal from "../../components/TokensModal";

const CrossChainBridge: React.FC = () => {
  return (
    <div className="flex flex-col flex-1 mt-10 items-center">
      <div className="flex flex-col">
        <GlowingWrapper>
          <div className="relative items-center w-[44rem] xs:w-[28rem] h-[22rem] p-8 rounded-lg bg-gray-900">
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
                    placeholder="Conversion coming soon..."
                    // value="Conversion coming soon"
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
    </div>
  );
};

export default CrossChainBridge;
