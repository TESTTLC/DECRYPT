import SideBar from "./components/SideBar";
import OpenSideBarButton from "./components/OpenSideBarButton";
import Home from "./pages/Home";
import Stake from "./pages/Stake";
import Projects from "./pages/Projects";
import { Route, Routes } from "react-router-dom";
import { useGlobalContext } from "./utils/context";
import Header from "./components/Header";

const App = () => {
  const { isSidebarOpen } = useGlobalContext();
  // const { account, connectWallet, disconnectWallet, isMobile } =
  //   useWalletConnector();

  return (
    <div className="w-full ">
      <SideBar />
      <Header />
      {/* <Header
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
        account={account}
        isMobile={isMobile}
      /> */}
      <main
        className={`flex transition-all duration-500 ${
          isSidebarOpen ? "xs:ml-0 sm:ml-0 ml-56" : ""
        } xs:justify-center`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stake" element={<Stake />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>

      <OpenSideBarButton />
    </div>
  );
};

export default App;
