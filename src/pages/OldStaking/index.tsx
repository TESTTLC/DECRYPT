import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import TheLuxuryCoin from '../../assets/images/staking_tlc_1.png';
import TheLuxuryBank from '../../assets/images/staking_tlx_1.png';
import LSO from '../../assets/images/staking_lso_1.png';
import CSY from '../../assets/images/staking_csy_1.png';
import { routes } from '../../utils/routes';

import Item from './components/Item';

const OldStaking: React.FC = () => {
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
            onClick={() => navigate(`/oldStaking/OldTLC`)}
            imageSource={TheLuxuryCoin}
          />
          {/* </GlowingWrapper> */}

          {/* <GlowingWrapper> */}
          <Item
            coinTag="LSO"
            title="LUXANDIA"
            subtitle="Luxandia is a virtual reality metaverse that reinvents and generalizes the way social experiences and  virtual creations are built."
            onClick={() => navigate(`/oldStaking/OldLSO`)}
            imageSource={LSO}
          />
          {/* </GlowingWrapper> */}

          {/* <GlowingWrapper> */}
          <Item
            coinTag="TLX"
            title="THE LUXURY"
            subtitle="The Luxury is a decentralized cryptocurrency that was created to become the token of reference for the luxury industry."
            onClick={() => navigate(`/oldStaking/OldTLX`)}
            imageSource={TheLuxuryBank}
          />
          {/* </GlowingWrapper> */}
          {/* <GlowingWrapper> */}
          <Item
            coinTag="CSY"
            title="Coressy"
            subtitle="Coressy  offers a special staking program to community members in preparation for Global Coressy Delivery App."
            onClick={() => navigate(`/oldStaking/OldCSY`)}
            imageSource={CSY}
          />
          {/* </GlowingWrapper> */}
        </div>
      </div>
    </div>
  );
};

export default OldStaking;
