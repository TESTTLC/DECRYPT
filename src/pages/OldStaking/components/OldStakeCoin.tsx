import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import { StoreState } from 'src/utils/storeTypes';
import { useDispatch, useSelector } from 'react-redux';
import { getLSOLaunchpadRegistration } from 'src/api/launchpad';
import { stakingRewards } from 'src/utils/globals';
import testContract from 'src/contracts/MainBridgeMainToken.json';
import { Web3Provider } from '@ethersproject/providers';
import LoadingSpinner from 'src/components/LoadingSpinner';

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
import lso_1x from '../../../assets/images/lso_1x.png';
import tlc_1x from '../../../assets/images/tlc_1x.png';
import tlx_1x from '../../../assets/images/tlx_1x.png';
import CSY_1x from '../../../assets/images/CSY-logo.png';
import { useWindowSize } from '../../../hooks/useWindowSize';
import * as contracts from '../../../utils/functions/Contracts';
import NotFound from '../../NotFound';
import { coinsTags } from '../../../App';
import { changeChain } from '../../../utils/functions/MetaMask';

const OldStakeCoin: React.FC = () => {
  const { coinTag = 'OldTLX' } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );

  const { stakeContract, tokenContract, stakeAddress, freezeContract } =
    useContracts(coinTag);

  const [isRegisteredInLSOLaunchpad, setIsRegisteredInLSOLaunchpad] =
    useState(false);
  const dispatch = useDispatch();
  const { isMobileSize } = useWindowSize();
  const [duration, setDuration] = useState(0);
  const [stakeAmount, setStakeAmount] = useState('0');
  const [userStakes, setUserStakes] = useState([]);
  const stakeInputRef = useRef<null | HTMLInputElement>(null);
  const [balance, setBalance] = useState<number>();
  const [totalRewards, setTotalRewards] = useState(0);
  const [isUnfreezing, setIsUnfreezing] = useState(false);
  const [currentChainId, setCurrentChainId] = useState(
    //@ts-ignore
    window.ethereum?.networkVersion
      ? //@ts-ignore
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10))
      : undefined,
  );
  const [chainErrorMessage, setChainErrorMessage] = useState<
    string | undefined
  >(undefined);

  console.log('StakeContract: ', stakeContract);

  const getUserTLCBalance = useCallback(async () => {
    if (walletAddress) {
      const TLCBalance = await contracts.getTLCBalance(walletAddress, 'old');
      setBalance(TLCBalance);
    }
  }, [walletAddress]);

  const chainChange = async () => {
    await changeChain(ChainsIds.TLC);
    //@ts-ignore
    if (window.ethereum?.networkVersion) {
      setCurrentChainId(
        //@ts-ignore
        ethers.utils.hexlify(parseInt(window.ethereum?.networkVersion, 10)),
      );
    }
  };

  const getNumberOfAccounts = async () => {
    const countAccounts = provider?.listAccounts.length;
    console.log('countAccounts: ', countAccounts);
  };

  const getLaunchpadRegistration = useCallback(async () => {
    if (coinTag === 'OldLSO' && walletAddress) {
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
    getNumberOfAccounts();
  }, [provider]);

  useEffect(() => {
    console.log('currentChainId: ', currentChainId);
    if (currentChainId === ChainsIds.OldTLC) {
      setChainErrorMessage(undefined);
    } else {
      setChainErrorMessage('Please connect to TLChain - 5177');
    }
  }, [currentChainId]);

  useEffect(() => {
    if (coinTag === 'TLC' || coinTag === 'OldTLC') {
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
      //@ts-ignore
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentChainId(chainId);
      });
      setCurrentChainId(
        //@ts-ignore
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.ethereum]);

  const getUserTLXBalance = useCallback(async () => {
    if (walletAddress) {
      const result =
        coinTag === 'OldLSO' || coinTag === 'OldCSY'
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
            console.log('Stakeee: ', stake);
            const amount = parseFloat(ethers.utils.formatEther(stake.amount));
            if (
              coinTag === 'TLC' ||
              coinTag === 'OldTLC' ||
              coinTag === 'OldTLX' ||
              coinTag === 'OldLSO' ||
              coinTag === 'OldCSY'
            ) {
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
    if (tokenContract && coinTag !== 'TLC' && coinTag !== 'OldTLC') {
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

        <div className="relative  w-full py-4 px-8 bg-white rounded-lg my-20 bg-gradient-to-b from-customBlue-700 via-customBlue-700 to-customBlue-200">
          <div className="flex justify-center md:justify-end -mt-16">
            <img
              className="w-20 h-20 object-cover rounded-full z-30 
               border-2 border-indigo-900
              "
              src={
                // eslint-disable-next-line no-nested-ternary
                coinTag === 'OldLSO'
                  ? lso_1x
                  : // eslint-disable-next-line no-nested-ternary
                  coinTag === 'TLC' || coinTag === 'OldTLC'
                  ? tlc_1x
                  : coinTag === 'OldTLX'
                  ? tlx_1x
                  : CSY_1x
              }
              alt="TLX-Logo"
            />
          </div>
          <div className="grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 w-full h-full -mt-4">
            <div className="xl:lg:md:pr-8">
              <div className="xs: mt-4">
                <p className="text-white font-bold text-xl">
                  Earn Passive Income With The Luxury
                </p>
                <p className="text-gray-400 mt-2">
                  Staking is a great way to maximize your holdings in staking
                  tokens that would otherwise be sitting in your wallet. Once
                  you have staked your assets you can earn staking rewards on
                  top of your holdings and grow them further by compounding
                  those future rewards.
                </p>
                {coinTag && coinTag !== 'default' && (
                  <>
                    <p className="text-white font-bold text-xl mt-6 mb-2">
                      Staking Rewards - {coinTag}
                    </p>
                    <p className="text-gray-400">
                      {
                        stakingRewards[
                          coinTag === 'TLC'
                            ? 'OldTLC'
                            : (coinTag as
                                | 'OldTLX'
                                | 'OldLSO'
                                | 'OldCSY'
                                | 'OldTLC')
                        ].one_month
                      }
                      <br />
                      {
                        stakingRewards[
                          coinTag === 'TLC'
                            ? 'OldTLC'
                            : (coinTag as
                                | 'OldTLX'
                                | 'OldLSO'
                                | 'OldCSY'
                                | 'OldTLC')
                        ].three_months
                      }
                      <br />
                      {
                        stakingRewards[
                          coinTag === 'TLC'
                            ? 'OldTLC'
                            : (coinTag as
                                | 'OldTLX'
                                | 'OldLSO'
                                | 'OldCSY'
                                | 'OldTLC')
                        ].six_months
                      }
                      <br />
                      {
                        stakingRewards[
                          coinTag === 'TLC'
                            ? 'OldTLC'
                            : (coinTag as
                                | 'OldTLX'
                                | 'OldLSO'
                                | 'OldCSY'
                                | 'OldTLC')
                        ].one_year
                      }
                      <br />
                      {
                        stakingRewards[
                          coinTag === 'TLC'
                            ? 'OldTLC'
                            : (coinTag as
                                | 'OldTLX'
                                | 'OldLSO'
                                | 'OldCSY'
                                | 'OldTLC')
                        ].three_years
                      }
                    </p>
                  </>
                )}
              </div>
              <p className="mt-6">
                For staking, please use the new chain and Staking page.
              </p>
            </div>
            <div
              className={`"text-center flex h-full p-5 flex-col justify-center" overflow-y-scroll ${
                !isMobileSize ? 'border-l-2' : ''
              }`}
            >
              {userStakes.length ? (
                userStakes.map((stake: Stake, index) => {
                  const d = new Date(parseInt(stake.since, 10) * 1000)
                    .toDateString()
                    .slice(4);
                  const amountStaked = ethers.utils.formatEther(stake.amount);

                  if (parseFloat(amountStaked) > 0) {
                    return (
                      <div key={`${stake.amount}/${index}`}>
                        <div className="flex justify-around xs:items-center xs:flex-col sm:items-center sm:flex-col my-2">
                          <p className="text-gray-400">
                            You staked{' '}
                            <b className="text-white">
                              {amountStaked} {coinTag}{' '}
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
                  }
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

  return coinsTags.includes(coinTag ?? '') ? (
    <div className="w-full border-t-2 border-white border-opacity-60">
      {/* <button onClick={testTBT} className="w-40 h-10 bg-black bg-opacity-70">
        TBT
      </button>

      <button
        onClick={unlockTokens}
        className="w-40 h-10 bg-black bg-opacity-70"
      >
        Unlock
      </button> */}
      <Stats
        coinTag={
          coinTag as
            | 'TLC'
            | 'TLX'
            | 'LSO'
            | 'OldTLX'
            | 'OldLSO'
            | 'OldCSY'
            | 'OldTLC'
        }
        totalRewards={totalRewards}
      />

      {!walletAddress && (
        <p className="text-xl text-white font-semibold font-poppins text-center self-center">
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
      {/* {(coinTag === 'TLX' || coinTag === 'LSO') && walletAddress && (
        <div className="flex w-full items-center justify-center mt-4">
          <button
            className="flex h-10 mt-2 text-sm items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
            onClick={unfreezeCurrent}
          >
            Unfreeze {coinTag}
          </button>
        </div>
      )} */}

      {renderTable()}
    </div>
  ) : (
    <NotFound />
  );
};

export default OldStakeCoin;
