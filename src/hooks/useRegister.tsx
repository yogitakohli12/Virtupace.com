import axios from "axios";

import { getUrl } from "@/config/url";
import { useMutation } from "@tanstack/react-query";

export interface JoinWaitlist {
  name: string;
  email: string;
  wallet_address?: string;
}

export const fetcher = async (data: JoinWaitlist) => {
  const response = await axios.post(getUrl("api/add-email-wallet"), data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return response.data;
};

const useRegister = () => {
  return useMutation(fetcher);
};
export default useRegister;
