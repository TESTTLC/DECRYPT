import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaPaypal,
  FaWallet,
  FaBell,
  FaUser,
  FaTicketAlt,
  FaFile,
} from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';
import { ImRocket } from 'react-icons/im';
import { BiDevices } from 'react-icons/bi';
import tlcLogo from 'src/assets/images/TLC-logo.png';
import lsoLogo from 'src/assets/images/LSO-logo.png';

import BigButton from '../components/BigButton';
import { routes } from '../utils/routes';
import stakingImage from '../assets/images/staking_1.webp';
import createTokenImage from '../assets/images/create_token_1.webp';
import launchpadImage from '../assets/images/launchpad_1.webp';
import crossChainBridgeImage from '../assets/images/cross_chain_bridge_1.webp';
import exchangeImage from '../assets/images/exchange_1.webp';
import nftMarketplaceImage from '../assets/images/nft_1.webp';
import metaverseImage from '../assets/images/metaverse_1.webp';
import lendingAndBorrowingImage from '../assets/images/lending_and_borrowing_1.webp';
import CreateToken from '../assets/svg/CreateToken';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const metaverseRef = useRef<HTMLAnchorElement>(null);
  const createYourTokenRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-1">
        <div className="col-span-4 mb-4">
          <p className="text-white font-bold font-poppins text-2xl">
            Projects & Roadmap
          </p>
          {/* <Link
              key={routes.launchpad.title}
              to={{ pathname: routes.launchpad.url }}
              type="button"
            >
              <span className="text-white font-bold text-md underline">
                View all upcoming projects &rarr;
              </span>
            </Link> */}
        </div>
        <div className="col-span-3 xs:col-span-4 sm:col-span-4 md:col-span-4 px-2 xs:px-0 sm:px-0 mb-4">
          <div className="grid gap-x-6 gap-y-6 2xl:grid-cols-4 grid-cols-2 xs:grid-cols-1 justify-center items-center">
            <div className="flex h-52 justify-center items-center">
              <BigButton
                imageContainerStyle="h-3/5"
                imageStyle="object-top"
                title="STAKING"
                subtitle="Research Platform for Proof of Stake assets."
                onClick={() => navigate('/staking')}
                imageSource={stakingImage}
                titleStyle={'text-lg'}
                subtitleStyle={'text-xs'}
              />
            </div>
            <div className="flex h-52 justify-center items-center">
              <BigButton
                imageContainerStyle="h-3/5"
                imageStyle="object-top"
                title="LAUNCHPAD"
                subtitle="Raise funds, build a community, deliver technology."
                onClick={() => navigate('/launchpad')}
                imageSource={launchpadImage}
                titleStyle={'text-lg'}
                subtitleStyle={'text-xs'}
              />
            </div>
            <div className="flex h-52 justify-center items-center">
              <BigButton
                imageContainerStyle="h-3/5"
                imageStyle="object-top"
                title="CROSS CHAIN BRIDGE"
                subtitle="DeFi Innovations created for traders and retail users."
                onClick={() => navigate('/crosschainbridge')}
                imageSource={crossChainBridgeImage}
                titleStyle={'text-lg'}
                subtitleStyle={'text-xs'}
              />
            </div>
            <div className="flex h-52 justify-center items-center">
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
                titleStyle={'text-lg'}
                subtitleStyle={'text-xs'}
              />
              {/* <a
              ref={nftMarketplaceRef}
              className="z-0 h-0 w-0 hidden"
              href="https://theluxury.gallery"
              target="_blank"
              rel="noreferrer"
            /> */}
            </div>
            <div className="flex h-52 justify-center items-center">
              <BigButton
                imageContainerStyle="h-3/5"
                imageStyle="object-top"
                title="METAVERSE"
                subtitle="Self-Sovereign identity ledgers on the Metaverse Blockchain."
                onClick={() => {
                  metaverseRef.current?.click();
                }}
                imageSource={metaverseImage}
                titleStyle={'text-lg'}
                subtitleStyle={'text-xs'}
              />
              <a
                ref={metaverseRef}
                className="z-0 h-0 w-0 hidden"
                href="https://luxandia.com"
                target="_blank"
                rel="noreferrer"
              />
            </div>
            <div className="flex h-52 justify-center items-center">
              <BigButton
                imageContainerStyle="h-3/5"
                imageStyle="object-top"
                title="DECENTRALIZED EXCHANGE"
                subtitle="Securely swap between crypto assets with extremely low slippage and minimal fees."
                onClick={() => navigate('/dex')}
                imageSource={exchangeImage}
                titleStyle={'text-lg'}
                subtitleStyle={'text-xs'}
              />
            </div>
            <div className="flex h-52 justify-center items-center">
              <BigButton
                imageContainerStyle="h-3/5"
                imageStyle="object-top"
                title="CREATE YOUR TOKEN"
                subtitle="It’s Time to Build. Mint Your Own Digital Token."
                onClick={() => {
                  createYourTokenRef.current?.click();
                }}
                imageSource={createTokenImage}
                titleStyle={'text-lg'}
                subtitleStyle={'text-xs'}
                svgComponent={<CreateToken />}
              />
              <a
                ref={createYourTokenRef}
                className="z-0 h-0 w-0 hidden"
                href="https://factory.decryption.com"
                target="_blank"
                rel="noreferrer"
              />
            </div>
            <div className="flex h-52 justify-center items-center">
              <BigButton
                imageContainerStyle="h-3/5"
                imageStyle="object-top"
                title="FUTURE PROJECTS"
                subtitle="Become a modern investor and learn more about the ecosystem & benefits of tokenization."
                onClick={() => navigate('/tokenization')}
                imageSource={lendingAndBorrowingImage}
                titleStyle={'text-lg'}
                subtitleStyle={'text-xs'}
              />
            </div>
          </div>
          <p className="text-white font-bold font-poppins text-2xl mt-6">
            Extended Ecosystem
          </p>
          <div className="grid grid-cols-2 items-center w-full gap-x-4 mt-2">
            <div className="flex flex-col xs:justify-between xs:col-span-1 sm:col-span-1 md:col-span-1 justify-center items-center bg-black bg-opacity-70 rounded-md min-h-[18rem] text-center p-2">
              <p className="mt-2 text-xl sm:text-lg xs:text-sm">
                Decryption Blockchain Incubator
              </p>
              <p className="font-semibold mt-2 text-3xl sm:text-xl xs:text-xl xs:leading-[1.25rem] xs:flex-[0.25]">
                1000+ SQM A+ Office Building
              </p>
              <p className="font-semibold mb-6 text-xs bg-gradient-to-r from-gray-700 to-gray-800 py-1 px-2 rounded-lg">
                IT Support | Legal | Financial | Marketing | Media Studio
              </p>
              <button className="bg-gradient-to-tr from-green-500 to-blue-500 px-4 py-1 rounded-xl text-sm xs:text-xs xs:leading-[1rem]">
                Registration Opens Soon
              </button>
            </div>
            <div className="flex flex-col xs:justify-between xs:col-span-1 sm:col-span-1 md:col-span-1 justify-center items-center bg-black bg-opacity-70 rounded-md min-h-[18rem] text-center p-2">
              <p className="mt-2 text-xl sm:text-lg xs:text-sm">
                Decryption Venture Capital
              </p>
              <p className="font-semibold mt-2 text-3xl sm:text-xl xs:text-xl xs:leading-[1.25rem] xs:flex-[0.25]">
                $100,000,000 Funds Available
              </p>
              <p className="font-semibold mb-6 text-xs bg-gradient-to-r from-gray-700 to-gray-800 py-1 px-2 rounded-lg">
                Global exposure to over 20+ Family Offices partners
              </p>
              <button className="bg-gradient-to-tr from-green-500 to-blue-500 px-4 py-1 rounded-xl text-sm xs:text-xs xs:leading-[1rem]">
                Registration Opens Soon
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-1 xs:col-span-4 sm:col-span-4 md:col-span-4 gap-y-6 flex flex-col pl-4 xs:px-0 sm:px-0 md:px-2">
          <div className="w-full grid grid-cols-2 gap-x-4 md:col-span-4">
            <div className="flex flex-col justify-center items-center w-full h-52 bg-black bg-opacity-70 rounded-md p-2">
              <div className="flex items-center justify-center bg-gradient-to-r from-gray-600 via-transparent to-gray-600 rounded-full  min-w-[2.5rem] min-h-[2.5rem] p-1">
                {/* <FaWallet size={20} /> */}
                <img
                  src={tlcLogo}
                  className="w-8 h-8 p-0
                  "
                />
              </div>
              <p className="font-semibold mt-2 text-center">TLC</p>
              <p className="text-xs text-gray-400 text-center">TLChain</p>
              <div className="h-[1px] w-full mt-2 bg-gradient-to-r from-transparent via-white to-transparent " />
              <p className="font-semibold mt-2">$0.16</p>
            </div>
            <div className="flex flex-col justify-center items-center w-full h-52 bg-black bg-opacity-70 rounded-md p-2">
              <div className="flex items-center justify-center  bg-gradient-to-r from-gray-600 via-transparent to-gray-600 rounded-full  min-w-[2.5rem] min-h-[2.5rem] p-1">
                {/* <FaPaypal size={22} /> */}
                <img
                  src={lsoLogo}
                  className="w-8 h-8 p-0
                  "
                />
              </div>
              <p className="font-semibold mt-2 text-center">LSO</p>
              <p className="text-xs text-gray-400 text-center">Lusso</p>
              <div className="h-[1px] w-full mt-2 bg-gradient-to-r from-transparent via-white to-transparent " />
              <p className="font-semibold mt-2">$0.07</p>
            </div>
          </div>
          <div className="w-full bg-black bg-opacity-70 rounded-lg py-4 px-6 lg:px-4 min-h-[13rem]">
            <p className="font-semibold text-md">Upcoming events</p>
            <p className="text-xs text-gray-400">Online/Offline Events</p>
            <div className="flex items-center mt-4">
              <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                <IoRocketSharp size={20} />
              </div>
              <div className="ml-2">
                <p className="font-semibold text-sm">NFT Marketplace Launch</p>
                <p className="text-xs text-gray-400">15 March 2022</p>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                <ImRocket size={20} />
              </div>
              <div className="ml-2">
                <p className="font-semibold text-sm">
                  Decryption Launchpad V2 R
                </p>
                <p className="text-xs text-gray-400">15 March 2022</p>
              </div>
            </div>
          </div>
          <div className="w-full mt-10 xs:mt-0 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 2xl:mt-10">
            <div className="w-full min-h-[18rem] bg-black bg-opacity-70 rounded-lg py-4 px-6 lg:px-4">
              <p className="font-semibold text-md">Upcoming Releases</p>
              {/* <p className="text-xs text-gray-400">Not joined</p> */}
              <div className="flex items-center mt-4">
                <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                  <BiDevices size={20} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-sm">Investor Dashboard</p>
                  <p className="text-xs text-gray-400">
                    An account, unlimited benefits
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                  <FaTicketAlt size={20} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-sm">Decryption DEX V2</p>
                  <p className="text-xs text-gray-400">
                    DLab | SPool | AirForward | Betting
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                  <FaWallet size={20} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-sm">
                    DWallet Browser Extension
                  </p>
                  <p className="text-xs text-gray-400">Mobile Sync Ready</p>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                  <FaUser size={20} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-sm">
                    Decryption VC Syndicate
                  </p>
                  <p className="text-xs text-gray-400">Global Network Club</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-full h-16 bg-customBlue-800"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
