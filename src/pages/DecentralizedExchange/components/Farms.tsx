import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useWalletConnector } from 'src/hooks/useWalletConnector';
import { Contract, ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { StoreState } from 'src/utils/storeTypes';
import {
  MasterchefContractAddress,
  TempUsdt,
  TempUsdc,
  usdt_tlc_pool_eth,
  usdc_tlc_pool_eth,
  usdt_eth,
  usdc_eth,
  wtlc_eth,
} from 'src/utils/globals';
import MasterChef from 'src/contracts/Masterchef.json';
import ERC20 from 'src/contracts/ERC20.json';
import { formatEther, parseEther, formatUnits } from 'ethers/lib/utils';
import tlxLogo from 'src/assets/images/TLX-logo.png';
import tlcLogo from 'src/assets/images/TLC-logo.png';
import tlcUsdt from 'src/assets/images/tlc-usdt.png';
import tlcUsdc from 'src/assets/images/tlc-usdc.png';
import tlxUsdc from 'src/assets/images/tlx-usdc.png';
import tlxUsdt from 'src/assets/images/tlx-usdt.png';

import useRefresh from '../../../redux/useRefresh';

import FarmModal from './FarmModal';
import Categories from './Categories';

interface Props {
  currentChainId: string;
  usdtTlcApr: string;
  usdcTlcApr: string;
}

const Farms: React.FC<Props> = ({ currentChainId, usdtTlcApr, usdcTlcApr }) => {
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );
  const { fastRefresh, slowRefresh } = useRefresh();
  const [modalOpen, setModalOpen] = useState(false);
  const [stakingType, setStakingType] = useState(true); //true: deposit, false: withdraw
  const [modalTitle, setModalTitle] = useState('');
  const [poolId, setPoolId] = useState(0);

  const [allowranceUsdt, setAllowranceUsdt] = useState(parseEther('0'));
  const [allowranceUsdc, setAllowranceUsdc] = useState(parseEther('0'));
  const [allowranceTlx, setAllowranceTlx] = useState(parseEther('0'));
  const [usdtPoolUser, setUsdtPoolUserInfo] = useState('');
  const [usdcPoolUser, setUsdcPoolUserInfo] = useState('');
  const [usdtPendingRewards, setUsdtPendingRewards] = useState('');
  const [usdcPendingRewards, setUsdcPendingRewards] = useState('');

  const { connectWallet } = useWalletConnector();

  // console.log('usdtPendingRewards', usdtPendingRewards);

  useEffect(() => {
    async function fetchData() {
      if (provider) {
        // console.log('provider', provider);
        const masterChef_cont = new Contract(
          MasterchefContractAddress,
          MasterChef.abi,
          provider.getSigner(),
        );
        const tlc_usdt_cont = new Contract(
          TempUsdt,
          ERC20.abi,
          provider.getSigner(),
        );
        const tlc_usdc_cont = new Contract(
          TempUsdc,
          ERC20.abi,
          provider.getSigner(),
        );
        const usdcT = await tlc_usdc_cont.allowance(
          walletAddress,
          MasterchefContractAddress,
        );
        const usdtT = await tlc_usdt_cont.allowance(
          walletAddress,
          MasterchefContractAddress,
        );
        // console.log('here');
        // console.log('usdtT', formatEther(usdtT));
        setAllowranceUsdt(usdtT);
        setAllowranceUsdc(usdcT);

        const usdtPool = await masterChef_cont.userInfo(0, walletAddress);
        const usdcPool = await masterChef_cont.userInfo(1, walletAddress);
        // console.log('usdtPoolInfo', usdtPool);
        setUsdtPoolUserInfo(usdtPool);
        setUsdcPoolUserInfo(usdcPool);

        const usdtPending = await masterChef_cont.pendingTLC(0, walletAddress);
        const usdcPending = await masterChef_cont.pendingTLC(1, walletAddress);
        // console.log('usdtPending', usdtPending);
        setUsdtPendingRewards(usdtPending);
        setUsdcPendingRewards(usdcPending);

        // if (usdtT > parseEther('0')) {
        //   console.log('big');
        // } else {
        //   console.log('small');
        // }
      }
    }
    fetchData();
  }, [walletAddress, provider, fastRefresh]);
  const EnableContract = async (param: number) => {
    // console.log('enable contract');
    if (provider && walletAddress) {
      // console.log('here working');
      if (param === 0) {
        const tlc_usdt_cont = new Contract(
          TempUsdt,
          ERC20.abi,
          provider.getSigner(),
        );
        const result = await tlc_usdt_cont.approve(
          MasterchefContractAddress,
          parseEther('100000000000000000000000000000000000000000'),
        );
        // console.log('approve', result);
      } else if (param === 1) {
        const tlc_usdc_cont = new Contract(
          TempUsdc,
          ERC20.abi,
          provider.getSigner(),
        );
        const result = await tlc_usdc_cont.approve(
          MasterchefContractAddress,
          parseEther('100000000000000000000000000000000000000000'),
        );
        // console.log('approve', result);
      }
    }
  };
  const Harvest = async (param: number) => {
    // console.log('harvest from contract');
    if (provider && walletAddress) {
      console.log('here working');
      const masterchef_cont = new Contract(
        MasterchefContractAddress,
        MasterChef.abi,
        provider.getSigner(),
      );
      const result = await masterchef_cont.deposit(param, 0);
      console.log('harvest', result);
    }
  };

  const Stake = (param: number) => {
    console.log('stake');
    setModalTitle('Deposit LP');
    setPoolId(param);
    setStakingType(true);
    setModalOpen(true);
  };
  const unStake = (param: number) => {
    console.log('unstake');
    setModalTitle('Withdraw LP');
    setPoolId(param);
    setStakingType(false);
    setModalOpen(true);
  };
  return (
    <div>
      <FarmModal
        title={modalTitle}
        modalIsOpen={modalOpen}
        setModalOpen={setModalOpen}
        stakingType={stakingType}
        poolId={poolId}
      />
      <div className="flex flex-col">
        <div className="flex xs:flex-col justify-between">
          <span className="flex-[0.4] text-lg font-bold mb-2">LP Farms</span>
          <div className="flex-[0.6]">
            <Categories />
          </div>
        </div>
        <div
          className={`${
            !walletAddress || allowranceUsdt <= parseEther('0')
              ? 'grid grid-cols-5 xs:grid-cols-2 md:grid-cols-2 xs:space-y-4 justify-between items-center w-full bg-black bg-opacity-75 px-4 py-2 rounded-md'
              : 'grid grid-cols-7 xs:grid-cols-2 md:grid-cols-2 xs:space-y-4 justify-between items-center w-full bg-black bg-opacity-75 px-4 py-2 rounded-md'
          }`}
        >
          <div className="flex grid-col justify-center items-center space-x-6">
            <img src={tlcUsdt} className="w-14 h-10 top-2 rounded-full  p-0 " />
            <div className="flex flex-col text-center">
              {/* <span>Stake & Earn</span>
              <span className="border-b-2 border-dotted">$2.483.110</span> */}
              <span>TLC-USDT LP</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {/* <div>APR</div>
            <div>10%/R/131%</div> */}
            <div>My earned TLC</div>
            <div>
              {usdtPendingRewards === ''
                ? '-'
                : parseFloat(formatEther(usdtPendingRewards)).toFixed(2)}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>APR</div>
            <div>{walletAddress ? usdtTlcApr : '-'}</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Liquidity</div>
            <div>
              {usdtPoolUser === ''
                ? '-'
                : parseFloat(formatEther(usdtPoolUser[0])).toFixed(2)}{' '}
            </div>
          </div>
          {walletAddress ? (
            <>
              {allowranceUsdt > parseEther('0') ? (
                <>
                  <button
                    className="flex xs:col-span-2 md:col-span-2 md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    onClick={() => Harvest(0)}
                  >
                    Harvest
                  </button>
                  <button
                    className="flex xs:col-span-2 md:col-span-2  md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    onClick={() => Stake(0)}
                  >
                    Stake
                  </button>
                  <button
                    className="flex xs:col-span-2 md:col-span-2  md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    onClick={() => unStake(0)}
                  >
                    UnStake
                  </button>
                </>
              ) : (
                <button
                  className="flex xs:col-span-2 md:col-span-2 w-full md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
                  onClick={() => EnableContract(0)}
                >
                  Enable contract
                </button>
              )}
            </>
          ) : (
            <button
              className="flex xs:col-span-2 md:col-span-2 w-full md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
              onClick={connectWallet}
              // onClick={() => expandField(1)}
            >
              {'Connect'}
            </button>
          )}
        </div>
        <div
          className={`${
            !walletAddress || allowranceUsdt <= parseEther('0')
              ? 'grid grid-cols-5 xs:grid-cols-2 md:grid-cols-2 xs:space-y-4 justify-between items-center w-full bg-black bg-opacity-75 px-4 py-2 rounded-md'
              : 'grid grid-cols-7 xs:grid-cols-2 md:grid-cols-2 xs:space-y-4 justify-between items-center w-full bg-black bg-opacity-75 px-4 py-2 rounded-md'
          }`}
        >
          <div className="flex grid-col justify-center items-center space-x-6">
            <img src={tlcUsdc} className="w-14 h-10 top-2 rounded-full  p-0" />
            <div className="flex flex-col text-center">
              {/* <span>Stake & Earn</span>
              <span className="border-b-2 border-dotted">$2.483.110</span> */}
              <span>TLC-USDC LP</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {/* <div>APR</div>
            <div>10%/R/131%</div> */}
            <div>My earned TLC</div>
            <div>
              {usdcPendingRewards === ''
                ? '-'
                : parseFloat(formatEther(usdcPendingRewards)).toFixed(2)}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>APR</div>
            <div>{walletAddress ? usdcTlcApr : '-'}</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Liquidity</div>
            <div>
              {usdcPoolUser === ''
                ? '-'
                : parseFloat(formatEther(usdcPoolUser[0])).toFixed(2)}
            </div>
          </div>
          {walletAddress ? (
            <>
              {allowranceUsdc > parseEther('0') ? (
                <>
                  <button
                    className="flex xs:col-span-2 md:col-span-2 md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    onClick={() => Harvest(1)}
                  >
                    Harvest
                  </button>
                  <button
                    className="flex xs:col-span-2 md:col-span-2  md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    onClick={() => Stake(1)}
                  >
                    Stake
                  </button>
                  <button
                    className="flex xs:col-span-2 md:col-span-2  md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    onClick={() => unStake(1)}
                  >
                    UnStake
                  </button>
                </>
              ) : (
                <button
                  className="flex xs:col-span-2 md:col-span-2 w-full md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
                  onClick={() => EnableContract(1)}
                >
                  Enable contract
                </button>
              )}
            </>
          ) : (
            <button
              className="flex xs:col-span-2 md:col-span-2 w-full md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
              onClick={connectWallet}
              // onClick={() => expandField(1)}
            >
              {'Connect'}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex xs:flex-col justify-between">
          <span className="flex-[0.4] text-lg font-bold mb-2">TLX Farms</span>
          <div className="flex-[0.6]">
            <Categories />
          </div>
        </div>
        <div
          className={`${
            !walletAddress || allowranceTlx <= parseEther('0')
              ? 'grid grid-cols-5 xs:grid-cols-2 md:grid-cols-2 xs:space-y-4 justify-between items-center w-full bg-black bg-opacity-75 px-4 py-2 rounded-md'
              : 'grid grid-cols-7 xs:grid-cols-2 md:grid-cols-2 xs:space-y-4 justify-between items-center w-full bg-black bg-opacity-75 px-4 py-2 rounded-md'
          }`}
        >
          <div className="flex grid-col justify-center items-center space-x-6">
            <img src={tlxUsdt} className="w-14 h-10 top-2 rounded-full  p-0 " />
            <div className="flex flex-col text-center">
              {/* <span>Stake & Earn</span>
              <span className="border-b-2 border-dotted">$2.483.110</span> */}
              <span>TLX-USDT LP</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {/* <div>APR</div>
            <div>10%/R/131%</div> */}
            <div>My earned TLC</div>
            <div>
              {/* {usdtPendingRewards === ''
                ? '-'
                : parseFloat(formatEther(usdtPendingRewards)).toFixed(2)} */}
              -
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>APR</div>
            <div>{walletAddress ? '-' : '-'}</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Liquidity</div>
            <div>
              {/* {usdtPoolUser === ''
                ? '-'
                : parseFloat(formatEther(usdtPoolUser[0])).toFixed(2)}{' '} */}
              -
            </div>
          </div>
          {walletAddress ? (
            <>
              {allowranceTlx > parseEther('0') ? (
                <>
                  <button
                    className="flex xs:col-span-2 md:col-span-2 md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    // onClick={() => Harvest(0)}
                  >
                    Harvest
                  </button>
                  <button
                    className="flex xs:col-span-2 md:col-span-2  md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    // onClick={() => Stake(0)}
                  >
                    Stake
                  </button>
                  <button
                    className="flex xs:col-span-2 md:col-span-2  md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    // onClick={() => unStake(0)}
                  >
                    UnStake
                  </button>
                </>
              ) : (
                <button
                  className="flex xs:col-span-2 md:col-span-2 w-full md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
                  // onClick={() => EnableContract(0)}
                >
                  Enable contract
                </button>
              )}
            </>
          ) : (
            <button
              className="flex xs:col-span-2 md:col-span-2 w-full md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
              onClick={connectWallet}
              // onClick={() => expandField(1)}
            >
              {'Connect'}
            </button>
          )}
        </div>
        <div
          className={`${
            !walletAddress || allowranceTlx <= parseEther('0')
              ? 'grid grid-cols-5 xs:grid-cols-2 md:grid-cols-2 xs:space-y-4 justify-between items-center w-full bg-black bg-opacity-75 px-4 py-2 rounded-md'
              : 'grid grid-cols-7 xs:grid-cols-2 md:grid-cols-2 xs:space-y-4 justify-between items-center w-full bg-black bg-opacity-75 px-4 py-2 rounded-md'
          }`}
        >
          <div className="flex grid-col justify-center items-center space-x-6">
            <img src={tlxUsdc} className="w-14 h-10 top-2 rounded-full  p-0" />
            <div className="flex flex-col text-center">
              {/* <span>Stake & Earn</span>
              <span className="border-b-2 border-dotted">$2.483.110</span> */}
              <span>TLX-USDC LP</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {/* <div>APR</div>
            <div>10%/R/131%</div> */}
            <div>My earned TLC</div>
            <div>
              {/* {usdcPendingRewards === ''
                ? '-'
                : parseFloat(formatEther(usdcPendingRewards)).toFixed(2)} */}
              -
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>APR</div>
            <div>{walletAddress ? '-' : '-'}</div>
          </div>
          <div className="flex flex-col items-center">
            <div>Liquidity</div>
            <div>
              {/* {usdcPoolUser === ''
                ? '-'
                : parseFloat(formatEther(usdcPoolUser[0])).toFixed(2)} */}
              -
            </div>
          </div>
          {walletAddress ? (
            <>
              {allowranceTlx > parseEther('0') ? (
                <>
                  <button
                    className="flex xs:col-span-2 md:col-span-2 md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    // onClick={() => Harvest(1)}
                  >
                    Harvest
                  </button>
                  <button
                    className="flex xs:col-span-2 md:col-span-2  md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    // onClick={() => Stake(1)}
                  >
                    Stake
                  </button>
                  <button
                    className="flex xs:col-span-2 md:col-span-2  md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center m-px"
                    // onClick={() => unStake(1)}
                  >
                    UnStake
                  </button>
                </>
              ) : (
                <button
                  className="flex xs:col-span-2 md:col-span-2 w-full md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
                  // onClick={() => EnableContract(1)}
                >
                  Enable contract
                </button>
              )}
            </>
          ) : (
            <button
              className="flex xs:col-span-2 md:col-span-2 w-full md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
              onClick={connectWallet}
              // onClick={() => expandField(1)}
            >
              {'Connect'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Farms;
