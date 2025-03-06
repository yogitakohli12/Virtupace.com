import { useIsAds } from "@/pages/ads";
import { Box, Heading, SimpleGrid, Text, Image } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";

const features = [
  {
    title: "Zero Gas Fees",
    description: "zero-gas-fees-description",
    icon: "/assets/why/zero-fees.svg",
  },
  {
    title: "Lighting - Fast Transactions",
    description: "lighting-fast-transactions-description",
    icon: "/assets/why/rocket.svg",
  },
  {
    title: "built-for-title",
    description: "built-for-gaming-description",
    icon: "/assets/why/globe.svg",
  },
  {
    title: "Early Access",
    description: "early-access-description",
    icon: "/assets/why/diamond.svg",
  },
];

export function WhySection() {
  const t = useTranslations();
  const locale = useLocale();
  const { isAds } = useIsAds();
  return (
    // <Box maxW={"1440px"} mx="auto" px="4" pb="110px" pt="140px" zIndex={1}>
    //   <Heading
    //     textAlign={"center"}
    //     fontWeight={"medium"}
    //     fontSize={"5xl"}
    //     color="#FF4BDA"
    //   >
    //     {t("Why Meta Droom?")}
    //   </Heading>
    //   <Text mt="4" textAlign={"center"} color="white" mx="auto" maxW={"540px"}>
    //     {locale != "en" || isAds ? (
    //       <>{t("why-description")}</>
    //     ) : (
    //       <>
    //         Meta Droom is the blockchain built for the next generation of{" "}
    //         <Box as="span" fontWeight={"bold"}>
    //           gaming
    //         </Box>{" "}
    //         and
    //         <Box as="span" fontWeight={"bold"}>
    //           {" "}
    //           {!isAds && "metaverse"}
    //         </Box>{" "}
    //         projects. Here’s why MEDO is your key to this revolution:
    //       </>
    //     )}
    //   </Text>

    //   <SimpleGrid
    //     columns={{ base: 1, md: 4 }}
    //     gap="4"
    //     mt="16"
    //     pos="relative"
    //     maxW="900px"
    //     mx="auto"
    //   >
    //     <WhyBox
    //       {...features[0]}
    //       transform={"rotate(-2deg) translateY(50px) translateX(50px)"}
    //     />
    //     <WhyBox {...features[1]} transform={"rotate(5deg) translateX(-5px)"} />
    //     <WhyBox
    //       {...features[2]}
    //       transform={"rotate(-5deg) translateY(20px) translateX(-35px)"}
    //     />
    //     <WhyBox
    //       {...features[3]}
    //       transform={"rotate(5deg) translateY(-12px) translateX(-50px)"}
    //     />
    //     <Image
    //       pos="absolute"
    //       left="50%"
    //       transform="translateX(-50%)"
    //       top="100%"
    //       marginTop={"-150px"}
    //       w="full"
    //       maxW="400px"
    //       filter="brightness(0.9)"
    //       alt="globe image"
    //       src="/assets/globe.webp"
    //       zIndex={-100}
    //     />
    //   </SimpleGrid>
    // </Box>
    <>
    
    </>
  );
}

const WhyBox = ({
  title,
  description,
  icon,
  transform,
}: {
  title: string;
  description: string;
  icon: string;
  transform?: string;
}) => {
  const t = useTranslations();
  return (
    <Card transform={transform}>
      <Image w="40px" h="40px" src={icon} alt="titleimage" />
      <Text fontWeight="bold" fontSize="xl" pt="4" color="white">
        {t(title)}
      </Text>
      <Text mt="3" color="#ffffffaa" fontSize={"sm"}>
        {t(description)}
      </Text>
    </Card>
  );
};

export const Card = ({
  children,
  transform = "none",
}: {
  children: React.ReactNode;
  transform?: string;
}) => {
  return (
    <Box
      maxW={{ base: "full", md: "350px" }}
      minW="250px"
      h="min"
      transform={{ base: "none", md: transform }}
      pos="relative"
      pt="6"
    >
      <Box
        zIndex={-1}
        pos="absolute"
        left="0"
        top="0"
        w="full"
        h="full"
        borderWidth={"1px"}
        borderColor={"rgba(255, 255, 255, 0.12)"}
        bgColor={"rgba(38, 34, 55, 0.55)"}
        backdropFilter={"blur(10px)"}
      />
      <Box
        zIndex={-1}
        pos="absolute"
        left="6px"
        top="6px"
        w="calc(100% - 12px)"
        h="calc(100% - 12px)"
        bgColor={"rgba(11, 9, 22, 0.20)"}
        boxShadow={"inset 0px 0px 40px 40px rgba(0, 0, 0, 0.22)"}
      />
      <Image
        alt="assetsimg"
        left="6px"
        top="6px"
        w="calc(100% - 12px)"
        h="calc(100% - 12px)"
        pos="absolute"
        objectFit="cover"
        src="/assets/card-bg.svg"
        // borderWidth={"2px"}
        // borderColor={"rgba(0, 0, 0, 0.14)"}
        zIndex={-1}
      />

      <Box p={{ base: "4", md: "6" }}>{children}</Box>
    </Box>
  );
};
