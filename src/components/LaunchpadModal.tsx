import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useContracts } from "../hooks/useContracts";
import { useGlobalContext } from "../utils/context";
import { getUserStakes, webStake } from "../utils/functions/Contracts";
import {
  TLCStakeContractAddress,
  TLXStakeContractAddress,
} from "../utils/globals";
import { launchpadProjects } from "../utils/launchpadProjects";
import {
  defaultPowers,
  LaunchpadProject,
  Project,
  StackingDuration,
  Stake,
} from "../utils/types";
import GlowingButton from "./GlowingButton";
import SelectDropdown from "./SelectDropdown";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    // backgroundColor: "#080220",
    backgroundColor: "#080220",
    opacity: 1,
    backgroundOpacity: 1,
    borderWidth: 0,
    padding: 0,
    // width: "25rem",
  },
};

Modal.setAppElement("#root");

interface Props {
  index: number;
  coinTag: string;
  projectItem: LaunchpadProject;
}

const totalTLXValueAllocated = 10000000;
const totalLSOValueAlocated = 100000000;

const LaunchpadModal: React.FC<Props> = ({ index, coinTag, projectItem }) => {
  const { account } = useGlobalContext();
  let subtitle = "";
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [stakingCoin, setStakingCoin] = useState("TLX");
  const {
    stakeContract: TLXStakeContract,
    tokenContract: TLXTokenContract,
    provider,
  } = useContracts("TLX");
  const { stakeContract: TLCStakeContract, tokenContract: TLCTokenContract } =
    useContracts("TLC");

  const [power, setPower] = useState(0);
  const [TLXPower, setTLXPower] = useState(0);
  const [TLCPower, setTLCPower] = useState(0);

  // const [userStakes, setUserStakes] = useState(0);
  const [totalStakedAmount, setTotalStakedAmount] = useState(0);

  const getStakes = async (powerCoin: "TLX" | "TLC") => {
    let currentAmout = 0;
    let currentPower = 0;
    let usedStakeContract;
    if (powerCoin === "TLX" && TLXStakeContract) {
      usedStakeContract = TLXStakeContract;
    } else if (powerCoin === "TLC" && TLCStakeContract) {
      usedStakeContract = TLCStakeContract;
    }
    if (usedStakeContract) {
      const stakes = await getUserStakes(usedStakeContract);
      stakes.forEach((stake: Stake, index: number) => {
        currentAmout += parseFloat(ethers.utils.formatEther(stake.amount));
        currentPower += determinePowerForStake(
          parseFloat(ethers.utils.formatEther(stake.amount)),
          stake.period.toNumber(),
          powerCoin
        );
      });

      if (powerCoin === "TLX") {
        setTLXPower(currentPower);
      } else if (powerCoin === "TLC") {
        setTLCPower(currentPower);
      }
    }
  };

  const determinePowerForStake = (
    amount: number,
    period: number,
    powerCoin: "TLX" | "TLC"
  ): number => {
    let currentStakePower = 0;
    // currentStakePower =
    //   (defaultPowers[powerCoin][period] / 100) * totalLSOValueAlocated * amount;
    currentStakePower = defaultPowers[powerCoin][period] * amount;

    return currentStakePower;
  };

  const stakeTokens = () => {
    const tokenContract =
      stakingCoin === "TLX" ? TLXTokenContract : TLCTokenContract;
    const stakeContract =
      stakingCoin === "TLX" ? TLXStakeContract : TLCStakeContract;
    const stakeContractAddress =
      stakingCoin === "TLX" ? TLXStakeContractAddress : TLCStakeContractAddress;
    if (stakeContract) {
      webStake(
        tokenContract,
        stakeContract,
        stakeContractAddress,
        account!,
        stakeAmount,
        duration,
        provider
      );
    }
  };

  useEffect(() => {
    // const p = ((TLXPower + TLCPower) / totalLSOValueAlocated) * 100;
    let p = TLXPower + TLCPower;
    if (p > 100) {
      p = 100;
    }
    setPower(parseFloat(p.toFixed(4)));
  }, [TLXPower, TLCPower]);

  useEffect(() => {
    if (TLXPower === 0) {
      getStakes("TLX");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TLXStakeContract]);

  useEffect(() => {
    if (TLCPower === 0) {
      getStakes("TLC");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [TLCStakeContract]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        onClick={coinTag === "default" ? undefined : openModal}
        type="button"
        className="w-full mt-2 font-poppins bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl text-white bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
      >
        {coinTag === "default"
          ? "Coming Soon"
          : "This IDO requires KYC verification"}
      </button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Modal"
        overlayClassName="Overlay"
        // className="Modal"
      >
        <div className="flex xs:flex-col xs:w-full sm:flex-col sm:w-full md:flex-col md:w-full h-full min-h-[28rem] w-[64rem] relative">
          <div className="xs:w-full xs:h-60 sm:w-full sm:h-60 md:w-full md:h-60 w-60 relative">
            <img
              src={projectItem.imageSource}
              className="h-full w-full object-cover xs:object-center sm:object-top"
            />
            <div className="flex flex-col w-full items-center justify-center absolute 60 py-1 px-3 bottom-0 inset-x-0 bg-gray-700 bg-opacity-60 text-white text-xs leading-4">
              <p className="font-bold text-lg mb-2">{projectItem.title}</p>
              <p className="text-center font-poppins font-medium">
                {projectItem.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col flex-1 pl-6 pr-8 py-6 justify-between">
            {/* <button onClick={closeModal} className="text-white">
              close
            </button> */}
            <div className="flex justify-between">
              <div className="pr-2">
                <p className="text-white text-lg font-poppins">
                  Stake TLX or TLC to increase your power
                </p>
                <p className="text-white text-sm font-poppins flex-shrink">
                  Get Early Access to Hand-picked high-quality blockchain
                  projects.
                </p>
              </div>
              <span className=" text-white text-lg font-poppins">
                <span className="flex">
                  Current power:{" "}
                  <p className="text-green-300">&nbsp; {power}%</p>
                </span>
                {/* <p>{launchpadProjects.TLX.description}</p> */}
              </span>
            </div>
            <div>
              <span className="mt-4 flex flex-col xl:flex-row 2xl-flex:row justify-start">
                {/* <p className="text-lg font-bold text-white ">30 TLX</p> */}
                <input
                  className="text-white h-8 rounded-md px-3 my-2 mr-2 w-40 bg-customBlue-300"
                  type={"number"}
                  // ref={stakeInputRef}
                  onChange={(e) => {
                    setStakeAmount(parseFloat(e.target.value));
                  }}
                  placeholder="Value..."
                />
                <div className="my-2 mr-2 w-60">
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
                      }
                    }}
                  />
                </div>
                <div className="my-2 mr-2 w-40">
                  <SelectDropdown
                    text={"Staking coin"}
                    elements={["TLX", "TLC"]}
                    onSelect={(e) => {
                      // const value = parseInt(e.target.value, 10);
                      if (e.target.value === "TLC") {
                        setStakingCoin("TLC");
                      } else {
                        setStakingCoin("TLX");
                      }
                    }}
                  />
                </div>
                <div className="my-2 mr-2 flex">
                  <GlowingButton
                    text={`Stake ${stakeAmount || 0}`}
                    onClick={stakeTokens}
                  />
                </div>
              </span>
            </div>
            <div className="">
              <p className="text-white font-poppins text-sm">
                Empower the most innovative crypto projects across all
                blockchains with Decryption.com, the bridge to a new organic way
                of fundraising across the smart-contract-based blockchains.
                <br />
                <br />
                Tiers-Free Allocation System We disrupted the concept of tiers
                by allowing everyone to be eligible for a guaranteed allocation
                no matter how many tokens they hold. <br />
                <br />
                We incentivize the purchase of our coin/tokens in this way since
                every single $TLC or $TLX you add to your wallet will affect
                your personal allocation, and you don't need to reach a certain
                threshold to increase it.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LaunchpadModal;
