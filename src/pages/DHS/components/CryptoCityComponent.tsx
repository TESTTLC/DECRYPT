import cryptoCity1 from 'src/assets/images/crypto-city-1.png';
import cryptoCity2 from 'src/assets/images/crypto-city-2.png';
import LoanIcon from 'src/assets/svg/Loan';
import OfferIcon from 'src/assets/svg/Offer';

const CryptoCityComponent: React.FC = () => {
  return (
    <>
      <div>
        <div className="flex flex-col md:px-10 sm:px-10">
          <img src={cryptoCity1} className="mb-2" />
          <div className="flex text-xs items-center justify-between px-4">
            <p className="text-blue-500">Luxandia Crypto City</p>
            <p className="text-gray-500">Price</p>
          </div>
          <div className="flex text-md items-center justify-between px-4 my-1">
            <p>Villa Protocol D</p>
            <p>$86,565</p>
          </div>

          <button className="flex space-x-2 justify-center items-center bg-[#E605CC] rounded-full py-1">
            <p>Create A Syndicate</p>
            <LoanIcon />
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col md:px-10 sm:px-10">
          <img src={cryptoCity2} className="mb-2" />
          <div className="flex text-xs items-center justify-between px-4">
            <p className="text-blue-500">Luxandia Crypto City</p>
            <p className="text-gray-500">Price</p>
          </div>
          <div className="flex text-md items-center justify-between px-4 my-1">
            <p>Villa Type 2</p>
            <p>$120,000</p>
          </div>
          <button className="flex space-x-2 justify-center items-center bg-gradient-to-r from-purple-500 to-[#E605CC] rounded-full py-1">
            <p>Instant Acquisition</p>
            <OfferIcon />
          </button>
        </div>
      </div>
      <div className="">
        <div className="flex flex-col md:px-10 sm:px-10">
          <img src={cryptoCity2} className="mb-2" />
          <div className="flex text-xs items-center justify-between px-4">
            <p className="text-blue-500">Luxandia Crypto City</p>
            <p className="text-gray-500">Price</p>
          </div>
          <div className="flex text-md items-center justify-between px-4 my-1">
            <p>Villa Type 3</p>
            <p>$120,000</p>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-[#E605CC] rounded-full py-1">
            Invest
          </button>
        </div>
      </div>
    </>
  );
};

export default CryptoCityComponent;
