import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaWallet, FaUser, FaTicketAlt } from 'react-icons/fa';
import { IoRocketSharp } from 'react-icons/io5';
import { ImRocket } from 'react-icons/im';
import { BiDevices } from 'react-icons/bi';
import tlcLogo from 'src/assets/images/TLC-logo.png';
import tlxLogo from 'src/assets/images/TLX-logo.png';
import lsoLogo from 'src/assets/images/LSO-logo.png';
import csyLogo from 'src/assets/images/CSY-logo.png';
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
import axios from 'axios';
import LoadingSpinner from 'src/components/LoadingSpinner';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import {
  prices,
  USDTContractAddress,
  MasterchefContractAddress,
  usdt_tlc_pool_eth,
  usdc_tlc_pool_eth,
  usdt_eth,
  usdc_eth,
  wtlc_eth,
} from 'src/utils/globals';
import ERC20 from 'src/contracts/ERC20.json';
import { formatEther, parseEther, formatUnits } from 'ethers/lib/utils';
import { Contract, ethers } from 'ethers';
import { useSelector } from 'react-redux';
import { StoreState } from 'src/utils/storeTypes';
import useRefresh from 'src/redux/useRefresh';

import BigButton from '../components/BigButton';
import stakingImage from '../assets/images/staking_1.png';
import createTokenImage from '../assets/images/create_token_1.jpeg';
import launchpadImage from '../assets/images/launchpad_1.png';
import crossChainBridgeImage from '../assets/images/cross_chain_bridge_1.png';
import exchangeImage from '../assets/images/exchange_1.png';
import nftMarketplaceImage from '../assets/images/nft_1.png';
import metaverseImage from '../assets/images/metaverse_1.jpeg';
import lendingAndBorrowingImage from '../assets/images/lending_and_borrowing_1.jpeg';

import Farms from './DecentralizedExchange/components/Farms';
// import myvideo from '../assets/video/video.mp4';
interface CryptoProps {
  title: string;
  url: string;
}
const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data: history, isLoading, isSuccess } = useGetAddressesHistoryQuery();

  const metaverseRef = useRef<HTMLAnchorElement>(null);
  const createYourTokenRef = useRef<HTMLAnchorElement>(null);

  const [cryptoNews, setCryptoNews] = useState([]);

  // apr logic
  const [usdtTlcApr, setUsdtTlcApr] = useState('-');
  const [usdcTlcApr, setUsdcTlcApr] = useState('-');
  const { fastRefresh, slowRefresh } = useRefresh();

  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );
  const [currentChainId, setCurrentChainId] = useState(
    //@ts-ignore
    window.ethereum?.networkVersion
      ? //@ts-ignore
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10))
      : undefined,
  );

  useEffect(() => {
    if (window.ethereum) {
      //@ts-ignore
      window.ethereum.on('chainChanged', (chainId: string) => {
        setCurrentChainId(chainId);
        window.location.reload();
      });
      setCurrentChainId(
        //@ts-ignore
        ethers.utils.hexlify(parseInt(window.ethereum.networkVersion, 10)),
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.ethereum]);

  useEffect(() => {
    async function getApr() {
      /**
       * APY calculation
       * block count per year: 3600s * 24h * 365d / 12s = 2628000
       * tlc per block: 360000000000000000 => 0.36 tlc
       * allocation point: 200, 200
       **/
      try {
        const url =
          'https://mainnet.infura.io/v3/7f7f3d56bbbb45389554ccbaf12df8e3';
        const customHttpProvider = new ethers.providers.JsonRpcProvider(url);
        const usdt_cont = new Contract(usdt_eth, ERC20.abi, customHttpProvider);
        const usdc_cont = new Contract(usdc_eth, ERC20.abi, customHttpProvider);
        const tlc_cont = new Contract(wtlc_eth, ERC20.abi, customHttpProvider);
        ///////////////// current USDT-TLC lp locked amount in farming pools start//////////////////////////////////////
        // usdt-tlc lp locked price
        const tlc_usdt_cont = new Contract(
          usdt_tlc_pool_eth,
          ERC20.abi,
          customHttpProvider,
        );
        const tlc_usdt_total_supply = await tlc_usdt_cont.totalSupply();
        // console.log(
        //   'tlc_usdt_total_supply',
        //   formatEther(tlc_usdt_total_supply.toString()),
        // );
        const locked_tlc_usdt = await tlc_usdt_cont.balanceOf(
          MasterchefContractAddress,
        );
        // console.log('locked_tlc_usdt', formatEther(locked_tlc_usdt.toString()));
        // usdt-tlc lp usdt
        const usdt_amount = await usdt_cont.balanceOf(usdt_tlc_pool_eth);
        const usdt_amount_fl = parseFloat(
          formatUnits(
            usdt_amount.toLocaleString('fullwide', {
              useGrouping: false,
            }),
            6,
          ),
        );
        // console.log('usdt tlc lp usdt amount', usdt_amount_fl);
        // locked usdt-tlc lp price
        const locked_usdt_tlc_lp_price =
          (2 * usdt_amount_fl * locked_tlc_usdt) / tlc_usdt_total_supply;
        // console.log('usdt tlc price', locked_usdt_tlc_lp_price);
        // CURRENT TLC PRICE
        const tlc_amount = await tlc_cont.balanceOf(usdt_tlc_pool_eth);
        const tlc_amount_fl = parseFloat(
          formatEther(
            tlc_amount.toLocaleString('fullwide', {
              useGrouping: false,
            }),
          ),
        );
        // console.log('tlc amount at tlc-usdt lp', tlc_amount_fl);
        const current_tlc_price = usdt_amount_fl / tlc_amount_fl;
        // console.log('current tlc price', current_tlc_price);
        // usdt-tlc pool apr =>  tlc_reward * block_per_year / total_alloc * pool_alloc * tlc_Price / pool_price * 100%
        let usdt_tlc_apr = 500;
        if (locked_usdt_tlc_lp_price < 10) {
          usdt_tlc_apr =
            ((((0.36 * 2628000) / 400) * 200 * current_tlc_price) / 10) * 100;
        } else {
          usdt_tlc_apr =
            ((((0.36 * 2628000) / 400) * 200 * current_tlc_price) /
              locked_usdt_tlc_lp_price) *
            100;
        }
        // console.log('usdt tlc apr', usdt_tlc_apr);
        ///////////////// current USDT-TLC lp locked amount in farming pools end//////////////////////////////////////

        ///////////////// current USDC-TLC lp locked amount in farming pools start//////////////////////////////////////
        // usdc-tlc lp locked price
        const tlc_usdc_cont = new Contract(
          usdc_tlc_pool_eth,
          ERC20.abi,
          customHttpProvider,
        );
        const tlc_usdc_total_supply = await tlc_usdc_cont.totalSupply();
        const locked_tlc_usdc = await tlc_usdc_cont.balanceOf(
          MasterchefContractAddress,
        );
        // usdc-tlc lp usdc
        const usdc_amount = await usdc_cont.balanceOf(usdc_tlc_pool_eth);
        const usdc_amount_fl = parseFloat(
          formatUnits(
            usdc_amount.toLocaleString('fullwide', {
              useGrouping: false,
            }),
            6,
          ),
        );
        // locked usdc-tlc lp price
        const locked_usdc_tlc_lp_price =
          (2 * usdc_amount_fl * locked_tlc_usdc) / tlc_usdc_total_supply;

        // usdc-tlc pool apr =>  tlc_reward * block_per_year / total_alloc * pool_alloc * tlc_Price / pool_price * 100%
        let usdc_tlc_apr = 500;
        if (locked_usdc_tlc_lp_price < 10) {
          usdc_tlc_apr =
            ((((0.36 * 2628000) / 400) * 200 * current_tlc_price) / 10) * 100;
        } else {
          usdc_tlc_apr =
            ((((0.36 * 2628000) / 400) * 200 * current_tlc_price) /
              locked_usdc_tlc_lp_price) *
            100;
        }
        setUsdcTlcApr(usdc_tlc_apr.toFixed(2).toString() + '%');
        setUsdtTlcApr(usdt_tlc_apr.toFixed(2).toString() + '%');
        ///////////////// current USDC-TLC lp locked amount in farming pools end//////////////////////////////////////
      } catch (err) {
        console.log('calc apr error', err);
      }
    }
    getApr();
  }, [walletAddress, slowRefresh]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js';
    script.async = true;

    document.body.appendChild(script);
  }, []);
  const getNews = useCallback(async () => {
    const newsurl =
      'https://safechain-api.netlify.app/.netlify/functions/api/news/';
    try {
      axios({
        method: 'GET',
        url: newsurl,
      }).then((res) => {
        const data = res.data.results;
        setCryptoNews(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    getNews();
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
      <div className="flex flex-col w-full items-center justify-start">
        {/* <p className="bg-black px-2 py-1 text-white">NEWS</p> */}
        <div className="w-full bg-black bg-opacity-70 py-2 border-2  border-gray-500 border-opacity-25 rounded-md mb-1">
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
        <div className="w-full bg-black bg-opacity-70 py-2 border-2  border-gray-500 border-opacity-25 rounded-md mb-4">
          {cryptoNews.length > 0 ? (
            <Ticker speed={10} mode="chain" offset={'run-in'}>
              {({ index }) => (
                <>
                  <div className="flex items-center mx-4">
                    <div className="rounded-full bg-green-400 h-2 w-2 ml-10" />
                    <a
                      href={cryptoNews[index % cryptoNews.length]['url']}
                      target={'_blank'}
                      className="mr-10 ml-2 text-sm whitespace-nowrap"
                    >
                      {cryptoNews[index % cryptoNews.length]['title']}
                    </a>
                  </div>
                </>
              )}
            </Ticker>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="w-full grid grid-cols-4 xs:grid-cols-1 sm:grid-cols-1">
        <div className="col-span-3 xs:col-span-4 sm:col-span-4 md:col-span-4 px-2 xs:px-0 sm:px-0 mb-2">
          {/* {isSuccess && (
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
              </div>
            </>
          )}
          {isLoading && (
            <div className="w-full flex items-center justify-center my-10">
              <LoadingSpinner height={24} width={24} />
            </div>
          )} */}
          <p className="text-white font-bold font-poppins text-2xl mb-3">
            Ecosystem
          </p>
          <div className="grid gap-x-6 gap-y-6 2xl:grid-cols-4 grid-cols-2 xs:grid-cols-1 justify-center items-center">
            <div className="flex h-52 justify-center items-center">
              <BigButton
                imageContainerStyle="h-3/5"
                imageStyle="object-top"
                // title="STAKING"
                title="X Boost"
                // subtitle="Research Platform for Proof of Stake assets."
                subtitle="By embracing innovation, you can grow your assets"
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
                // title="LAUNCHPAD"
                title="LaunchX"
                // subtitle="Raise funds, build a community, deliver technology."
                subtitle="Empower blockchain projects to raise liquidity, distribute tokens and assist the launching"
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
                // title="CROSS CHAIN BRIDGE"
                title="X Bridges"
                // subtitle="DeFi Innovations created for traders and retail users."
                subtitle="Unlock the potential of united blockchains. Join an interoperable Web3 with TLChain"
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
                // title="NFT MARKETPLACE"
                title="X NFT"
                // subtitle="Create, Buy, Sell NFTs."
                subtitle="It is our goal to bridge the gap between physical & digital products of high-value brands"
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
                // title="METAVERSE"
                title="X Station"
                // subtitle="Move beyond a single-universe experience with us!"
                subtitle="Move beyond a single-universe experience with us!"
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
                // title="DECENTRALIZED EXCHANGE"
                title="IChangeX"
                // subtitle="Securely swap between crypto assets with extremely low slippage and minimal fees."
                subtitle="Discover IChangeX, the leading DEX on TLChain plus innovation!"
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
                // title="CREATE YOUR TOKEN"
                title="X Factory"
                // subtitle="It’s Time to Build. Mint Your Own Digital Token."
                subtitle="Easy to build fungible TL20 tokens, define their functionality, and control their lifecycle."
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
                // title="FUTURE PROJECTS"
                title="VIP Access"
                // subtitle="Become a modern investor and learn more about the ecosystem & benefits of tokenization."
                subtitle="Access is granted by users connecting their crypto wallets and verifying their ownership of designated membership NFT"
                // onClick={() => navigate('/tokenization')}
                // onClick={() =>
                //   window.open('https://www.tlchain.group/directory', '_blank')
                // }
                imageSource={lendingAndBorrowingImage}
                titleStyle={'text-lg'}
                subtitleStyle={'text-xs'}
              />
            </div>
          </div>

          {/* <div id="coinmarket-widget" className="mt-10" /> */}
          <div className="bg-black bg-opacity-70 mt-10">
            {/* @ts-ignore */}
            <coingecko-coin-price-marquee-widget
              coin-ids="bitcoin,ethereum,elrond-erd-2,avalanche-2,fantom,matic-wormhole,binance-coin-wormhole"
              currency="usd"
              background-color="transparent"
              locale="en"
              font-color="#999999"
            />
          </div>
          <div className="w-full mt-10">
            <Farms
              currentChainId={currentChainId ?? ''}
              usdtTlcApr={usdtTlcApr}
              usdcTlcApr={usdcTlcApr}
            />
          </div>

          {/* <p className="text-white font-bold font-poppins text-2xl mt-6">
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
          </div> */}
        </div>
        <div className="col-span-1 xs:col-span-4 sm:col-span-4 md:col-span-4 gap-y-6 flex flex-col pl-4 xs:px-0 sm:px-0 md:px-2">
          <Video
            autoPlay
            loop
            muted
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            poster="http://sourceposter.jpg"
            onCanPlayThrough={() => {
              // Do stuff
            }}
          >
            <source
              src="https://gateway.pinata.cloud/ipfs/QmZmgiGEe3i4tichCAmxVBmbkY6gyAQCD3NqmobP88HkgN/"
              type="video/mp4"
            />
            <track
              label="English"
              kind="subtitles"
              srcLang="en"
              src="http://source.vtt"
              default
            />
          </Video>
          <div className="w-full grid grid-col-4"></div>
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
              <div className="h-[1px] w-full mt-2 bg-white bg-opacity-30 " />
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

              <div className="h-[1px] w-full mt-2 bg-white bg-opacity-30 " />
              <p className="font-semibold mt-2">$0.10</p>
            </div>
            <div className="flex flex-col justify-center items-center w-full h-52 bg-black bg-opacity-70 rounded-md p-2 mt-4">
              <div className="flex items-center justify-center bg-gradient-to-r from-gray-600 via-transparent to-gray-600 rounded-full  min-w-[2.5rem] min-h-[2.5rem] p-1">
                <img
                  //   src={tlcLogo}
                  src={tlxLogo}
                  className="w-8 h-8 p-0
                  "
                />
              </div>
              <p className="font-semibold mt-2 text-center">TLX</p>
              <p className="text-xs text-gray-400 text-center">The Luxury</p>

              <div className="h-[1px] w-full mt-2 bg-white bg-opacity-30 " />
              <p className="font-semibold mt-2">${prices.TLX}</p>
            </div>
            <div className="flex flex-col justify-center items-center w-full h-52 bg-black bg-opacity-70 rounded-md p-2 mt-4">
              <div className="flex items-center justify-center bg-gradient-to-r from-gray-600 via-transparent to-gray-600 rounded-full  min-w-[2.5rem] min-h-[2.5rem] p-1">
                <img
                  //   src={tlcLogo}
                  src={csyLogo}
                  className="w-8 h-8 p-0
                  "
                />
              </div>
              <p className="font-semibold mt-2 text-center">CSY</p>
              <p className="text-xs text-gray-400 text-center">Coressy</p>

              <div className="h-[1px] w-full mt-2 bg-white bg-opacity-30 " />
              <p className="font-semibold mt-2">${prices.CSY}</p>
            </div>
          </div>
          <div className="w-full bg-black bg-opacity-70 rounded-lg py-4 px-6 lg:px-4 min-h-[13rem]">
            <p className="font-semibold text-md">Changelog</p>
            <p className="text-xs text-gray-400">Online/Offline news</p>
            <div className="flex items-center mt-4">
              <div className="flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 min-w-[2.5rem] min-h-[2.5rem] rounded-lg">
                <IoRocketSharp size={20} />
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
                <ImRocket size={20} />
              </div>
              <div className="ml-2">
                <p className="font-semibold text-sm">$TLC | $LSO</p>
                <p className="text-xs text-gray-400">Bridges release</p>
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
                    $TLC Listing | DEX Release
                  </p>
                  <p className="text-xs text-gray-400">Oct 2022</p>
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
