import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../utils/context";
import GlowingButton from "../../../components/GlowingButton";
import SelectDropdown from "../../../components/SelectDropdown";

import Stats from "../../../components/Stats";

import { useTLXContracts } from "../../../hooks/useTLXContracts";
import {
  getUserStakes,
  renderStakePeriod,
  unstake,
  webStake,
} from "../../../utils/functions/Contracts";
import { TLXStakeContractAddress } from "../../../utils/globals";
import { StackingDuration, Stake } from "../../../utils/types";
import tlx_logo_2 from "../../../assets/images/small_logo_2.png";
import { useWindowSize } from "../../../hooks/useWindowSize";
import * as contracts from "../../../utils/functions/Contracts";

const StakeCoin: React.FC = () => {
  const { openSidebar, isSidebarOpen, account } = useGlobalContext();
  const { stakeContract, tokenContract, provider } = useTLXContracts();
  const { isMobile } = useWindowSize();
  const [duration, setDuration] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [userStakes, setUserStakes] = useState([]);
  const stakeInputRef = useRef<null | HTMLInputElement>(null);
  const [TLXbalance, setTLXBalance] = useState<number>();

  const getUserTLXBalance = async () => {
    if (account) {
      const result = await contracts.getTLXBalance(tokenContract, account);
      setTLXBalance(result);
    }
  };

  const getStakeTransactions = async () => {
    setActiveIndex(1);

    if (stakeContract) {
      const stakes = await getUserStakes(stakeContract);
      setUserStakes(stakes);
    }
  };

  useEffect(() => {
    if (tokenContract) {
      getUserTLXBalance();
    }
  }, [tokenContract]);

  useEffect(() => {
    if (stakeContract) {
      getStakeTransactions();
    }
  }, [stakeContract]);

  const renderTable = () => {
    return !account ? (
      <>
        {/* <p>Connect to your wallet to have access</p> */}
        {/* <UserBlock account={account} login={login} logout={logout} onPress={onDismiss} /> */}
      </>
    ) : (
      // <div className="relative xs:mx-4 mx-10">
      <div className="relative ">
        <div
          className="absolute -inset-0 bg-gradient-to-r
             from-green-400 to-blue-600
          rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"
        ></div>
        <div
          className="relative w-full py-4 px-8 bg-white rounded-lg my-20 bg-gradient-to-b from-customBlue-700 via-customBlue-700 to-customBlue-200
              "
        >
          <div className="flex justify-center md:justify-end -mt-16">
            <img
              className="w-20 h-20 object-cover rounded-full z-30 
               border-2 border-indigo-900
              "
              src={tlx_logo_2}
            />
          </div>
          <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 w-full h-full -mt-4">
            <div className="xl:lg:md:pr-8">
              <div className="xs: mt-4">
                <p className="text-white font-bold text-xl">
                  Earn Passive Income With The Luxury
                </p>
                <p className="text-gray-400 mt-4">
                  Staking is a great way to maximize your holdings in staking
                  tokens that would otherwise be sitting in your wallet. Once
                  you have staked your assets you can earn staking rewards on
                  top of your holdings and grow them further by compounding
                  those future rewards.
                </p>
              </div>
              <div className="py-5 pr-2 mt-6 flex flex-col">
                <div className="flex justify-between border-b-2 border-opacity-30 pb-1 ">
                  <p className="text-xl text-white font-bold">Stake your TLX</p>

                  <p className="text-xl text-green-500 font-bold">
                    {" "}
                    {TLXbalance} TLX available
                  </p>
                </div>
                <span className="mt-4 flex flex-col xl:flex-row 2xl-flex:row">
                  {/* <p className="text-lg font-bold text-white ">30 TLX</p> */}
                  <input
                    className="text-white h-8 rounded-md px-3 my-2 mr-2 w-64 bg-customBlue-300"
                    type={"number"}
                    ref={stakeInputRef}
                    onChange={(e) => {
                      setStakeAmount(parseFloat(e.target.value));
                    }}
                    placeholder="Value..."
                  />
                  <div className="my-2 mr-2 w-64">
                    <SelectDropdown
                      text={"Staking duration (months)"}
                      elements={[1, 3, 6, 12]}
                      onSelect={(e) => {
                        // const value = parseInt(e.target.value, 10);
                        if (parseInt(e.target.value, 10) === 1) {
                          setDuration(StackingDuration.ONE_MONTH);
                        } else if (parseInt(e.target.value, 10) === 3) {
                          setDuration(StackingDuration.THREE_MONTHS);
                        } else if (parseInt(e.target.value, 10) === 6) {
                          setDuration(StackingDuration.SIX_MONTHS);
                        } else if (parseInt(e.target.value, 10) === 12) {
                          setDuration(StackingDuration.ONE_YEAR);
                        }
                      }}
                    />
                  </div>
                  <div className="my-2 mr-2 flex ">
                    <GlowingButton
                      text={`Stake ${stakeAmount || 0}`}
                      onClick={() => {
                        webStake(
                          tokenContract,
                          stakeContract!,
                          TLXStakeContractAddress,
                          account!,
                          stakeAmount,
                          duration,
                          provider
                        );
                      }}
                    />
                  </div>

                  {/* <button
                    className="
                    text-gray-900 bg-indigo-400 h-8 w-24 px-4 py-1 rounded-lg"
                    onClick={() => {
                      webStake(
                        tokenContract,
                        stakeContract!,
                        TLXStakeContractAddress,
                        account!,
                        parseFloat(stakeAmount)!,
                        1,
                        provider
                      );
                    }}
                  >
                    Stake
                  </button> */}
                </span>
              </div>
            </div>
            {/* <div
              className={`"text-center h-full p-5 flex flex-col justify-center overflow-y-scroll" ${
                !isMobile ? "border-l-2" : ""
              }`}
            > */}
            <div
              className={`"text-center h-80 p-5 flex flex-col justify-center" overflow-y-scroll ${
                !isMobile ? "border-l-2" : ""
              }`}
            >
              {userStakes.length ? (
                userStakes.map((stake: Stake, index) => {
                  const d = new Date(parseInt(stake.since, 10) * 1000)
                    .toDateString()
                    .slice(4);

                  return (
                    <div key={`${stake.amount}/${index}`}>
                      <div className="flex justify-around xs:items-center xs:flex-col sm:items-center sm:flex-col my-2">
                        <p className="text-gray-400">
                          You staked{" "}
                          <b className="text-white">
                            {stake.amount / 10 ** 18} TLX{" "}
                          </b>{" "}
                          on {d}
                          for {renderStakePeriod(stake.period.toNumber())}{" "}
                        </p>
                        {stakeContract ? (
                          <GlowingButton
                            text={`Unstake ${stake.amount / 10 ** 18} TLX`}
                            onClick={() =>
                              unstake(index, account, stakeContract)
                            }
                          />
                        ) : null}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>You have no staking transactions</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full border-t-2 border-white border-opacity-60">
      <Stats />
      <div className="flex justify-center">
        <div className="mt-6 grid gap-10 xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2  ">
          {/* here starts 1 */}
          <div className="relative xs:w-80 w-60 h-60">
            <div className="absolute -inset-0 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <button
              onClick={() => {
                setActiveIndex(0);

                stakeInputRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
                // stakeInputRef.current?.focus();
              }}
              className="rounded-lg relative xs:w-80 w-60 h-60
                bg-gradient-to-b
                from-green-500 to-indigo-600
                transform duration-500 hover:scale-110"
              // hover:bg-gradient-to-r
              // hover:from-customBlue-300  hover:to-indigo-900 shadow-2xl
              // from-customBlue-700 via-customBlue-700 to-customBlue-200
              // hover:from-customBlue-300 hover:via-customBlue-700 hover:to-customBlue-700
            >
              <p className="text-white font-oswald text-lg">Stake TLX</p>
            </button>
          </div>
          {/* here ends 1 */}

          {/* here starts 1 */}
          <div className="relative xs:w-80 w-60 h-60">
            <div className="absolute -inset-0 bg-gradient-to-r from-green-400 to-blue-600blur-sm rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <button
              onClick={getStakeTransactions}
              className="
              rounded-lg relative xs:w-80 w-60 h-60
                bg-gradient-to-b from-green-500 to-indigo-600
                transform duration-500 hover:scale-110
                "
            >
              <p className="text-white font-oswald text-lg">Transactions</p>
            </button>
          </div>
        </div>
      </div>

      {renderTable()}
    </div>
  );
};

export default StakeCoin;
