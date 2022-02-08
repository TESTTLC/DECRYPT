import ftmBridgeImage from "../assets/images/ftm-bridge.png";
import ethBridgeImage from "../assets/images/eth-bridge.png";
import bscBridgeImage from "../assets/images/bsc-bridge.png";
import solBridgeImage from "../assets/images/sol-bridge.png";
import tlcBridgeImage from "../assets/images/tlc-bridge.png";
import maticBridgeImage from "../assets/images/matic-bridge.png";
import tlxOldToken from "../assets/images/tlx-token-old.png";
import tlxNewToken from "../assets/images/tlx-token-new.png";
import atariToken from "../assets/images/atari-token.png";
import { Project } from "./types";

// /** Mainnet */
export const TLXTokenContractAddress =
  "0xB8B538C5dD46d8D691f0A972754365be8c9DC20b";
export const TLXStakeContractAddress =
  "0x492eeF5e03024879444E46F3c57A5fBe5F793d32";

export const LussoTokenContractAddress =
  "0xD62052Cea41E22fb2B97835b53f41190Fe219001";
export const LussoStakeContractAddress =
  "0xe1A6E5f4BcFB9bC39c8f68B2b84BA41ca5681B36";

export const TLCTokenContractAddress =
  "0xb058f92410181368138279f13948b7ded15b0d4f";
export const TLCStakeContractAddress =
  "0x8535A4cd05dDFABcDFe1A430c30aD04F16278cdF";

export const USDTContractAddress = "0x55d398326f99059fF775485246999027B3197955";

export const ownerAddress = "0x21C710cACAFfD5d885094cD13988ee08700D26BD";

/** Bridge */
export const BSCBridgeContractAddress =
  "0x8Ef7f7480F9c892E570cF655Ec678C47703e3d37";

/** Mainnet */
// export const OldTLXTokenContractAddress =
//   "0xea255909e46a54d54255219468991c69ca0e659d";
/** Testnet */
export const OldTLXTokenContractAddress =
  "0xea255909e46a54d54255219468991c69ca0e659d";

export const modalTokens: Project[] = [
  {
    name: "Binance Smart Chain",
    tag: "BSC",
    image: bscBridgeImage,
  },
  {
    name: "Ethereum",
    tag: "ETH",
    image: ethBridgeImage,
  },
  {
    name: "Fantom",
    tag: "FTM",
    image: ftmBridgeImage,
  },
  {
    name: "Polygon",
    tag: "MATIC",
    image: maticBridgeImage,
  },
  {
    name: "Solana",
    tag: "SOL",
    image: solBridgeImage,
  },
  {
    name: "TLChain",
    tag: "TLC",
    image: tlcBridgeImage,
  },
];
