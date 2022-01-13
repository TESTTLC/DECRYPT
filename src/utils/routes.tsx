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
    icon: <FaUserFriends className="w-5 h-5" />,
  },
  {
    id: 3,
    url: "/chaindefi",
    text: "tlchain defi",
    icon: <FaFedora className="w-5 h-5" />,
  },
  {
    id: 4,
    url: "/crosschainbridge",
    text: "cross chain bridge",
    icon: <FaExternalLinkAlt className="w-5 h-5" />,
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
