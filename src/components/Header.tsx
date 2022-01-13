import React from "react";
import { useWalletConnector } from "../hooks/useWalletConnector";
import { useGlobalContext } from "../utils/context";
import small_logo from "../assets/images/small_logo.png";
import GlowingButton from "./GlowingButton";
import { routes } from "../utils/routes";
import { Link } from "react-router-dom";

// interface Props {
//   connectWallet: () => void;
//   disconnectWallet: () => void;
//   account?: string;
//   isMobile: boolean;
// }

const Header: React.FC = () => {
  const { account, connectWallet, disconnectWallet, isMobile } =
    useWalletConnector();
  const { isSidebarOpen } = useGlobalContext();

  return (
    <div className="w-full z-40 flex flex-wrap justify-between xs:justify-center sm:justify-center items-center px-10 py-5 bg-customBlue-800">
      <div
        className={`flex transition-all duration-500 ${
          isSidebarOpen ? "ml-60 xs:ml-0 sm:ml-0" : "ml-20 xs:ml-0 sm:ml-0"
        } mb-2`}
      >
        <div className="items-start justify-center xs:w-96">
          <div className="relative group">
            <div className="absolute -inset-0 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt "></div>
            <a
              href="https://theluxurybank.com/"
              target="_blank"
              className="relative px-7 py-2 bg-black leading-none flex items-center divide-x divide-gray-600"
            >
              <span className="xs:ml-10 flex items-center space-x-5">
                {!isMobile ? (
                  <img
                    src={small_logo}
                    alt="TLX logo"
                    className="w-4 h-4"
                    style={{ width: 20, height: 20 }}
                  />
                ) : null}
                <span className="pr-6 font-poppins text-sm text-gray-100">
                  New Release Coming Soon
                </span>
              </span>
              <span className="pl-6 font-poppins text-sm text-indigo-400 group-hover:text-gray-100 transition duration-200">
                See what's new &rarr;
              </span>
            </a>
          </div>
        </div>
      </div>
      <div
        className={`flex items-center transition-all duration-500 ${
          isSidebarOpen ? "ml-60 xs:ml-0 sm:ml-0" : "ml-20 xs:ml-0 sm:ml-0"
        }`}
      >
        <Link
          key={routes.dashboard.title}
          to={{ pathname: routes.dashboard.url }}
          type="button"
          className="flex h-8 mx-2 text-white items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 text-center"
        >
          <span className="text-center font-poppins text-sm">Dashboard</span>
        </Link>

        <div className="items-center justify-center mx-2">
          <div className="relative">
            <div className="absolute -inset-0 bg-gradient-to-r from-green-400 to-blue-600 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt "></div>
            {/* <button className="relative px-7 py-4 bg-black leading-none flex items-center divide-x divide-gray-600"> */}
            <button
              onClick={account ? disconnectWallet : connectWallet}
              // className="h-10 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-3xl"
              className="group-hover:text-gray-100 h-8 relative px-7 py-2 bg-black leading-none flex items-center divide-x divide-gray-600"
            >
              <span className="hover:text-gray-100 font-poppins py-4 text-sm text-indigo-400 transition duration-200">
                {account
                  ? `Disconnect ${account.slice(0, 4)}...${account.slice(
                      account.length - 4,
                      account.length
                    )}`
                  : "Connect wallet"}{" "}
              </span>
            </button>
          </div>
        </div>

        {/* <button
          onClick={account ? disconnectWallet : connectWallet}
          className="h-10 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-3xl"
        >
          {account
            ? `Disconnect ${account.slice(0, 4)}...${account.slice(
                account.length - 4,
                account.length
              )}`
            : "Connect wallet"}
        </button> */}
      </div>
    </div>
  );
};

export default Header;
