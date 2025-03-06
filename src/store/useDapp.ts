import { INR, IPrices } from "@/hooks/useGetPrices";
import { create } from "zustand";

type AccountType = string | null;

type Promo = {
  code: string;
  bonus_percentage: number;
  upper_limit: number;
};
export enum Currency {
  INR = "₹",
  USD = "$",
}
export interface DAppSlice {
  account: AccountType;
  setAccount: (account: AccountType) => void;
  isBuyingWithWert: boolean;
  setIsBuyingWithWert: (isBuyingWithWert: boolean) => void;
  isBuyingWithPaybis: boolean;
  setIsBuyingWithPaybis: (isBuyingWithPaybis: boolean) => void;
  isConversion: boolean;
  setIsConversion: (isConversion: boolean) => void;
  selectedCurrency: Currency;
  setSelectedCurrency: (selectedCurrency: Currency) => void;
  isJoinWaitingListOpen: boolean;
  setIsJoinWaitingListOpen: (isJoinWaitingListOpen: boolean) => void;
  prices: IPrices;
  setPrices: (prices: IPrices) => void;
  isVideoOpen: boolean;
  setIsVideoOpen: (isVideoOpen: boolean) => void;
  videoSrc: string;
  setVideoSrc: (videoSrc: string) => void;
  clickId: string;
  setClickId: (clickId: string) => void;
}

export const useDappStore = create<DAppSlice>((set) => ({
  account: null,
  setAccount: (account: AccountType) => set({ account }),
  isBuyingWithWert: false,
  setIsBuyingWithWert: (isBuyingWithWert: boolean) => set({ isBuyingWithWert }),
  isBuyingWithPaybis: false,
  setIsBuyingWithPaybis: (isBuyingWithPaybis: boolean) =>
    set({ isBuyingWithPaybis }),
  isConversion: false,
  setIsConversion: (isConversion: boolean) => set({ isConversion }),

  selectedCurrency: Currency.USD,
  setSelectedCurrency: (selectedCurrency: Currency) =>
    set({ selectedCurrency }),
  isJoinWaitingListOpen: false,
  setIsJoinWaitingListOpen: (isJoinWaitingListOpen: boolean) =>
    set({ isJoinWaitingListOpen }),
  prices: {
    bnb: 0,
    eth: 0,
    inr: 0.012,
    matic: 0,
    sol: 0,
    trx: 0,
  },
  setPrices: (prices: IPrices) => set({ prices }),
  isVideoOpen: false,
  setIsVideoOpen: (isVideoOpen: boolean) => set({ isVideoOpen }),
  videoSrc: "",
  setVideoSrc: (videoSrc: string) => set({ videoSrc }),
  clickId: "",
  setClickId: (clickId: string) => set({ clickId }),
}));
