import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../../utils/context";
import BigButton from "../../components/BigButton";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";

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

const Stake: React.FC = () => {
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
      <div className="w-full px-2">
        <div className="col-span-4 mb-2">
          <p className="text-white font-bold text-2xl">
            Select an asset to stake
          </p>
          <Link
            key={routes.launchpad.title}
            to={{ pathname: routes.launchpad.url }}
            type="button"
            // className="flex h-8 mx-2 text-white items-center justify-center bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 text-center"
          >
            <span className="text-white font-bold text-md mb-4 underline">
              View all upcoming projects &rarr;
            </span>
          </Link>
        </div>
        <div className="mt-8 grid gap-8 2xl:grid-cols-4 grid-cols-2 xs:grid-cols-1 justify-center items-center">
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              title="THE LUXURY"
              subtitle="The Luxury is a decentralized cryptocurrency that was created to become the token of reference for the luxury industry."
              onClick={() => navigate(`/staking/TLX`)}
              imageSource="https://forsite.ro/crx//local/images/stakingtlx.jpeg"
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              title="LUXANDIA"
              subtitle="Luxandia is a virtual reality metaverse that reinvents and generalizes the way social experiences and  virtual creations are built."
              onClick={() => navigate(`/staking/LSO`)}
              imageSource="https://forsite.ro/crx//local/images/staking-Luxandia.png"
              // showTopText
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              title="BEEZ"
              subtitle=" The first functioning bridge connecting cryptocurrency and eCommerce. Accelerating The World’s Transition To Cryptocurrency."
              onClick={() => {}}
              imageSource="https://forsite.ro/crx//local/images/staking-beez.jpeg"
              showTopText
            />
          </div>
          <div className="flex w-full h-72 justify-center items-center mb-6">
            <BigButton
              title="ICICB"
              subtitle="A secure, fast, and highly scalable blockchain that is the foundation for the emerging industries of AI, Blockchain and Metaverse."
              onClick={() => {}}
              imageSource="https://forsite.ro/crx//local/images/staking-icicb.png"
              showTopText
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stake;
