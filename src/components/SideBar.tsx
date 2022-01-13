import React from "react";
import { useState } from "react";
import { useGlobalContext } from "../utils/context";
import { HiOutlineSearch, HiTicket, HiX } from "react-icons/hi";
import { MdSettings } from "react-icons/md";
// import { NavLink } from "react-router-dom";
// import AdminNavbar from "./AdminNavbar";
// import Icon from "@material-tailwind/react/Icon";
import { links } from "../utils/routes";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import small_logo from "../assets/images/small_logo.png";

<script
  src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js"
  defer
></script>;

const SideBar: React.FC = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();
  const location = useLocation();

  const [showSidebar, setShowSidebar] = useState("-left-60");
  return (
    <div
      className={`transition-all  duration-500  fixed top-0 ${
        isSidebarOpen ? "left-0" : "-left-60"
      } z-index-20 fixed z-50 h-screen`}
    >
      <div
        className="flex h-screen overflow-y-auto flex-col bg-customBlue-800 w-60
       px-2 py-8 border-r border-opacity-20 border-blue-600 min-h-screen relative"
      >
        <button
          onClick={closeSidebar}
          className="absolute top-1 right-1 text-white w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800"
        >
          <HiX className="w-5 h-5" />
        </button>
        <h2 className="text-3xl font-semibold text-white">
          TLChain{" "}
          <span className="text-green-400 ml-1 drop-shadow-2xl shadow-white">
            DeFi
          </span>
        </h2>

        <div className="flex flex-col mt-6  justify-between flex-1">
          <nav className="text">
            {links.map((link, index) => {
              const { id, url, text, icon } = link;

              return (
                <Link
                  key={`${id}/${url}`}
                  to={{ pathname: url }}
                  className={`
                  capitalize flex items-center px-2 py-2 ${
                    location.pathname === link.url
                      ? ""
                      : "hover:bg-gray-600 hover:text-gray-200"
                  }  mt-5 transition-colors duration-200 transform
                   rounded-md font-oswald text-white`}
                  // text-gray-600`
                >
                  {icon}
                  <span
                    className={`mx-4 font-medium ${
                      location.pathname === link.url ? "text-green-500" : ""
                    }`}
                  >
                    {text.toUpperCase()}
                  </span>
                </Link>
              );
            })}
            <hr className="my-6" />
            <a
              href="/color-shade-generator"
              className="flex items-center px-4 py-2 mt-5 rounded-md text-white hover:text-gray-700 hover:bg-gray-200 transition-colors transform"
            >
              <HiTicket className="w-5 h-5" />
              <span className="mx-4 font-medium font-oswald uppercase">
                Ticket
              </span>
            </a>
            <a
              href="/color-shade-generator"
              className="flex items-center px-4 py-2 mt-5 rounded-md text-white hover:text-gray-700 hover:bg-gray-200 transition-colors transform"
            >
              <MdSettings className="w-5 h-5" />
              <span className="mx-4 font-medium font-oswald uppercase">
                Settings
              </span>
            </a>
          </nav>
          <div className="flex items-center mt-5">
            <img
              src={small_logo}
              alt="avatar"
              className="h-6 w-6 mx-2 object-center object-cover rounded-full"
            />
            <h4 className="font-medium text-sm font-poppins text-gray-300 hover:underline cursor-pointer">
              The Luxury Bank
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
