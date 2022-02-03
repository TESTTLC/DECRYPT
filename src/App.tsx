import SideBar from "./components/SideBar";
import OpenSideBarButton from "./components/OpenSideBarButton";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Staking from "./pages/Staking";
import StakeCoin from "./pages/Staking/components/StakeCoin";
import Launchpad from "./pages/Launchpad";
import ProjectDetails from "./pages/ProjectDetails";
import CrossChainBridge from "./pages/CrossChainBridge";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { useGlobalContext } from "./utils/context";
import Header from "./components/Header";
import blockchainImage from "src/assets/images/blockchain2.jpeg";

export const coinsTags = ["TLX", "TLC", "LSO"];

const App = () => {
  const { isSidebarOpen } = useGlobalContext();
  // const { account, connectWallet, disconnectWallet, isMobile } =
  //   useWalletConnector();
  return (
    <>
      {/* <img
        src={blockchainImage}
        className="bg-image absolute bg-repeat bg-center bg-fixed blur-xl z-0 h-full"
        alt={"bgImage"}
      /> */}
      <div className="bg-image"></div>
      <div className="z-10 flex flex-col">
        {/* <div className="flex absolute top-0 bottom-0 right-0 left-0 bg-red-200"></div> */}
        <SideBar />
        <div className="flex flex-col w-full min-h-screen z-10">
          <Header />
          <main
            className={`flex transition-all duration-500 ${
              isSidebarOpen ? "xs:ml-0 sm:ml-0 ml-60" : ""
            } xs:justify-center px-5 mb-auto z-20`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/staking" element={<Staking />} />
              <Route path="/staking/:coinTag" element={<StakeCoin />} />
              <Route path="/launchpad" element={<Launchpad />} />
              <Route path="/project/:coinTag" element={<ProjectDetails />} />
              <Route path="/crosschainbridge" element={<CrossChainBridge />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
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
