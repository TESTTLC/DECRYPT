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

export const links = [
  {
    id: 0,
    url: '/',
    text: 'home',
    icon: <FaHome className="w-5 h-5" />,
    imageSource: undefined,
  },
  {
    id: 1,
    url: '/staking',
    text: 'staking',
    icon: <FaStackExchange className="w-5 h-5" />,
    // imageSource: stakingImage,
    imageSource: undefined,
  },
  {
    id: 2,
    url: '/launchpad',
    text: 'launchpad',
    icon: <FaGamepad className="w-5 h-5" />,
    // imageSource: launchpadImage,
    imageSource: undefined,
  },
  {
    id: 3,
    url: '/crosschainbridge',
    text: 'cross chain bridge',
    icon: <FaExternalLinkAlt className="w-5 h-5" />,
    // imageSource: crossChainBridgeImage,
    imageSource: undefined,
  },
  {
    id: 4,
    url: '/decentralizedexchange',
    text: 'decentralized exchange',
    icon: <FaUniversalAccess className="w-5 h-5" />,
    // imageSource: exchangeImage,
    imageSource: undefined,
  },
  {
    id: 5,
    url: '/createtoken',
    text: 'create your token',
    icon: <FaCreativeCommons className="w-5 h-5" />,
    // imageSource: createTokenImage,
    imageSource: undefined,
  },
  {
    id: 6,
    // url: "/nftmarketplace",
    url: 'https://theluxury.gallery',
    text: 'nft marketplace',
    icon: <FaImages className="w-5 h-5" />,
    // imageSource: nftMarketplaceImage,
    imageSource: undefined,
  },
  {
    id: 7,
    // url: "/metaverse",
    url: 'https://luxandia.com',
    text: 'metaverse',
    icon: <FaUniversalAccess className="w-5 h-5" />,
    // imageSource: metaverseImage,
    imageSource: undefined,
  },
  {
    id: 8,
    url: '/lendingandborrowing',
    text: 'lending & borrowing',
    icon: <FaMoneyBillWave className="w-5 h-5" />,
    // imageSource: lendingAndBorrowingImage,
    imageSource: undefined,
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
