import React from 'react';
import BigButton from 'src/components/BigButton';
// import domainImage from '../assets/images/Launchpad.jpg';
// import stakingImage from '../assets/images/Staking.jpg';
// import createTokenImage from '../assets/images/Create-Your-Own-Token.jpg';
// import crossChainBridgeImage from '../assets/images/Cross-Chain-Bridge.jpg';
// import tradingImage from '../assets/images/Decentralized-Exchange.jpg';
import collectiblesImage from 'src/assets/images/collectibles.webp';
import utilityImage from 'src/assets/images/utility.webp';
import musicImage from 'src/assets/images/music.webp';
import tradingImage from 'src/assets/images/trade.webp';
import photographyImage from 'src/assets/images/photography.webp';
import sportsImage from 'src/assets/images/sports.webp';
import worldsImage from 'src/assets/images/worlds.webp';
import domainImage from 'src/assets/images/domain.webp';
import nftMarketplaceImage from 'src/assets/images/nft_1.webp';

const NFTMarketplace: React.FC = () => {
  // const nftMarketplaceRef = useRef<HTMLAnchorElement>(null);
  // const metaverseRef = useRef<HTMLAnchorElement>(null);
  // const createYourTokenRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="w-full flex flex-col">
      {/* Header */}
      {/* <p className="hover:underline cursor-pointer text-blue-500">
        Back to Decryption
      </p> */}
      <div className="w-full flex items-center justify-between mt-2 mb-4">
        <p className="flex-[0.5] text-2xl font-semibold">
          Sell extraordinary NFTs
        </p>
        <div className="flex space-x-2">
          <div className="flex rounded-full h-10 px-4 bg-gray-800 text-sm items-center mr-8">
            <p>Search items, collections and accounts</p>
          </div>
          <div className="rounded-full w-10 h-10 bg-gray-800"></div>
          <div className="rounded-full w-10 h-10 bg-gray-800"></div>
        </div>
        <div className="rounded-full w-14 h-14 bg-gray-800"></div>
      </div>
      {/* End Header */}
      <div className="grid grid-cols-6">
        <div className="col-span-5">
          {/* SubHeader */}
          <p>1,548,931 Results</p>
          <div className="flex space-x-2">
            <div className="flex rounded-full w-14 h-6 px-2 text-xs items-center justify-between bg-gray-800">
              ETH
              <div className="flex rounded-full w-3 h-3 items-center justify-center bg-gray-500">
                x
              </div>
            </div>
            <div className="flex rounded-full w-14 h-6 px-2 text-xs items-center justify-between bg-gray-800">
              BNB
              <div className="flex rounded-full w-3 h-3 items-center justify-center bg-gray-500">
                x
              </div>
            </div>
            <div className="flex rounded-full w-14 h-6 px-2 text-xs items-center justify-between bg-gray-800">
              TLC
              <div className="flex rounded-full w-3 h-3 items-center justify-center bg-gray-500">
                x
              </div>
            </div>
            <div className="flex rounded-full w-14 h-6 px-2 text-xs items-center justify-between bg-gray-800">
              FTM
              <div className="flex rounded-full w-3 h-3 items-center justify-center bg-gray-500">
                x
              </div>
            </div>
            <div className="flex rounded-full w-14 h-6 px-2 text-xs items-center justify-between bg-gray-800">
              SOL
              <div className="flex rounded-full w-3 h-3 items-center justify-center bg-gray-500">
                x
              </div>
            </div>
            <p className="text-sm text-blue-500 font-medium">Clear all</p>
          </div>
          {/* SubHeader */}

          {/* Content */}
          <div className="grid grid-cols-4 w-full mt-8">
            <div className="w-72 h-[28rem] bg-gray-800 rounded-xl ">
              <img
                src={nftMarketplaceImage}
                className="w-full h-72 object-cover rounded-xl"
              />
              <div className="p-4 flex flex-col space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <p className="text-blue-500">Crypto Hero Marce</p>
                  <p className="text-gray-500">Price</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Pit Stop</p>
                  <p>$66565</p>
                </div>
                <div className="w-full h-[0.10rem] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                <div className="flex justify-between items-center">
                  <p>Buy Now</p>
                  <p className="text-sm text-gray-500">2 days left</p>
                </div>
              </div>
            </div>
            <div className="w-72 h-[28rem] bg-gray-800 rounded-xl ">
              <img
                src={nftMarketplaceImage}
                className="w-full h-72 object-cover rounded-xl"
              />
              <div className="p-4 flex flex-col space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <p className="text-blue-500">Crypto Hero Marce</p>
                  <p className="text-gray-500">Price</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Pit Stop</p>
                  <p>$66565</p>
                </div>
                <div className="w-full h-[0.10rem] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                <div className="flex justify-between items-center">
                  <p>Buy Now</p>
                  <p className="text-sm text-gray-500">2 days left</p>
                </div>
              </div>
            </div>
            <div className="w-72 h-[28rem] bg-gray-800 rounded-xl ">
              <img
                src={nftMarketplaceImage}
                className="w-full h-72 object-cover rounded-xl"
              />
              <div className="p-4 flex flex-col space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <p className="text-blue-500">Crypto Hero Marce</p>
                  <p className="text-gray-500">Price</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Pit Stop</p>
                  <p>$66565</p>
                </div>
                <div className="w-full h-[0.10rem] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                <div className="flex justify-between items-center">
                  <p>Buy Now</p>
                  <p className="text-sm text-gray-500">2 days left</p>
                </div>
              </div>
            </div>
            <div className="w-72 h-[28rem] bg-gray-800 rounded-xl ">
              <img
                src={nftMarketplaceImage}
                className="w-full h-72 object-cover rounded-xl"
              />
              <div className="p-4 flex flex-col space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <p className="text-blue-500">Crypto Hero Marce</p>
                  <p className="text-gray-500">Price</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Pit Stop</p>
                  <p>$66565</p>
                </div>
                <div className="w-full h-[0.10rem] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
                <div className="flex justify-between items-center">
                  <p>Buy Now</p>
                  <p className="text-sm text-gray-500">2 days left</p>
                </div>
              </div>
            </div>
          </div>
          {/* Content */}
        </div>
        {/* Right Element */}
        <div className="flex flex-col col-span-1 px-4 space-y-6">
          {/* First */}
          <div className="w-full rounded-xl bg-gray-600 p-4">
            <p className="uppercase text-blue-500 text-sm">Wallet Holders</p>
            <div className="flex items-center justify-center">
              <p>icon</p>
              <p className="uppercase text-lg">$10,512,343</p>
            </div>
          </div>
          {/* End First */}

          {/* Second */}
          <div className="w-full rounded-xl bg-gray-600 p-4 space-y-8">
            <div className="flex items-center">
              <p className="">Price pulse</p>
              <p>icon</p>
            </div>
            <div className="flex items-center space-x-2">
              <p className="px-3 py-1 rounded-md bg-blue-300 text-xs">$TLC</p>
              <p className="px-3 py-1 rounded-md bg-blue-500 text-xs">$LSO</p>
            </div>
          </div>
          {/* End Second */}

          {/* Third */}
          <div className="w-full rounded-xl bg-gray-600 p-4">
            <p className="uppercase text-blue-500 text-sm">Top Creator NFT</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex space-x-1">
                <div className="bg-gray-500 rounded-full h-10 w-10" />
                <div>
                  <p className="text-sm">Meka Vers</p>
                  <p className="text-xs">@meka</p>
                </div>
              </div>
              <div>icon</div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex space-x-1">
                <div className="bg-gray-500 rounded-full h-10 w-10" />
                <div>
                  <p className="text-sm">John Doe</p>
                  <p className="text-xs">@johndoe</p>
                </div>
              </div>
              <div>icon</div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex space-x-1">
                <div className="bg-gray-500 rounded-full h-10 w-10" />
                <div>
                  <p className="text-sm">Elon Doe</p>
                  <p className="text-xs">@elondoe</p>
                </div>
              </div>
              <div>icon</div>
            </div>
          </div>
          {/* End Third */}

          {/* Forth */}
          <div className="w-full rounded-xl bg-gray-600 p-4">
            <p className="uppercase text-blue-500 text-sm">Recent NFTs Sold</p>
            <div className="flex items-center justify-between mt-2">
              <div className="flex space-x-1">
                <div className="bg-gray-500 rounded-full h-10 w-10" />
                <div>
                  <p className="text-sm">Juliet: Revenant #62</p>
                  <p className="text-xs text-gray-400">
                    Has been sold with 2 ETH.
                  </p>
                  <p className="text-xs text-gray-400 mt-4">
                    4 March 2022 at 07:05 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* End Forth */}
        </div>
        {/* End Right Element */}
      </div>
    </div>
  );
};

export default NFTMarketplace;
