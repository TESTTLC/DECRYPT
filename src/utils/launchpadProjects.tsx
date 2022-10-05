import Default from '../assets/images/Default.png';
import LuxandiaPng from '../assets/images/Luxandia.png';
import EpicPng from '../assets/images/EPIC.png';
import BrskPng from '../assets/images/BRSK.png';
import TopPng from '../assets/images/TOPSoftware.png';

import { LaunchpadProject } from './types';

export const launchpadProjects = {
  DEFAULT: {
    id: 0,
    title: 'Coming Soon',
    coinTag: 'X',
    description:
      'Empower the most innovative crypto projects across all blockchains with Decryption.',
    about: '',
    imageSource: Default,
    website: '',
  } as LaunchpadProject,
  TLX: {
    id: 1,
    title: 'The Luxury Bank',
    coinTag: 'TLX',
    description:
      'The decentralized cryptocurrency that was created to become the token of reference for the luxury industry.',
    about:
      'Our goal is to have The Luxury (TLX) used as widely as possible across the interactive luxury industry, allowing developers and publishers new options for the exploitation of their products, integration of smart contracts, protection of in-metaverse assets and so much more.',
    imageSource: Default,
    website: '',
  } as LaunchpadProject,

  LSO: {
    id: 2,
    title: 'Luxandia - Metaverse',
    coinTag: 'LSO',
    description:
      'Luxandia is a virtual reality metaverse that reinvents and generalizes the way social experiences and  virtual creations are built.',
    about: '',
    imageSource: LuxandiaPng,
    website: 'luxandia.com',
    moreDetails: (
      <>
        Metaverse is more than just a movie concept. Users will have access to
        all the digital experiences they might encounter, replicating many of
        the actions they would find in the real world, such as shopping for
        clothes, buying property, and creating their own spaces.
        <br />
        <br />
        Metaverse, unlike a virtual ecosystem in a game, involves the management
        of financial data and transactions that run the economy and simulate
        what a user would encounter in the real world. Without this, users are
        likely to miss out on the truly immersive experience that the Metaverse
        has to offer.
      </>
    ),
  } as LaunchpadProject,

  TLC: {
    id: 2,
    title: 'The Luxury Coin',
    coinTag: 'TLC',
    description:
      'Luxandia is a virtual reality metaverse that reinvents and generalizes the way social experiences and  virtual creations are built.',
    about: '',
    imageSource: Default,
    website: '',
  } as LaunchpadProject,
  EPIC: {
    id: 4,
    title: 'Epic Auction',
    coinTag: 'EPIC',
    description:
      'Buy and sell platform which can be customized to Auction, Reverse Auction, Penny Auction and Silent Auction. The auction, buy it now, reverse, penny, and silent marketplaces we provide can be used by individual business owners, family businesses, multinational corporations, and government entities. Our Software runs on Cloud & Dedicated Servers, also works well with 50+cryptocurrencies',
    about: '',
    imageSource: EpicPng,
    website: 'https://epic.auction/',
    startTime_Year: 2022,
    startTime_Month: 10,
    startTime_Day: 23,
    startTime_Hour: 11,
    moreDetails: (
      <>
        <div className="mt-10">
          <p className="uppercase font-oswald text-2xl text-white">
            Pool Details
          </p>
          <div className="w-full mt-4">
            <div className="w-3/5 xl:w-4/5 lg:w-full md:w-full sm:w-full xs:w-full">
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Start/End:</p>
                <p className="text-green-400 text-md">
                  25 Oct 11am UTC – 7pm UTC
                </p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Registration:</p>
                <p className="text-green-400 text-md">
                  23 Oct 11am UTC – 24 Oct 8pm UTC
                </p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">FCFS Opens:</p>
                <p className="text-green-400 text-md">25 Oct 6:40pm UTC</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Swap Rate:</p>
                <p className="text-green-400 text-md">
                  1 EPIC=0.1 $TLC | 10 EPIC per 1 $TLC
                </p>
              </div>
            </div>
            <div className="mb-2 flex justify-start items-center space-x-5 font-poppins mt-1">
              <p className="text-gray-200">Base Allocation:</p>
              <p className="text-gray-300 text-md">
                Distribution is calculated based on power and number of users
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="uppercase font-oswald text-2xl text-white">Token</p>
          <div className="w-full mt-4">
            <div className="w-3/5 xl:w-4/5 lg:w-4/5 md:w-4/5 sm:w-full xs:w-full">
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Token:</p>
                <p className="text-green-400 text-md"> Epic Auction (EPIC)</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Total Supply:</p>
                <p className="text-green-400 text-md">1,000,000,000</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Initial Supply:</p>
                <p className="text-green-400 text-md">50,000,000 EPIC</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="uppercase font-oswald text-2xl text-white">
            Distribution
          </p>
          <div className="w-full mt-4">
            <div className="w-3/5 xl:w-4/5 lg:w-4/5 md:w-4/5 sm:w-full xs:w-full">
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Distribution:</p>
                <p className="text-green-400 text-md">Claimed on Decryption</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Cliff & Vesting:</p>
                <p className="text-green-400 text-md">
                  3 Months Cliff then 12 Months linear
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  } as LaunchpadProject,
  TPS: {
    id: 5,
    title: 'Top Software',
    coinTag: 'TPS',
    description:
      'We are creating a community of web3 product-loving enthusiasts sharing and discussing the latest mobile apps, websites, hardware projects, and technological innovations.',
    about: '',
    imageSource: TopPng,
    website: 'https://top.software/',
    startTime_Year: 2022,
    startTime_Month: 11,
    startTime_Day: 7,
    startTime_Hour: 11,
    moreDetails: (
      <>
        <div className="mt-10">
          <p className="uppercase font-oswald text-2xl text-white">
            Pool Details
          </p>
          <div className="w-full mt-4">
            <div className="w-3/5 xl:w-4/5 lg:w-full md:w-full sm:w-full xs:w-full">
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Start/End:</p>
                <p className="text-green-400 text-md">
                  10 Nov 11am UTC – 7pm UTC
                </p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Registration:</p>
                <p className="text-green-400 text-md">
                  7 Nov 11am UTC –9 Nov 8pm UTC
                </p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">FCFS Opens:</p>
                <p className="text-green-400 text-md">10 Nov t 6:40pm UTC</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Swap Rate:</p>
                <p className="text-green-400 text-md">
                  1 TPS=0.01 $TLC | 100 TPS per 1 $TLC
                </p>
              </div>
            </div>
            <div className="mb-2 flex justify-start items-center space-x-5 font-poppins mt-1">
              <p className="text-gray-200">Base Allocation:</p>
              <p className="text-gray-300 text-md">
                Distribution is calculated based on power and number of users
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="uppercase font-oswald text-2xl text-white">Token</p>
          <div className="w-full mt-4">
            <div className="w-3/5 xl:w-4/5 lg:w-4/5 md:w-4/5 sm:w-full xs:w-full">
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Token:</p>
                <p className="text-green-400 text-md"> Top Software (TPS)</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Total Supply:</p>
                <p className="text-green-400 text-md">1,000,000,000</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Initial Supply:</p>
                <p className="text-green-400 text-md">100,000,000 TPS</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="uppercase font-oswald text-2xl text-white">
            Distribution
          </p>
          <div className="w-full mt-4">
            <div className="w-3/5 xl:w-4/5 lg:w-4/5 md:w-4/5 sm:w-full xs:w-full">
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Distribution:</p>
                <p className="text-green-400 text-md">Claimed on Decryption</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Cliff & Vesting:</p>
                <p className="text-green-400 text-md">
                  3 Months Cliff then 12 Months linear
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  } as LaunchpadProject,
  BRSK: {
    id: 6,
    title: 'Bio Risk Block',
    coinTag: 'BRSK',
    description:
      'The platform is specialized in aggregating data and information related to Bio Risks and WMDs as well as mapping all related targets. Early detection center, Super PPE, Medical countermeasures, BWC strengthening, Sterilization tech, Superbunkers',
    about: '',
    imageSource: BrskPng,
    website: 'https://biorblock/',
    startTime_Year: 2022,
    startTime_Month: 10,
    startTime_Day: 7,
    startTime_Hour: 11,
    moreDetails: (
      <>
        <div className="mt-10">
          <p className="uppercase font-oswald text-2xl text-white">
            Pool Details
          </p>
          <div className="w-full mt-4">
            <div className="w-3/5 xl:w-4/5 lg:w-full md:w-full sm:w-full xs:w-full">
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Start/End:</p>
                <p className="text-green-400 text-md">
                  10 Oct 11am UTC – 7pm UTC
                </p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Registration:</p>
                <p className="text-green-400 text-md">
                  7 Oct 11am UTC –9 Oct 8pm UTC
                </p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">FCFS Opens:</p>
                <p className="text-green-400 text-md">10 Nov t 6:40pm UTC</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Swap Rate:</p>
                <p className="text-green-400 text-md">
                  1 BRSK = 0.5 $TLC | 2 BRSK per 1 $TLC
                </p>
              </div>
            </div>
            <div className="mb-2 flex justify-start items-center space-x-5 font-poppins mt-1">
              <p className="text-gray-200">Base Allocation:</p>
              <p className="text-gray-300 text-md">
                Distribution is calculated based on power and number of users
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="uppercase font-oswald text-2xl text-white">Token</p>
          <div className="w-full mt-4">
            <div className="w-3/5 xl:w-4/5 lg:w-4/5 md:w-4/5 sm:w-full xs:w-full">
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Token:</p>
                <p className="text-green-400 text-md"> Bio Risk Block (BRSK)</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Total Supply:</p>
                <p className="text-green-400 text-md">10,000,000</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Initial Supply:</p>
                <p className="text-green-400 text-md">5,000,000 BRSK</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p className="uppercase font-oswald text-2xl text-white">
            Distribution
          </p>
          <div className="w-full mt-4">
            <div className="w-3/5 xl:w-4/5 lg:w-4/5 md:w-4/5 sm:w-full xs:w-full">
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Distribution:</p>
                <p className="text-green-400 text-md">Claimed on Decryption</p>
              </div>
              <div className="mb-2 flex justify-between items-center space-x-5 font-poppins mt-1">
                <p className="text-gray-200">Cliff & Vesting:</p>
                <p className="text-green-400 text-md">
                  3 Months Cliff then 12 Months linear
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  } as LaunchpadProject,
};
