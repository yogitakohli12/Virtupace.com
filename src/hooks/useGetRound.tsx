import { getUrl } from "@/config/url";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetRound = () => {
  return useQuery({
    queryKey: ["round"],
    queryFn: async () => {
      const reponse = await axios.get<{ data: IRound }>(
        getUrl("api/get-current-round")
      );
      return reponse.data.data;
    },
  });
};

export default useGetRound;
