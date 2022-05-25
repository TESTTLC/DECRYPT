/* eslint-disable @typescript-eslint/no-explicit-any */
/** Functions from TLX Contracts */
import { ethers, Contract } from 'ethers';

import {
  bridgeAddresses,
  LSO_BSCSideBridgeContractAddress,
  LSO_MainBridgeContractAddress,
  LussoAvalancheChildTokenContractAddress,
  LussoBinanceChildTokenContractAddress,
  LussoFantomChildTokenContractAddress,
  LussoStakeContractAddress,
  LussoTokenContractAddress,
  TLCTokenContractAddress,
  TLC_AVAX_ChildTokenContractAddress,
  TLC_BSC_ChildTokenContractAddress,
  TLC_FTM_ChildTokenContractAddress,
} from '../globals';
import { ChainsIds, defaultPowers } from '../types';

/** This function will call the tokenContract.methods.approve is done */
export const approveStakeTokens = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tokenContract: any,
  stakeContractAddress: string,
  account: string,
  amount: number,
) => {
  let errorOnApprove = false;
  try {
    const price = ethers.utils.parseUnits(amount.toString(), 'ether');
    const approveResultPromise = new Promise((resolve) => {
      resolve(
        tokenContract.methods
          .approve(stakeContractAddress, price)
          .send({ from: account }),
      );
    });

    approveResultPromise
      .then(() => {
        return;
      })
      .catch((err) => {
        errorOnApprove = true;
        console.log('Error on approveStake: ', err);
      });
  } catch (error) {
    errorOnApprove = true;
  }

  return { errorOnApprove };
};

/** Stake for mobile if the provider can't see if the approve function from stake contract is done (TrustWallet)*/
export const mobileStake = async (
  stakeContract: Contract,
  amount: number,
  stakingDuration: number,
) => {
  let errorOnApprove = false;
  try {
    const price = ethers.utils.parseUnits(amount.toString(), 'ether');
    const stakeResultPromise = new Promise((resolve) => {
      resolve(stakeContract.functions.stakeTokens(price, stakingDuration));
    });
    stakeResultPromise.then((result) => {
      return result;
    });
  } catch (error) {
    errorOnApprove = true;
  }
  return { errorOnApprove };
};

/** Stake for web */
export const webStake = async (
  tokenContract: any,
  stakeContract: Contract,
  stakeContractAddress: string,
  account: string,
  amount: number,
  stakingDuration: number,
  coinTag: string,
) => {
  let errorOnApprove = false;
  try {
    const price = ethers.utils.parseUnits(amount.toString(), 'ether');
    let result;
    if (coinTag !== 'TLC') {
      result = await tokenContract.functions.approve(
        stakeContractAddress,
        price,
      );
    } else {
      result = await stakeContract.approve(stakeContractAddress, price);
    }
    if (result) {
      await stakeContract.stakeTokens(price, stakingDuration);
    }
  } catch (error) {
    console.log('Error is: ', error);
    errorOnApprove = true;
  }
  return { errorOnApprove };
};

/** Stake for web */
export const tlcStake = async (
  stakeContract: Contract,
  amount: number,
  stakingDuration: number,
) => {
  let errorOnApprove = false;
  try {
    const price = ethers.utils.parseUnits(amount.toString(), 'ether');
    const overrides = { value: price };
    await stakeContract.stakeTokens(stakingDuration, overrides);
    // let result;
    // const tx = await stakeContract.transfer(stakeContractAddress, price)
    // result = await stakeContract.approve(stakeContractAddress, price);

    // if (result) {
    // }
  } catch (error) {
    console.log('Error is: ', error);
    errorOnApprove = true;
  }
  return { errorOnApprove };
};

export const unstake = async (
  indexOfStake: number,
  stakeContract: Contract,
) => {
  let unstakingError;
  try {
    await stakeContract.functions.withdrawStake(indexOfStake);
  } catch (error) {
    unstakingError = 'The stake is still locked';
  }

  return unstakingError;
};

export const getTotalUserTLXStaked = async (stakeContract: Contract) => {
  let totalValueStaked = 0;
  const userStakes = await stakeContract.getUserStakes();
  userStakes.forEach((s: any) => {
    totalValueStaked += s.amount / 10 ** 18;
  });

  return { userStakes, totalValueStaked };
};

export const getUserStakes = async (stakeContract: Contract) => {
  let userStakes = [];
  try {
    userStakes = await stakeContract.getUserStakes();
  } catch (err) {}

  return userStakes;
};

export const getTotalRewards = async (stakeContract: Contract) => {
  let formatedResult = '-';
  let totalRewards;
  try {
    totalRewards = await stakeContract.getTotalRewards();
    formatedResult = parseFloat(
      ethers.utils.formatUnits(totalRewards._hex),
    ).toFixed(3);
  } catch (err) {}

  return parseFloat(formatedResult) || 0;
};

export const getTotalValueLocked = async (stakeContract: Contract) => {
  let stakedAmount = 0;
  try {
    stakedAmount = await stakeContract.getStakedAmount();
  } catch (err) {
    return stakedAmount;
  }

  return parseFloat(
    parseFloat(ethers.utils.formatEther(stakedAmount.toString())).toFixed(3),
  );
};

export const getVolume24h = async () => {
  let totalVolume = 0.0;
  try {
    const baseUrl =
      'https://staking-calculatorbackend-cais4.ondigitalocean.app/cryptocurrency/quotes/latest?symbol=TLX&convert=USD';
    const data = await fetch(baseUrl).then((result) => result.json());
    totalVolume = data.data.TLX.quote.USD.volume_24h;
  } catch (err) {}
  return totalVolume;
};

export const renderStakePeriod = (period: any) => {
  if (period === 0) {
    return '1 month';
  } else if (period === 1) {
    return '3 months';
  } else if (period === 2) {
    return '6 months';
  } else if (period === 3) {
    return '12 months';
  } else if (period === 4) {
    return '36 months';
  } else {
    return '- months';
  }
};

export const getActualBalanceOf = async (
  tokenContract: any,
  account: string,
) => {
  let userBalance = 0;
  try {
    const balance = await tokenContract.actualBalanceOf(account);

    userBalance = parseFloat(
      parseFloat(ethers.utils.formatUnits(balance, 18)).toFixed(3),
    );
  } catch (error) {
    console.log('Error: ', error);
  }

  return userBalance;
};

export const getBalance = async (tokenContract: any, account: string) => {
  let userBalance = 0;
  try {
    const balance = await tokenContract.balanceOf(account);

    // userBalance = parseFloat(
    //   parseFloat(ethers.utils.formatEther(balance._hex)).toFixed(3)
    // );
    userBalance = parseFloat(ethers.utils.formatUnits(balance, 18));
  } catch (error) {
    console.log('Error: ', error);
  }

  return userBalance;
};

export const getTLCBalance = async (account: string) => {
  const api = `https://tlxscan.com/api?module=account&action=balance&address=${account}`;
  let balance = '0';
  await fetch(api)
    .then((response) => response.json())
    .then((response) => {
      balance = response.result;
    });

  return parseFloat(parseFloat(ethers.utils.formatEther(balance)).toFixed(3));
};

export const determinePowerForStake = (
  amount: number,
  period: number,
  powerCoin: 'TLX' | 'TLC',
): number => {
  let currentStakePower = 0;
  currentStakePower = defaultPowers[powerCoin][period] * amount;

  return currentStakePower;
};

export const getTotalNumberOfTxByAddress = async (addressHash: string) => {
  try {
    const url = `https://tlxscan.com/api?module=account&action=txlist&address=${addressHash}&sort=asc`;
    const res = await fetch(url);
    const result = await res.json();
    const totalNumber = result.result.length;

    return totalNumber;
  } catch (error) {
    console.log('Err: ', error);
  }
};

export const getBridgeAddresses = (
  token: string,
  fromChain: string,
  toChain: string,
) => {
  // return ChainsIds[chain as unknown as keyof typeof ChainsIds] || ChainsIds.TLC;
  console.log('herSSSSSe: ', toChain);
  let mainBridgeAddress = '';
  let sideBridgeAddress = '';

  // const selectedToken = token as unknown as keyof typeof bridgeAddresses;
  // const selectedChild =
  //   toChain as unknown as keyof typeof bridgeAddresses.TLC.child;

  // console.log('selectedChild: ', selectedChild);
  // console.log('selectedToken: ', selectedToken);
  // mainBridgeAddress = bridgeAddresses[selectedToken].main.address || 'ERR';
  // sideBridgeAddress =
  //   bridgeAddresses[selectedToken].child[selectedChild].address || 'ERR';

  // console.log('sideBridgeAddress: ', sideBridgeAddress);
  // console.log('mainBridgeAddress: ', mainBridgeAddress);

  if (token === 'LSO') {
    mainBridgeAddress = bridgeAddresses.LSO.main.address;
    if (toChain === 'TLC') {
      if (fromChain === 'BSC') {
        sideBridgeAddress = bridgeAddresses.LSO.child.BSC.address;
      }
      if (fromChain === 'FTM') {
        sideBridgeAddress = bridgeAddresses.LSO.child.FTM.address;
      }
      if (fromChain === 'AVAX') {
        sideBridgeAddress = bridgeAddresses.LSO.child.AVAX.address;
      }
    }
    // sideBridgeAddress = bridgeAddresses[token].child[toChain].address;
    if (toChain === 'BSC') {
      sideBridgeAddress = bridgeAddresses.LSO.child.BSC.address;
    }
    if (toChain === 'FTM') {
      sideBridgeAddress = bridgeAddresses.LSO.child.FTM.address;
    }
    if (toChain === 'AVAX') {
      sideBridgeAddress = bridgeAddresses.LSO.child.AVAX.address;
    }
  }

  if (token === 'TLC') {
    mainBridgeAddress = bridgeAddresses.TLC.main.address;
    if (toChain === 'TLC') {
      if (fromChain === 'BSC') {
        sideBridgeAddress = bridgeAddresses.TLC.child.BSC.address;
      }
      if (fromChain === 'FTM') {
        sideBridgeAddress = bridgeAddresses.TLC.child.FTM.address;
      }
      if (fromChain === 'AVAX') {
        sideBridgeAddress = bridgeAddresses.TLC.child.AVAX.address;
      }
    }
    if (toChain === 'BSC') {
      sideBridgeAddress = bridgeAddresses.TLC.child.BSC.address;
    }
    if (toChain === 'FTM') {
      sideBridgeAddress = bridgeAddresses.TLC.child.FTM.address;
    }
    if (toChain === 'AVAX') {
      sideBridgeAddress = bridgeAddresses.TLC.child.AVAX.address;
    }
  }

  return { mainBridgeAddress, sideBridgeAddress };
};

export const getTokenAddress = (token: string, fromChain: string) => {
  let tokenAddress = '';

  if (token === 'TLC') {
    if (fromChain === 'TLC') {
      tokenAddress = TLCTokenContractAddress;
    } else if (fromChain === 'BSC') {
      tokenAddress = TLC_BSC_ChildTokenContractAddress;
    } else if (fromChain === 'FTM') {
      tokenAddress = TLC_FTM_ChildTokenContractAddress;
    } else if (fromChain === 'AVAX') {
      tokenAddress = TLC_AVAX_ChildTokenContractAddress;
    }
  }

  if (token === 'LSO') {
    if (fromChain === 'TLC') {
      tokenAddress = LussoTokenContractAddress;
    } else if (fromChain === 'BSC') {
      tokenAddress = LussoBinanceChildTokenContractAddress;
    } else if (fromChain === 'FTM') {
      tokenAddress = LussoFantomChildTokenContractAddress;
    } else if (fromChain === 'AVAX') {
      tokenAddress = LussoAvalancheChildTokenContractAddress;
    }
  }

  return tokenAddress;
};

export const getChainId = (chain: string) => {
  return ChainsIds[chain as unknown as keyof typeof ChainsIds] || ChainsIds.TLC;
};

export const getChain = (chainId: string) => {
  let chain = 'TLC';
  if (chainId === ChainsIds.TLC) {
    chain = 'TLC';
  } else if (chainId === ChainsIds.BSC) {
    chain = 'BSC';
  } else if (chainId === ChainsIds.FTM) {
    chain = 'FTM';
  } else if (chainId === ChainsIds.AVAX) {
    chain = 'AVAX';
  }

  return chain;
};

// const freezeTo = async () => {
//   const freezedResult = await tokenContract.freezeTo(
//     account,
//     ethers.utils.parseUnits("10", "ether"),
//     // 10,
//     1648170000
//   );
// };

// export const calculateStakeRewards = async (
//   stakeContract: Contract,
//   userStakes: any
// ) => {
//   let userRewards;
//   try {
//     userRewards = await stakeContract.calculateStakeReward();
//   } catch (err) {
//     console.log("err: ", err);
//   }
//   const formatedResult = parseFloat(
//     ethers.utils.formatUnits(userRewards._hex)
//   ).toFixed(3);
//   return parseFloat(formatedResult);
// };
