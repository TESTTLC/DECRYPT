import React, { useEffect, useRef, useState } from "react";
import { useWalletConnector } from "../hooks/useWalletConnector";
import Header from "../components/Header";
import Modal from "react-modal";
import { FaBars } from "react-icons/fa";
import { useGlobalContext } from "../utils/context";

const options = { method: "GET" };

interface Asset {
  image_preview_url: string;
}

const customStyles = {
  content: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    border: 0,
    background: "rgba(0, 0, 0, 0.3)",
  },

  overlay: {
    background: "rgba(0, 0, 0, 0.3)",
  },
};

const Home: React.FC = () => {
  const { openSidebar, isSidebarOpen } = useGlobalContext();

  const imagesRef = useRef<null | HTMLDivElement>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const retreiveAssets = async () => {
    fetch(
      "https://api.opensea.io/api/v1/assets?owner=0xf56345338cb4cddaf915ebef3bfde63e70fe3053",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setAssets(response.assets.reverse());
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    // retreiveAssets();
  }, []);

  return (
    <main>
      {/* <button
        onClick={openSidebar}
        className={`${
          isSidebarOpen ? "-translate-x-8" : "translate-x-0"
        } fixed top-2 transition transform ease-linear duration-500 text-white w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800`}
      >
        <FaBars className="w-5 h-5" />
      </button> */}
    </main>
  );
};

export default Home;
