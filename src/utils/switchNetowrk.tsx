import { ethers } from "ethers";
import toast from "react-hot-toast";

export const switchNetwork = async (
  targetChain: number,
  isAddingChain: boolean = false
) => {
  if (!(window as any).ethereum) {
    window.location.assign(`dapp://5thscape.com`);
    return;
  }
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  try {
    if (isAddingChain) {
      await provider.send("wallet_addEthereumChain", [
        {
          chainId: "0x" + targetChain.toString(16),
          chainName: "Polygon Mainnet",
          rpcUrls: ["https://polygon-rpc.com"],
          nativeCurrency: {
            decimals: 18,
            name: "Polygon",
            symbol: "MATIC",
          },
          blockExplorerUrls: ["https://polygonscan.com/"],
        },
      ]);
    }
    const network = await provider.getNetwork();
    if (network.chainId !== targetChain) {
      toast.dismiss();
      toast.loading("Please switch network", { duration: Infinity });
      return provider.send("wallet_switchEthereumChain", [
        { chainId: "0x" + targetChain.toString(16) },
      ]);
    }
  } catch (error: any) {
    if (isAddingChain && error.code === 4902) {
      toast.error("Please add the network first.");
    }
  } finally {
    toast.dismiss();
  }
};
