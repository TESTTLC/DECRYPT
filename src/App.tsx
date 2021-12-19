import React from "react";
import SideBar from "./components/SideBar";
import OpenSideBarButton from "./components/OpenSideBarButton";
import CountDown from "./pages/CountDown";
import Home from "./pages/Home";
import Stake from "./pages/Stake";
// import { BrowserRouter, Route, Router } from "react-router-dom";
import { Route, Link, BrowserRouter, Routes } from "react-router-dom";
import { useGlobalContext } from "./utils/context";
import Header from "./components/Header";
import { useWalletConnector } from "./hooks/useWalletConnector";

function App() {
  const { openSidebar, isSidebarOpen } = useGlobalContext();
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
        </Routes>
      </main>
      <OpenSideBarButton />
    </div>
  );
}

export default App;
