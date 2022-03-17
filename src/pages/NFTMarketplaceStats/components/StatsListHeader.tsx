import cryptoCity_1 from 'src/assets/images/crypto-city-1.png';
import cryptoCity_2 from 'src/assets/images/crypto-city-2.png';

const StatsListHeader: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-2 items-center justify-between overflow-hidden rounded-t-2xl bg-gradient-to-b from-black via-black to-transparent bg-opacity-70 px-10 py-6 xs:px-4 sm:px-4 md:px-4 mt-2">
      <div className="col-span-1 xs:col-span-2 sm:col-span-2 md:col-span-2">
        <p className="text-3xl">The Insane Future Web3</p>
        <p className="text-3xl">Web3 & Metaverse</p>
        <p className="text-xs text-gray-400 mt-2">
          New Way to Unlock The True Value of The World Assets
        </p>
        <button className="text-sm text-black px-4 py-1 rounded-full bg-blue-400 my-6">
          Explore now
        </button>
      </div>
      <div className="flex cols-span-1 xs:col-span-2 sm:col-span-2 md:col-span-2 space-x-6 xs:space-x-2 sm:space-x-4 md:space-x-4">
        <div className="flex flex-col">
          <img
            src={cryptoCity_1}
            className=" min-h-50 max-h-64 object-cover rounded-2xl"
          />
          <div className="flex text-xs items-center justify-between px-4 mt-2">
            <p className="text-blue-500">Luxandia Crypto City</p>
            <p className="text-gray-500">Price</p>
          </div>
          <div className="flex text-md items-center justify-between px-4 my-1 xs:text-xs sm:text-xs">
            <p>Villa Type 2</p>
            <p>$120,000</p>
          </div>
        </div>

        <div className="flex flex-col md:px-10 sm:px-10">
          <img
            src={cryptoCity_2}
            className=" min-h-50 max-h-64 object-cover rounded-2xl"
          />
          <div className="flex text-xs items-center justify-between px-4 mt-2">
            <p className="text-blue-500">Luxandia Crypto City</p>
            <p className="text-gray-500">Price</p>
          </div>
          <div className="flex text-md items-center justify-between px-4 my-1 xs:text-xs sm:text-xs">
            <p>Villa Type 3</p>
            <p>$86,565</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsListHeader;
