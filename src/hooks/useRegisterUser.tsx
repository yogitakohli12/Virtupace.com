import axios from "axios";

import { getUrl } from "@/config/url";
import { useMutation } from "@tanstack/react-query";
import { auth } from "./firebase";

export interface RegisterUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  firebase_token?: string;
  userType: "Manual";
}
interface UserData extends Omit<User, "wallet_address"> {
  wallet_address: WalletAddress;
}

interface Response {
  success: boolean;
  message: string;
  data: UserData;
  status: boolean;
  error: string;
}
export const fetcher = async (data: RegisterUserPayload) => {
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw "Invalid auth token";
  const response = await axios.post<Response>(getUrl("api/user/create-user"), {
    ...data,
    firebase_token: token,
  });
  return response.data;
};

const useRegisterUser = () => {
  return useMutation(fetcher);
};
export default useRegisterUser;
