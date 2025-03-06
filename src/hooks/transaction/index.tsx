import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { chainId } from "@/config/chainId";
// import useNetwork from "./useNetwork";
import toast from "react-hot-toast";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  useSwitchNetwork,
  useWaitForTransaction,
} from "wagmi";
import { TransactionReceipt } from "viem";
import useGetInfo from "@/hooks/useGetInfo";
import { CONSTANTS } from "@/config/constants";
import { BSC_ABI, ERC_ABI, POLYGON_ABI } from "@/config/abi";
import {
  BSC_USDT_SA,
  ERC_USDT_SA,
  POLYGON_USDT_SA,
} from "@/config/mainnet/usdt.address";
import { USDT_ABI, USDT_ERC_ABI } from "@/config/abi/usdt.abi";
type IOnSuccess = (data: TransactionReceipt) => void;
const handleWaiting = () => {
  toast.dismiss();
  toast.loading("Wait, your transaction is processing...", {
    duration: Infinity,
  });
};
export const useBuyWithEthereum = (onSuccess: IOnSuccess) => {
  const { address } = useAccount();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { chain } = useNetwork();
  const { data: info } = useGetInfo();
  const { writeAsync, reset, error, data } = useContractWrite({
    functionName: "buyTokensNative",
    abi: ERC_ABI,
    address: CONSTANTS.ERC_SALE_SA as `0x${string}`,
    account: address,
    chainId: chainId.eth,
    // gas: parseGwei("0.0001"),
    // maxFeePerGas: parseGwei("10"),
  });
  const { isLoading: isApproving } = useWaitForTransaction({
    hash: data ? data.hash : undefined,
    onSuccess,
  });
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id]);
  useEffect(() => {
    if (isApproving) {
      handleWaiting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproving]);

  const buyWithEthereum = async (amount: number) => {
    try {
      if (chain?.id !== chainId.eth) {
        try {
          await switchNetworkAsync?.(chainId.eth);
        } catch (e) {}
      }

      const amountWei = ethers.utils.parseEther(String(amount));
      toast.dismiss();
      toast.loading('Click "Confirm"', { duration: Infinity });
      return writeAsync?.({
        // args: [token.toFixed(0)],
        value: BigInt(+amountWei),
      });
    } catch (e) {
      throw error;
    }
  };
  return { buyWithEthereum };
};
export const useBuyWithMatic = (onSuccess: IOnSuccess) => {
  const { address } = useAccount();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { chain } = useNetwork();
  const { data: info } = useGetInfo();
  const { writeAsync, reset, error, data } = useContractWrite({
    functionName: "buyTokensNative",
    abi: POLYGON_ABI,
    address: CONSTANTS.POLYGON_SALE_SA as `0x${string}`,
    account: address,
    chainId: chainId.polygon,
    // gas: parseGwei("0.0001"),
  });
  const { isLoading: isApproving } = useWaitForTransaction({
    hash: data ? data.hash : undefined,
    onSuccess,
  });
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id]);
  useEffect(() => {
    if (isApproving) {
      handleWaiting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproving]);
  const buyWithMatic = async (amount: number) => {
    try {
      if (chain?.id !== chainId.polygon) {
        try {
          await switchNetworkAsync?.(chainId.polygon);
        } catch (e) {}
      }
      const amountWei = ethers.utils.parseEther(String(amount));
      toast.dismiss();
      toast.loading('Click "Confirm"', { duration: Infinity });
      return writeAsync?.({ value: BigInt(+amountWei) });
    } catch (e) {
      throw error;
    }
  };
  return { buyWithMatic };
};

export const useBuyWithBSC = (onSuccess: IOnSuccess) => {
  const { address } = useAccount();
  const { switchNetworkAsync } = useSwitchNetwork();
  const { chain } = useNetwork();
  const { writeAsync, reset, error, data } = useContractWrite({
    functionName: "buyTokensNative",
    abi: BSC_ABI,
    address: CONSTANTS.BSC_SALE_SA as `0x${string}`,
    account: address,
    chainId: chainId.bsc,
    // gas: parseGwei("0.0001"),
  });
  const { isLoading: isApproving } = useWaitForTransaction({
    hash: data ? data.hash : undefined,
    onSuccess,
  });
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id]);
  useEffect(() => {
    if (isApproving) {
      handleWaiting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproving]);
  const buyWithBSC = async (amount: number) => {
    try {
      if (chain?.id !== chainId.bsc) {
        try {
          await switchNetworkAsync?.(chainId.bsc);
        } catch (e) {}
      }
      const amountWei = ethers.utils.parseEther(String(amount));
      toast.dismiss();
      toast.loading('Click "Confirm"', { duration: Infinity });
      return writeAsync?.({ value: BigInt(+amountWei) });
    } catch (e) {
      throw error;
    }
  };
  return { buyWithBSC };
};

export const useBuyWithUSDT = (onSuccess: IOnSuccess) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const SALE_SA =
    chain?.id === chainId.polygon
      ? CONSTANTS.POLYGON_SALE_SA
      : chain?.id === chainId.bsc
      ? CONSTANTS.BSC_SALE_SA
      : CONSTANTS.ERC_SALE_SA;
  const SALE_ABI =
    chain?.id === chainId.polygon
      ? POLYGON_ABI
      : chain?.id === chainId.bsc
      ? BSC_ABI
      : ERC_ABI;
  const USDT_SA =
    chain?.id === chainId.polygon
      ? POLYGON_USDT_SA
      : chain?.id === chainId.bsc
      ? BSC_USDT_SA
      : ERC_USDT_SA;
  const ABI_MAPPER: Record<string, any> = {
    "1": USDT_ERC_ABI,
    "56": USDT_ABI,
    "137": USDT_ABI,
  };
  const { writeAsync, reset, error, data } = useContractWrite({
    functionName: "buyTokensUSDT",
    abi: SALE_ABI,
    address: SALE_SA as `0x${string}`,
    account: address,
    chainId: chain?.id,
    // gas: parseGwei("0.0001"),
  });
  const { refetch } = useContractRead({
    account: address,
    address: USDT_SA,
    chainId: chain?.id,
    abi: ABI_MAPPER[String(chain?.id)],
    functionName: "allowance",
    args: [address, SALE_SA],
  });
  const { isLoading: isApproving } = useWaitForTransaction({
    hash: data ? data.hash : undefined,
    onSuccess: async (data) => {
      onSuccess(data);
      // await refetch();
    },
  });
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id]);
  useEffect(() => {
    if (isApproving) {
      handleWaiting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproving]);

  const buyWithUSDT = async (amount: number) => {
    try {
      const amountWei = ethers.utils.parseUnits(
        amount.toString(),
        chain?.id === chainId.bsc ? 18 : 6
      );
      toast.dismiss();
      toast.loading('Click "Confirm"', { duration: Infinity });
      // const value =
      //   chain?.id === chainId.eth ? Number(token).toFixed(0) : amountWei;

      return writeAsync?.({
        args: [amountWei],
      });
    } catch (e) {
      throw error;
    } finally {
      await refetch();
    }
  };
  return { buyWithUSDT };
};

export const useApproveUSDT = (onSuccess: IOnSuccess) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const USDT_SA =
    chain?.id === chainId.polygon
      ? POLYGON_USDT_SA
      : chain?.id === chainId.bsc
      ? BSC_USDT_SA
      : ERC_USDT_SA;
  const SALE_SA =
    chain?.id === chainId.polygon
      ? CONSTANTS.POLYGON_SALE_SA
      : chain?.id === chainId.bsc
      ? CONSTANTS.BSC_SALE_SA
      : CONSTANTS.ERC_SALE_SA;
  const ABI_MAPPER: Record<string, any> = {
    "1": USDT_ERC_ABI,
    "56": USDT_ABI,
    "137": USDT_ABI,
  };
  const { data, refetch } = useContractRead({
    account: address,
    address: USDT_SA,
    chainId: chain?.id,
    abi: ABI_MAPPER[String(chain?.id)],
    functionName: "allowance",
    args: [address, SALE_SA],
  });
  const allowance = Number(data);
  const {
    writeAsync,
    reset,
    error,
    data: _data,
  } = useContractWrite({
    functionName: "approve",
    address: USDT_SA,
    abi: ABI_MAPPER[String(chain?.id)],
    account: address,
    chainId: chain?.id,
    // ...(chain?.id === chainId.polygon && {
    //   gas: parseGwei("0.0001"),
    // }),
  });
  const [isInitialApproving, setIsInitialApproving] = useState<boolean>(false);
  const {
    isLoading: isApproving,
    isSuccess,
    data: waitData,
  } = useWaitForTransaction({
    hash: _data ? _data.hash : undefined,
  });
  const onApproveSuccess = async (data: TransactionReceipt) => {
    onSuccess(data);
    reset();
    await refetch();
  };
  useEffect(() => {
    if (isSuccess && waitData) {
      onApproveSuccess(waitData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, waitData]);
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain?.id]);
  useEffect(() => {
    if (isApproving && !isInitialApproving) {
      handleWaiting();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApproving, isInitialApproving]);
  const approveUSDT = async (amount: number): Promise<any> => {
    try {
      const amountWei = ethers.utils.parseUnits(
        amount.toString(),
        chain?.id === chainId.bsc ? 18 : 6
      );
      if (
        ![chainId.eth, chainId.bsc, chainId.polygon].includes(
          chain?.id as number
        )
      ) {
        throw new Error("Please switch network to Polygon or BSC or Ethereum.");
      }
      toast.dismiss();
      toast.loading(
        'Click on "Use Default" and then Click "Next" and "Approve"',
        {
          duration: Infinity,
        }
      );
      console.log(
        "allowance",
        Number(allowance),
        "amount wei",
        Number(amountWei)
      );
      if (Number(allowance) >= Number(amountWei)) {
        return Promise.resolve(null);
      }
      if (chain?.id === chainId.eth) {
        setIsInitialApproving(true);
        if (Number(allowance) !== 0) {
          toast.dismiss();
          toast.loading("Please wait. Initial Approving...", {
            duration: Infinity,
          });
          await writeAsync?.({
            args: [SALE_SA, "0"],
          });
          setIsInitialApproving(false);
        }
        return writeAsync?.({
          args: [SALE_SA, amountWei],
        });
      }
      return writeAsync?.({
        args: [SALE_SA, amountWei],
      });
    } catch (e) {
      console.log(e);
      throw error;
    } finally {
      await refetch();
    }
  };
  return { approveUSDT };
};
