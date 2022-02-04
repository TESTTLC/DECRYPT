declare global {
  interface Window {
    ethereum: any;
  }
}

/** @param chainId - the chain id in HEX*/
export const changeChain = async (chainId: string) => {
  //TLC-> 5177 - 0x1439
  //BSC-> 56 - 0x38
  try {
    if (window.ethereum) {
      const result = await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } else {
      console.error("Please install MetaMask");
    }
  } catch (error) {
    console.log("Please install MetaMask");
  }
};
