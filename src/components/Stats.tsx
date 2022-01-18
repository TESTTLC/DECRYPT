import React, { useEffect, useRef, useState } from "react";
import { useWalletConnector } from "../hooks/useWalletConnector";
import Header from "./Header";
import Modal from "react-modal";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../utils/context";
import * as contracts from "../utils/functions/Contracts";
import { useContracts } from "../hooks/useContracts";
import SNXStatBackground from "../assets/svg/snx-stat-background.svg";

interface Props {
  coinTag: "TLX" | "TLC" | "LSO";
}

const Stats: React.FC<Props> = ({ coinTag }) => {
  const { stakeContract, tokenContract } = useContracts(coinTag);
  const { account } = useGlobalContext();
  const [volume24h, setVolume24h] = useState(0);
  const [totalRewards, setTotalRewards] = useState<number>();
  const [userRewards, setUserRewards] = useState<number>();
  const [balance, setBalance] = useState<number>();

  const getTotalVolume24h = async () => {
    const result = await contracts.getVolume24h();
    setVolume24h(parseFloat(result.toFixed(2)));
  };

  const getTotalRewards = async () => {
    if (stakeContract) {
      const rewards = await contracts.getTotalRewards(stakeContract);
      setTotalRewards(rewards);
    }
  };

  const getUserTLXBalance = async () => {
    if (account) {
      const result = await contracts.getTLXBalance(tokenContract, account);
      setBalance(result);
    }
  };

  const calculateStakeRewards = async () => {
    if (stakeContract) {
      const stakes = await contracts.getUserStakes(stakeContract);
      // const rewards = await contracts.calculateStakeRewards(
      //   stakeContract,
      //   stakes
      // );
      // setUserRewards(rewards);
    }
  };

  useEffect(() => {
    getTotalVolume24h();
  }, []);

  useEffect(() => {
    getTotalRewards();
    calculateStakeRewards();
  }, [stakeContract]);

  useEffect(() => {
    if (tokenContract) {
      getUserTLXBalance();
    }
  }, [tokenContract]);

  return (
    <div className="grid grid-cols-3 w-full my-20 justify-center items-center ">
      <div
        // src={small_logo}
        className="flex flex-col justify-center items-center"
      >
        <div
          className="absolute bg-cover h-24 w-32 opacity-30 "
          // style={{ backgroundImage: `url(${small_logo})` }}
          style={{ backgroundImage: `url(${SNXStatBackground})` }}
        ></div>

        {/* <div className="w-10 h-10 bg-[url('../assets/images/small_logo.png')]"></div> */}
        <p className="text-white text-center text-sm font-oswald uppercase">
          Value locked 24h
        </p>
        <div>
          <p className="text-indigo-500 font-bold text-lg drop-shadow-2xl shadow-white">
            {volume24h}
          </p>
          {/* <p className="text-white">TLX</p> */}
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div
          className="absolute bg-cover h-32 w-48 opacity-30 "
          // style={{ backgroundImage: `url(${small_logo})` }}
          style={{ backgroundImage: `url(${SNXStatBackground})` }}
        ></div>
        <p className="text-white text-center text-sm font-oswald uppercase">
          Total Rewards
        </p>
        <p className="text-green-500 font-bold text-lg drop-shadow-2xl shadow-white">
          {totalRewards}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div
          className="absolute bg-cover h-24 w-32 opacity-30 "
          // style={{ backgroundImage: `url(${small_logo})` }}
          style={{ backgroundImage: `url(${SNXStatBackground})` }}
        ></div>
        <p className="text-white text-center text-sm font-oswald uppercase">
          Your Balance
        </p>
        <p className="text-indigo-500 font-bold text-lg drop-shadow-2xl shadow-white">
          {balance} {coinTag}
        </p>
      </div>
    </div>
  );
};

export default Stats;
