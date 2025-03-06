import { useEffect } from "react";
import { chainId } from "@/config/chainId";
// import useNetwork from "./useNetwork";
import toast from "react-hot-toast";
import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSendTransaction,
  useWaitForTransaction,
} from "wagmi";
import { TransactionReceipt } from "viem";
import { OWNER_EVM_WALLET } from "@/config/mainnet/owner.address";
import { CONSTANTS } from "@/config/constants";
import { BSC_ABI, ERC_ABI, POLYGON_ABI } from "@/config/abi";
type IOnSuccess = (data: TransactionReceipt) => void;
const handleWaiting = () => {
  toast.dismiss();
  toast.loading("Transaction processing...", {
    duration: Infinity,
  });
};
export const useBuyWithNative = (onSuccess: IOnSuccess, amountWei: bigint) => {
  const { sendTransactionAsync, data } = useSendTransaction({
    to: OWNER_EVM_WALLET,
    value: amountWei,
    data: "0x",
  });
  const { isLoading: isApproving } = useWaitForTransaction({
    hash: data ? data.hash : undefined,
    onSuccess,
  });
  useEffect(() => {
    if (isApproving) {
      handleWaiting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproving]);

  return { buyWithNative: sendTransactionAsync };
};

export const useBuyWithUSDT = (
  onSuccess: IOnSuccess,
  amount: string | number
) => {
  const { chain } = useNetwork();
  const ABI_MAPPER: Record<string, any> = {
    "1": ERC_ABI,
    "56": BSC_ABI,
    "137": POLYGON_ABI,
  };
  const SALE_SA =
    chain?.id === chainId.polygon
      ? CONSTANTS.POLYGON_SALE_SA
      : chain?.id === chainId.bsc
      ? CONSTANTS.BSC_SALE_SA
      : CONSTANTS.ERC_SALE_SA;

  const { data, writeAsync, error, isLoading } = useContractWrite({
    address: SALE_SA as `0x${string}`,
    abi: ABI_MAPPER[String(chain?.id)],
    functionName: "buyTokensUSDT",
    args: [amount],
  });
  const { isLoading: isApproving } = useWaitForTransaction({
    hash: data ? data.hash : undefined,
    onSuccess: async (data) => {
      onSuccess(data);
    },
  });

  useEffect(() => {
    if (isApproving) {
      handleWaiting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproving]);
  return { buyWithUSDT: writeAsync };
};
