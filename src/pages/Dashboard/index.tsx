import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { coinsTags } from "../../App";
import { useContracts } from "../../hooks/useContracts";
import { useGlobalContext } from "../../utils/context";
import {
  determinePowerForStake,
  getUserStakes,
} from "../../utils/functions/Contracts";
import { Stake } from "../../utils/types";
// import TheLuxuryPng from "../../assets/images/the_luxury.png";

const Dashboard: React.FC = () => {
  // const { totalPower } = useGlobalContext();
  const { tokenContract: TLXTokenContract, stakeContract: TLXStakeContract } =
    useContracts("TLX");
  const { tokenContract: TLCTokenContract, stakeContract: TLCStakeContract } =
    useContracts("TLC");

  const [TLXPower, setTLXPower] = useState(0);
  const [TLCPower, setTLCPower] = useState(0);
  const [totalTLXStaked, setTotalTLXStaked] = useState(0);
  const [totalTLCStaked, setTotalTLCStaked] = useState(0);
  const [power, setPower] = useState(0);

  const getTLXtakeTransactions = async () => {
    if (TLXStakeContract && TLCStakeContract) {
      let currentAmout = 0;
      let currentPower = 0;
      const stakes = await getUserStakes(TLXStakeContract);
      stakes.forEach((stake: Stake, index: number) => {
        currentAmout += parseFloat(ethers.utils.formatEther(stake.amount));
        currentPower += determinePowerForStake(
          parseFloat(ethers.utils.formatEther(stake.amount)),
          stake.period.toNumber(),
          "TLX"
        );
      });
      setTLXPower(currentPower);
      setTotalTLXStaked(parseFloat(currentAmout.toFixed(3)));
    }
  };

  const getTLCStakeTransactions = async () => {
    if (TLXStakeContract && TLCStakeContract) {
      let currentAmout = 0;
      let currentPower = 0;
      const stakes = await getUserStakes(TLCStakeContract);
      stakes.forEach((stake: Stake, index: number) => {
        currentAmout += parseFloat(ethers.utils.formatEther(stake.amount));
        currentPower += determinePowerForStake(
          parseFloat(ethers.utils.formatEther(stake.amount)),
          stake.period.toNumber(),
          "TLC"
        );
      });
      setTLCPower(currentPower);
      setTotalTLCStaked(parseFloat(currentAmout.toFixed(3)));
    }
  };

  useEffect(() => {
    console.log("contractS TLX: ", TLXStakeContract);
    getTLXtakeTransactions();
    getTLCStakeTransactions();
  }, [TLXStakeContract, TLCStakeContract]);

  useEffect(() => {
    // const p = ((TLXPower + TLCPower) / totalLSOValueAlocated) * 100;
    let p = TLXPower + TLCPower;
    if (p > 100) {
      p = 100;
    }

    setPower(parseFloat(p.toFixed(4)));
  }, [TLXPower, TLCPower]);

  return (
    <div className="px-2 w-full flex flex-col justify-center">
      <p className="text-white font-bold text-2xl mb-4">Dashboard</p>
      <div className="grid gap-y-4 2xl:gap-x-8 xl:gap-x-8 lg:gap-x-8 grid-cols-7 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1">
        <div className="flex w-full col-span-2 flex-col h-96 bg-customBlue-300 justify-center items-center">
          <p className="text-white font-poppins font-bold text-2xl mb-4">
            1 Project
          </p>
          <p className="text-white font-poppins font-bold text-2xl mb-4">
            {totalTLCStaked > 0 && totalTLXStaked > 0
              ? "2"
              : totalTLXStaked > 0 || totalTLCStaked > 0
              ? "1"
              : "0"}{" "}
            Tokens
          </p>
        </div>
        <div className="w-full flex justify-center items-center col-start-3 col-span-5 md:col-span-1 sm:col-span-1 xs:col-span-1 h-96 bg-customBlue-300 px-2">
          <div className="w-full grid grid-cols-3">
            <p className="text-center text-white text-2xl font-semibold font-poppins">
              You staked <p className="text-green-500">{totalTLXStaked} TLX</p>
            </p>
            <p className="text-center text-white text-2xl font-semibold font-poppins">
              Total power <p className="text-green-500">{power}%</p>
            </p>
            <p className="text-center text-white text-2xl font-semibold font-poppins">
              You staked <p className="text-green-500">{totalTLCStaked} TLC</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
