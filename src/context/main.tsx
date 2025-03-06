"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";
// import { useSetCurrency } from "@/components/WalletDrawer/utils";
import { campaign } from "@/hooks/useCampaignManager";
import useCreateUser from "@/hooks/useCreateUser";
import useGetRound from "@/hooks/useGetRound";
import { EventType, trackFBConversion, addCampaignLog } from "@/utils/trackFBConversion";
import useGetInfo from "@/hooks/useGetInfo";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { setToken } from "@/config/url";
import { useRouter } from "next/router";

const roundToValueMapper = {
  0: 0,
  1: 2000000,
  2: 2000000,
  3: 2000000,
  4: 2000000,
  5: 2000000,
  6: 2000000,
  7: 2000000,
  8: 2000000,
  9: 2000000,
  10: 2000000,
};
export const getPreviousTotal = (currentRound: number) => {
  let previousTotal = 0;
  Object.entries(roundToValueMapper).forEach(([round, target]) => {
    if (parseInt(round) <= currentRound) {
      previousTotal += target;
    }
  });
  return previousTotal;
};
const initial_round = {
  tokens_allocated: 1_000_000_000,
  round_target: 500_000,
  round: 1,
  price_per_token: "0.000500",
  percent_increase_from_last_round: "0",
  percent_difference_to_listing_price: "1000.00",
  funds_raised_cumulative: "100033.46",
  percent_increase_next_round: "40",
  is_active: true,
};
const mainContext = createContext<{
  round: IRound;
  isLoadingRound: boolean;
  user: undefined | User;
  setUser: (user: undefined | User) => void;
  refetch: () => void;
  widgetSize: "sm" | "md";
  setWidgetSize: (size: "sm" | "md") => void;
}>({
  round: initial_round,
  isLoadingRound: false,
  user: undefined,
  widgetSize: "md",
  setUser: () => {},
  refetch: () => {},
  setWidgetSize: (size: "sm" | "md") => {},
});

export function MainProvider({ children }: { children: any }) {
  const [widgetSize, setWidgetSize] = useState<"sm" | "md">("md");
  const { address, isConnected } = useAccount();
  const [rounds, setRounds] = useState<IRound[]>([initial_round]);
  const [round, setRound] = useState<IRound>(initial_round);
  const [user, setUser] = useState<undefined | User>(undefined);
  const { data, isLoading } = useGetRound();
  const { data: _user, refetch } = useGetUserProfile();
  const { data: info } = useGetInfo();
  const { mutate } = useCreateUser();
  const router = useRouter();
  useEffect(() => {
    // campaign.setup(router.locale);
    addCampaignLog(
      {
        full_url: window.location.href,
        domain: window.location.host,
        ip: info?.ip || "",
        country: info?.name || "",
        type: "pageview",
      }
    )
    trackFBConversion({
      event_type: EventType.PageView,
      ...(address && { email: address?.toLowerCase() }),
      country: info?.name || "",
    });
  }, [router.locale]);
  useEffect(() => {
    if (data) {
      setRound(data);
    }
  }, [data]);
  useEffect(() => {
    if (_user) {
      setUser(_user);
    }
  }, [_user]);
  useEffect(() => {
    if (isConnected && !!address) {
      trackFBConversion({
        event_type: EventType.CompleteRegistration,
        email: address?.toLowerCase(),
        country: info?.name || "",
      });
      setTimeout(() => {
        campaign.logAction({
          action: "VISIT",
          isCompleted: true,
          ref: address?.toLowerCase(),
          wallet_address: address?.toLowerCase(),
        });
        try {
          (window as any).plausible("wallet-connect", {
            revenue: {
              currency: "USD",
              amount: 0,
            },
          });
        } catch (e) {}
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);
  useEffect(() => {
    if (address) {
      mutate(
        {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          userType: "wallet",
          wallet_address: address?.toLowerCase(),
        },
        {
          onSuccess: (data) => {
            localStorage.setItem("token", data?.data?.token);
            setToken(data?.data?.token);
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);
  return (
    <mainContext.Provider
      value={{
        round: round,
        isLoadingRound: isLoading,
        user,
        setUser,
        refetch,
        widgetSize,
        setWidgetSize,
      }}
    >
      {children}
    </mainContext.Provider>
  );
}

export const useMaincontext = () => useContext(mainContext);
