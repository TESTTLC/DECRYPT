import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import BigButton from '../components/BigButton';
import { routes } from '../utils/routes';
// import launchpadImage from '../assets/images/Launchpad.jpg';
// import stakingImage from '../assets/images/Staking.jpg';
// import createTokenImage from '../assets/images/Create-Your-Own-Token.jpg';
// import crossChainBridgeImage from '../assets/images/Cross-Chain-Bridge.jpg';
// import exchangeImage from '../assets/images/Decentralized-Exchange.jpg';
import stakingImage from '../assets/images/staking_1.png';
import createTokenImage from '../assets/images/create_token_1.jpg';
import crossChainBridgeImage from '../assets/images/cross_chain_bridge_1.png';
import exchangeImage from '../assets/images/exchange_1.png';
import nftMarketplaceImage from '../assets/images/nft_1.png';
import metaverseImage from '../assets/images/metaverse_1.jpg';
import lendingAndBorrowingImage from '../assets/images/lending_and_borrowing_1.jpg';
import launchpadImage from '../assets/images/launchpad_1.png';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const nftMarketplaceRef = useRef<HTMLAnchorElement>(null);
  const metaverseRef = useRef<HTMLAnchorElement>(null);
  const createYourTokenRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full px-2">
        <div className="col-span-4 mb-2">
          <p className="text-white font-bold font-poppins text-2xl">
            Projects & Roadmap
          </p>
          <Link
            key={routes.launchpad.title}
            to={{ pathname: routes.launchpad.url }}
            type="button"
          >
            <span className="text-white font-bold text-md underline">
              View all upcoming projects &rarr;
            </span>
          </Link>
        </div>
        <div className="grid gap-8 2xl:grid-cols-4 grid-cols-2 xs:grid-cols-1 mt-8 justify-center items-center">
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="STAKING"
              subtitle="Research Platform for Proof of Stake assets."
              onClick={() => navigate('/staking')}
              imageSource={stakingImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="LAUNCHPAD"
              subtitle="Raise funds, build a community, deliver technology."
              onClick={() => navigate('/launchpad')}
              imageSource={launchpadImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="CROSS CHAIN BRIDGE"
              subtitle="DeFi Innovations created for traders and retail users."
              onClick={() => navigate('/crosschainbridge')}
              imageSource={crossChainBridgeImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="NFT MARKETPLACE"
              subtitle="Create, Buy, Sell NFTs."
              onClick={() => navigate('/nftmarketplace')}
              // onClick={() => {
              //   nftMarketplaceRef.current?.click();
              // }}
              imageSource={nftMarketplaceImage}
            />
            {/* <a
              ref={nftMarketplaceRef}
              className="z-0 h-0 w-0 hidden"
              href="https://theluxury.gallery"
              target="_blank"
              rel="noreferrer"
            /> */}
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="METAVERSE"
              subtitle="Self-Sovereign identity ledgers on the Metaverse Blockchain."
              // onClick={() => navigate("/metaverse")}
              onClick={() => {
                metaverseRef.current?.click();
              }}
              imageSource={metaverseImage}
            />
            <a
              ref={metaverseRef}
              className="z-0 h-0 w-0 hidden"
              href="https://luxandia.com"
              target="_blank"
              rel="noreferrer"
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="DECENTRALIZED EXCHANGE"
              subtitle="Securely swap between crypto assets with extremely low slippage and minimal fees."
              onClick={() => navigate('/dex')}
              imageSource={exchangeImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="CREATE YOUR TOKEN"
              subtitle="It’s Time to Build. Mint Your Own Digital Token."
              onClick={() => {
                createYourTokenRef.current?.click();
              }}
              imageSource={createTokenImage}
            />
            <a
              ref={createYourTokenRef}
              className="z-0 h-0 w-0 hidden"
              href="https://factory.decryption.com"
              target="_blank"
              rel="noreferrer"
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="LENDING & BORROWING"
              subtitle="Use your liquidity to increase your profit."
              // onClick={() => navigate("/lendingandborrowing")}
              onClick={() => {
                return;
              }}
              imageSource={lendingAndBorrowingImage}
              showTopText
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
