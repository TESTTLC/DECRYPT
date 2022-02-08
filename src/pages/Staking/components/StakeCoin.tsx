import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../../utils/context";
import GlowingButton from "../../../components/GlowingButton";
import SelectDropdown from "../../../components/SelectDropdown";

import Stats from "../../../components/Stats";

import { useContracts } from "../../../hooks/useContracts";
import {
  getUserStakes,
  renderStakePeriod,
  unstake,
  webStake,
} from "../../../utils/functions/Contracts";
import {
  ChainsIds,
  StackingDuration,
  Stake,
  stakeRewards,
} from "../../../utils/types";
import tlx_logo_2 from "../../../assets/images/small_logo_2.png";
import { useWindowSize } from "../../../hooks/useWindowSize";
import * as contracts from "../../../utils/functions/Contracts";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import NotFound from "../../NotFound";
import { coinsTags } from "../../../App";
import { changeChain } from "../../../utils/functions/MetaMask";

interface Props {}

const StakeCoin: React.FC<Props> = () => {
  const { coinTag } = useParams();
  const { account } = useGlobalContext();
  const { stakeContract, tokenContract, stakeAddress, provider } = useContracts(
    coinTag ?? "-"
  );

  const { isMobileSize } = useWindowSize();
  const [duration, setDuration] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [userStakes, setUserStakes] = useState([]);
  const stakeInputRef = useRef<null | HTMLInputElement>(null);
  const [balance, setBalance] = useState<number>();
  const [totalRewards, setTotalRewards] = useState(0);

  const getUserTLCBalance = async () => {
    if (account) {
      const TLCBalance = await contracts.getTLCBalance(account);
      setBalance(TLCBalance);
    }
  };
  const chainChange = async () => {
    await changeChain(ChainsIds.TLC);
  };

  useEffect(() => {
    chainChange();
  }, []);

  useEffect(() => {
    if (coinTag === "TLC") {
      getUserTLCBalance();
    }
  }, [account, coinTag]);

  const getUserTLXBalance = async () => {
    if (account) {
      const result = await contracts.getActualBalanceOf(tokenContract, account);
      console.log("Result: ", result);
      setBalance(result);
    }
  };

  const getStakeTransactions = async () => {
    try {
      if (stakeContract) {
        console.log("Stake token: ", stakeContract);
        const stakes = await getUserStakes(stakeContract);
        console.log("Stakes: ", stakes);
        if (stakes && stakes.length) {
          let totalRew = 0;
          stakes.forEach((stake: Stake) => {
            const amount = parseFloat(ethers.utils.formatEther(stake.amount));
            if (coinTag === "TLX" || coinTag === "TLC" || coinTag === "LSO") {
              totalRew += (stakeRewards[coinTag][stake.period] / 100) * amount;
            }
          });
          setTotalRewards(parseFloat(totalRew.toFixed(3)));
          setUserStakes(stakes);
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (tokenContract && coinTag !== "TLC") {
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
                  <p className="text-xl text-white font-bold">
                    Stake your {coinTag}
                  </p>

                  <p className="text-xl text-green-500 font-bold">
                    {" "}
                    {balance} {coinTag} available
                  </p>
                </div>
                {/* {coinTag === "TLC" ? null : ( */}
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
                      elements={[1, 3, 6, 12, 36]}
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
                        } else if (parseInt(e.target.value, 10) === 36) {
                          setDuration(StackingDuration.THREE_YEARS);
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
                          stakeAddress,
                          account!,
                          stakeAmount,
                          duration,
                          coinTag || "undefined"
                        );
                      }}
                    />
                  </div>
                </span>
                {/* )} */}
              </div>
            </div>
            {/* <div
              className={`"text-center h-full p-5 flex flex-col justify-center overflow-y-scroll" ${
                !isMobileSize ? "border-l-2" : ""
              }`}
            > */}
            <div
              className={`"text-center h-80 p-5 flex flex-col justify-center" overflow-y-scroll ${
                !isMobileSize ? "border-l-2" : ""
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
                            {stake.amount / 10 ** 18} {coinTag}{" "}
                          </b>{" "}
                          on {d} for
                          {" " +
                            renderStakePeriod(stake.period.toNumber())}{" "}
                        </p>
                        {stakeContract ? (
                          <GlowingButton
                            text={`Unstake ${
                              stake.amount / 10 ** 18
                            } ${coinTag}`}
                            onClick={() => unstake(index, stakeContract)}
                          />
                        ) : null}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-white font-poppins">
                  You have no staking transactions
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return coinsTags.includes(coinTag ?? "") ? (
    <div className="w-full border-t-2 border-white border-opacity-60">
      <Stats
        coinTag={coinTag as "TLC" | "TLX" | "LSO"}
        totalRewards={totalRewards}
      />
      {!account && (
        <p className="text-xl text-white font-semibold font-poppins text-center self-center ">
          Connect MetaMask wallet to access the staking options
        </p>
      )}
      <div className="flex justify-center">
        <div className="mt-6 grid gap-10 xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2  ">
          {/* here starts 1 */}
          <div className="relative xs:w-80 w-60 h-60">
            <div className="absolute -inset-0 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <button
              onClick={() => {
                stakeInputRef.current?.scrollIntoView({
                  behavior: "smooth",
                });
                // stakeInputRef.current?.focus();
              }}
              className="rounded-lg relative xs:w-80 w-60 h-60
                bg-gradient-to-b
                from-green-500 to-indigo-600
                transform duration-500 hover:scale-110"
            >
              <p className="text-white font-oswald text-lg">Stake {coinTag}</p>
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
  ) : (
    <NotFound />
  );
};

export default StakeCoin;
