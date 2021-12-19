import React, { useEffect, useRef, useState } from "react";
import { useWalletConnector } from "../hooks/useWalletConnector";
import Header from "./Header";
import Modal from "react-modal";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../utils/context";
import { getTotalRewards, getVolume24h } from "../utils/functions/Contracts";
import { useTLXContracts } from "../hooks/useTLXContracts";
import { BigNumber, ethers } from "ethers";
import small_logo from "../assets/images/small_logo.png";
import SNXStatBackground from "../assets/svg/snx-stat-background.svg";

const Stats: React.FC = () => {
  const [volume24h, setVolume24h] = useState(0);
  const [totalRewards, setTotalRewards] = useState<number>();
  const { stakeContract } = useTLXContracts();

  const getTotalVolume24h = async () => {
    const result = await getVolume24h();
    setVolume24h(result.toFixed(2));
  };

  const getTotalUserRewards = async () => {
    if (stakeContract) {
      const result = await getTotalRewards(stakeContract);
      const formatedResult = parseFloat(
        ethers.utils.formatUnits(result._hex)
      ).toFixed(3);

      setTotalRewards(parseFloat(formatedResult));
    }
  };

  useEffect(() => {
    getTotalVolume24h();
  }, []);

  useEffect(() => {
    getTotalUserRewards();
  }, [stakeContract]);

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
          Value locked
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
          Rewards
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
          Stacked
        </p>
        <p className="text-indigo-500 font-bold text-lg drop-shadow-2xl shadow-white">
          19
        </p>
      </div>
    </div>
  );
};

export default Stats;
