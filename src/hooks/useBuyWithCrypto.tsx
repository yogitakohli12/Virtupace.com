import { ethers } from "ethers";
import { chainId } from "@/config/chainId";
import useNetwork from "./useNetwork";
import toast from "react-hot-toast";
import { CONSTANTS } from "@/config/constants";
import { BSC_ABI, ERC_ABI, POLYGON_ABI } from "@/config/abi";
import {
  BSC_USDT_SA,
  ERC_USDT_SA,
  POLYGON_USDT_SA,
} from "@/config/mainnet/usdt.address";
import { USDT_ABI, USDT_ERC_ABI } from "@/config/abi/usdt.abi";

const useBuyWithCrypto = () => {
  const { switchNetwork } = useNetwork();
  const buyWithMatic = async (amount: number) => {
    await switchNetwork(chainId.polygon);
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const amountWei = ethers.utils.parseEther(String(amount));
    const contract = new ethers.Contract(
      CONSTANTS.POLYGON_SALE_SA,
      POLYGON_ABI,
      signer
    );
    toast.dismiss();
    toast.loading('Click "Confirm"', { duration: Infinity });
    return contract.buyTokensNative({ value: amountWei });
  };
  const buyWithEthereum = async (amount: number, token: number) => {
    await switchNetwork(chainId.eth);
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const amountWei = ethers.utils.parseEther(String(amount));
    // console.log(String(amountWei));
    toast.dismiss();
    toast.loading('Click "Confirm"', { duration: Infinity });
    const contract = new ethers.Contract(
      CONSTANTS.ERC_SALE_SA,
      ERC_ABI,
      signer
    );
    return contract.buyTokensNative({
      value: amountWei,
    });
  };
  const buyWithBSC = async (amount: number) => {
    await switchNetwork(chainId.bsc);
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    const signer = provider.getSigner();
    const amountWei = ethers.utils.parseEther(String(amount));
    const contract = new ethers.Contract(
      CONSTANTS.BSC_SALE_SA,
      BSC_ABI,
      signer
    );
    toast.dismiss();
    toast.loading('Click "Confirm"', { duration: Infinity });
    return contract.buyTokensNative({ value: amountWei });
  };

  const buyWithUSDT = async (amount: number, token: number) => {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const chainID = network.chainId;
      const SALE_SA =
        network.chainId === chainId.polygon
          ? CONSTANTS.POLYGON_SALE_SA
          : network.chainId === chainId.bsc
          ? CONSTANTS.BSC_SALE_SA
          : CONSTANTS.ERC_SALE_SA;
      const SALE_ABI =
        chainID === chainId.polygon
          ? POLYGON_ABI
          : chainID === chainId.bsc
          ? BSC_ABI
          : ERC_ABI;
      const amountWei = ethers.utils.parseUnits(
        amount.toString(),
        network.chainId === chainId.bsc ? 18 : 6
      );

      const saleContract = new ethers.Contract(SALE_SA, SALE_ABI, signer);
      toast.dismiss();
      toast.loading('Click "Confirm"', { duration: Infinity });
      return saleContract.buyTokensUSDT(amountWei, {
        gasLimit: 100000,
      });
    } catch (e) {
      throw e;
    }
  };

  const approveUSDT = async (amount: number, address: string): Promise<any> => {
    try {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      if (
        ![chainId.eth, chainId.bsc, chainId.polygon].includes(network.chainId)
      ) {
        throw new Error("Please switch network to Polygon or BSC or Ethereum.");
      }
      const USDT_SA =
        network.chainId === chainId.polygon
          ? POLYGON_USDT_SA
          : network.chainId === chainId.bsc
          ? BSC_USDT_SA
          : ERC_USDT_SA;
      const SALE_SA =
        network.chainId === chainId.polygon
          ? CONSTANTS.POLYGON_SALE_SA
          : network.chainId === chainId.bsc
          ? CONSTANTS.BSC_SALE_SA
          : CONSTANTS.ERC_SALE_SA;
      const amountWei = ethers.utils.parseUnits(
        amount.toString(),
        network.chainId === chainId.bsc ? 18 : 6
      );
      toast.dismiss();
      toast.loading(
        'Click on "Use Default" and then Click "Next" and "Approve"',
        {
          duration: 100000,
        }
      );
      const contract = new ethers.Contract(
        USDT_SA,
        network.chainId === chainId.eth ? USDT_ERC_ABI : USDT_ABI,
        signer
      );

      if (network.chainId === chainId.eth) {
        const allowance = await contract.allowance(
          address,
          CONSTANTS.ERC_SALE_SA
        );
        if (Number(allowance) !== 0) {
          const tx: ITransaction = await contract.approve(
            CONSTANTS.ERC_SALE_SA,
            "0",
            {
              gasLimit: 100000,
            }
          );
          toast.dismiss();
          toast.loading("Please wait. Initial Approving...", {
            duration: Infinity,
          });
          await tx.wait();
          return contract.approve(CONSTANTS.ERC_SALE_SA, amountWei, {
            gasLimit: 100000,
          });
        }
        // if (Number(allowance) >= Number(amountWei)) {
        //   return Promise.resolve(null);
        // } else {
        return contract.approve(CONSTANTS.ERC_SALE_SA, amountWei, {
          gasLimit: 100000,
        });
        // }
      }
      return contract.approve(SALE_SA, amountWei, {
        gasLimit: 100000,
      });
    } catch (e) {
      throw e;
    }
  };
  return {
    buyWithBSC,
    buyWithMatic,
    buyWithEthereum,
    buyWithUSDT,
    approveUSDT,
  };
};

export default useBuyWithCrypto;
