import { useMemo, useState } from 'react';
import { FaArrowCircleDown } from 'react-icons/fa';
import { modalChains, modalCoins } from 'src/utils/globals';
import tlcImage from 'src/assets/images/tlc-bridge.png';
import lsoImage from 'src/assets/images/LSO-logo.png';
import authorityXLogo from 'src/assets/images/authority-x.png';
import tlxImage from 'src/assets/images/TLX-logo.png';
import useCurrentChain from 'src/hooks/useCurrentChain';
import { ethers } from 'ethers';
import { ChainsIds } from 'src/utils/types';

// import TokensModal from '../CrossChainBridge/components/TokensModal';
const fromTokens = {
  TLX: {
    name: 'The Luxury',
    tag: 'TLX',
    image: tlxImage,
  },
  LSO: {
    name: 'Luxandia',
    tag: 'LSO',
    image: lsoImage,
  },
};
const AuthorityX = () => {
  const { chainId } = useCurrentChain();

  const chainError = useMemo(() => {
    if (!chainId) return 'Please connect to Old TLChain - 5177';
    if (ethers.utils.hexlify(chainId) !== ChainsIds.OldTLC) {
      return 'Please connect to Old TLChain - 5177';
    } else {
      return '';
    }
  }, [chainId]);

  const [selectedToken, setSelectedToken] = useState(fromTokens.TLX);
  return (
    <div className="flex flex-col flex-1 items-center">
      {/* {!showBridge && (
        <div className="w-full mt-20 flex flex-col items-center">
          <p className="mb-2">Password to unlock the bridge</p>
          <input
            className="bg-black px-4 py-1 bg-opacity-60 rounded-xl w-64 h-8"
            onChange={onPwChange}
            type="password"
          />
        </div>
      )} */}
      {/* {showBridge && ( */}
      <div className="flex flex-col">
        <div className="w-[44rem] xs:w-[22rem] mt-10 text-sm mb-4">
          <p className="font-poppins text-gray-300">
            $TLX and $LSO come together in a novel formula to achieve a
            revolutionary approach to the future. The Authority X platform
            facilitates the transformation of $TLX and $LSO assets into X asset.
          </p>
        </div>
        <div className="flex">
          {chainError && <p className="text-red-500 text-sm">{chainError}</p>}
        </div>
        <div className="relative items-center w-[44rem] xs:w-[22rem] h-[23rem] px-8 py-8 xs:px-4 rounded-lg bg-black bg-opacity-60">
          {/* 111111111111 */}
          <div className="relative flex bg-black bg-opacity-60 w-full h-20 rounded-lg pt-1 px-6 items-center">
            <div className="flex w-1/2 flex-col h-full">
              <p className="text-gray-400 font-medium font-poppins text-sm">
                From
              </p>
              <input
                className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                type="text"
                // value={amountToSend}
                value={1}
              ></input>
            </div>

            <button
              // onClick={onFromTokenSelect && onFromTokenSelect}
              onClick={() => {
                setSelectedToken(
                  selectedToken.tag === 'LSO' ? fromTokens.TLX : fromTokens.LSO,
                );
              }}
              className="flex text-white font-poppins items-center justify-center"
            >
              <img
                className="text-white font-poppins w-6 h-6 mr-2 object-cover"
                src={selectedToken.image}
              />
              <p className="text-white font-poppins">{selectedToken.tag}</p>

              <div className="h-8 w-1 bg-gray-800 mx-6" />

              <button
                // className="mt-6 flex w-full h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
                className="flex h-full justify-end items-center "
              >
                <img
                  className="text-white font-poppins w-7 h-7 mr-1 object-cover"
                  src={tlcImage}
                />
                <p className="text-white font-poppins">Old TLChain - 5177</p>{' '}
                {/* <GoArrowDown className="h-4 w-4 ml-1" color="white" /> */}
              </button>
            </button>
          </div>
          <div className="w-full flex items-center justify-center h-14">
            <FaArrowCircleDown
              className="h-6 w-6 bg-transparent self-center "
              color="gray"
            />
          </div>
          {/* 22222222222 */}
          <div className="relative flex bg-black bg-opacity-60 w-full h-20 rounded-lg pt-1 px-6 items-center">
            <div className="flex w-1/2 flex-col h-full">
              <p className="text-gray-400 font-medium font-poppins text-sm">
                To
              </p>
              <input
                className="w-full h-2/3 text-lg pt-2 bg-transparent font-poppins text-white focus:outline-none"
                type="text"
                // value={amountToSend}
                value={1}
              ></input>
            </div>

            <button
              // onClick={onFromTokenSelect && onFromTokenSelect}
              className="flex text-white font-poppins items-center justify-center"
            >
              <img
                className="text-white font-poppins w-6 h-6 mr-2 object-cover"
                src={authorityXLogo}
              />
              <p className="text-white font-poppins">X</p>

              <div className="h-8 w-1 bg-gray-800 mx-6" />

              <button
                // className="mt-6 flex w-full h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
                className="flex h-full justify-end items-center "
              >
                <img
                  className="text-white font-poppins w-7 h-7 mr-1 object-cover"
                  src={tlcImage}
                />
                <p className="text-white font-poppins">TLChain</p>{' '}
                {/* <GoArrowDown className="h-4 w-4 ml-1" color="white" /> */}
              </button>
            </button>
          </div>
          {/* <p className="my-4 text-sm">
            You will spend{' '}
            <span className="text-green-400">{amountToSend}</span> + {fee} (fee)
            as a total of {parseFloat(amountToSend) + fee} {bridgeState.token}
          </p> */}
          {/* <p className="mt-8 text-lg text-center">
          The bridge is currently deactivated
        </p> */}
          <div className="flex w-full space-x-8">
            <button
              onClick={() => {
                // send();
              }}
              // onClick={swap}
              className="w-full flex h-14 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
              //   disabled={isLoading}
            >
              {/* {isLoading ? (
                <>
                  <TailSpin color="#fff" height={18} width={18} />
                </>
              ) : (
                'Send'
              )} */}
            </button>
          </div>
          <p className="font-poppins text-green-400 mt-6">Attention!</p>
          <p className="text-gray-300 text-sm font-poppins">
            There is no turning back. $TLX and $LSO become X in a spectacular
            burst of technology innovation
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthorityX;
