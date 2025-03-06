import { getUrl } from "@/config/url";

interface IMarkPaymentResponse {
  data: { id: number; value: string; fromAddress: string; clickId: string };
  success: boolean;
}

const useMarkCardPayment = () => {
  const markPayment = async (
    data: Record<string, any>
  ): Promise<IMarkPaymentResponse> => {
    return fetch(getUrl("api/order/mark-card-payment"), {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
  };
  return { markPayment };
};

export default useMarkCardPayment;
