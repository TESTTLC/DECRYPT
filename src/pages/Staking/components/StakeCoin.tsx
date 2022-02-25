import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import { StoreState } from 'src/utils/storeTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getLSOLaunchpadRegistration } from 'src/api/launchpad';

import GlowingButton from '../../../components/GlowingButton';
import SelectDropdown from '../../../components/SelectDropdown';
import Stats from '../../../components/Stats';
import { useContracts } from '../../../hooks/useContracts';
import {
  getUserStakes,
  renderStakePeriod,
  unstake,
  webStake,
} from '../../../utils/functions/Contracts';
import {
  ChainsIds,
  StackingDuration,
  Stake,
  stakeRewards,
} from '../../../utils/types';
import TLX_LOGO_2 from '../../../assets/images/small_logo_2.png';
import { useWindowSize } from '../../../hooks/useWindowSize';
import * as contracts from '../../../utils/functions/Contracts';
import NotFound from '../../NotFound';
import { coinsTags } from '../../../App';
import { changeChain } from '../../../utils/functions/MetaMask';

const StakeCoin: React.FC = () => {
  const { coinTag } = useParams();

  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const { stakeContract, tokenContract, stakeAddress } = useContracts(
    coinTag ?? '-',
  );

  const [isRegisteredInLSOLaunchpad, setIsRegisteredInLSOLaunchpad] =
    useState(false);
  const dispatch = useDispatch();
  const { isMobileSize } = useWindowSize();
  const [duration, setDuration] = useState(0);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [userStakes, setUserStakes] = useState([]);
  const stakeInputRef = useRef<null | HTMLInputElement>(null);
  const [balance, setBalance] = useState<number>();
  const [totalRewards, setTotalRewards] = useState(0);
  const [isUnfreezing, setIsUnfreezing] = useState(false);
  const [currentChainId, setCurrentChainId] = useState(
    window.ethereum?.networkVersion
      ? ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10))
      : undefined,
  );
  const [chainErrorMessage, setChainErrorMessage] = useState<
    string | undefined
  >(undefined);

  const getUserTLCBalance = useCallback(async () => {
    if (walletAddress) {
      const TLCBalance = await contracts.getTLCBalance(walletAddress);
      setBalance(TLCBalance);
    }
  }, [walletAddress]);
  const chainChange = async () => {
    await changeChain(ChainsIds.TLC);
    if (window.ethereum.networkVersion) {
      setCurrentChainId(
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
      );
    }
  };

  const getLaunchpadRegistration = useCallback(async () => {
    if (coinTag === 'LSO' && walletAddress) {
      const isRegisteredInLaunchpad = await getLSOLaunchpadRegistration(
        walletAddress,
      );
      setIsRegisteredInLSOLaunchpad(isRegisteredInLaunchpad);
    }
  }, [coinTag, walletAddress]);

  useEffect(() => {
    chainChange();
    getLaunchpadRegistration();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentChainId === ChainsIds.TLC) {
      setChainErrorMessage(undefined);
    } else {
      setChainErrorMessage('Please connect to TLChain');
    }
  }, [currentChainId]);

  useEffect(() => {
    if (coinTag === 'TLC') {
      getUserTLCBalance();
    }
    getLaunchpadRegistration();
    // if (coinTag === 'LSO' && walletAddress) {
    //   dispatch(getLSOLaunchpadRegistrationThunk({ walletAddress }));
    // }
  }, [
    walletAddress,
    coinTag,
    getUserTLCBalance,
    dispatch,
    getLaunchpadRegistration,
  ]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentChainId(chainId);
      });
      setCurrentChainId(
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.ethereum]);

  const getUserTLXBalance = useCallback(async () => {
    if (walletAddress) {
      const result =
        coinTag === 'LSO'
          ? await contracts.getBalance(tokenContract, walletAddress)
          : await contracts.getActualBalanceOf(tokenContract, walletAddress);

      setBalance(result);
    }
  }, [coinTag, tokenContract, walletAddress]);

  const getStakeTransactions = useCallback(async () => {
    try {
      if (stakeContract) {
        const stakes = await getUserStakes(stakeContract);
        if (stakes && stakes.length) {
          let totalRew = 0;
          stakes.forEach((stake: Stake) => {
            const amount = parseFloat(ethers.utils.formatEther(stake.amount));
            if (coinTag === 'TLX' || coinTag === 'TLC' || coinTag === 'LSO') {
              totalRew += (stakeRewards[coinTag][stake.period] / 100) * amount;
            }
          });
          setTotalRewards(parseFloat(totalRew.toFixed(3)));
          setUserStakes(stakes);
        }
      }
    } catch (error) {}
  }, [coinTag, stakeContract]);

  useEffect(() => {
    if (tokenContract && coinTag !== 'TLC') {
      getUserTLXBalance();
    }
  }, [coinTag, getUserTLXBalance, tokenContract]);

  useEffect(() => {
    if (stakeContract) {
      getStakeTransactions();
    }
  }, [getStakeTransactions, stakeContract]);

  const renderTable = () => {
    return !walletAddress ? (
      <>
        {/* <p>Connect to your wallet to have access</p> */}
        {/* <UserBlock walletAddress={walletAddress} login={login} logout={logout} onPress={onDismiss} /> */}
      </>
    ) : (
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
              src={TLX_LOGO_2}
              alt="TLX-Logo"
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
              {/* eslint-disable-next-line no-nested-ternary */}
              {chainErrorMessage ? (
                <p className="mb-2 font-poppins text-red-400 mt-6 text-lg">
                  {chainErrorMessage}
                </p>
              ) : (
                // ) : !isRegisteredInLSOLaunchpad && coinTag === 'LSO' ? (
                //   <p className="mb-2 font-poppins text-red-400 mt-6 text-lg">
                //     You must be registered to Launchpad with at least 1% power
                //   </p>
                <div className="py-5 pr-2 mt-6 flex flex-col">
                  <div className="flex justify-between border-b-2 border-opacity-30 pb-1">
                    <p className="text-xl text-white font-bold">
                      Stake your {coinTag}
                    </p>

                    <p className="text-xl text-green-500 font-bold">
                      {' '}
                      {balance} {coinTag} available
                    </p>
                  </div>

                  <span className="mt-4 flex flex-col xl:flex-row 2xl-flex:row">
                    {/* <p className="text-lg font-bold text-white ">30 TLX</p> */}
                    <input
                      className="text-white h-8 rounded-md px-3 my-2 mr-2 w-64 bg-customBlue-300"
                      type={'number'}
                      ref={stakeInputRef}
                      onChange={(e) => {
                        setStakeAmount(parseFloat(e.target.value));
                      }}
                      placeholder="Value..."
                      value={stakeAmount}
                      key={'inputKey'}
                    />
                    <div className="my-2 mr-2 w-64">
                      <SelectDropdown
                        text={'Staking duration (months)'}
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
                          if (
                            coinTag &&
                            coinTag !== 'TLC' &&
                            coinTag !== 'LSO' &&
                            stakeContract
                          ) {
                            webStake(
                              tokenContract,
                              stakeContract,
                              stakeAddress,
                              walletAddress,
                              stakeAmount,
                              duration,
                              coinTag,
                            );
                          } else if (
                            coinTag &&
                            coinTag === 'TLC' &&
                            stakeContract
                          ) {
                            contracts.tlcStake(
                              stakeContract,
                              stakeAmount,
                              duration,
                            );
                          } else if (
                            coinTag &&
                            coinTag === 'LSO' &&
                            stakeContract &&
                            isRegisteredInLSOLaunchpad
                          ) {
                            webStake(
                              tokenContract,
                              stakeContract,
                              stakeAddress,
                              walletAddress,
                              stakeAmount,
                              duration,
                              coinTag,
                            );
                          }
                        }}
                      />
                    </div>
                  </span>
                </div>
              )}
            </div>
            <div
              className={`"text-center h-80 p-5 flex flex-col justify-center" overflow-y-scroll ${
                !isMobileSize ? 'border-l-2' : ''
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
                          You staked{' '}
                          <b className="text-white">
                            {stake.amount / 10 ** 18} {coinTag}{' '}
                          </b>{' '}
                          on {d} for
                          {' ' +
                            renderStakePeriod(stake.period.toNumber())}{' '}
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

  const unfreezeCurrent = async () => {
    try {
      if (!isUnfreezing) {
        setIsUnfreezing(true);
        const result = await tokenContract.releaseOnce();

        setIsUnfreezing(false);
      }
    } catch (error) {
      setIsUnfreezing(false);
    }
  };

  return coinsTags.includes(coinTag ?? '') ? (
    <div className="w-full border-t-2 border-white border-opacity-60">
      <Stats
        coinTag={coinTag as 'TLC' | 'TLX' | 'LSO'}
        totalRewards={totalRewards}
      />

      {!walletAddress && (
        <p className="text-xl text-white font-semibold font-poppins text-center self-center ">
          Connect MetaMask wallet to access the staking options
        </p>
      )}
      <div className="flex items-center justify-center w-full">
        {chainErrorMessage && (
          <p className="mb-2 font-poppins text-red-400 text-lg">
            {chainErrorMessage}
          </p>
        )}
      </div>
      <div className="flex justify-center">
        <div className="mt-6 grid gap-10 xs:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2  ">
          {/* here starts 1 */}
          <div className="relative xs:w-80 w-60 h-60">
            <div className="absolute -inset-0 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <button
              onClick={() => {
                stakeInputRef.current?.scrollIntoView({
                  behavior: 'smooth',
                });
              }}
              className="rounded-lg relative xs:w-80 w-60 h-60
                bg-gradient-to-b
                from-green-500 to-indigo-600
                transform duration-500 hover:scale-110"
            >
              <p className="text-white font-oswald text-lg">Stake {coinTag}</p>
            </button>
          </div>

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
      {coinTag === 'TLX' && walletAddress && (
        <div className="flex w-full items-center justify-center mt-4">
          <button
            className="flex h-10 mt-2 text-sm items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
            onClick={unfreezeCurrent}
          >
            Unfreeze TLX
          </button>
        </div>
      )}

      {renderTable()}
    </div>
  ) : (
    <NotFound />
  );
};

export default StakeCoin;
