import SideBar from "./components/SideBar";
import OpenSideBarButton from "./components/OpenSideBarButton";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Staking from "./pages/Staking";
import StakeCoin from "./pages/Staking/components/StakeCoin";
import Launchpad from "./pages/Launchpad";
import CrossChainBridge from "./pages/CrossChainBridge";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { useGlobalContext } from "./utils/context";
import Header from "./components/Header";

export const coinsTags = ["TLX", "TLC", "LSO"];

const App = () => {
  const { isSidebarOpen } = useGlobalContext();
  // const { account, connectWallet, disconnectWallet, isMobile } =
  //   useWalletConnector();
  return (
    <div>
      <SideBar />
      <div className="flex flex-col w-full h-screen">
        <Header />
        <main
          className={`flex transition-all duration-500 ${
            isSidebarOpen ? "xs:ml-0 sm:ml-0 ml-60" : ""
          } xs:justify-center px-5 mb-auto`}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/staking/:coinTag" element={<StakeCoin />} />
            <Route path="/launchpad" element={<Launchpad />} />
            <Route path="/crosschainbridge" element={<CrossChainBridge />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <OpenSideBarButton />
    </div>
  );
};

export default App;
