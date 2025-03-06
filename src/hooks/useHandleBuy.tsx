import {
  chainIdToChainMapper,
  currencyToChainMapper,
} from "@/utils/currencyChainMapper";
import { getCountry } from "@/utils/getCountry";
import { getUUID } from "@/utils/getUUID";
import { ethers } from "ethers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
// import tronWeb from "tronweb";
// import useBuyWithCrypto from "./useBuyWithCrypto";
import useCheckTransactionStatus from "./useCheckTransactionStatus";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import {
  ICreateOrder,
  ICreateOrderResponse,
  createOrder,
} from "./useCreateOrder";
import { IPrices } from "./useGetPrices";
import { decipher } from "@/utils/crypto";
// import useOnRrampPayment from "./useOnRrampPayment";
import { useDappStore } from "@/store/useDapp";
import { CARD_PAYMENT_GATEWAY, CURRENCY_TYPE } from "@/@types/enum";
import encryptAmount from "@/utils/encryptAmount";
import postErrorLog from "@/utils/postErrorLog";
import { useBuyWithNative, useBuyWithUSDT } from "./transaction/evm";
import { chainId } from "@/config/chainId";
import { TransactionReceipt } from "viem";
import useGetInfo from "./useGetInfo";
import { parseEther } from "ethers/lib/utils";
import useSolTransaction from "./transaction/sol";
import { SystemProgram, Transaction, PublicKey } from "@solana/web3.js";
import { useWallet as useWalletTron } from "@tronweb3/tronwallet-adapter-react-hooks";
import {
  createTransferInstruction,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { SOLANA_USDT_SA, TRON_USDT_SA } from "@/config/mainnet/usdt.address";
import {
  OWNER_EVM_WALLET,
  OWNER_SOLANA_WALLET,
  OWNER_TRON_WALLET,
} from "@/config/mainnet/owner.address";
import {
  useApproveUSDT,
  useBuyWithBSC,
  useBuyWithEthereum,
  useBuyWithMatic,
} from "./transaction";
import useBuyWithCrypto from "./useBuyWithCrypto";
import useGetCardPaymentGateway from "./useGetCardPaymentGateway";
import { campaign } from "./useCampaignManager";
import { EventType, trackFBConversion } from "@/utils/trackFBConversion";
import { Bonus } from "@/components/landing/BuySection/BuyWidget/BuyingMessage";
import { useMaincontext } from "@/context/main";

const useHandleBuy = ({
  pricesPerUnit,
  currency,
  round,
  inputState,
  switchedCurrency,
  handleRefetch,
  isNative,
  getEquivalentUSDT,
  bonuses,
}: {
  pricesPerUnit: IPrices;
  currency: string;
  round: IRound;
  inputState: number | string;
  switchedCurrency: string;
  handleRefetch: () => void;
  isNative: boolean;
  getEquivalentUSDT: () => number;
  bonuses: Bonus[];
}) => {
  const { data: info } = useGetInfo();
  const { wallet, connection } = useSolTransaction();
  const {
    publicKey,
    sendTransaction: sendSolTransaction,
    signTransaction: signTxn,
  } = wallet;
  const { data: pg } = useGetCardPaymentGateway();
  const { setIsBuyingWithWert, setIsBuyingWithPaybis, setClickId } =
    useDappStore();
  const { user } = useMaincontext();
  const [equivalentInputAmount, setEquivalentInputAmount] = useState<number>(0);
  const { switchNetworkAsync } = useSwitchNetwork();
  const [orderConfig, setOrderConfig] = useState<{
    order: ICreateOrder | null;
    response: ICreateOrderResponse["res"] | null;
  }>({ order: null, response: null });
  const { approveUSDT } = useApproveUSDT(onSuccessApprove);
  // const { buyWithUSDT } = useBuyWithUSDT(onSuccess);
  const { buyWithEthereum } = useBuyWithEthereum(onSuccess);
  const { buyWithMatic } = useBuyWithMatic(onSuccess);
  const { buyWithBSC } = useBuyWithBSC(onSuccess);
  const { chain } = useNetwork();
  const { checkTransactionStatus } = useCheckTransactionStatus({
    handleRefetch,
  });
  const { buyWithUSDT: buyWithUSDT_ETH, approveUSDT: approveUSDT_ETH } =
    useBuyWithCrypto();
  const amountToWei =
    equivalentInputAmount && String(equivalentInputAmount).trim() !== ""
      ? parseEther(equivalentInputAmount.toFixed(6))
      : parseEther("0");
  const amountToUSDT = equivalentInputAmount * 10 ** 6;
  const { data } = useGetInfo();
  const [isBuying, setIsBuying] = useState<boolean>(false);
  const params = useSearchParams();
  const { signTransaction, address: addressT } = useWalletTron();
  // const { buyWithNative } = useBuyWithNative(onSuccess, amountToWei as any);
  const { buyWithUSDT } = useBuyWithUSDT(
    onSuccess,
    chain?.id === chainId.bsc ? (amountToWei as any) : (amountToUSDT as any)
  );
  const { address } = useAccount();
  const [tokenAmount, setTokenAmount] = useState<number>(0);
  const [isLoadingPaybis, setIsLoadingPaybis] = useState<boolean>(false);
  const transactionVerifier = async (
    tx: TransactionReceipt | ITransaction,
    order: ICreateOrder | null,
    response: ICreateOrderResponse["res"] | null
  ) => {
    let txnHash = "";
    if ("wait" in tx && "hash" in tx) {
      txnHash = tx.hash;
      toast.dismiss();
      toast.loading("Transaction processing...", {
        duration: Infinity,
      });
      await tx.wait();
    }
    if ("transactionHash" in tx) {
      txnHash = tx.transactionHash;
    }
    try {
      toast.dismiss();
      toast.success("Transaction confirmed.", {
        duration: 5000,
      });
      const data = response?.data;
      checkTransactionStatus(
        {
          value: Number(data?.value),
          clickId: order?.clickId,
          fromAddress: data?._from,
          txnHash,
        },
        order
      );
    } catch (e) {
      setError({
        ...error,
        show: true,
        message: "Transaction failed. Please check block explorer.",
        type: "error",
      });
      postErrorLog(e, { tokenAmount, currency, inputState, address });
    }
  };
  async function onSuccessApprove() {
    toast.dismiss();
    toast.loading('Click "Confirm"', {
      duration: Infinity,
    });
    try {
      const tx = await buyWithUSDT?.();
    } catch (e: any) {
      setError({
        ...error,
        show: true,
        message:
          e?.shortMessage || "Transaction failed. Please check block explorer.",
        type: "error",
      });
    }
  }
  function onSuccess(data: TransactionReceipt) {
    const { order, response } = orderConfig;
    transactionVerifier(data, order, response);
  }
  const getEquivalentToken = (inputValue: number) => {
    if (
      !isNative ||
      switchedCurrency === "usdt" ||
      switchedCurrency === "card"
    ) {
      setTokenAmount(Math.floor(Number(inputValue) / +round.price_per_token));
    } else if (switchedCurrency === "eth") {
      setTokenAmount(
        Math.floor(
          (Number(pricesPerUnit.eth) / +round.price_per_token) * inputValue
        )
      );
    } else if (switchedCurrency === "matic") {
      setTokenAmount(
        Math.floor(
          (Number(pricesPerUnit.matic) / +round.price_per_token) * inputValue
        )
      );
    } else if (switchedCurrency === "bnb") {
      setTokenAmount(
        Math.floor(
          (Number(pricesPerUnit.bnb) / +round.price_per_token) * inputValue
        )
      );
    } else if (switchedCurrency === "sol") {
      setTokenAmount(
        Math.floor(
          (Number(pricesPerUnit.sol) / +round.price_per_token) * inputValue
        )
      );
    } else if (switchedCurrency === "trx") {
      setTokenAmount(
        Math.floor(
          (Number(pricesPerUnit.trx) / +round.price_per_token) * inputValue
        )
      );
    }
  };
  const getSourceCampaignCountry = () => {
    const campaign = (params.get("utm_campaign") || "") as string;
    const source = (params.get("utm_source") || "") as string;
    const country = data?.name || getCountry();
    const affID = params.get("ref") ? decipher(params.get("ref")!) : "";
    const fx_clickId = params.get("clickId") || "";
    const referral_url = document.referrer;
    const referral_domain = referral_url ? new URL(referral_url).host : "";
    return {
      campaign,
      source,
      country,
      affID,
      fx_clickId,
      referral_domain,
      referral_url,
    };
  };
  const [error, setError] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "error",
  });
  const handleError = (e: any, chain?: string) => {
    toast.dismiss();
    if (e && (e.code === "ACTION_REJECTED" || e.code === 4001)) {
      setError({
        ...error,
        show: true,
        message: "You have rejected the transaction.",
        type: "error",
      });
    } else if (
      e &&
      (e.code === "INSUFFICIENT_FUNDS" ||
        (e.error && e.error.code === -32000) ||
        (e.data && e.data.code === -32000))
    ) {
      setError({
        ...error,
        show: true,
        message: "Insufficient funds in your wallet",
        type: "error",
      });
    } else if (e && (e?.shortMessage || e?.name || e?.message)) {
      setError({
        ...error,
        show: true,
        message: e?.shortMessage || e?.name || e?.message,
        type: "error",
      });
    } else {
      setError({
        ...error,
        show: true,
        message:
          "Error occured. Please check your transaction details in block explorer.",
        type: "error",
      });
    }
    postErrorLog(e, { tokenAmount, currency, inputState, address, chain });
  };

  const trackInitiateCheckout = (clickId: string, email: string) => {
    trackFBConversion({
      event_type: EventType.InitiateCheckout,
      email,
      country: info?.name || "",
      clickId,
    });
  };
  const handleBuyWithCard = async () => {
    const others = getSourceCampaignCountry();
    setIsBuying(true);
    const clickId = getUUID();
    sessionStorage.setItem("clickId", clickId);
    trackInitiateCheckout(
      clickId,
      user?.email ||
        address?.toLowerCase() ||
        user?.wallet_address?.toLowerCase() ||
        ""
    );
    try {
      const data = {
        value: Number(inputState),
        clickId,
        fromAddress:
          address?.toLowerCase() || user?.wallet_address?.toLowerCase() || "",
        currency: "USD",
        chain: "card",
        purchase_usd_amount: Number(inputState),
        round_value: +round.price_per_token,
        token_quantity: Number(tokenAmount),
        round_number: round.round,
        token: encryptAmount(1),
        bonus: bonuses
          .filter((item) => item.checked)
          .map((item) => item.value)
          .join(","),
        ...others,
      };
      const response = await createOrder(data);
      campaign.logAction({
        action: "BUY",
        ref: clickId,
        value: data.purchase_usd_amount,
        isCompleted: false,
        wallet_address: data.fromAddress,
      });
      if (!pg || pg.name === CARD_PAYMENT_GATEWAY.WERT) {
        return setIsBuyingWithWert(true);
      }
      if (pg.name === CARD_PAYMENT_GATEWAY.PAYBIS) {
        setIsBuying(false);
        setClickId(clickId);
        return setIsBuyingWithPaybis(true);
      }
    } catch (e: any) {
      toast.error("Failed to process transaction");
      setIsBuying(false);
    }
  };
  const buyWithPaybis = async (clickId: string, amount: number) => {
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currencyCodeFrom: "USD",
          currencyCodeTo: "ETH",
          amount: amount.toFixed(2),
          directionChange: "from",
          isReceivedAmount: false,
          paymentMethod: "virtu-pace-credit-card",
        }),
      });
      const data = await res.json();
      fetch("/api/request", {
        method: "POST",
        body: JSON.stringify({
          partnerUserId: clickId,
          locale: "en",
          quoteId: data.id,
          paymentMethod: "virtu-pace-credit-card",
          cryptoWalletAddress: {
            address: OWNER_EVM_WALLET,
            currencyCode: "ETH",
            tag: "",
          },
        }),
      })
        .then((res) => res.json())
        .then(({ requestId }) => {
          (window as any)?.PartnerExchangeWidget.open({
            requestId,
          });
        })
        .catch((e) => console.log(e));
    } catch (e) {}
  };
  const handleBuyWithUPI = async (upiId: string, email: string) => {
    try {
      const others = getSourceCampaignCountry();
      const clickId = getUUID();
      sessionStorage.setItem("clickId", clickId);
      trackInitiateCheckout(
        clickId,
        user?.email || address?.toLowerCase() || ""
      );
      const data = {
        value: Number(inputState),
        clickId,
        fromAddress: address?.toLowerCase() || "",
        currency: "INR",
        chain: "card",
        purchase_usd_amount: Number(inputState) * pricesPerUnit["inr"],
        round_value: +round.price_per_token,
        token_quantity: Number(tokenAmount),
        round_number: round.round,
        upi_id: upiId,
        token: encryptAmount(pricesPerUnit.inr),
        email,
        bonus: bonuses
          .filter((item) => item.checked)
          .map((item) => item.value)
          .join(","),
        ...others,
      };
      const response = await createOrder(data);
      campaign.logAction({
        action: "BUY",
        ref: clickId,
        value: data.purchase_usd_amount,
        isCompleted: false,
        wallet_address: data.fromAddress,
      });
      return true;
    } catch (e: any) {
      toast.error(e?.response?.data?.message);
    }
  };

  const handleBuyWithEthereum = async () => {
    const others = getSourceCampaignCountry();
    try {
      const purchase_usd_amount =
        currency === switchedCurrency
          ? Number(pricesPerUnit.eth) * Number(inputState)
          : Number(inputState);
      const clickId = getUUID();
      sessionStorage.setItem("clickId", clickId);
      trackInitiateCheckout(
        clickId,
        user?.email || address?.toLowerCase() || ""
      );
      const data: ICreateOrder = {
        value: equivalentInputAmount,
        clickId,
        fromAddress: address?.toLowerCase() || "",
        currency: currency.toUpperCase(),
        chain: currencyToChainMapper[currency],
        purchase_usd_amount,
        round_value: +round.price_per_token,
        token_quantity: Number(tokenAmount),
        round_number: round.round,
        token: encryptAmount(pricesPerUnit.eth),
        bonus: bonuses
          .filter((item) => item.checked)
          .map((item) => item.value)
          .join(","),
        ...others,
      };
      const response = await createOrder(data);
      // campaign.logAction({
      //   action: "BUY",
      //   ref: clickId,
      //   value: data.purchase_usd_amount,
      //   isCompleted: false,
      //   wallet_address: data.fromAddress,
      // });
      const tx = await buyWithEthereum(+equivalentInputAmount.toFixed(5));
      setOrderConfig({ order: data, response });
      // setOrderConfig({ order: data });
    } catch (e: any) {
      if (e?.response?.data?.message) toast.error(e?.response?.data?.message);
      handleError(e);
    } finally {
      setIsBuying(false);
    }
  };
  const handleBuyWithBSC = async () => {
    setIsBuying(true);
    const others = getSourceCampaignCountry();
    try {
      const equivalentInputAmount =
        currency === switchedCurrency
          ? +inputState
          : (1 / pricesPerUnit.bnb) * +inputState;
      const purchase_usd_amount =
        currency === switchedCurrency
          ? Number(pricesPerUnit.bnb) * Number(inputState)
          : Number(inputState);
      const clickId = getUUID();
      sessionStorage.setItem("clickId", clickId);
      trackInitiateCheckout(
        clickId,
        user?.email || address?.toLowerCase() || ""
      );
      const data: ICreateOrder = {
        value: equivalentInputAmount,
        clickId,
        fromAddress: address?.toLowerCase() || "",
        currency: currency.toUpperCase(),
        chain: currencyToChainMapper[currency],
        purchase_usd_amount,
        round_value: +round.price_per_token,
        round_number: round.round,
        token_quantity: Number(tokenAmount),
        token: encryptAmount(pricesPerUnit.bnb),
        bonus: bonuses
          .filter((item) => item.checked)
          .map((item) => item.value)
          .join(","),
        ...others,
      };
      const response = await createOrder(data);
      // campaign.logAction({
      //   action: "BUY",
      //   ref: clickId,
      //   value: data.purchase_usd_amount,
      //   isCompleted: false,
      //   wallet_address: data.fromAddress,
      // });
      const tx = await buyWithBSC(+equivalentInputAmount.toFixed(5));
      setOrderConfig({ order: data, response });
    } catch (e: any) {
      if (e?.response?.data?.message) toast.error(e?.response?.data?.message);
      handleError(e);
    } finally {
      setIsBuying(false);
    }
  };

  const handleBuyWithUSDT = async () => {
    const others = getSourceCampaignCountry();
    const token = encryptAmount(1);
    const clickId = getUUID();
    trackInitiateCheckout(clickId, user?.email || address?.toLowerCase() || "");
    try {
      sessionStorage.setItem("clickId", clickId);
      const data: ICreateOrder = {
        value: Number(inputState),
        clickId,
        fromAddress: address?.toLowerCase() || "",
        currency: "USDT",
        chain: chainIdToChainMapper[String(chain?.id)],
        purchase_usd_amount: Number(inputState),
        round_value: +round.price_per_token,
        round_number: round.round,
        token_quantity: Number(tokenAmount),
        token,
        bonus: bonuses
          .filter((item) => item.checked)
          .map((item) => item.value)
          .join(","),
        ...others,
      };
      const response = await createOrder(data);
      // campaign.logAction({
      //   action: "BUY",
      //   ref: clickId,
      //   value: data.purchase_usd_amount,
      //   isCompleted: false,
      //   wallet_address: data.fromAddress,
      // });
      setOrderConfig({ order: data, response });
      // const tx = await buyWithUSDT?.();
      // if (chain?.id === chainId.eth) {
      //   const approveTx = await approveUSDT_ETH(+inputState, address || "");
      //   if (approveTx && approveTx.wait) {
      //     toast.dismiss();
      //     toast.loading("Wait for your transaction to be approved", {
      //       duration: Infinity,
      //     });
      //     await approveTx.wait();
      //   }
      //   const tx = await buyWithUSDT_ETH(+inputState, tokenAmount);
      //   await transactionVerifier(tx, data, response);
      // } else {
      const approveTx = await approveUSDT(+inputState);
      if (!approveTx) {
        onSuccessApprove();
      }
      // }
    } catch (e: any) {
      console.log(e);
      if (e?.response?.data?.message) toast.error(e?.response?.data?.message);
      handleError(e, chainIdToChainMapper[String(chain?.id)]);
    } finally {
      setIsBuying(false);
    }
  };
  const handleBuyWithMatic = async () => {
    const others = getSourceCampaignCountry();
    if (chain?.id !== chainId.polygon)
      await switchNetworkAsync?.(chainId.polygon);
    try {
      const equivalentInputAmount =
        currency === switchedCurrency
          ? +inputState
          : (1 / pricesPerUnit.matic) * +inputState;
      const purchase_usd_amount =
        currency === switchedCurrency
          ? Number(pricesPerUnit.matic) * Number(inputState)
          : Number(inputState);
      const clickId = getUUID();
      sessionStorage.setItem("clickId", clickId);
      trackInitiateCheckout(
        clickId,
        user?.email || address?.toLowerCase() || ""
      );
      const data: ICreateOrder = {
        value: equivalentInputAmount,
        clickId,
        fromAddress: address?.toLowerCase() || "",
        currency: currency.toUpperCase(),
        chain: currencyToChainMapper[currency],
        purchase_usd_amount,
        round_value: +round.price_per_token,
        round_number: round.round,
        token: encryptAmount(pricesPerUnit.matic),
        token_quantity: Number(tokenAmount),
        bonus: bonuses
          .filter((item) => item.checked)
          .map((item) => item.value)
          .join(","),
        ...others,
      };
      const response = await createOrder(data);
      // campaign.logAction({
      //   action: "BUY",
      //   ref: clickId,
      //   value: data.purchase_usd_amount,
      //   isCompleted: false,
      //   wallet_address: data.fromAddress,
      // });
      const tx = await buyWithMatic(+equivalentInputAmount.toFixed(5));
      setOrderConfig({ order: data, response });
    } catch (e: any) {
      if (e?.response?.data?.message) toast.error(e?.response?.data?.message);
      handleError(e);
    } finally {
      setIsBuying(false);
    }
  };

  const handleBuyWithSol = async () => {
    const others = getSourceCampaignCountry();
    if (!publicKey) throw new WalletNotConnectedError();

    try {
      const purchase_usd_amount =
        currency === switchedCurrency
          ? Number(pricesPerUnit.sol) * Number(inputState)
          : Number(inputState);
      const clickId = getUUID();
      sessionStorage.setItem("clickId", clickId);
      trackInitiateCheckout(
        clickId,
        user?.email || publicKey?.toBase58()?.toLowerCase() || ""
      );
      const data: ICreateOrder = {
        value: equivalentInputAmount,
        clickId,
        fromAddress: publicKey?.toBase58()?.toLowerCase() || "",
        currency: "SOL",
        chain: "solana",
        purchase_usd_amount,
        round_value: +round.price_per_token,
        round_number: round.round,
        token: encryptAmount(pricesPerUnit.sol),
        token_quantity: Number(tokenAmount),
        bonus: bonuses
          .filter((item) => item.checked)
          .map((item) => item.value)
          .join(","),
        ...others,
      };
      const response = await createOrder(data);
      // campaign.logAction({
      //   action: "BUY",
      //   ref: clickId,
      //   value: data.purchase_usd_amount,
      //   isCompleted: false,
      //   wallet_address: data.fromAddress,
      // });
      setOrderConfig({ order: data, response });

      const destinoPublicKey = new PublicKey(OWNER_SOLANA_WALLET);
      const amountToLamports = equivalentInputAmount * 10 ** 9;
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: destinoPublicKey,
          lamports: amountToLamports,
        })
      );
      console.log({
        transaction,
        connection,
        amountToLamports,
        destinoPublicKey,
      });
      try {
        const {
          context: { slot: minContextSlot },
          value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();
        console.log({ blockhash, lastValidBlockHeight });
        const signature = await sendSolTransaction(transaction, connection);
        const result = await connection.confirmTransaction({
          blockhash,
          lastValidBlockHeight,
          signature,
        });
        if (result.value?.err) {
          return toast.error(
            "Transaction error occured. Please check it in block explorer."
          );
        }
        await transactionVerifier(
          { transactionHash: signature } as TransactionReceipt,
          data,
          response
        );
      } catch (e) {
        handleError(e);
      }
    } catch (e: any) {
      if (e?.response?.data?.message) toast.error(e?.response?.data?.message);
      handleError(e);
    } finally {
      setIsBuying(false);
    }
  };

  const handleBuyWithSolUSDT = async () => {
    const others = getSourceCampaignCountry();
    const token = encryptAmount(1);
    const clickId = getUUID();
    trackInitiateCheckout(
      clickId,
      user?.email || publicKey?.toBase58()?.toLowerCase() || ""
    );
    try {
      sessionStorage.setItem("clickId", clickId);
      const data: ICreateOrder = {
        value: Number(inputState),
        clickId,
        fromAddress: publicKey?.toBase58()?.toLowerCase() || "",
        currency: "USDT",
        chain: "solana",
        purchase_usd_amount: Number(inputState),
        round_value: +round.price_per_token,
        round_number: round.round,
        token_quantity: Number(tokenAmount),
        token,
        bonus: bonuses
          .filter((item) => item.checked)
          .map((item) => item.value)
          .join(","),
        ...others,
      };
      const response = await createOrder(data);
      // campaign.logAction({
      //   action: "BUY",
      //   ref: clickId,
      //   value: data.purchase_usd_amount,
      //   isCompleted: false,
      //   wallet_address: data.fromAddress,
      // });
      setOrderConfig({ order: data, response });
      const amountToLamports =
        parseFloat(String(equivalentInputAmount)) * 10 ** 6;
      const usdt_publicKey = new PublicKey(SOLANA_USDT_SA);
      const owner_publicKey = new PublicKey(OWNER_SOLANA_WALLET);
      try {
        let sourceAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          wallet?.publicKey as any,
          usdt_publicKey,
          wallet?.publicKey as any,
          false,
          "confirmed"
        );
        let destinationAccount = await getOrCreateAssociatedTokenAccount(
          connection,
          wallet.publicKey as any,
          usdt_publicKey,
          owner_publicKey,
          false,
          "confirmed"
        );
        console.log({ sourceAccount, destinationAccount });
        const tx = new Transaction();
        tx.add(
          createTransferInstruction(
            sourceAccount.address,
            destinationAccount.address,
            wallet?.publicKey as any,
            amountToLamports
          )
        );
        const latestBlockHash = await connection.getLatestBlockhash(
          "confirmed"
        );

        tx.recentBlockhash = latestBlockHash.blockhash;
        tx.feePayer = wallet?.publicKey as any;

        const signature = await sendSolTransaction(tx, connection);

        await connection.confirmTransaction({
          blockhash: latestBlockHash.blockhash,
          lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
          signature,
        });
        // await transactionVerifier(
        //   { transactionHash: signature } as TransactionReceipt,
        //   data,
        //   response
        // );
      } catch (e: any) {
        console.log(e);
      }
    } catch (e: any) {
      console.log(e);
      if (e?.response?.data?.message) toast.error(e?.response?.data?.message);
      handleError(e, chainIdToChainMapper[String(chain?.id)]);
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
      setIsBuying(false);
    }
  };

  const handleBuyWithTron = async () => {
    const others = getSourceCampaignCountry();
    const token = encryptAmount(pricesPerUnit.trx);
    const clickId = getUUID();
    trackInitiateCheckout(
      clickId,
      user?.email || addressT?.toLowerCase() || ""
    );
    try {
      const purchase_usd_amount =
        currency === switchedCurrency
          ? Number(pricesPerUnit.trx) * Number(inputState)
          : Number(inputState);
      sessionStorage.setItem("clickId", clickId);
      const data: ICreateOrder = {
        value: equivalentInputAmount,
        clickId,
        fromAddress: addressT?.toLowerCase() || "",
        currency: "TRX",
        chain: "tron",
        purchase_usd_amount,
        round_value: +round.price_per_token,
        round_number: round.round,
        token_quantity: Number(tokenAmount),
        token,
        bonus: bonuses
          .filter((item) => item.checked)
          .map((item) => item.value)
          .join(","),
        ...others,
      };
      const response = await createOrder(data);
      // campaign.logAction({
      //   action: "BUY",
      //   ref: clickId,
      //   value: data.purchase_usd_amount,
      //   isCompleted: false,
      //   wallet_address: data.fromAddress,
      // });
      setOrderConfig({ order: data, response });
      try {
        const TRXamount = (window as any)?.tronWeb.toSun(equivalentInputAmount);
        console.log({ TRXamount });
        const transaction = await (
          window as any
        )?.tronWeb.transactionBuilder.sendTrx(
          OWNER_TRON_WALLET,
          TRXamount,
          addressT
        );
        const signedTransaction = await signTransaction(transaction);
        const res = await (window as any)?.tronWeb.trx.sendRawTransaction(
          signedTransaction
        );
        // if (res.result) {
        //   await transactionVerifier(
        //     { transactionHash: res.transaction.txID } as TransactionReceipt,
        //     data,
        //     response
        //   );
        // }
      } catch (error) {
        console.log("TRX Error", error);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
      setIsBuying(false);
    }
  };

  async function handleBuyWithTronUSDT() {
    const USDTamount = (window as any)?.tronWeb.toSun(equivalentInputAmount);
    const token = encryptAmount(1);
    const others = getSourceCampaignCountry();
    const clickId = getUUID();
    trackInitiateCheckout(
      clickId,
      user?.email || addressT?.toLowerCase() || ""
    );
    try {
      sessionStorage.setItem("clickId", clickId);
      const data: ICreateOrder = {
        value: Number(inputState),
        clickId,
        fromAddress: addressT?.toLowerCase() || "",
        currency: "USDT",
        chain: "tron",
        purchase_usd_amount: Number(inputState),
        round_value: +round.price_per_token,
        round_number: round.round,
        token_quantity: Number(tokenAmount),
        token,
        bonus: bonuses
          .filter((item) => item.checked)
          .map((item) => item.value)
          .join(","),
        ...others,
      };
      const response = await createOrder(data);
      // campaign.logAction({
      //   action: "BUY",
      //   ref: clickId,
      //   value: data.purchase_usd_amount,
      //   isCompleted: false,
      //   wallet_address: data.fromAddress,
      // });
      setOrderConfig({ order: data, response });
      const usdtContract = await (window as any)?.tronWeb
        .contract()
        .at(TRON_USDT_SA);
      const res = await usdtContract
        .transfer(OWNER_TRON_WALLET, USDTamount)
        .send();
      if (res) {
        // await transactionVerifier(
        //   { transactionHash: res } as TransactionReceipt,
        //   data,
        //   response
        // );
      }
    } catch (error) {
      console.log("TRX USDT Error", error);
    } finally {
      setTimeout(() => {
        toast.dismiss();
      }, 2000);
      setIsBuying(false);
    }
  }

  // const handleOnRampPayment = async (clickId: string) => {
  //   onrampInstance.config.coinAmount =
  //     Math.ceil((+inputState / pricesPerUnit.eth) * 1000) / 1000;
  //   onrampInstance.config.merchantRecognitionId = clickId;
  //   onrampInstance?.show();
  // };

  const checkError = () => {
    const minInrRequired = 1;
    if (currency === CURRENCY_TYPE.upi) {
      if (+inputState < minInrRequired) {
        setError({
          ...error,
          show: true,
          message: `The amount must be at least ₹ ${Number(
            minInrRequired
          ).toFixed(0)}`,
        });
        return true;
      } else {
        return false;
      }
    }
    if (currency !== CURRENCY_TYPE.upi && currency !== CURRENCY_TYPE.card) {
      const minTokensRequired = 0.1 / +round.price_per_token;
      if (+tokenAmount < minTokensRequired) {
        setError({
          ...error,
          show: true,
          message: `The amount of tokens must be at least ${Number(
            minTokensRequired
          ).toFixed(0)}`,
        });
        return true;
      } else {
        setError({
          ...error,
          show: false,
          message: "",
        });
        return false;
      }
    }
    if (currency === CURRENCY_TYPE.card) {
      const min_card_usd = pg?.name === CARD_PAYMENT_GATEWAY.PAYBIS ? 10 : 5;
      const minTokensRequired = min_card_usd / +round.price_per_token;
      if (+tokenAmount < minTokensRequired) {
        setError({
          ...error,
          show: true,
          message: `The amount of tokens must be at least ${Number(
            minTokensRequired
          ).toFixed(0)}`,
        });
        return true;
      } else {
        setError({
          ...error,
          show: false,
          message: "",
        });
        return false;
      }
    }
  };

  const handleBuy = async () => {
    if (checkError()) {
      return;
    }
    if (isBuying) return;
    setError({ ...error, show: false });
    if (currency !== "card" && currency !== "upi") {
      setIsBuying(true);
    }
    if (!isNative) {
      if (currency === CURRENCY_TYPE.sol) {
        return handleBuyWithSolUSDT();
      } else if (currency === CURRENCY_TYPE.trx) {
        return handleBuyWithTronUSDT();
      } else {
        return handleBuyWithUSDT();
      }
    }
    if (currency === "card") {
      return handleBuyWithCard();
    } else if (currency === "matic") {
      return handleBuyWithMatic();
    } else if (currency === "eth") {
      return handleBuyWithEthereum();
    } else if (currency === "bnb") {
      return handleBuyWithBSC();
    } else if (currency === CURRENCY_TYPE.sol) {
      return handleBuyWithSol();
    } else if (currency === CURRENCY_TYPE.trx) {
      return handleBuyWithTron();
    }
  };
  useEffect(() => {
    getEquivalentToken(+inputState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputState, switchedCurrency, isNative]);

  useEffect(() => {
    if (currency !== switchedCurrency) {
      if (currency === CURRENCY_TYPE.sol) {
        setEquivalentInputAmount(
          Math.ceil(
            (1 / pricesPerUnit[currency as keyof IPrices]) *
              +inputState *
              1_000_000_000
          ) / 1_000_000_000
        );
      } else {
        setEquivalentInputAmount(
          (1 / pricesPerUnit[currency as keyof IPrices]) * +inputState
        );
      }
    } else {
      setEquivalentInputAmount(+inputState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, switchedCurrency, inputState]);
  // useEffect(() => {
  //   (window as any).PartnerExchangeWidget.events = {
  //     onopened: () => {
  //       setIsBuyingWithPaybis(false);
  //       setIsLoadingPaybis(false);
  //     },
  //     onloaded: () => {},
  //     onclosed: () => {
  //       setIsBuying(false);
  //       setIsBuyingWithPaybis(false);
  //       setIsLoadingPaybis(false);
  //     },
  //     onerror: () => {
  //       setIsBuying(false);
  //       setIsBuyingWithPaybis(false);
  //       setIsLoadingPaybis(false);
  //     },
  //     onpaymentinitiated: () => {
  //       setIsBuying(false);
  //       setIsBuyingWithPaybis(false);
  //       setIsLoadingPaybis(false);
  //     },
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  return {
    error,
    isBuying,
    handleBuy,
    tokenAmount,
    getEquivalentToken,
    handleBuyWithUPI,
    checkError,
    setIsBuying,
    buyWithPaybis,
    isLoadingPaybis,
    setIsLoadingPaybis,
  };
};

export default useHandleBuy;
