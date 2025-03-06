import BuySection from "@/components/landing/BuySection";
import { getUrl } from "@/config/url";
import { INR } from "@/hooks/useGetPrices";
import { useDappStore } from "@/store/useDapp";
import postErrorLog from "@/utils/postErrorLog";
import axios from "axios";
import { InferGetStaticPropsType, NextPage } from "next";
import { useEffect } from "react";
import { Navbar } from "@/components/hero-section/hero";
import { Box, Circle, Flex, Heading, HStack, Stack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useMaincontext } from "@/context/main";
import { useTranslations } from "next-intl";
import Head from "next/head";
import deepmerge from "deepmerge";
const Footer = dynamic(() =>
  import("@/components/footer/footer").then((mod) => mod.Footer)
);

const Presale: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  prices,
}) => {
  const t = useTranslations();
  const setPrices = useDappStore((s) => s.setPrices);
  const { setWidgetSize } = useMaincontext();
  useEffect(() => {
    setPrices(prices);
    setWidgetSize("sm");
    return () => {
      setWidgetSize("md");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const walletPaymentSteps = [
    {
      title: t("decentralized_wallet_payment.title"),
      desc: t("decentralized_wallet_payment.description"),
      steps: [
        {
          title: t("decentralized_wallet_payment.setup_wallet.title"),
          steps: [t("decentralized_wallet_payment.setup_wallet.step_1")],
        },
        {
          title: t("decentralized_wallet_payment.fund_wallet.title"),
          steps: [
            t("decentralized_wallet_payment.fund_wallet.step_1"),
            t("decentralized_wallet_payment.fund_wallet.step_2"),
          ],
        },
        {
          title: t("decentralized_wallet_payment.connect_wallet.title"),
          steps: [
            t("decentralized_wallet_payment.connect_wallet.step_1"),
            t("decentralized_wallet_payment.connect_wallet.step_2"),
            t("decentralized_wallet_payment.connect_wallet.step_3"),
          ],
        },
        {
          title: t("decentralized_wallet_payment.complete_payment.title"),
          steps: [
            t("decentralized_wallet_payment.complete_payment.step_1"),
            t("decentralized_wallet_payment.complete_payment.step_2"),
            t("decentralized_wallet_payment.complete_payment.step_3"),
          ],
        },
        {
          title: t("decentralized_wallet_payment.claim_tokens.title"),
          steps: [t("decentralized_wallet_payment.claim_tokens.step_1")],
        },
      ],
    },
    {
      title: t("credit_card_payment.title"),
      desc: t("credit_card_payment.description"),
      steps: [
        {
          title: t("credit_card_payment.choose_login_method.title"),
          steps: [
            t("credit_card_payment.choose_login_method.step_1"),
            t("credit_card_payment.choose_login_method.step_2"),
            t("credit_card_payment.choose_login_method.step_3"),
          ],
        },
        {
          title: t("credit_card_payment.complete_payment_card.title"),
          steps: [
            t("credit_card_payment.complete_payment_card.step_1"),
            t("credit_card_payment.complete_payment_card.step_2"),
          ],
        },
        {
          title: t("credit_card_payment.claim_tokens_card.title"),
          steps: [
            t("credit_card_payment.claim_tokens_card.step_1"),
            t("credit_card_payment.claim_tokens_card.step_2"),
          ],
        },
      ],
    },
  ];

  const content = (
    <Stack>
      <Heading>{t("how_to_buy_title")}</Heading>
      <Box color="#ffffffcc">{t("how_to_buy_desc")}</Box>
      <Box>
        {walletPaymentSteps.map((a, i) => (
          <HStack key={a.title} pt="4">
            <Heading fontSize={"xl"} alignSelf={"flex-start"}>
              {i + 1}.
            </Heading>
            <Box>
              <Heading fontSize={"xl"}>{a.title}</Heading>
              <Box pt="2" color="#ffffffcc">
                {a.desc}
              </Box>
              <Stack pt="4">
                {a.steps.map((step, index) => (
                  <HStack
                    key={step.title}
                    pt="3"
                    bg="#161225"
                    p={"4"}
                    rounded={"md"}
                  >
                    {/* <Circle
                      size="14px"
                      bgColor={"#ffffffaa"}
                      fontSize={"xl"}
                      alignSelf={"flex-start"}
                      mt="6px"
                    /> */}
                    {/* <Heading fontSize={"xl"} mt="-0.5" alignSelf={"flex-start"}>
                      {index + 1}.
                    </Heading> */}
                    <Box>
                      <Heading fontSize={"xl"}>{step.title}</Heading>
                      <Stack pt="3">
                        {step.steps.map((step) => (
                          <HStack key={step}>
                            <Circle
                              size="12px"
                              bgColor={"#17BF7E"}
                              fontSize={"xl"}
                              alignSelf={"flex-start"}
                              mt="6px"
                            />
                            <Box color="#ffffffcc"> {step} </Box>
                          </HStack>
                        ))}
                      </Stack>
                    </Box>
                  </HStack>
                ))}
              </Stack>
            </Box>
          </HStack>
        ))}
      </Box>
    </Stack>
  );

  return (
    <>
      <Head>
        <title>{t("how_to_buy_title")}</title>
      </Head>
      <Navbar />
      <Box mx="auto" maxW={"1200px"} px="4" py="12">
        <Flex
          flexDir={{ base: "column", lg: "row-reverse" }}
          gap={{ base: "12", lg: "6" }}
        >
          <Box
            position={{ base: "static", lg: "sticky" }}
            top="10px"
            alignSelf={"flex-start"}
            w="full"
            maxW="700px"
            mx="auto"
            overflow={"scroll"}
            minW={{ base: "auto", lg: "560px" }}
          >
            <BuySection />
          </Box>
          {content}
        </Flex>
      </Box>
      <Footer />
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
  try {
    const howToBuyMessages = (
      await import(`../locales/output/how-to-buy/${context.locale}.json`)
    ).default;
    messages = deepmerge(messages, howToBuyMessages);
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
