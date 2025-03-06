import { create } from "zustand";
import { LeaderBoard } from "./leaderboard";
import { Swaps } from "./swaps";
import { Referrals } from "./referrals";

export const useDashboardAccordian = create<{
  active?: "leaderboard" | "referral" | "swap";
  setActive: (active?: "leaderboard" | "referral" | "swap") => void;
}>((set) => ({
  active: "leaderboard",
  setActive: (active) => set({ active }),
}));
export const DashboardAccordian = () => {
  return (
    <>
      <LeaderBoard />
      <Swaps />
      {/* <Referrals /> */}
    </>
  );
};
