import { create } from "zustand";

export const getUrl = (route: string) => {
  return `${process.env.NEXT_PUBLIC_API_URL}/${route}`;
};
export const MM_DEEPLINK = `dapp://virtupace.com`;

export const TRUST_DEEPLINK = `https://link.trustwallet.com/open_url?url=https://virtupace.com`;

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null; // Return null if accessed from server-side
};

export const useToken = create<{
  token?: string | null;
  setToken: (token: string) => void;
}>((set) => ({
  token: getToken(),
  setToken: (token: string) => set({ token }),
}));

export const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    useToken.getState().setToken(token);
  }
};
