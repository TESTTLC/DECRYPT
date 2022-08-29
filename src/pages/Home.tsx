import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaWallet, FaUser, FaTicketAlt } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';
import { ImRocket } from 'react-icons/im';
import { BiDevices } from 'react-icons/bi';
import tlcLogo from 'src/assets/images/TLC-logo.png';
import lsoLogo from 'src/assets/images/LSO-logo.png';
import AreaChartComponent from 'src/components/AreaChartComponent';
import { useGetAddressesHistoryQuery } from 'src/redux/modules/globals/queries';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Ticker from 'react-ticker';
import LoadingSpinner from 'src/components/LoadingSpinner';
import { prices } from 'src/utils/globals';

import BigButton from '../components/BigButton';
import stakingImage from '../assets/images/staking_1.png';
import createTokenImage from '../assets/images/create_token_1.jpeg';
import launchpadImage from '../assets/images/launchpad_1.png';
import crossChainBridgeImage from '../assets/images/cross_chain_bridge_1.png';
import exchangeImage from '../assets/images/exchange_1.png';
import nftMarketplaceImage from '../assets/images/nft_1.png';
import metaverseImage from '../assets/images/metaverse_1.jpeg';
import lendingAndBorrowingImage from '../assets/images/lending_and_borrowing_1.jpeg';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data: history, isLoading, isSuccess } = useGetAddressesHistoryQuery();

  const metaverseRef = useRef<HTMLAnchorElement>(null);
  const createYourTokenRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);

  let count = 0;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dataHistory: any[] = [];

  history?.transactionsHistory.forEach((tx) => {
    history?.addressesHistory.forEach((addr) => {
      const date1 = new Date(addr.day).toDateString();
      const date2 = new Date(tx.day).toDateString();
      if (date1.toString() === date2.toString()) {
        count = count + 1;
        dataHistory.push({
          name: new Date(addr.day).toLocaleString(),
          txTotal: tx.total,
          addrTotal: addr.total,
        });
      }
    });
  });

  const news = [
    {
      title: 'TLChain Announces Token Bridge for Major Blockchain Networks',
      url: 'https://blog.tlchain.network/tlchain-announces-token-bridge-for-major-blockchain-networks-f4b369a74087',
    },
    {
      title:
        'TLChain Network is now a founding member of the newly launched global blockchain hub Decryption',
      url: 'https://blog.tlchain.network/tlchain-network-is-now-a-founding-member-of-the-newly-launched-global-blockchain-hub-decryption-3ea5e52ed78e',
    },
    {
      title: 'Launch a project on Decryption now!',
      url: 'https://medium.com/tlchain-blog/launch-a-project-on-decryption-now-a434f1dbdd09',
    },
  ];

  return (
    <div className="w-full flex flex-col">
      <div className="flex w-full items-center justify-start">
        {/* <p className="bg-black px-2 py-1 text-white">NEWS</p> */}
        <div className="w-full bg-black bg-opacity-50 py-2 border-2  border-gray-500 border-opacity-25 rounded-md mb-4">
          <Ticker speed={13} mode="chain" offset={'run-in'}>
            {({ index }) => (
              <>
                <div className="flex items-center mx-4">
                  <div className="rounded-full bg-green-400 h-2 w-2 ml-10" />
                  <a
                    href={news[index % news.length].url}
                    target={'_blank'}
                    className="mr-10 ml-2 text-sm whitespace-nowrap"
                  >
                    {news[index % news.length].title}
                  </a>
                </div>

                {/* {index % 2 === 0.5 && (
                  <div className="flex items-center mx-4">
                    <div className="rounded-full bg-green-400 h-2 w-2 ml-10" />
                    <a
                      href={news[1].url}
                      target={'_blank'}
                      className="mr-10 ml-2 text-sm whitespace-nowrap"
                    >
                      {news[1].title}
                    </a>
                  </div>
                )}

                {index % 3 === 1 && (
                  <div className="flex items-center mx-4">
                    <div className="rounded-full bg-green-400 h-2 w-2 ml-10" />
                    <a
                      href={news[2].url}
                      target={'_blank'}
                      className="mr-10 ml-2 text-sm whitespace-nowrap"
                    >
                      {news[2].title}
                    </a>
                  </div>
                )} */}
                {/* {(index = index % news.length)} */}
              </>
            )}
          </Ticker>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-1">
        <div className="col-span-3 xs:col-span-4 sm:col-span-4 md:col-span-4 px-2 xs:px-0 sm:px-0 mb-2">
          {isSuccess && (
            <>
              <p className="text-white font-bold font-poppins text-2xl mb-3">
                Growth
              </p>
              <div className="w-full grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                <div className="w-full mb-2">
                  <AreaChartComponent
                    data={dataHistory}
                    //   dataKey={'total'}
                    showTransactionsArea={false}
                    first={'Total Addresses'}
                    second={'Total Transactions'}
                  />
                </div>
                <div className="w-full mb-2">
                  <AreaChartComponent
                    data={dataHistory}
                    //   dataKey={'total'}
                    showAddressesArea={false}
                    first={'Total Addresses'}
                    second={'Total Transactions'}
                  />
                </div>

                {/* <div className="w-full mt-10 mb-32">
              <ResponsiveContainer width={'100%'} height={100}>
                <AreaChartComponent
                  data={txHistory}
                  dataKey={'total'}
                  name={'Total Transactions'}
                />
              </ResponsiveContainer>
            </div> */}
              </div>
            </>
          )}
          {isLoading && (
            <div className="w-full flex items-center justify-center my-10">
              <LoadingSpinner height={24} width={24} />
            </div>
          )}
          <p className="text-white font-bold font-poppins text-2xl mb-3">
            Ecosystem
          </p>
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

          {/* <div id="coinmarket-widget" className="mt-10" /> */}
          <div className="bg-black bg-opacity-50 mt-10">
            {/* @ts-ignore */}
            <coingecko-coin-price-marquee-widget
              coin-ids="bitcoin,ethereum,elrond-erd-2,avalanche-2,fantom,matic-wormhole,binance-coin-wormhole"
              currency="usd"
              background-color="transparent"
              locale="en"
              font-color="#999999"
            />
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
                4000+ SQM A+ Office Building
              </p>
              <p className="font-semibold mb-6 text-xs bg-gradient-to-r from-gray-700 to-gray-800 py-1 px-2 rounded-lg">
                IT Support | Legal | Financial | Marketing | Media Studio
              </p>
              <a
                className="bg-gradient-to-tr from-green-500 to-blue-500 px-4 py-1 rounded-xl text-sm xs:text-xs xs:leading-[1rem]"
                href="https://hub.decryption.com/"
                target="_blank"
              >
                Registration Opens Soon
              </a>
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
              <a
                className="bg-gradient-to-tr from-green-500 to-blue-500 px-4 py-1 rounded-xl text-sm xs:text-xs xs:leading-[1rem]"
                href="https://hub.decryption.com/"
                target="_blank"
              >
                Registration Opens Soon
              </a>
            </div>
          </div>
        </div>
        <div className="col-span-1 xs:col-span-4 sm:col-span-4 md:col-span-4 gap-y-6 flex flex-col pl-4 xs:px-0 sm:px-0 md:px-2">
          <div className="w-full grid grid-cols-2 gap-x-4 md:col-span-4">
            <div className="flex flex-col justify-center items-center w-full h-52 bg-black bg-opacity-70 rounded-md p-2">
              <div className="flex items-center justify-center bg-gradient-to-r from-gray-600 via-transparent to-gray-600 rounded-full  min-w-[2.5rem] min-h-[2.5rem] p-1">
                <img
                  src={tlcLogo}
                  className="w-8 h-8 p-0
                  "
                />
              </div>
              <p className="font-semibold mt-2 text-center">TLC</p>
              <p className="text-xs text-gray-400 text-center">TLChain</p>
              <div className="h-[1px] w-full mt-2 bg-gradient-to-r from-transparent via-white to-transparent " />
              <p className="font-semibold mt-2">${prices.TLC}</p>
            </div>
            <div className="flex flex-col justify-center items-center w-full h-52 bg-black bg-opacity-70 rounded-md p-2">
              <div className="flex items-center justify-center  bg-gradient-to-r from-gray-600 via-transparent to-gray-600 rounded-full  min-w-[2.5rem] min-h-[2.5rem] p-1">
                <img
                  src={lsoLogo}
                  className="w-8 h-8 p-0
                  "
                />
              </div>
              <p className="font-semibold mt-2 text-center">LSO</p>
              <p className="text-xs text-gray-400 text-center">Lusso</p>
              <div className="h-[1px] w-full mt-2 bg-gradient-to-r from-transparent via-white to-transparent " />
              <p className="font-semibold mt-2">$0.10</p>
            </div>
          </div>
          <div className="w-full bg-black bg-opacity-70 rounded-lg py-4 px-6 lg:px-4 min-h-[13rem]">
            <p className="font-semibold text-md">Upcoming news</p>
            <p className="text-xs text-gray-400">Online/Offline news</p>
            <div className="flex items-center mt-4">
              <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                <IoRocketSharp size={20} />
              </div>
              <div className="ml-2">
                <p className="font-semibold text-sm">
                  $TLC Listing | DEX Release
                </p>
                <p className="text-xs text-gray-400">Aug 2022</p>
              </div>
            </div>
            <div className="flex items-center mt-4">
              <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                <ImRocket size={20} />
              </div>
              <div className="ml-2">
                <p className="font-semibold text-sm">
                  $TLC | $LSO | Bridges release
                </p>
                <p className="text-xs text-gray-400">Aug 2022</p>
              </div>
            </div>
          </div>
          <div className="w-full mt-10 xs:mt-0 sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0">
            <div className="w-full min-h-[18rem] bg-black bg-opacity-70 rounded-lg py-4 px-6 lg:px-4">
              <p className="font-semibold text-md">Upcoming Releases</p>
              <div className="flex items-center mt-4">
                <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                  <BiDevices size={20} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-sm">
                    TLChain Wallet Browser Extension
                  </p>
                  <p className="text-xs text-gray-400">Mobile Sync Ready</p>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                  <FaTicketAlt size={20} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-sm">Investor Dashboard</p>
                  <p className="text-xs text-gray-400">
                    An Account , unlimited benefits
                  </p>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                  <FaWallet size={20} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-sm">
                    Decryption VC Syndicate
                  </p>
                  <p className="text-xs text-gray-400">Global Network Club</p>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                  <FaUser size={20} />
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-sm">Asset Tokenization</p>
                  <p className="text-xs text-gray-400">
                    Digital tokens to fractionalize ownership of assets
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
