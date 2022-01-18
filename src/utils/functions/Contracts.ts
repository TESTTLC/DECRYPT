/** Functions from TLX Contracts */
import { ethers, Contract } from "ethers";

/** This function will call the tokenContract.methods.approve is done */
export const approveStakeTokens = async (
  tokenContract: any,
  stakeContractAddress: string,
  account: string,
  amount: number
  // provider: any
) => {
  let errorOnApprove = false;
  try {
    // await tokenContract.setProvider(provider)

    const price = ethers.utils.parseUnits(amount.toString(), "ether");
    const approveResultPromise = new Promise((resolve, reject) => {
      resolve(
        tokenContract.methods
          .approve(stakeContractAddress, price)
          .send({ from: account })
      );
    });

    approveResultPromise
      .then(() => {
        console.log("approved");
      })
      .catch((err) => {
        console.log("err: ", err);
        errorOnApprove = true;
      });
  } catch (error) {
    errorOnApprove = true;
    console.log("Error on approveStakeTokens: ", error);
  }

  return { errorOnApprove };
};

/** Stake for mobile if the provider can't see if the approve function from stake contract is done (TrustWallet)*/
export const mobileStake = async (
  stakeContract: Contract,
  amount: number,
  stakingDuration: number
) => {
  let errorOnApprove = false;
  try {
    const price = ethers.utils.parseUnits(amount.toString(), "ether");
    const stakeResultPromise = new Promise((resolve, reject) => {
      resolve(stakeContract.functions.stakeTokens(price, stakingDuration));
    });
    stakeResultPromise.then((result) => {});
  } catch (error) {
    console.log("Error on stakeTokens: ", error);
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
  provider?: any
) => {
  let errorOnApprove = false;
  try {
    const price = ethers.utils.parseUnits(amount.toString(), "ether");

    // if (provider) {
    //   await tokenContract.setProvider(provider);
    // }

    // if (isMobile) {
    //   const result = stakeContract.functions.stakeTokens(price, manualStackingDuration)
    //   tokenContract.methods.approve(stakeContractAddress, price).send({ from: account })

    //   dispatch(setStakingApproved(true))
    //   setErrorOnApprove(false)
    // }

    const result = await tokenContract.functions.approve(
      stakeContractAddress,
      price
    );
    // setTimeout(async () => {
    if (result) {
      const r = await stakeContract.stakeTokens(price, stakingDuration);
    }
    // }, 30000);
  } catch (error) {
    errorOnApprove = true;
    console.log("Error on stake: ", error);
  }
  return { errorOnApprove };
};

export const unstake = async (
  indexOfStake: number,
  // account: string,
  stakeContract: Contract
) => {
  let unstakingError;
  try {
    await stakeContract.functions.withdrawStake(indexOfStake);
  } catch (error) {
    console.log("Error on unstaking: ", error);
    unstakingError = "The stake is still locked";
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
  // setAllUserStakes(userStakes)
  // setTotalUserTLXStaked(totalUserStaked)
};

export const getUserStakes = async (stakeContract: Contract) => {
  let userStakes = [];
  try {
    userStakes = await stakeContract.getUserStakes();
  } catch (err) {
    console.log("err: ", err);
  }

  return userStakes;
};

export const getTotalRewards = async (stakeContract: Contract) => {
  let formatedResult = "-";
  let totalRewards;
  try {
    totalRewards = await stakeContract.getTotalRewards();
    formatedResult = parseFloat(
      ethers.utils.formatUnits(totalRewards._hex)
    ).toFixed(3);
  } catch (err) {
    console.log("err: ", err);
  }

  return parseFloat(formatedResult) || 0;
};

// export const calculateStakeRewards = async (
//   stakeContract: Contract,
//   userStakes: any
// ) => {
//   console.log("stake C: ", stakeContract);
//   let userRewards;
//   try {
//     userRewards = await stakeContract.calculateStakeReward();
//   } catch (err) {
//     console.log("err: ", err);
//   }
//   console.log("userRewards: ", userRewards);
//   const formatedResult = parseFloat(
//     ethers.utils.formatUnits(userRewards._hex)
//   ).toFixed(3);
//   return parseFloat(formatedResult);
// };

export const getVolume24h = async () => {
  let totalVolume = 0.0;
  try {
    const baseUrl =
      "https://staking-calculatorbackend-cais4.ondigitalocean.app/cryptocurrency/quotes/latest?symbol=TLX&convert=USD";
    const data = await fetch(baseUrl).then((result) => result.json());
    totalVolume = data.data.TLX.quote.USD.volume_24h;
  } catch (err) {
    console.log("Err on get volume");
  }
  return totalVolume;
};

export const renderStakePeriod = (period: any) => {
  if (period === 0) {
    return "1 month";
  } else if (period === 1) {
    return "3 months";
  } else if (period === 2) {
    return "6 months";
  } else {
    return "12 months";
  }
};

export const getTLXBalance = async (tokenContract: any, account: string) => {
  let userBalance = 0;
  try {
    const balance = await tokenContract.balanceOf(account);

    userBalance = parseFloat(
      parseFloat(ethers.utils.formatEther(balance._hex)).toFixed(3)
    );
  } catch (error) {
    console.log("Error: ", error);
  }

  return userBalance;
};
