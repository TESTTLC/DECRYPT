import React, {
  useState,
  useContext,
  createContext,
  ReactElement,
} from "react";
import { ethers } from "ethers";
import { useWindowSize } from "../hooks/useWindowSize";

// const AppContext = createContext({
//   isSidebarOpen: true,
//   openSidebar: () => {},
//   closeSidebar: () => {},
//   provider: new ethers.providers.JsonRpcProvider(
//     "https://bsc-dataseed1.defibit.io/"
//   ),
//   setProvider: (value: ethers.providers.Web3Provider) => {},
//   account?: '',
//   setAccount: (value: string) => {},
// });

interface IAppContext {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  provider?: ethers.providers.Web3Provider;
  setProvider: (value?: ethers.providers.Web3Provider) => void;
  account?: string | undefined;
  setAccount: (value?: string) => void;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

const AppProvider = ({ children }: { children: ReactElement<any, any> }) => {
  const { isMobile } = useWindowSize();
  const [account, setAccount] = useState<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [provider, setProvider] = useState<
    ethers.providers.Web3Provider | any
  >();

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        openSidebar,
        closeSidebar,
        provider,
        setProvider,
        account,
        setAccount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };