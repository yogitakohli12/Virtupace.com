import WertModule from "@wert-io/module-react-component";
import { signSmartContractData } from "@wert-io/widget-sc-signer";
import { useEffect } from "react";
import Web3 from "web3";
import { Buffer } from "buffer";

import toast from "react-hot-toast";
import useMarkCardPayment from "@/hooks/useMarkCardPayment";
import { useDappStore } from "@/store/useDapp";
import useSubmitConversion from "@/hooks/useSubmitConversion";
import { useAccount } from "wagmi";
import { CONSTANTS } from "@/config/constants";
import { campaign } from "@/hooks/useCampaignManager";
import { EventType, trackFBConversion } from "@/utils/trackFBConversion";
import useGetInfo from "@/hooks/useGetInfo";
import { useMaincontext } from "@/context/main";

type WertPaymentStatus =
  | "pending"
  | "cancelled"
  | "failed"
  | "success"
  | "failover";
const WertCardPayment: React.FC<{
  value: number;
  onSuccess: () => void;
  tokenAmount: number;
  inputUSD: number;
}> = ({ value, tokenAmount, onSuccess, inputUSD }) => {
  const { markPayment } = useMarkCardPayment();
  const prices = useDappStore((s) => s.prices);
  const { address: account } = useAccount();
  const { user } = useMaincontext();
  const { setIsConversion } = useDappStore(({ setIsConversion }) => ({
    setIsConversion,
  }));
  const { data: info } = useGetInfo();
  const clickId = sessionStorage.getItem("clickId");
  const { conversion } = useSubmitConversion();
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      "https://responsive-quiet-hill.quiknode.pro/1f5688cbafa0173798048bf78f4440c55dcba825/"
    )
  );
  const privateKey = process.env.NEXT_PUBLIC_WERT_PRIVATE_KEY;
  const equivalentBNB = (1 / prices.bnb) * +inputUSD;
  const token_in_wei = web3.utils.toWei(String(tokenAmount), "ether");
  const bnb_in_wei = web3.utils.toWei(String(equivalentBNB), "ether");
  const address = account?.toLowerCase() || user?.wallet_address?.toLowerCase();
  const sc_input_data = web3.eth.abi.encodeFunctionCall(
    {
      inputs: [
        { internalType: "address", name: "user", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
        { internalType: "uint256", name: "price", type: "uint256" },
      ],
      name: "buyTokensWert",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    [address, token_in_wei, bnb_in_wei]
  );
  const signedData = signSmartContractData(
    {
      address: address?.toLowerCase() as string,
      commodity: "BNB",
      network: "bsc",
      sc_address: CONSTANTS.BSC_SALE_SA,
      sc_input_data,
      commodity_amount: value,
    },
    privateKey!
  );

  const options = {
    partner_id: CONSTANTS.WERT_PARTNER_ID,
    origin: "https://widget.wert.io",
    container_id: "widget-widget",
    click_id: clickId,
    autosize: true,
    theme: "dark",
    color_background: "transparent",
    color_border: "transparent",
    currency: "USD",
    listeners: {
      loaded: () => console.log("loaded"),
      "payment-status": async (data: {
        status: WertPaymentStatus;
        tx_id: string;
      }) => {
        if (data.status === "success") {
          try {
            onSuccess();
            setIsConversion(true);
            const res = await markPayment({
              click_id: clickId,
              txn_hash: data.tx_id,
            });
            // conversion({
            //   value: +inputUSD,
            //   email: account as string,
            // });
            trackFBConversion({
              event_type: EventType.Purchase,
              value: +inputUSD,
              email: account,
              country: info?.country || "",
            });
            try {
              (window as any).plausible("sale-final", {
                revenue: {
                  currency: "USD",
                  amount: inputUSD?.toFixed(2),
                },
              });
            } catch (e) {}
            campaign.logAction({
              action: "BUY",
              ref: clickId ?? "",
              value: +inputUSD,
              isCompleted: true,
            });
            try {
            } catch (e) {}
          } catch (e) {
            toast.error("Transaction failed.");
          }
        }
        if (data.status === "failed") {
          toast.error("Transaction failed.");
        }
        if (data.status === "pending") {
        }
      },
    },
    ...signedData,
    // ...nftOptions,
  };

  useEffect(() => {
    (window as any).Buffer = Buffer;
  }, []);
  return <WertModule title="Buy NFT" options={options}></WertModule>;
};

export default WertCardPayment;
