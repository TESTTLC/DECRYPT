/* eslint-disable no-nested-ternary */
import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiFillLock } from 'react-icons/ai';
import { Web3Provider } from '@ethersproject/providers';

import { ContractRoles, ThirdwebSDK } from '../thirdweb-dev/sdk';

import Sidebar from './components/Sidebar';
import OpenSidebarButton from './components/OpenSidebarButton';
import Footer from './components/Footer';
import Home from './pages/Home';
import Staking from './pages/Staking';
import StakeCoin from './pages/Staking/components/StakeCoin';
import Launchpad from './pages/Launchpad';
import LaunchpadProjectDetails from './pages/LaunchpadProjectDetails';
import TokenizationProjectDetails from './pages/TokenizationProjectDetails';
import CrossChainBridge from './pages/CrossChainBridge';
import DecentralizedExchange from './pages/DecentralizedExchange';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import DexDisclaimer from './pages/DexDisclaimer';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import { StoreState } from './utils/storeTypes';
import KYC from './pages/KYC';
import DHS from './pages/DHS';
import NFTMarketplace from './pages/NFTMarketplace/indexNew';
import NFTMarketplaceEditProfile from './pages/NFTMarketplaceEditProfile';
import NFTMarketplaceCategories from './pages/NFTMarketplaceCategories';
import NFTMarketplaceSidebar from './components/NFTMarketplaceSidebar';
import AssetTokenization from './pages/AssetTokenization';
import { routes } from './utils/routes';
import NFTMarketplaceStats from './pages/NFTMarketplaceStats';
import NFTMarketplaceProfile from './pages/NFTMarketplaceProfile';
import NFTMarketplaceCreateNFT from './pages/NFTMarketplaceCreateNFT';
import NFTMarketplaceCreateCollection from './pages/NFTMarketplaceCreateCollection';
import NFTMarketplaceCategory from './pages/NFTMarketplaceCategory';
import Login from './pages/Login';
// import Register from './pages/Register';
import { useCachedResources } from './hooks/useCachedResources';
// import { addHeaderPayloadToCookies } from './utils/functions/Cookies';
import { headerPayloadName } from './utils/globals';
import { setIsLoggedIn } from './redux/modules/account/actions';
import { addMinutesToCurrentDateTime } from './utils/functions/utils';
import { addHeaderPayloadToCookies } from './utils/functions/Cookies';
import NFTMarketplaceViewCollection from './pages/NFTMarketplaceViewCollection';

export const coinsTags = ['TLX', 'TLC', 'LSO'];
export const marketplaceRoutes = ['categories', 'collections'];

const App = () => {
  const { isLoading, isLoggedIn, dispatch } = useCachedResources();
  const location = useLocation();
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + 30 * 60 * 60 * 1000); //30 minutes
  // useAddress();
  // useMetamask();

  const isSidebarOpen = useSelector<StoreState, boolean>(
    (state) => state.globals.isSidebarOpen,
  );

  const provider = useSelector<StoreState, Web3Provider | undefined>(
    (state) => state.globals.provider,
  );

  const walletAddress = useSelector<StoreState, string | undefined>(
    (state) => state.account.walletAddress,
  );

  const shouldRenderMainHeader = () => {
    if (location.pathname.startsWith(routes.nftMarketplace.url)) {
      return false;
    }
    return true;
  };

  if (window && document && localStorage) {
    addHeaderPayloadToCookies();
  }
  if (localStorage.getItem(headerPayloadName)) {
    const headerPayload = localStorage.getItem(headerPayloadName);
    if (
      headerPayload &&
      JSON.parse(headerPayload).expiry >= addMinutesToCurrentDateTime(0)
    ) {
      dispatch(setIsLoggedIn(true));
    } else {
      setIsLoggedIn(false);
    }
  }

  return (
    <>
      <div className="bg-image"></div>
      <div className="z-10 flex flex-col font-poppins text-white">
        {isLoggedIn ? (
          <>
            <div className="z-50 flex items-center justify-center space-x-1 text-xs w-full h-8 bg-black bg-opacity-60 drop-shadow-xl shadow-lg">
              <AiFillLock size={14} color={'#34d399'} />
              <p>
                Scam/Phishing verification:{' '}
                <span className="text-green-400">https://</span>decryption.com
              </p>
            </div>
            {location.pathname.startsWith(routes.nftMarketplace.url) ? (
              <NFTMarketplaceSidebar />
            ) : (
              <Sidebar />
            )}

            <div className="flex flex-col w-full min-h-screen z-10">
              {shouldRenderMainHeader() && <Header />}
              <main
                className={`flex flex-col transition-all duration-500 ${
                  isSidebarOpen ? 'xs:ml-0 sm:ml-0 ml-60' : ''
                } xs:justify-center px-4 mb-auto z-20`}
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/staking/:coinTag" element={<StakeCoin />} />
                  <Route path="/staking" element={<Staking />} />
                  <Route path="/launchpad" element={<Launchpad />} />
                  <Route
                    path="/launchpad/:coinTag"
                    element={<LaunchpadProjectDetails />}
                  />
                  <Route
                    path="/crosschainbridge"
                    element={<CrossChainBridge />}
                  />
                  <Route path="/dex" element={<DecentralizedExchange />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                  <Route path="/termsofuse" element={<TermsOfUse />} />
                  <Route path="/dexdisclaimer" element={<DexDisclaimer />} />
                  <Route path="/kyc" element={<KYC />} />
                  <Route
                    path="/nftmarketplace/categories"
                    element={<NFTMarketplaceCategories />}
                  />
                  <Route
                    path="/nftmarketplace/stats"
                    element={<NFTMarketplaceStats />}
                  />
                  <Route
                    path="/nftmarketplace/editprofile"
                    element={<NFTMarketplaceEditProfile />}
                  />
                  <Route
                    path="/nftmarketplace/profile"
                    element={<NFTMarketplaceProfile />}
                  />
                  {/* <Route
                    path="/nftmarketplace/profile/:category"
                    element={<NFTMarketplaceProfile />}
                  /> */}
                  <Route
                    path="/nftmarketplace/create-nft"
                    element={<NFTMarketplaceCreateNFT />}
                  />
                  <Route
                    path="/nftmarketplace/view-collection/:contractAddress"
                    element={<NFTMarketplaceViewCollection />}
                  />
                  <Route
                    path="/nftmarketplace/create-collection"
                    element={<NFTMarketplaceCreateCollection />}
                  />
                  <Route
                    path="/nftmarketplace/category/:categoryId"
                    element={<NFTMarketplaceCategory />}
                  />
                  <Route path="/nftmarketplace" element={<NFTMarketplace />} />
                  <Route path="/tokenization" element={<AssetTokenization />} />
                  <Route
                    path="/tokenization/:coinTag"
                    element={<TokenizationProjectDetails />}
                  />
                  <Route path="/dhs" element={<DHS />} />

                  {/* <Route path="*" element={<NotFound />} /> */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </main>

              <div className="z-20">
                <Footer />
              </div>
            </div>

            <OpenSidebarButton />
          </>
        ) : (
          // (
          // )
          // : isLoading ? (
          //   <div className="z-10 flex flex-col w-full h-screen items-center justify-center font-poppins text-white">
          //     <img src={Logo} className="w-40 h-40 animate-bounce opacity-20" />
          //   </div>
          <div className="z-10 flex flex-col font-poppins text-white">
            <Routes>
              {/* <Route path="/register" element={<Register />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Login />} />

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
