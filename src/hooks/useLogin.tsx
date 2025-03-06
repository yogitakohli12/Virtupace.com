import { getUrl } from "@/config/url";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "./firebase";

interface Payload {
  email?: string;
  password?: string;
  firebase_token?: string;
  userType: "Manual";
}
const fetcher = async (data: Payload) => {
  const token = await auth?.currentUser?.getIdToken();
  if (!token) throw "Invalid auth token";
  const response = await axios.post<{
    user_exists: boolean;
    error: string;
    data: User & {
      token: string;
    };
  }>(getUrl("api/user/login"), { ...data, firebase_token: token });
  return response.data;
};
function useLogin() {
  return useMutation(fetcher);
}
export default useLogin;
