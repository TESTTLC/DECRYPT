import { FaWallet, FaUser } from 'react-icons/fa';
import BookmarkIcon from 'src/assets/svg/Bookmark';
import WaveChart from 'src/assets/svg/WaveChart';
import VisaIcon from 'src/assets/svg/Visa';
import ChipIcon from 'src/assets/svg/Chip';
import user1 from 'src/assets/images/user1.png';
import user2 from 'src/assets/images/user2.png';
import user3 from 'src/assets/images/user3.png';
import cardBackground from 'src/assets/images/credit_card_bg.png';

const MarketplaceRightSidebar: React.FC = () => {
  return (
    <div className="col-span-2 lg:col-span-10 md:col-span-10 sm:col-span-10 xs:col-span-10 space-y-2 grid-rows-none">
      {/* First */}
      <div className="w-full text-center rounded-xl bg-black bg-opacity-70 px-3 py-2">
        <p className="uppercase text-blue-500 text-sm">Wallet Holders</p>
        <div className="flex space-x-2 items-center justify-center mt-4">
          <FaWallet size={20} color="#02a2fd" />
          <p className="uppercase text-lg">$10,512,343</p>
        </div>
      </div>
      {/* End First */}

      {/* Second */}
      {/* <div className="w-full flex flex-col justify-center items-center text-center rounded-xl bg-black bg-opacity-70 space-y-4 py-4">
        <p className="px-4">Price pulse</p>
        <WaveChart width="100%" className="self-center" />
        <div className="flex items-center justify-center space-x-2 px-4">
          <p className="px-3 py-1 rounded-md bg-blue-400 text-xs">$TLC</p>
          <p className="px-3 py-1 rounded-md bg-blue-700 text-xs">$LSO</p>
        </div>
      </div> */}

      <div className="w-full relative flex flex-col justify-center items-center text-center rounded-xl bg-black bg-opacity-70 space-y-2 px-4 py-2">
        {/* <img
          src={cardBackground}
          className="absolute top-0 bottom-0 left-0 right-0 object-cover w-full h-full"
        /> */}
        <div className="flex w-full items-center justify-between">
          <p>$4,435</p>
          <ChipIcon />
        </div>
        <div className="w-full">
          <p>Credit limit</p>
          <p>$5,000</p>
        </div>
        <div className="flex w-full items-center justify-between text-xs">
          <p>
            Daily Shopping Card <br />
            **** 2450
          </p>
          <VisaIcon />
        </div>
      </div>
      {/* End Second */}

      {/* Third */}
      <div className="flex flex-col w-full rounded-xl bg-black bg-opacity-70 p-4 justify-center xs:items-center sm:items-center md:items-center lg:items-center">
        <p className="uppercase text-blue-500 text-sm">Top Creator NFT</p>
        <div className="flex items-center justify-between space-x-4 mt-4">
          <div className="flex space-x-2">
            <img src={user1} className="bg-gray-500 rounded-full h-10 w-10" />
            <div>
              <p className="text-sm">Meka Vers</p>
              <p className="text-xs">@meka</p>
            </div>
          </div>
          <BookmarkIcon />
        </div>
        <div className="flex items-center justify-between space-x-4 mt-4">
          <div className="flex space-x-2">
            <img src={user2} className="bg-gray-500 rounded-full h-10 w-10" />
            <div>
              <p className="text-sm">Juliet Doe</p>
              <p className="text-xs">@Juliet</p>
            </div>
          </div>
          <BookmarkIcon />
        </div>
        <div className="flex items-center justify-between space-x-4 mt-4">
          <div className="flex space-x-2">
            <img src={user3} className="bg-gray-500 rounded-full h-10 w-10" />
            <div>
              <p className="text-sm">John Doe</p>
              <p className="text-xs">@elondoe</p>
            </div>
          </div>
          <BookmarkIcon />
        </div>
      </div>
      {/* End Third */}

      {/* Forth */}
      <div className="flex flex-col xs:items-center sm:items-center md:items-center lg:items-center justify-center w-full rounded-xl bg-black bg-opacity-70 p-4">
        <p className="uppercase text-blue-500 text-sm">Recent NFTs Sold</p>
        <div className="flex flex-col xs:items-center sm:items-center md:items-center lg:items-center justify-between space-y-4 mt-4">
          <div className="flex space-x-2">
            <img src={user2} className="bg-gray-500 rounded-full h-10 w-10" />
            <div>
              <p className="text-sm">Juliet: Revenant #62</p>
              <p className="text-xs text-gray-400">Has been sold with 2 ETH.</p>
            </div>
          </div>
          <div className="h-[0.10rem] w-full bg-gray-400 bg-opacity-20" />
          <div className="flex space-x-2">
            <img src={user2} className="bg-gray-500 rounded-full h-10 w-10" />
            <div>
              <p className="text-sm">Juliet: Revenant #62</p>
              <p className="text-xs text-gray-400">Has been sold with 2 ETH.</p>
            </div>
          </div>
        </div>
      </div>
      {/* End Forth */}
    </div>
  );
};

export default MarketplaceRightSidebar;
