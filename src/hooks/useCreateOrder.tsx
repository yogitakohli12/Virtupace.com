import axios from "axios";

import { getToken, getUrl } from "@/config/url";
import { campaign } from "./useCampaignManager";

export interface ICreateOrderResponse {
  res: {
    data: { id: number; value: string; _from: string; clickId: string };
  };
  message: string;
  status: boolean;
}
export interface ICreateOrder {
  value: string | number;
  clickId: string;
  fromAddress: string;
  currency: string;
  chain: string;
  campaign?: string;
  source?: string;
  country?: string;
  purchase_usd_amount: number;
  token_quantity: number;
  round_value: number;
  round_number: number;
  upi_id?: string;
  email?: string;
  token?: string;
  referral_url?: string;
  referral_domain?: string;
  bonus?: string;
}

export const createOrder = async (
  data: ICreateOrder
): Promise<ICreateOrderResponse["res"]> => {
  const token = getToken();
  const response = await axios.post(getUrl("api/order/create-order"), data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(!!token && { Authorization: token }),
    },
  });
  return response.data.res;
};
