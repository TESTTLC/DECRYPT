import {
  FaBehance,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaSketch,
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

//Sidebar
export const links = [
  {
    id: 0,
    url: '/',
    text: 'home',
    icon: '',
    imageSource: homeIcon,
    category: 'BASIC',
  },
  {
    id: 1,
    url: '/staking',
    text: 'staking',
    icon: '',
    imageSource: stakingIcon,
    category: 'BASIC',
  },
  {
    id: 2,
    url: '/launchpad',
    text: 'launchpad',
    icon: '',
    imageSource: launchpadIcon,
    category: 'BASIC',
  },
  {
    id: 3,
    url: 'https://luxandia.com',
    text: 'metaverse',

    icon: '',
    imageSource: metaverseIcon,
    category: 'BASIC',
  },
  {
    id: 4,
    url: '/nftmarketplace',
    text: 'nft marketplace',
    icon: '',
    imageSource: nftMarketplaceIcon,
    category: 'BASIC',
  },
  {
    id: 5,
    url: '/crosschainbridge',
    text: 'cross chain bridge',
    icon: '',
    imageSource: ccbIcon,
    category: 'BASIC',
  },

  {
    id: 6,
    url: 'https://factory.decryption.com',
    text: 'create your token',
    icon: '',
    imageSource: createTokenIcon,
    category: 'FINANCE',
  },

  {
    id: 7,
    url: '/dex',
    text: 'decentralized exchange',
    icon: '',
    imageSource: dexIcon,
    category: 'FINANCE',
  },

  {
    id: 8,
    url: '/tokenization',
    text: 'Asset Tokenization',
    icon: '',
    imageSource: assetTokenizationIcon,
    category: 'FINANCE',
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
  staking: {
    id: 3,
    url: '/staking',
    title: 'Staking',
  },
  stakeCoin: {
    id: 4,
    url: '/staking/:coin',
    title: 'Stake',
  },
  nftMarketplace: {
    id: 5,
    url: '/nftmarketplace',
    title: 'NFT Marketplace',
  },
  nftMarketplaceStats: {
    id: 7,
    url: '/nftmarketplace/stats',
    title: 'NFT Marketplace Routes',
  },
  nftMarketplaceCategories: {
    id: 8,
    url: '/nftmarketplace/categories',
    title: 'NFT Marketplace Categories',
  },
  nftMarketplaceEditProfile: {
    id: 9,
    url: '/nftmarketplace/editprofile',
    title: 'NFT Marketplace Edit Profile',
  },
  nftMarketplaceCreateNFT: {
    id: 10,
    url: '/nftmarketplace/create-nft',
    title: 'NFT Marketplace Create NFT',
  },
  nftMarketplaceCreateCollection: {
    id: 11,
    url: '/nftmarketplace/create-collection',
    title: 'NFT Marketplace Create Collection',
  },
  nftMarketplaceViewCollection: {
    id: 12,
    url: '/nftmarketplace/view-collection',
    title: 'NFT Marketplace View Collection',
  },
  dashboardV2: {
    id: 13,
    url: '/dhs',
    title: 'DashboardV2',
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
