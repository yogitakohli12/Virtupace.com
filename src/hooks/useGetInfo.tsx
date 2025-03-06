import { getUrl } from "@/config/url";
import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
interface GeoData {
  country: string;
  name: string;
  native: string;
  phone: number[];
  continent: string;
  capital: string;
  currency: string[];
  languages: string[];
  continent_name: string;
  ip: string;
}

const useGetInfo = () => {
  return useQuery({
    queryKey: ["info"],
    queryFn: async () => {
      const reponse = await axios.get<GeoData>(getUrl("api/get-info"));
      return reponse.data;
    },
  });
};

export default useGetInfo;
