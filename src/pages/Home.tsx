import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../utils/context";
import BigButton from "../components/BigButton";
import { useNavigate } from "react-router-dom";

const options = { method: "GET" };

interface Asset {
  image_preview_url: string;
}

// const customStyles = {
//   content: {
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     border: 0,
//     background: "rgba(0, 0, 0, 0.3)",
//   },

//   overlay: {
//     background: "rgba(0, 0, 0, 0.3)",
//   },
// };

const Home: React.FC = () => {
  const imagesRef = useRef<null | HTMLDivElement>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

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
    <div className="w-full flex flex-col justify-center">
      {/* <button
        onClick={openSidebar}
        className={`${
          isSidebarOpen ? "-translate-x-8" : "translate-x-0"
        } fixed top-2 transition transform ease-linear duration-500 text-white w-8 h-8 rounded-full flex items-center justify-center active:bg-gray-300 focus:outline-none ml-6 hover:bg-gray-200 hover:text-gray-800`}
      >
        <FaBars className="w-5 h-5" />
      </button> */}
      {/* <div className="w-full">
        <div className="grid mt-14 justify-start items-start">
          <div className="flex justify-start items-start mb-6 ">
            <p className="text-white">123</p>
          </div>
        </div>
      </div> */}

      <div className="w-full">
        <div className="col-span-4 flex justify-center items-center mb-6">
          <p className="text-white text-2xl font-bold">
            Select an asset to stake
          </p>
        </div>
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-3 xs:grid-cols-1 mt-6 justify-center items-center">
          <div className="flex justify-center items-center mb-6">
            <BigButton
              title="THE LUXURY"
              subtitle="The Luxury is a decentralized cryptocurrency that was created to become the token of reference for the luxury industry."
              onClick={() => navigate("/stake")}
              imageSource="https://forsite.ro/crx//local/images/stakingtlx.jpeg"
            />
          </div>
          <div className="flex justify-center items-center mb-6">
            <BigButton
              title="LUXANDIA"
              subtitle="Luxandia is a virtual reality metaverse that reinvents and generalizes the way social experiences and  virtual creations are built."
              onClick={() => {}}
              imageSource="https://forsite.ro/crx//local/images/staking-Luxandia.png"
              showTopText
            />
          </div>
          <div className="flex justify-center items-center mb-6">
            <BigButton
              title="BEEZ"
              subtitle=" The first functioning bridge connecting cryptocurrency and eCommerce. Accelerating The World’s Transition To Cryptocurrency."
              onClick={() => {}}
              imageSource="https://forsite.ro/crx//local/images/staking-beez.jpeg"
              showTopText
            />
          </div>
          <div className="flex justify-center items-center mb-6">
            <BigButton
              title="ICICB"
              subtitle="A secure, fast, and highly scalable blockchain that is the foundation for the emerging industries of AI, Blockchain and Metaverse."
              onClick={() => {}}
              imageSource="https://forsite.ro/crx//local/images/staking-icicb.png"
              showTopText
            />
          </div>
          {/* <div className="flex justify-center items-center">
            <div className="flex border-2 w-72 h-72 justify-center items-center">
              <p className="text-white">1</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex border-2 w-72 h-72 justify-center items-center">
              <p className="text-white">2</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex border-2 w-72 h-72 justify-center items-center">
              <p className="text-white">3</p>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex border-2 w-72 h-72 justify-center items-center">
              <p className="text-white">4</p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
