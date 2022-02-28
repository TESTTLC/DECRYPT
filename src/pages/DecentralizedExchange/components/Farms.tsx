import { useSelector } from 'react-redux';
import { useWalletConnector } from 'src/hooks/useWalletConnector';
import { StoreState } from 'src/utils/storeTypes';
import tlxLogo from 'src/assets/images/TLX-logo.png';
import tlcLogo from 'src/assets/images/TLC-logo.png';

import Categories from './Categories';

interface Props {
  interface?: string;
}
const Farms: React.FC<Props> = () => {
  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const { connectWallet } = useWalletConnector();
  return (
    <>
      <div className="flex flex-col">
        <span className="text-lg font-bold mb-2">Staking Farms</span>
        <div className="grid grid-cols-5 xs:grid-cols-2 md:grid-cols-2 xs:space-y-4 justify-between items-center full bg-black bg-opacity-75 px-4 py-2 rounded-md">
          <div className="flex grid-col justify-center items-center space-x-6">
            <img
              src={tlxLogo}
              className="w-10 h-10 top-2 rounded-full border-4 border-gray-800 p-0 "
            />
            <div className="flex flex-col text-center">
              <span>Stake & Earn</span>
              <span className="border-b-2 border-dotted">$2.483.110</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>APR</div>
            <div>10%/R/131%</div>
          </div>
          <div className="flex flex-col items-center">
            <div>My Staked TLX</div>
            <div>-</div>
          </div>
          <div className="flex flex-col items-center">
            <div>My earned TLX</div>
            <div>-</div>
          </div>
          <button
            className="flex xs:col-span-2 md:col-span-2 xs:w-full md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
            onClick={!walletAddress ? connectWallet : undefined}
          >
            {walletAddress ? 'Stake' : 'Connect'}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex xs:flex-col justify-between">
          <span className="flex-[0.4] text-lg font-bold mb-2">LP Farms</span>
          <div className="flex-[0.6]">
            <Categories />
          </div>
        </div>
        <div className="grid grid-cols-5 xs:grid-cols-2 md:grid-cols-2 xs:space-y-4 justify-between items-center  w-full bg-black bg-opacity-75 px-4 py-2 rounded-md">
          <div className="flex grid-col justify-center items-center space-x-6">
            <img
              src={tlcLogo}
              className="w-10 h-10 top-2 rounded-full border-4 border-gray-800 p-0 "
            />
            <div className="flex flex-col text-center">
              <span>Stake & Earn</span>
              <span className="border-b-2 border-dotted">$2.483.110</span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div>APR</div>
            <div>10%/R/131%</div>
          </div>
          <div className="flex flex-col items-center">
            <div>My Staked TLC</div>
            <div>-</div>
          </div>
          <div className="flex flex-col items-center">
            <div>My earned TLC</div>
            <div>-</div>
          </div>
          <button
            className="flex xs:col-span-2 md:col-span-2 w-full md:w-full h-8 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center"
            onClick={!walletAddress ? connectWallet : undefined}
          >
            {walletAddress ? 'Stake' : 'Connect'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Farms;
