import { getUrl } from "@/config/url";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useCheckEmailExistsForWallet = (wallet_address?: string) => {
  return useQuery(
    ["check-email-for-wallet"],
    async () => {
      const reponse = await axios.get<{ exists: boolean }>(
        getUrl("api/check-email-for-wallet"),
        {
          params: {
            wallet_address,
          },
        }
      );
      return reponse.data;
    },
    {
      enabled: !!wallet_address,
    }
  );
};

export default useCheckEmailExistsForWallet;
