import {
  FaBehance,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaSketch,
  FaHome,
  FaUserFriends,
  FaFolderOpen,
  FaGamepad,
  FaBalanceScale,
  FaExternalLinkAlt,
  FaAnchor,
  FaFaucet,
  FaFedora,
  FaMoneyBillWave,
  FaMoneyBill,
  FaUniversalAccess,
  FaImage,
  FaImages,
  FaCreativeCommons,
  FaCreativeCommonsNc,
  FaCreativeCommonsPdAlt,
  FaCertificate,
  FaStackExchange,
} from "react-icons/fa";

// import { HiDocument } from "react-icons/hi";
export const links = [
  {
    id: 1,
    url: "/",
    text: "home",
    icon: <FaHome className="w-5 h-5" />,
  },
  {
    id: 1,
    url: "/launchpad",
    text: "launchpad",
    icon: <FaGamepad className="w-5 h-5" />,
  },
  {
    id: 2,
    url: "/stake",
    text: "stake",
    icon: <FaStackExchange className="w-5 h-5" />,
  },
  {
    id: 3,
    url: "/crosschainbridge",
    text: "cross chain bridge",
    icon: <FaExternalLinkAlt className="w-5 h-5" />,
  },
  {
    id: 4,
    url: "/createtoken",
    text: "create your token",
    icon: <FaCreativeCommons className="w-5 h-5" />,
  },
  {
    id: 5,
    url: "/nftmarketplace",
    text: "nft marketplace",
    icon: <FaImages className="w-5 h-5" />,
  },
  {
    id: 6,
    url: "/metaverse",
    text: "metaverse",
    icon: <FaUniversalAccess className="w-5 h-5" />,
  },
  {
    id: 7,
    url: "/lendingandborrowing",
    text: "lending & borrowing",
    icon: <FaMoneyBillWave className="w-5 h-5" />,
  },
];

export const routes = {
  dashboard: {
    id: 1,
    url: "/dashboard",
    title: "Dashboard",
  },
  launchpad: {
    id: 2,
    url: "/launchpad",
    title: "Launchpad",
  },
};

export const social = [
  {
    id: 1,
    url: "https://www.twitter.com",
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: "https://www.twitter.com",
    icon: <FaTwitter />,
  },
  {
    id: 3,
    url: "https://www.twitter.com",
    icon: <FaLinkedin />,
  },
  {
    id: 4,
    url: "https://www.twitter.com",
    icon: <FaBehance />,
  },
  {
    id: 5,
    url: "https://www.twitter.com",
    icon: <FaSketch />,
  },
];
