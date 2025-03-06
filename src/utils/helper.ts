import { rpcUrl } from "@/config/contract-config";
import { ethers } from "ethers";

export const getProvider = () => new ethers.providers.JsonRpcProvider(rpcUrl);

export const truncate = (str: string, maxDecimalDigits: number) => {
  if (str.length > 19) {
    // if the string is more than 19 characters, more than 1e18
    return (
      str.slice(0, str.length - 18) +
      "." +
      str.slice(str.length - 18, maxDecimalDigits + str.length - 18)
    );
  } else {
    return str[0] + "." + str.slice(1, maxDecimalDigits + 1);
  }
};
