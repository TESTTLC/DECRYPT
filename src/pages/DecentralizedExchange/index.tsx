import dotenv from "dotenv";
import { ethers } from "ethers";
import React, { useCallback, useEffect, useState } from "react";
import { FaArrowCircleDown } from "react-icons/fa";
import { ChainsIds, Project } from "../../utils/types";
import { changeChain } from "../../utils/functions/MetaMask";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";
import { USDTContractAddress } from "src/utils/globals";
import USDTToken from "src/contracts/USDT.json";
import { getBalance } from "src/utils/functions/Contracts";
import tetherImage from "src/assets/images/tether.png";
import tlchainImage from "src/assets/images/tlc-bridge.png";
import { StoreState } from "src/utils/storeTypes";
import { Web3Provider } from "@ethersproject/providers";
import { useSelector } from "react-redux";

export const localModalTokens: Project[] = [
  {
    name: "Tether",
    tag: "USDT",
    image: "",
  },
  {
    name: "The Luxury Token",
    tag: "TLX",
    image: "",
  },
];

const minimumAmount = 1;

const DecentralizedExchange: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider
  );
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress
  );
  const [currentChainId, setCurrentChainId] = useState(
    window.ethereum?.networkVersion
      ? ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10))
      : undefined
  );
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [chainErrorMessage, setChainErrorMessage] = useState<
    string | undefined
  >(undefined);
  const [usdtAmountToSwap, setUsdtAmountToSwap] = useState(0);

  const chainChange = async () => {
    await changeChain(ChainsIds.BSC);
  };

  const getUsdtBalance = useCallback(async () => {
    if (walletAddress && provider && currentChainId) {
      const contract = new ethers.Contract(
        USDTContractAddress,
        USDTToken.abi,
        provider
      );

      const balance = await getBalance(contract, walletAddress);
      setUsdtBalance(balance);
    }
    if (window.ethereum?.networkVersion) {
      setCurrentChainId(
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10))
      );
    }
  }, [currentChainId, provider, walletAddress]);

  const handleAmountChange = (e: any) => {
    setUsdtAmountToSwap(e.target.value);
  };

  useEffect(() => {
    chainChange();
    getUsdtBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUsdtBalance();
    if (currentChainId === ChainsIds.BSC) {
      setChainErrorMessage(undefined);
    } else {
      setChainErrorMessage("Please connect to Binance Smart Chain");
    }
  }, [currentChainId, getUsdtBalance]);

  useEffect(() => {
    if (currentChainId === ChainsIds.BSC) {
      getUsdtBalance();
    } else {
      chainChange();
      getUsdtBalance();
    }
  }, [walletAddress, provider, currentChainId, getUsdtBalance]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("chainChanged", (chainId: any) => {
        setCurrentChainId(chainId);
        window.location.reload();
      });
      setCurrentChainId(
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10))
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.ethereum]);

  // Send USDT
  // const send = async () => {
  //   // @ts-ignore
  //   if (provider && account && usdtAmountToSwap >= minimumAmount) {
  //     try {
  //       const contract = new ethers.Contract(
  //         USDTContractAddress,
  //         USDTToken.abi,
  //         provider.getSigner()
  //       );
  //       const usdts = ethers.utils.parseUnits(usdtAmountToSwap.toString(), 18);
  //       const tx = await contract.transfer(
  //         process.env.REACT_APP_TLC_OWNER_ADDRESS,
  //         usdts
  //       );

  //       const res = await fetch(
  //         `${process.env.REACT_APP_API_BACKEND_EXCHANGE}api/claim`,
  //         {
  //           method: "POST",
  //           headers: {
  //             Accept: "application/json",
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({
  //             address: walletAddress,
  //             txhash: tx.hash,
  //             amount: usdtAmountToSwap.toString(),
  //           }),
  //         }
  //       );

  //       const data = await res.json();
  //     } catch (error) {
  //       console.log("Error is: ", error);
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col">
        <div className="w-[38rem] xs:w-[22rem] mt-10 text-sm mb-4">
          <p className="font-poppins font-bold text-gray-300 text-3xl">
            Trade Coin In An Instant
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <p className="text-green-400 font-poppins font-semibold text-lg mb-4">
              {usdtBalance} USDT
            </p>
            <p className="text-white font-poppins font-semibold text-lg mb-4">
              &nbsp;available on BSC
            </p>
          </div>
        </div>
        {chainErrorMessage && (
          <p className="mb-2 font-poppins text-red-400">{chainErrorMessage}</p>
        )}
        <div className="relative items-center w-[38rem] xs:w-[22rem] h-[25rem] px-8 py-8 xs:px-4 rounded-lg bg-black bg-opacity-60">
          <div className="relative flex bg-black bg-opacity-60 w-full h-20 rounded-lg pt-1 px-6 items-center">
            <div className="flex w-1/2 flex-col h-full">
              <p className="text-gray-400 font-medium font-poppins text-sm">
                From
              </p>
              <input
                className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                onChange={handleAmountChange}
                value={usdtAmountToSwap}
                type="number"
              ></input>
            </div>
            {/* <TokensModal tokens={localModalTokens} type="from" /> */}
            <div className="flex w-1/2 justify-end items-center mt-4">
              <img
                className="text-white font-poppins w-4 h-4 mr-2 object-cover "
                src={tetherImage}
              />
              <p className="font-poppins text-md text-white">USDT</p>
            </div>
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
                type="number"
                disabled
                value={usdtAmountToSwap * 17}
              ></input>
            </div>
            {/* <TokensModal tokens={[]} type="to" /> */}
            <div className="flex w-1/2 justify-end items-center mt-4">
              <img
                className="text-white font-poppins w-6 h-6 mr-2 object-cover "
                src={tlchainImage}
              />
              <p className="font-poppins text-md text-white">TLC</p>
            </div>
          </div>
          <p className="font-poppins text-gray-300 mt-2">
            Exchange Rate: 1 USDT ≃ 17 TLC
          </p>
          <p className="mb-2 font-poppins text-red-400">
            Please note that there's a minim of {minimumAmount} USDT (BEP20) per
            swap
          </p>
          <button className="mt-2 flex w-full h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center">
            {isLoading ? (
              <>
                {" "}
                Exchange in progress &nbsp;
                <TailSpin color="#fff" height={18} width={18} />
              </>
            ) : (
              "Exchange"
            )}
          </button>
        </div>
      </div>

      <div className="w-[38rem] xs:w-[22rem] mt-4 text-lg">
        <p className="font-poppins text-gray-300">
          It will take a minute. Please check your wallet to get{" "}
          {usdtAmountToSwap * 17} TLC
        </p>
      </div>
    </div>
  );
};

export default DecentralizedExchange;
