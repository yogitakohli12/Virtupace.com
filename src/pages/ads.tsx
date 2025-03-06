import dynamic from "next/dynamic";
import { getUrl } from "@/config/url";
import { INR } from "@/hooks/useGetPrices";
import { useDappStore } from "@/store/useDapp";
import postErrorLog from "@/utils/postErrorLog";
import axios from "axios";
import { InferGetStaticPropsType, NextPage } from "next";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import deepmerge from "deepmerge";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

// Dynamically import components
const CustomPlayer = dynamic(() => import("@/components/global/CustomPlayer"));
const HeroSection = dynamic(() =>
  import("@/components/hero-section/hero").then((mod) => mod.HeroSection)
);
const Footer = dynamic(() =>
  import("@/components/footer/footer").then((mod) => mod.Footer)
);
const Community = dynamic(() => import("@/components/footer/community"));
const WhySection = dynamic(() =>
  import("@/components/hero-section/why-section").then((mod) => mod.WhySection)
);
const Ecosystem = dynamic(() =>
  import("@/components/hero-section/ecosystem").then((mod) => mod.Ecosystem)
);
const AurealoneBlockchain = dynamic(() =>
  import("@/components/hero-section/aurealone-blockchain").then(
    (mod) => mod.AurealoneBlockchain
  )
);
const FAQs = dynamic(() =>
  import("@/components/hero-section/faqs").then((mod) => mod.FAQs)
);
const DevelopmentPhases = dynamic(() =>
  import("@/components/hero-section/development-phases").then(
    (mod) => mod.DevelopmentPhases
  )
);
const AllocationTable = dynamic(() =>
  import("@/components/hero-section/allocation-table").then(
    (mod) => mod.AllocationTable
  )
);

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  prices,
}) => {
  const { href } = useIsAds();
  const t = useTranslations();
  const setPrices = useDappStore((s) => s.setPrices);
  const { isVideoOpen, setIsVideoOpen } = useDappStore(
    ({ isVideoOpen, setIsVideoOpen }) => ({ isVideoOpen, setIsVideoOpen })
  );

  useEffect(() => {
    setPrices(prices);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <CustomPlayer
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
      <HeroSection />
      <Box
        display={"flex"}
        justifyContent={"center"}
        maxW="1240px"
        // bg="black"
        mx="auto"
        mt="60px"
      >
        <Link href={href}>
          <Button
            variant="primary"
            bg="white"
            color="black"
            rounded={"full"}
            flexShrink={0}
            flexGrow={0}
            py="50px"
            px="60px"
            fontSize={{ base: "xl", md: "3xl" }}
            alignSelf={{ base: "center", md: "end" }}
            w={{ base: "full", md: "auto" }}
          >
            Visit Presale
          </Button>
        </Link>
      </Box>
      <WhySection />
      <Ecosystem />
      <AurealoneBlockchain />
      <AllocationTable />
      <DevelopmentPhases />
      <FAQs />
      <Community />
      <Footer />
    </>
  );
};

const removeWords = (str: string) =>
  str.replace(/cryptocurrency|cryptocurrencies|metaverse|trade/gi, "");

// Function to recursively traverse and clean object values
const cleanObjectValues: any = (obj: any) => {
  if (typeof obj === "string") {
    return removeWords(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(cleanObjectValues);
  }

  if (typeof obj === "object" && obj !== null) {
    const cleanedObj: any = {};
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        cleanedObj[key] = cleanObjectValues(obj[key]);
      }
    }
    return cleanedObj;
  }

  // Return other types (numbers, booleans, null, etc.) unchanged
  return obj;
};

export function useIsAds() {
  const router = useRouter();
  const isAds = router.pathname.includes("/ads");
  return {
    text: isAds ? "Visit Presale" : "BUY NOW",
    href: isAds ? "https://virtupace.com/?u_id=flBUEq" : "#buy-now",
    isAds,
  };
}

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
  delete messages["Metaverse"];
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by locale and read
      // the desired one based on the `locale` received from Next.js.
      prices,
      messages: cleanObjectValues(messages),
    },
    revalidate: 60,
  };
}
export default Home;
