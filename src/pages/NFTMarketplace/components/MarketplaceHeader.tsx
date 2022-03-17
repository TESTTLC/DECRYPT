import MessageActivityIcon from 'src/assets/svg/MessageActivity';
import NotificationsIcon from 'src/assets/svg/Notifications';
import user3 from 'src/assets/images/user3.png';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface Props {
  title?: string;
}

const MarketplaceHeader: React.FC<Props> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="text-xs flex items-center space-x-1 text-white text-left w-[7.5rem] bg-gradient-to-r from-blue-500 to-green-500 hover:from-gray-700 hover:to-gray-700 pl-2 py-[0.15rem] rounded-md mt-6"
        onClick={() => navigate('/')}
      >
        <MdOutlineKeyboardBackspace size={14} color="white" />
        <p>Back to main</p>
      </button>
      <div className="w-full grid grid-cols-6 items-center justify-between mb-4 bg-black bg-opacity-70 pr-4 pl-2 py-2 rounded-lg">
        <p className="col-span-3 xs:col-span-6 sm:col-span-6 md:col-span-6 text-2xl font-semibold">
          {title || 'Sell extraordinary NFTs'}
        </p>
        <div className="flex col-span-2 xs:col-span-5 sm:col-span-5 md:col-span-5 space-x-2 items-center justify-end">
          <div className="flex rounded-full h-10 px-4 bg-black bg-opacity-70 text-sm items-center mr-8">
            <p className="text-gray-500 text-xs">
              Search items, collections and accounts
            </p>
          </div>
          <div className="flex items-center justify-center rounded-full w-10 h-10 bg-black bg-opacity-70">
            <MessageActivityIcon />
          </div>
          <div className="flex items-center justify-center rounded-full w-10 h-10 bg-black bg-opacity-70">
            <NotificationsIcon />
          </div>
        </div>
        <div className="flex justify-end items-center col-span-1 ">
          <button
            className="rounded-full col-span-1 w-10 h-10 bg-black bg-opacity-70"
            onClick={() => navigate('/nftmarketplace/editprofile')}
          >
            <img
              src={user3}
              className="bg-gray-500 rounded-full h-full w-full object-cover"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default MarketplaceHeader;
