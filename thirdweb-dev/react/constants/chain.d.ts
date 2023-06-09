import type { Chain as WagmiChain } from 'wagmi';
export declare type Chain = WagmiChain;
export declare const defaultSupportedChains: (
  | {
      readonly id: 1;
      readonly name: 'Mainnet';
      readonly nativeCurrency: {
        readonly name: 'Ether';
        readonly symbol: 'ETH';
        readonly decimals: 18;
      };
      readonly rpcUrls: readonly [
        'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      ];
      readonly blockExplorers: readonly [
        {
          readonly name: 'Etherscan';
          readonly url: 'https://etherscan.io';
        },
      ];
    }
  | {
      readonly id: 4;
      readonly name: 'Rinkeby';
      readonly nativeCurrency: {
        readonly name: 'Rinkeby Ether';
        readonly symbol: 'rETH';
        readonly decimals: 18;
      };
      readonly rpcUrls: readonly [
        'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      ];
      readonly blockExplorers: readonly [
        {
          readonly name: 'Etherscan';
          readonly url: 'https://rinkeby.etherscan.io';
        },
      ];
      readonly testnet: true;
    }
  | {
      readonly id: 5;
      readonly name: 'Goerli';
      readonly nativeCurrency: {
        readonly name: 'Goerli Ether';
        readonly symbol: 'gETH';
        readonly decimals: 18;
      };
      readonly rpcUrls: readonly [
        'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      ];
      readonly blockExplorers: readonly [
        {
          readonly name: 'Etherscan';
          readonly url: 'https://goerli.etherscan.io';
        },
      ];
      readonly testnet: true;
    }
  | {
      readonly id: 137;
      readonly name: 'Polygon Mainnet';
      readonly nativeCurrency: {
        readonly name: 'Matic';
        readonly symbol: 'MATIC';
        readonly decimals: 18;
      };
      readonly rpcUrls: readonly [
        'https://polygon-rpc.com',
        'https://rpc-mainnet.matic.network',
        'https://matic-mainnet.chainstacklabs.com',
        'https://rpc-mainnet.maticvigil.com',
        'https://rpc-mainnet.matic.quiknode.pro',
        'https://matic-mainnet-full-rpc.bwarelabs.com',
      ];
      readonly blockExplorers: readonly [
        {
          readonly name: 'Polygonscan';
          readonly url: 'https://polygonscan.com';
        },
      ];
    }
  | {
      readonly id: 2224;
      readonly name: 'TLChain Mainnet';
      readonly nativeCurrency: {
        readonly name: 'TLChain';
        readonly symbol: 'TLC';
        readonly decimals: 18;
      };
      readonly rpcUrls: readonly ['https://mainnet-rpc.tlchain.live/'];
      readonly blockExplorers: readonly [
        {
          readonly name: 'TLXScan';
          readonly url: 'https://explorer.tlchain.live/';
        },
      ];
    }
  | {
      readonly id: 80001;
      readonly name: 'Polygon Testnet Mumbai';
      readonly nativeCurrency: {
        readonly name: 'Matic';
        readonly symbol: 'MATIC';
        readonly decimals: 18;
      };
      readonly rpcUrls: readonly [
        'https://matic-mumbai.chainstacklabs.com',
        'https://rpc-mumbai.maticvigil.com',
        'https://matic-testnet-archive-rpc.bwarelabs.com',
      ];
      readonly blockExplorers: readonly [
        {
          readonly name: 'Polygonscan';
          readonly url: 'https://mumbai.polygonscan.com';
        },
      ];
      readonly testnet: true;
    }
  | {
      readonly id: 43114;
      readonly name: 'Avalanche';
      readonly nativeCurrency: {
        readonly name: 'AVAX';
        readonly symbol: 'AVAX';
        readonly decimals: 18;
      };
      readonly rpcUrls: readonly [
        'https://api.avax.network/ext/bc/C/rpc',
        'https://rpc.ankr.com/avalanche',
      ];
      readonly blockExplorers: readonly [
        {
          readonly name: 'SnowTrace';
          readonly url: 'https://snowtrace.io/';
        },
      ];
      readonly testnet: false;
    }
  | {
      readonly id: 250;
      readonly name: 'Fantom Opera';
      readonly nativeCurrency: {
        readonly name: 'Fantom';
        readonly symbol: 'FTM';
        readonly decimals: 18;
      };
      readonly rpcUrls: readonly ['https://rpc.ftm.tools'];
      readonly blockExplorerUrls: readonly [
        {
          readonly name: 'FTMScan';
          readonly url: 'https://ftmscan.com/';
        },
      ];
      readonly testnet: false;
    }
)[];
export declare type SupportedChainId =
  typeof defaultSupportedChains[number]['id'];
export declare type SupportedChain = SupportedChainId | Chain;
