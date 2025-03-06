import { useMutation } from "@tanstack/react-query";
import { getUrl } from "@/config/url";
import axios from "axios";

const useCreateUser = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await axios.post(getUrl("api/user/create-user"), data);
      return res.data;
    },
  });
};

export default useCreateUser;
