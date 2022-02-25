import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BigButton from 'src/components/BigButton';
import { routes } from 'src/utils/routes';
// import launchpadImage from '../assets/images/Launchpad.jpg';
// import stakingImage from '../assets/images/Staking.jpg';
// import createTokenImage from '../assets/images/Create-Your-Own-Token.jpg';
// import crossChainBridgeImage from '../assets/images/Cross-Chain-Bridge.jpg';
// import exchangeImage from '../assets/images/Decentralized-Exchange.jpg';
import stakingImage from 'src/assets/images/staking_1.png';
import createTokenImage from 'src/assets/images/create_token_1.jpg';
import crossChainBridgeImage from 'src/assets/images/cross_chain_bridge_1.png';
import exchangeImage from 'src/assets/images/exchange_1.png';
import nftMarketplaceImage from 'src/assets/images/nft_1.png';
import metaverseImage from 'src/assets/images/metaverse_1.jpg';
import lendingAndBorrowingImage from 'src/assets/images/lending_and_borrowing_1.jpg';
import launchpadImage from 'src/assets/images/launchpad_1.png';

const NFTMarketplace: React.FC = () => {
  const navigate = useNavigate();

  const nftMarketplaceRef = useRef<HTMLAnchorElement>(null);
  const metaverseRef = useRef<HTMLAnchorElement>(null);
  const createYourTokenRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full px-2">
        <div className="col-span-4 mb-2">
          <p className="text-white font-bold font-poppins text-2xl">
            NFT Marketplace
          </p>
          <div className="w-full flex space-x-4 xs:space-x-2 sm:space-x-2 mt-4">
            <button className="flex w-40 h-10 xs:mt-3 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center">
              Explore
            </button>
            <button className="flex w-40 h-10 xs:mt-3 text-white text-md font-poppins items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg px-5 text-center">
              Create
            </button>
          </div>
        </div>
        <div className="grid gap-8 2xl:grid-cols-4 grid-cols-2 xs:grid-cols-1 mt-4 justify-center items-center">
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="Collectibles"
              // subtitle="Research Platform for Proof of Stake assets."
              imageSource={stakingImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="Domain Names"
              // subtitle="Raise funds, build a community, deliver technology."
              imageSource={launchpadImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="Music"
              // subtitle="DeFi Innovations created for traders and retail users."
              imageSource={crossChainBridgeImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="Photography"
              // subtitle="Create, Buy, Sell NFTs."

              imageSource={nftMarketplaceImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="Sports"
              // subtitle="Self-Sovereign identity ledgers on the Metaverse Blockchain."

              imageSource={metaverseImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="Trading Cards"
              // subtitle="Securely swap between crypto assets with extremely low slippage and minimal fees."
              imageSource={exchangeImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="Utility"
              // subtitle="It’s Time to Build. Mint Your Own Digital Token."
              imageSource={createTokenImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="Virtual Words"
              // subtitle="Use your liquidity to increase your profit."
              imageSource={lendingAndBorrowingImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTMarketplace;