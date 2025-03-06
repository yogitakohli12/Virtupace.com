import { getToken, getUrl } from "@/config/url";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const fetcher = async () => {
  const token = getToken();
  const response = await axios.get<{ success: boolean; data: User }>(
    getUrl("api/user/get-profile"),
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response.data?.data;
};

const useGetUserProfile = () => {
  const token = getToken();
  return useQuery(["user-profile", String(!!token)], fetcher, {
    enabled: !!token,
  });
};

export default useGetUserProfile;
