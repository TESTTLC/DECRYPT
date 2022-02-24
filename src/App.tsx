import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiFillLock } from 'react-icons/ai';

import SideBar from './components/SideBar';
import OpenSideBarButton from './components/OpenSideBarButton';
import Footer from './components/Footer';
import Home from './pages/Home';
import Staking from './pages/Staking';
import StakeCoin from './pages/Staking/components/StakeCoin';
import Launchpad from './pages/Launchpad';
import ProjectDetails from './pages/ProjectDetails';
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
import NFTMarketplace from './pages/NFTMarketplace';

export const coinsTags = ['TLX', 'TLC', 'LSO'];

const App = () => {
  const isSidebarOpen = useSelector<StoreState, boolean>(
    (state) => state.globals.isSidebarOpen,
  );
  return (
    <>
      <div className="bg-image"></div>
      <div className="z-10 flex flex-col font-poppins text-white">
        <div className="z-50 flex items-center justify-center space-x-1 text-xs w-full h-8 bg-black bg-opacity-60 drop-shadow-xl shadow-lg">
          <AiFillLock size={14} color={'#34d399'} />
          <p>
            Scam/Phishing verification:{' '}
            <span className="text-green-400">https://</span>decryption.com
          </p>
        </div>
        <SideBar />
        <div className="flex flex-col w-full min-h-screen z-10">
          <Header />
          <main
            className={` flex transition-all duration-500 ${
              isSidebarOpen ? 'xs:ml-0 sm:ml-0 ml-60' : ''
            } xs:justify-center px-5 mb-auto z-20`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/staking/:coinTag" element={<StakeCoin />} />
              <Route path="/launchpad" element={<Launchpad />} />
              <Route path="/launchpad/:coinTag" element={<ProjectDetails />} />
              <Route path="/crosschainbridge" element={<CrossChainBridge />} />
              <Route path="/dex" element={<DecentralizedExchange />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/termsofuse" element={<TermsOfUse />} />
              <Route path="/dexdisclaimer" element={<DexDisclaimer />} />
              <Route path="/kyc" element={<KYC />} />
              <Route path="/nftmarketplace" element={<NFTMarketplace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <div className="z-20">
            <Footer />
          </div>
        </div>

        <OpenSideBarButton />
      </div>
    </>
  );
};

export default App;
