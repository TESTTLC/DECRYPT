import ftmBridgeImage from '../assets/images/ftm-bridge.png';
import ethBridgeImage from '../assets/images/eth-bridge.png';
import bscBridgeImage from '../assets/images/bsc-bridge.png';
import solBridgeImage from '../assets/images/sol-bridge.png';
import tlcBridgeImage from '../assets/images/tlc-bridge.png';
import maticBridgeImage from '../assets/images/matic-bridge.png';
import avaxBridgeImage from '../assets/images/avax-token.png';

export const nativeTLCAddress = '0x5491952C8C5f2C2Ce5025847E1b0Df6eefc726f6';

export const marketplaceAddress = '0x1247c60f85aae688b22dC6d230f52D5675974f3E';

export const NFTDropAddress = '0x632fb67bCFF5F6222270cda6bD5Dc71cA0Da6e02';

export const TLNFTTokenContractAddress =
  '0xE333A9333A302ed898caF8b7920Eb0cE5a26bba8';

// /** Mainnet */
export const TLXTokenContractAddress =
  '0xB8B538C5dD46d8D691f0A972754365be8c9DC20b';
export const TLXStakeContractAddress =
  '0x492eeF5e03024879444E46F3c57A5fBe5F793d32';

export const LussoTokenContractAddress =
  '0xD62052Cea41E22fb2B97835b53f41190Fe219001';
export const LussoStakeContractAddress =
  '0xe1A6E5f4BcFB9bC39c8f68B2b84BA41ca5681B36';
export const LussoFreezeContractAddress =
  '0x92542Ad9eb7bd1da030E45962Bc492D7BEC265cc';

export const TLCTokenContractAddress =
  '0xb058f92410181368138279f13948b7ded15b0d4f';
export const TLCStakeContractAddress =
  '0xf71147E5cD6AB7b3d2Ae43256733Dff24231e832';

export const TLLPTokenContractAddress =
  '0xd887f0837949310C0D174989b7145B83636fE731';
export const TLLPStakeContractAddress =
  '0x48500D88430B37E33237dD47948A8D02df660473';

export const TTXTokenContractAddress =
  '0x75300704eD0b5644BeE9f5F8Fc2003d59C27AB8E';

export const TTXChildTokenContractAddress =
  '0x75300704eD0b5644BeE9f5F8Fc2003d59C27AB8E';

export const USDTContractAddress = '0x55d398326f99059fF775485246999027B3197955';

export const ownerAddress = '0x21C710cACAFfD5d885094cD13988ee08700D26BD';

/** Bridge */
export const BSCBridgeContractAddress =
  '0x9E9B77E0b04E9B5fcdBFB8a33D97C7B115897dec';

export const TLC_MainBridgeContractAddress =
  '0x24b74c5A0b0126E37Fc0EE9fe231D6105Bbf4815';

export const LSO_MainBridgeContractAddress =
  '0x41982760519299703d5bD9d138cFF15CBEE3db43';

export const LSO_BSCSideBridgeContractAddress =
  '0x25C6330D43445985f564285f3735600c8A94b74a';

export const LSO_FTMSideBridgeContractAddress =
  '0xBb4b426deA349e1F7283ee36dbbb77B1Eb6DB1bF';

export const LSO_AVAXSideBridgeContractAddress =
  '0xE79f6aefB16AdeFF38dAA435372a7A166815685D';

export const TLC_FTMSideBridgeContractAddress =
  '0xd3f978dc308C0441A435bE8D67b15Ec2cFF7776f';

export const TLC_AVAXSideBridgeContractAddress =
  '0x160d97B05a7E7D249f8FcEb47b2A35170f3eF949';

export const TLC_BSC_ChildTokenContractAddress =
  '0xCd6a8C968F6820f7163e7fb41F75048b92E4318D';

export const TLC_AVAX_ChildTokenContractAddress =
  '0xd97136B7caB42058F75E05e3D8C5C87CceaC8Bc3';

export const TLC_FTM_ChildTokenContractAddress =
  '0x2578850d2a34e7DcE51355895dB05F3bBE562822';

export const LussoAvalancheChildTokenContractAddress =
  '0xD3298Dd2f86356e888e7FB6898720E1C3DCA5985';

export const LussoFantomChildTokenContractAddress =
  '0x76b560bD1e8c05Fb04c7a8855f118A7a2A50216D';

export const LussoBinanceChildTokenContractAddress =
  '0x56F0878AE8F02E30d08B2D8D540ec59ffFa9e06e';

export const OldTLXTokenContractAddress =
  '0xea255909e46a54d54255219468991c69ca0e659d';

export const TLC_BSCSideBridgeContractAddress =
  '0xbBcdB8C8E0D17b76F5ED2B9FC36A60154c2142F2';

export const bridgeAddresses = {
  LSO: {
    main: {
      address: LSO_MainBridgeContractAddress,
    },
    child: {
      TLC: {
        address: LSO_MainBridgeContractAddress,
      },
      BSC: {
        address: LSO_BSCSideBridgeContractAddress,
      },
      FTM: {
        address: LSO_FTMSideBridgeContractAddress,
      },
      AVAX: {
        address: LSO_AVAXSideBridgeContractAddress,
      },
    },
  },
  TLC: {
    main: {
      address: TLC_MainBridgeContractAddress,
    },
    child: {
      TLC: {
        address: TLC_MainBridgeContractAddress,
      },
      BSC: {
        address: TLC_BSCSideBridgeContractAddress,
      },
      FTM: {
        address: TLC_FTMSideBridgeContractAddress,
      },
      AVAX: {
        address: TLC_AVAXSideBridgeContractAddress,
      },
    },
  },
};

//ftm, smartchain, avalanche
export const modalChains = {
  TLC: {
    name: 'TLChain',
    tag: 'TLC',
    image: tlcBridgeImage,
  },
  BSC: {
    name: 'Binance Smart Chain',
    tag: 'BSC',
    image: bscBridgeImage,
  },
  FTM: {
    name: 'Fantom',
    tag: 'FTM',
    image: ftmBridgeImage,
  },
  AVAX: {
    name: 'Avalanche',
    tag: 'AVAX',
    image: avaxBridgeImage,
  },

  // {
  //   name: 'Ethereum',
  //   tag: 'ETH',
  //   image: ethBridgeImage,
  // },
  // {
  //   name: 'Polygon',
  //   tag: 'MATIC',
  //   image: maticBridgeImage,
  // },
  // {
  //   name: 'Solana',
  //   tag: 'SOL',
  //   image: solBridgeImage,
  // },
  // {
  //   name: 'TLChain',
  //   tag: 'TLC',
  //   image: tlcBridgeImage,
  // },
};

export const modalCoins = {
  LSO: {
    name: 'Lusso',
    tag: 'LSO',
  },
  TLC: {
    name: 'TLChain',
    tag: 'TLC',
  },
};

export const stakingRewards = {
  TLX: {
    one_month: '15.34% APY for - 1 months',
    three_months: '21.25% APY - 3 months ',
    six_months: '29.68% APY - 6 months ',
    one_year: '40.56% APY - 12 months ',
    three_years: '112% APY - 36 months ',
  },
  LSO: {
    one_month: '12.19% APY - 1 months ',
    three_months: '17.32% APY - 3 months ',
    six_months: '19.27% APY - 6 months ',
    one_year: '51.25% APY - 12 months ',
    three_years: '112% APY - 36 months ',
  },
  TLC: {
    one_month: '11.25% APY - 1 months ',
    three_months: '15.56% APY - 3 months ',
    six_months: '18.80% APY - 6 months ',
    one_year: '19.26% APY - 12 months ',
    three_years: '63.58% APY - 36 months ',
  },
  TLLP: {
    one_month: '12.19% APY - 1 months ',
    three_months: '17.32% APY - 3 months ',
    six_months: '19.27% APY - 6 months ',
    one_year: '51.25% APY - 12 months ',
    three_years: '112% APY - 36 months ',
  },
  DEFAULT: {
    one_month: '',
    three_months: '',
    six_months: '',
    one_year: '',
    three_years: '',
  },
};

export const prices = {
  TLC: '0.20',
  LSO: '0.07',
  TLX: 'Listing starts with $50',
  TLLP: '0.20',
};

export const headerPayloadName = '_sec_hpload';
