import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import TheLuxuryCoin from '../../assets/images/staking_tlc.png';
import TheLuxuryBank from '../../assets/images/staking_tlx.png';
import LSO from '../../assets/images/staking_lso.png';
import ICICB from '../../assets/images/staking_atari.png';
import GlowingWrapper from '../../components/GlowingWrapper';
import { routes } from '../../utils/routes';

import Item from './components/Item';

const Stake: React.FC = () => {
  const navigate = useNavigate();

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
          {/* <GlowingWrapper> */}
          <Item
            coinTag="TLC"
            title="TLChain"
            subtitle="$TLC is the native, energy-efficient cryptocurrency of TLChain that powers the full DeFi, GameFi and Metaverse ecosystem."
            onClick={() => navigate(`/staking/TLC`)}
            imageSource={TheLuxuryCoin}
          />
          {/* </GlowingWrapper> */}

          {/* <GlowingWrapper> */}
          <Item
            coinTag="LSO"
            title="LUXANDIA"
            subtitle="Luxandia is a virtual reality metaverse that reinvents and generalizes the way social experiences and  virtual creations are built."
            onClick={() => navigate(`/staking/LSO`)}
            imageSource={LSO}
          />
          {/* </GlowingWrapper> */}

          {/* <GlowingWrapper> */}
          <Item
            coinTag="TLX"
            title="THE LUXURY"
            subtitle="The Luxury is a decentralized cryptocurrency that was created to become the token of reference for the luxury industry."
            onClick={() => navigate(`/staking/TLX`)}
            imageSource={TheLuxuryBank}
          />
          {/* </GlowingWrapper> */}
          {/* <GlowingWrapper> */}
          <Item
            coinTag="ATARI Token"
            title="ATARI Token"
            subtitle="A secure, fast, and highly scalable blockchain that is the foundation for the emerging industries of AI, Blockchain and Metaverse."
            onClick={() => {
              return;
            }}
            imageSource={ICICB}
            showTopText
          />
          {/* </GlowingWrapper> */}
        </div>
      </div>
    </div>
  );
};

export default Stake;
