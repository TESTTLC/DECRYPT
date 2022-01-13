import SideBar from "./components/SideBar";
import OpenSideBarButton from "./components/OpenSideBarButton";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Stake from "./pages/Stake";
import Launchpad from "./pages/Launchpad";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import { useGlobalContext } from "./utils/context";
import Header from "./components/Header";

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
            <Route path="/launchpad" element={<Launchpad />} />
            <Route path="/stake" element={<Stake />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <OpenSideBarButton />
    </div>
  );
};

export default App;
