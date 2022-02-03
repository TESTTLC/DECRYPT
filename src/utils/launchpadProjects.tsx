import TheLuxuryPng from "../assets/images/the_luxury.png";
import Default from "../assets/images/Default.png";
// import TheLuxuryPng from "../../../assets/images/the_luxury.png";
import LuxandiaPng from "../assets/images/Luxandia.png";
import { LaunchpadProject } from "./types";

export const launchpadProjects = {
  DEFAULT: {
    id: 0,
    title: "Coming Soon",
    coinTag: "X",
    description:
      "Empower the most innovative crypto projects across all blockchains with Decryption.",
    about: "",
    imageSource: Default,
    website: "",
  } as LaunchpadProject,
  TLX: {
    id: 1,
    title: "The Luxury Bank",
    coinTag: "TLX",
    description:
      "The decentralized cryptocurrency that was created to become the token of reference for the luxury industry.",
    about:
      "Our goal is to have The Luxury (TLX) used as widely as possible across the interactive luxury industry, allowing developers and publishers new options for the exploitation of their products, integration of smart contracts, protection of in-metaverse assets and so much more.",
    imageSource: Default,
    website: "",
  } as LaunchpadProject,

  LSO: {
    id: 2,
    title: "Luxandia - Metaverse",
    coinTag: "LSO",
    description:
      "Luxandia is a virtual reality metaverse that reinvents and generalizes the way social experiences and  virtual creations are built.",
    about: "",
    imageSource: LuxandiaPng,
    website: "luxandia.com",
    moreDetails: (
      <>
        Metaverse is more than just a movie concept. Users will have access to
        all the digital experiences they might encounter, replicating many of
        the actions they would find in the real world, such as shopping for
        clothes, buying property, and creating their own spaces.
        <br />
        <br />
        Metaverse, unlike a virtual ecosystem in a game, involves the management
        of financial data and transactions that run the economy and simulate
        what a user would encounter in the real world. Without this, users are
        likely to miss out on the truly immersive experience that the Metaverse
        has to offer.
      </>
    ),
  } as LaunchpadProject,

  TLC: {
    id: 2,
    title: "The Luxury Coin",
    coinTag: "TLC",
    description:
      "Luxandia is a virtual reality metaverse that reinvents and generalizes the way social experiences and  virtual creations are built.",
    about: "",
    imageSource: Default,
    website: "",
  } as LaunchpadProject,
};
