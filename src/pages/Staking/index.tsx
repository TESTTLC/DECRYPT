import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
// import TheLuxuryCoin from "../../assets/images/TheLuxuryCoin.png";
// import TheLuxuryBank from "../../assets/images/the_luxury.png";
// import ICICB from "../../assets/images/ICICB.png";
import TheLuxuryCoin from "../../assets/images/TLC.jpg";
import TheLuxuryBank from "../../assets/images/TLX.jpg";
import LSO from "../../assets/images/LSO.jpg";
import ICICB from "../../assets/images/ATARI.jpg";
import GlowingWrapper from "../../components/GlowingWrapper";
import ProjectItem from "../Launchpad/components/ProjectItem";
import Item from "./components/Item";

const options = { method: "GET" };

interface Asset {
  image_preview_url: string;
}

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
          <p className="text-white font-bold font-poppins text-2xl">
            Select an asset to stake
          </p>
          <Link
            key={routes.launchpad.title}
            to={{ pathname: routes.launchpad.url }}
            type="button"
          >
            <span className="text-white font-bold text-md mb-4 underline">
              View all upcoming projects &rarr;
            </span>
          </Link>
        </div>
        <div className="mt-8 grid gap-8 2xl:grid-cols-4 grid-cols-2 xs:grid-cols-1 justify-center items-center ">
          <GlowingWrapper>
            <Item
              coinTag="TLC"
              title="TLChain"
              subtitle="$TLC is the native, energy-efficient cryptocurrency of TLChain that powers the full DeFi, GameFi and Metaverse ecosystem."
              onClick={() => navigate(`/staking/TLC`)}
              imageSource={TheLuxuryCoin}
            />
          </GlowingWrapper>

          <GlowingWrapper>
            <Item
              coinTag="LSO"
              title="LUXANDIA"
              subtitle="Luxandia is a virtual reality metaverse that reinvents and generalizes the way social experiences and  virtual creations are built."
              onClick={() => navigate(`/staking/LSO`)}
              // imageSource="https://forsite.ro/crx//local/images/staking-Luxandia.png"
              imageSource={LSO}
            />
          </GlowingWrapper>

          <GlowingWrapper>
            <Item
              coinTag="TLX"
              title="THE LUXURY"
              subtitle="The Luxury is a decentralized cryptocurrency that was created to become the token of reference for the luxury industry."
              onClick={() => navigate(`/staking/TLX`)}
              imageSource={TheLuxuryBank}
            />
          </GlowingWrapper>
          <GlowingWrapper>
            <Item
              coinTag="ATARI Token"
              title="ATARI Token"
              subtitle="A secure, fast, and highly scalable blockchain that is the foundation for the emerging industries of AI, Blockchain and Metaverse."
              onClick={() => {}}
              // imageSource="https://forsite.ro/crx//local/images/staking-icicb.png"
              imageSource={ICICB}
              showTopText
            />
          </GlowingWrapper>
        </div>
      </div>
    </div>
  );
};

export default Stake;
