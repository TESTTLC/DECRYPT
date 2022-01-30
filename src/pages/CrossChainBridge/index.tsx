import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import GlowingWrapper from "../../components/GlowingWrapper";
import TokensModal from "../../components/TokensModal";
import { ChainsIds } from "../../utils/types";
import { changeChain } from "../../utils/functions/MetaMask";
import { useContracts } from "../../hooks/useContracts";

import { useGlobalContext } from "../../utils/context";
import { OldTLXTokenContractAddress } from "../../utils/globals";
import OldTLXToken from "../../contracts/OldTLXToken.json";
import { getTransaction, initialize } from "../../api/index";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";

const CrossChainBridge: React.FC = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { tokenContract } = useContracts("OldTLX");
  const { account, provider } = useGlobalContext();
  const [currentChainId, setCurrentChainId] = useState();

  useEffect(() => {
    chainChange();
  }, []);

  useEffect(() => {
    window.ethereum.on("chainChanged", (chainId: any) => {
      console.log("Changed chain => ", chainId);
      console.log("type of chainId: ", typeof chainId);

      setCurrentChainId(chainId);
    });
  }, [window.ethereum]);

  useEffect(() => {
    if (tokenContract && account) {
      // if (currentChainId === "0x38") {
      getBalance();
      // }
    }
  }, [tokenContract, account, currentChainId]);

  const chainChange = async () => {
    try {
      await changeChain(ChainsIds.BSC);
    } catch (error) {}
  };

  const getFreezedCount = async () => {
    try {
      const count = await tokenContract.freezingCount(account);
    } catch (error) {}
  };

  const initializeSwap = async () => {
    if (account && totalBalance > 0) {
      setIsLoading(true);
      const transaction = await initialize(account);
      if (transaction) {
        const available =
          transaction.totalAmount - transaction.totalMintedAmount;

        setTotalBalance(parseFloat(available.toFixed(3)));
      }

      setIsLoading(false);
    }
  };

  const getBalance = async () => {
    try {
      const transaction = await getTransaction(account!);
      if (transaction && transaction.totalAmount) {
        const available =
          transaction.totalAmount - transaction.totalMintedAmount;
        setTotalBalance(parseFloat(available.toFixed(3)));
      } else {
        const result = await tokenContract.balanceOf(account);
        if (result) {
          const available = parseFloat(ethers.utils.formatEther(result));
          setTotalBalance(parseFloat(available.toFixed(3)));
        }
      }
    } catch (error) {
      console.log("Err: ", error);
    }
  };

  // const mintNew = async () => {
  //   try {
  //     const result = await privateContract.functions.mint(
  //       account,
  //       ethers.utils.parseUnits("5", "ether")
  //     );
  //   } catch (error) {}
  // };

  // const burnAndMint = async (actualBalanceOf: number) => {
  //   if (account) {
  //     try {
  //       const result = await tokenContract.functions.burn(
  //         ethers.utils.parseUnits(actualBalanceOf.toString(), "ether")
  //       );
  //       if (result) {
  //         console.log("Result of burn: ", result);
  //         const status = await mintNewTokens(account);
  //         if (status === 200) {
  //           console.log("Minted");
  //         } else {
  //           console.log("Not minted");
  //         }
  //       } else {
  //         updateTransaction(account, "failed");
  //       }
  //     } catch (error) {
  //       updateTransaction(account, "failed");
  //       console.warn("error on burn: ", error);
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col flex-1 mt-10 items-center">
      <div className="flex flex-col">
        <div className="flex">
          <p className="text-green-400 font-poppins font-semibold text-lg mb-4">
            {totalBalance} TLX
          </p>
          <p className="text-white font-poppins font-semibold text-lg mb-4">
            &nbsp;available on BSC
          </p>
        </div>
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
                    value={totalBalance}
                    type="text"
                    disabled
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
                    value={totalBalance}
                  ></input>
                </div>
                <TokensModal tokens={["TLChain"]} type="to" />
              </div>
            </GlowingWrapper>
            <button
              onClick={initializeSwap}
              className="mt-6 flex w-full h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  {" "}
                  Swapping in progress &nbsp;
                  <TailSpin color="#fff" height={18} width={18} />
                </>
              ) : (
                "Swap"
              )}
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
