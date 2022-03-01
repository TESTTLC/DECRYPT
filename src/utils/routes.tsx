import {
  FaBehance,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaSketch,
  FaHome,
  FaGamepad,
  FaExternalLinkAlt,
  FaMoneyBillWave,
  FaUniversalAccess,
  FaImages,
  FaCreativeCommons,
  FaStackExchange,
} from 'react-icons/fa';

import homeIcon from '../assets/images/Home.png';
import stakingIcon from '../assets/images/Staking.png';
import launchpadIcon from '../assets/images/Launchpad.png';
import nftMarketplaceIcon from '../assets/images/NFT-Marketplace.png';
import dexIcon from '../assets/images/Decentralized-Exchange.png';
import assetTokenizationIcon from '../assets/images/Asset-Tokenization.png';
import ccbIcon from '../assets/images/Cross-Chain-Bridge.png';
import createTokenIcon from '../assets/images/Token-Factory.png';
import metaverseIcon from '../assets/images/Metaverse.png';

export const links = [
  {
    id: 0,
    url: '/',
    text: 'home',
    // icon: <FaHome className="w-5 h-5" />,
    // icon: <img className="w-5 "/>
    icon: '',
    imageSource: homeIcon,
  },
  {
    id: 1,
    url: '/staking',
    text: 'staking',
    // icon: <FaStackExchange className="w-5 h-5" />,
    // icon: <img className="w-5 "/>
    icon: '',
    // imageSource: stakingImage,
    imageSource: stakingIcon,
  },
  {
    id: 2,
    url: '/launchpad',
    text: 'launchpad',
    // icon: <FaGamepad className="w-5 h-5" />,
    // icon: <img className="w-5 "/>
    icon: '',
    // imageSource: launchpadImage,
    imageSource: launchpadIcon,
  },
  {
    id: 3,
    url: '/crosschainbridge',
    text: 'cross chain bridge',
    // icon: <FaExternalLinkAlt className="w-5 h-5" />,
    // icon: <img className="w-5 "/>
    icon: '',
    // imageSource: crossChainBridgeImage,
    imageSource: ccbIcon,
  },
  {
    id: 4,
    url: '/dex',
    text: 'decentralized exchange',
    // icon: <FaUniversalAccess className="w-5 h-5" />,
    // icon: <img className="w-5 "/>
    icon: '',
    // imageSource: exchangeImage,
    imageSource: dexIcon,
  },
  {
    id: 5,
    url: 'https://factory.decryption.com',
    text: 'create your token',
    // icon: <FaCreativeCommons className="w-5 h-5" />,
    // icon: <img className="w-5 "/>
    icon: '',
    // imageSource: createTokenImage,
    imageSource: createTokenIcon,
  },
  {
    id: 6,
    url: '/nftmarketplace',
    // url: 'https://theluxury.gallery',
    text: 'nft marketplace',
    // icon: <FaImages className="w-5 h-5" />,
    // icon: <img className="w-5 "/>
    icon: '',
    // imageSource: nftMarketplaceImage,
    imageSource: nftMarketplaceIcon,
  },
  {
    id: 7,
    // url: "/metaverse",
    url: 'https://luxandia.com',
    text: 'metaverse',
    // icon: <FaUniversalAccess className="w-5 h-5" />,
    // icon: <img className="w-5 "/>
    icon: '',
    // imageSource: metaverseImage,
    imageSource: metaverseIcon,
  },
  {
    id: 8,
    url: '/tokenization',
    text: 'Asset Tokenization',
    // icon: <FaMoneyBillWave className="w-5 h-5" />,
    // icon: <img className="w-5 "/>
    icon: '',
    // imageSource: lendingAndBorrowingImage,
    imageSource: assetTokenizationIcon,
  },
];

export const routes = {
  dashboard: {
    id: 1,
    url: '/dashboard',
    title: 'Dashboard',
  },
  launchpad: {
    id: 2,
    url: '/launchpad',
    title: 'Launchpad',
  },
  stakeCoin: {
    id: 3,
    url: '/staking/:coin',
    title: 'Stake',
  },
};

export const social = [
  {
    id: 1,
    url: 'https://www.twitter.com',
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: 3,
    url: 'https://www.twitter.com',
    icon: <FaLinkedin />,
  },
  {
    id: 4,
    url: 'https://www.twitter.com',
    icon: <FaBehance />,
  },
  {
    id: 5,
    url: 'https://www.twitter.com',
    icon: <FaSketch />,
  },
];
