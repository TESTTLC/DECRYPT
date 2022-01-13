import React, { useState } from "react";
import Modal from "react-modal";
import { useTLXContracts } from "../hooks/useTLXContracts";
import { useGlobalContext } from "../utils/context";
import { webStake } from "../utils/functions/Contracts";
import { TLXStakeContractAddress } from "../utils/globals";
import { launchpadProjects } from "../utils/launchpadProjects";
import { StackingDuration } from "../utils/types";
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
}

const LaunchpadModal: React.FC<Props> = ({ index }) => {
  const { account } = useGlobalContext();
  let subtitle = "";
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [stakeAmount, setStakeAmount] = useState(0);
  const [duration, setDuration] = useState(0);
  const { stakeContract, tokenContract, provider } = useTLXContracts();

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        onClick={openModal}
        type="button"
        className="w-full mt-2 font-poppins bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl text-white bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 mb-2"
      >
        Learn more
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
        <div className="flex h-[28rem] w-[64rem] relative">
          <div>
            <img
              src={launchpadProjects.TLX.imageSource}
              className="h-full w-60 object-cover"
            />
            <div className="flex flex-col items-center justify-center absolute w-60 py-1 px-3 bottom-0 inset-x-0 bg-gray-700 bg-opacity-60 text-white text-xs leading-4">
              <p className="font-bold text-lg mb-2">The Luxury</p>
              <p className="text-center font-poppins font-medium">
                The reference cryptocurrency for the luxury industry.
              </p>
            </div>
          </div>
          <div className="flex-1 pl-6 pr-8 py-6">
            {/* <button onClick={closeModal} className="text-white">
              close
            </button> */}
            <div className="flex justify-between">
              <div className="text-white text-lg font-poppins">
                Stake TLX to increase your power
              </div>
              <span className=" text-white text-lg font-poppins">
                <span className="flex">
                  Current power: <p className="text-green-300">&nbsp; 3%</p>
                </span>
                {/* <p>{launchpadProjects.TLX.description}</p> */}
              </span>
            </div>
            <div>
              <span className="mt-4 flex flex-col xl:flex-row 2xl-flex:row">
                {/* <p className="text-lg font-bold text-white ">30 TLX</p> */}
                <input
                  className="text-white h-8 rounded-md px-3 my-2 mr-2 w-64 bg-customBlue-300"
                  type={"number"}
                  // ref={stakeInputRef}
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
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LaunchpadModal;
