import { getUrl } from "@/config/url";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
interface TopSalesResponse {
  limit: number;
  orders: TopSale[];
}
const useGetTopSales = (limit: number = 10) => {
  return useQuery(["top-orders", limit], async () => {
    const reponse = await axios.get<TopSalesResponse>(
      getUrl(`api/top-orders?limit=${limit}`)
    );
    const orders = reponse.data.orders || [];
    return { orders };
  });
};

export default useGetTopSales;
