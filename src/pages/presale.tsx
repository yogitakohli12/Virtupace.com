import BuySection from "@/components/landing/BuySection";
import { getUrl } from "@/config/url";
import { INR } from "@/hooks/useGetPrices";
import { useDappStore } from "@/store/useDapp";
import postErrorLog from "@/utils/postErrorLog";
import axios from "axios";
import deepmerge from "deepmerge";
import { InferGetStaticPropsType, NextPage } from "next";
import { useEffect } from "react";

const Presale: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  prices,
}) => {
  const setPrices = useDappStore((s) => s.setPrices);
  useEffect(() => {
    setPrices(prices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BuySection />
    </>
  );
};

export async function getStaticProps(context: any) {
  let prices = {
    eth: 0,
    bnb: 0,
    matic: 0,
    inr: INR,
    trx: 0,
    sol: 0,
  };
  try {
    const response = await axios.get(getUrl("api/prices"));
    const data = response.data?.prices;
    prices = {
      ...prices,
      eth: data?.eth || 0,
      bnb: data?.bnb || 0,
      matic: data?.matic || 0,
      trx: data?.trx || 0,
      sol: data?.sol || 0,
    };
  } catch (e: any) {
    postErrorLog(e, {
      currency: "",
      tokenAmount: "",
      address: "",
      inputState: "",
      chain: "-",
    });
  }
  let messages: any = (await import(`../locales/output/en.json`)).default;
  try {
    const userMessages = (
      await import(`../locales/output/${context.locale}.json`)
    ).default;
    messages = deepmerge(messages, userMessages);
  } catch (error) {}
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      prices,
      messages,
    },
    revalidate: 60,
  };
}

export default Presale;
