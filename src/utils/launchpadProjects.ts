import TheLuxuryPng from "../assets/images/the_luxury.png";
import { LaunchpadProject } from "./types";

export const launchpadProjects = {
  TLX: {
    id: 1,
    title: "The Luxury Bank",
    coin: "TLX",
    description:
      "The decentralized cryptocurrency that was created to become the token of reference for the luxury industry.",
    about:
      "Our goal is to have The Luxury (TLX) used as widely as possible across the interactive luxury industry, allowing developers and publishers new options for the exploitation of their products, integration of smart contracts, protection of in-metaverse assets and so much more.",
    imageSource: TheLuxuryPng,
  } as LaunchpadProject,

  TLC: {
    id: 2,
    title: "The Luxury Coin",
    coin: "TLC",
    description: "The decentralized coin.",
    about:
      "Our goal is to have The Luxury Coin (TLC) used as widely as possible across the interactive luxury industry, allowing developers and publishers new options for the exploitation of their products, integration of smart contracts, protection of in-metaverse assets and so much more.",
    imageSource: TheLuxuryPng,
  } as LaunchpadProject,
};
