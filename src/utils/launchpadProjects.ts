import TheLuxuryPng from "../assets/images/the_luxury.png";
import Default from "../assets/images/Default.png";
// import TheLuxuryPng from "../../../assets/images/the_luxury.png";
import LuxandiaPng from "../assets/images/Luxandia.png";
import { LaunchpadProject } from "./types";

export const launchpadProjects = {
  DEFAULT: {
    id: 0,
    title: "Coming Soon",
    coin: "X",
    description:
      "Empower the most innovative crypto projects across all blockchains with Decryption.",
    about: "",
    imageSource: Default,
  } as LaunchpadProject,
  TLX: {
    id: 1,
    title: "The Luxury Bank",
    coin: "TLX",
    description:
      "The decentralized cryptocurrency that was created to become the token of reference for the luxury industry.",
    about:
      "Our goal is to have The Luxury (TLX) used as widely as possible across the interactive luxury industry, allowing developers and publishers new options for the exploitation of their products, integration of smart contracts, protection of in-metaverse assets and so much more.",
    imageSource: Default,
  } as LaunchpadProject,

  LSO: {
    id: 2,
    title: "Luxandia",
    coin: "LSO",
    description:
      "Luxandia is a virtual reality metaverse that reinvents and generalizes the way social experiences and  virtual creations are built.",
    about: "",
    imageSource: LuxandiaPng,
  } as LaunchpadProject,

  TLC: {
    id: 2,
    title: "The Luxury Coin",
    coin: "TLC",
    description:
      "Luxandia is a virtual reality metaverse that reinvents and generalizes the way social experiences and  virtual creations are built.",
    about: "",
    imageSource: Default,
  } as LaunchpadProject,
};
