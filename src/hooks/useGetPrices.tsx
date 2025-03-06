import { getUrl } from "@/config/url";
import { useDappStore } from "@/store/useDapp";
export interface IPrices {
  eth: number;
  bnb: number;
  matic: number;
  inr: number;
  trx: number;
  sol: number;
}
export const INR = 0.012;

const useGetPrices = () => {
  const prices = useDappStore((s) => s.prices);
  return { pricesPerUnit: prices };
};
export default useGetPrices;
