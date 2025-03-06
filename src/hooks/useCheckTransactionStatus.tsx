import { getUrl } from "@/config/url";
import { useDappStore } from "@/store/useDapp";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { ICreateOrder } from "./useCreateOrder";
import useSubmitConversion from "./useSubmitConversion";
import { campaign } from "./useCampaignManager";
import { useAccount } from "wagmi";
import { EventType, trackFBConversion } from "@/utils/trackFBConversion";
import useGetInfo from "./useGetInfo";

interface ICheckTransactionStatus {
  success: boolean;
  _value: number;
}

const useCheckTransactionStatus = ({
  handleRefetch,
}: {
  handleRefetch: () => void;
}) => {
  const { data: info } = useGetInfo();
  const { address } = useAccount();
  const router = useRouter();
  const setIsConversion = useDappStore((s) => s.setIsConversion);
  const params = useSearchParams();
  const { conversion } = useSubmitConversion();
  const checkTransaction = async (
    data: Record<string, any>
  ): Promise<ICheckTransactionStatus> => {
    return fetch(getUrl("api/order/check-transaction"), {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json());
  };

  const checkTransactionStatus = (
    data: Record<string, any>,
    order: ICreateOrder | null
  ) => {
    toast.dismiss();
    toast.loading("Transaction processing...", {
      duration: Infinity,
    });

    const interval = setInterval(() => {
      checkTransaction(data)
        .then(async (res) => {
          if (res.success) {
            clearInterval(interval);
            handleRefetch();
            toast.dismiss();
            conversion({ value: order?.purchase_usd_amount });

            campaign.logAction({
              action: "BUY",
              ref: order?.clickId,
              value: order?.purchase_usd_amount,
              isCompleted: true,
            });
            trackFBConversion({
              event_type: EventType.Purchase,
              value: order?.purchase_usd_amount?.toFixed(2),
              email: order?.fromAddress || "",
              country: info?.country || "",
            });
            try {
              (window as any).plausible("sale-final", {
                revenue: {
                  currency: "USD",
                  amount: order?.purchase_usd_amount?.toFixed(2),
                },
              });
            } catch (e) {}
            toast.success(
              "The transaction has been successfully processed, and the tokens you bought have been allocated to a vesting contract. You'll be able to claim them once the listing event begins.",
              {
                duration: 10000,
              }
            );
            setIsConversion(true);

            // router.reload();
          }
        })
        .catch((e) => console.log(e));
    }, 5000);
  };
  return { checkTransactionStatus };
};

export default useCheckTransactionStatus;
