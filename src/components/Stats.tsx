import React, { useCallback, useEffect, useState } from "react";
import * as contracts from "../utils/functions/Contracts";
import { useContracts } from "../hooks/useContracts";
import SNXStatBackground from "../assets/svg/snx-stat-background.svg";
import { useSelector } from "react-redux";
import { StoreState } from "src/utils/storeTypes";

interface Props {
  coinTag: "TLX" | "TLC" | "LSO";
  totalRewards: number;
}

const Stats: React.FC<Props> = ({ coinTag, totalRewards }) => {
  const { stakeContract, tokenContract } = useContracts(coinTag);
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress
  );
  const [totalStaked, setTotalStaked] = useState(0);
  const [balance, setBalance] = useState<number>();

  const getUserTLCBalance = async () => {
    if (walletAddress) {
      const TLCBalance = await contracts.getTLCBalance(walletAddress);
      setBalance(TLCBalance);
    }
  };

  useEffect(() => {
    if (coinTag === "TLC") {
      getUserTLCBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress, coinTag]);

  const getTotalStaked = async () => {
    try {
      if (stakeContract) {
        const totalStaked = await contracts.getTotalValueLocked(stakeContract);
        setTotalStaked(totalStaked);
      }
    } catch (error) {}
  };

  const getUserTLXBalance = useCallback(async () => {
    if (walletAddress && coinTag !== "TLC") {
      const result =
        coinTag === "LSO"
          ? await contracts.getBalance(tokenContract, walletAddress)
          : await contracts.getActualBalanceOf(tokenContract, walletAddress);
      setBalance(result);
    }
  }, [coinTag, tokenContract, walletAddress]);

  const calculateStakeRewards = useCallback(async () => {
    if (stakeContract) {
      const stakes = await contracts.getUserStakes(stakeContract);
      // const rewards = await contracts.calculateStakeRewards(
      //   stakeContract,
      //   stakes
      // );
      // setUserRewards(rewards);
    }
  }, [stakeContract]);

  useEffect(() => {
    getTotalStaked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stakeContract]);

  useEffect(() => {
    calculateStakeRewards();
    if (stakeContract) {
      contracts.getTotalValueLocked(stakeContract);
    }
  }, [calculateStakeRewards, stakeContract]);

  useEffect(() => {
    if (tokenContract) {
      getUserTLXBalance();
    }
  }, [getUserTLXBalance, tokenContract]);

  return (
    <div className="grid grid-cols-3 w-full my-20 justify-center items-center ">
      <div className="flex flex-col justify-center items-center">
        <div
          className="absolute bg-cover h-24 w-32 opacity-0 "
          style={{ backgroundImage: `url(${SNXStatBackground})` }}
        ></div>

        <p className="text-white text-center text-sm font-oswald uppercase">
          Total Value locked
        </p>
        <div>
          <p className="text-indigo-500 font-bold text-lg drop-shadow-2xl shadow-white">
            {walletAddress ? totalStaked : "-"} {coinTag}
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div
          className="absolute bg-cover h-32 w-48 opacity-0 "
          style={{ backgroundImage: `url(${SNXStatBackground})` }}
        ></div>
        <p className="text-white text-center text-sm font-oswald uppercase">
          Total Rewards
        </p>
        <p className="text-green-500 font-bold text-lg drop-shadow-2xl shadow-white">
          {walletAddress ? totalRewards : "-"} {coinTag}
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <div
          className="absolute bg-cover h-24 w-32 opacity-0 "
          style={{ backgroundImage: `url(${SNXStatBackground})` }}
        ></div>
        <p className="text-white text-center text-sm font-oswald uppercase">
          Your Balance
        </p>
        <p className="text-indigo-500 font-bold text-lg drop-shadow-2xl shadow-white">
          {walletAddress ? balance : "-"} {coinTag}
        </p>
      </div>
    </div>
  );
};

export default Stats;
