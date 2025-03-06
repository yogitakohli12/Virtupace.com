import axios from "axios";
import { getToken, getUrl } from "@/config/url";
import { useQuery } from "@tanstack/react-query";

export interface Response {
  data: { id: number; value: string; fromAddress: string; clickId: string };
  success: boolean;
}

const fetcher = async () => {
  const token = getToken();
  const response = await axios.get<{ data: IPaymentGateway; message: string }>(
    getUrl("api/get-current-pg"),
    {
      headers: {
        ...(!!token && { Authorization: token }),
      },
    }
  );
  return response.data.data;
};
const useGetCardPaymentGateway = () => {
  const token = getToken();
  return useQuery({
    queryKey: ["card-payment-gateway"],
    queryFn: fetcher,
    enabled: !!token,
  });
};
export default useGetCardPaymentGateway;
