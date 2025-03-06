import { getUrl } from "@/config/url";
import { useMaincontext } from "@/context/main";
import { useWallet as useSolonaWallet } from "@solana/wallet-adapter-react";
import { useWallet as useTronWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";

const useGetBalance = () => {
  const { address } = useAccount();
  const { publicKey } = useSolonaWallet();
  const { address: tron_address } = useTronWallet();

  const { user } = useMaincontext();
  const wallet_address =
    address?.toLowerCase() ||
    user?.wallet_address ||
    publicKey?.toBase58().toLowerCase() ||
    tron_address?.toLowerCase() ||
    "";
  return useQuery({
    queryKey: ["balance", wallet_address],
    queryFn: async () => {
      if (!wallet_address) return 0;
      const res = await axios.post(getUrl("api/order/get-balance"), {
        wallet_address: wallet_address,
      });
      return res.data?.data;
    },
  });
};
export default useGetBalance;
