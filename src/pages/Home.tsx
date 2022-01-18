import React, { useRef } from "react";
import BigButton from "../components/BigButton";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../utils/routes";
import stakingImage from "../assets/images/Staking.jpg";
import launchpadImage from "../assets/images/Launchpad.jpg";
import createTokenImage from "../assets/images/Create_Your_Own_Token.jpg";
import crossChainBridgeImage from "../assets/images/Cross_Chain_Bridge.jpg";
import exchangeImage from "../assets/images/Decentralized_Exchange.jpg";
import nftMarketplaceImage from "../assets/images/NFT_Marketplace.jpg";
import lendingAndBorrowingImage from "../assets/images/Lending_And_Borrowing.jpg";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const nftMarketplaceRef = useRef<HTMLAnchorElement>(null);
  const metaverseRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="w-full flex flex-col justify-center">
      <div className="w-full px-2">
        <div className="col-span-4 mb-2">
          <p className="text-white font-bold text-2xl">Projects & Roadmap</p>
          <Link
            key={routes.launchpad.title}
            to={{ pathname: routes.launchpad.url }}
            type="button"
            // className="flex h-8 mx-2 text-white items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 text-center"
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
              onClick={() => navigate("/staking")}
              imageSource={stakingImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="LAUNCHPAD"
              subtitle="Raise funds, build a community, deliver technology."
              onClick={() => navigate("/launchpad")}
              imageSource={launchpadImage}
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="CROSS CHAIN BRIDGE"
              subtitle="DeFi Innovations created for traders and retail users."
              // onClick={() => navigate("/crosschainbridge")}
              onClick={() => {}}
              imageSource={crossChainBridgeImage}
              showTopText
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="DECENTRALIZED EXCHANGE"
              subtitle="Securely swap between crypto assets with extremely low slippage and minimal fees."
              // onClick={() => navigate("/decentralizedexchange")}
              onClick={() => {}}
              imageSource={exchangeImage}
              showTopText
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="CREATE YOUR TOKEN"
              subtitle="It’s Time to Build. Mint Your Own Digital Token."
              // onClick={() => navigate("/createtoken")}
              onClick={() => {}}
              imageSource={createTokenImage}
              showTopText
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              imageContainerStyle="h-3/5"
              imageStyle="object-top"
              title="NFT MARKETPLACE"
              subtitle="Create, Buy, Sell NFTs."
              // onClick={() => navigate("/nftmarketplace")}
              onClick={() => {
                nftMarketplaceRef.current?.click();
              }}
              imageSource={nftMarketplaceImage}
              showTopText
            />
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a
              ref={nftMarketplaceRef}
              className="z-0 h-0 w-0 hidden"
              href="https://theluxury.gallery"
              target="_blank"
              rel="noreferrer"
            />
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
              imageSource={nftMarketplaceImage}
              showTopText
            />
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
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
              title="LENDING & BORROWING"
              subtitle="Use your liquidity to increase your profit."
              // onClick={() => navigate("/lendingandborrowing")}
              onClick={() => {}}
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
