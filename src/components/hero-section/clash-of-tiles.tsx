import { Box, Center, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { BrandsYellow } from "./banner";
import { cards, FeatureCard, useScrollEffectState } from "./ecosystem";
import { AbsoluteText } from "./text";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

const features = [
  {
    title: "Tile-based Warfare",
    description: `tiles-based-warfare-description`,
  },
  {
    title: "Dynamic Battles",
    description: `dynamic-battles-description`,
  },
  {
    title: "Earn & Expand",
    description: `earn-and-expand-description`,
  },
];

export function ClashOfTiles() {
  const t = useTranslations();
  const setClashPositions = useScrollEffectState((s) => s.setClashPositions);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setPos = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const pageX = rect.left + window.scrollX;
        const pageY = rect.top + window.scrollY;
        setClashPositions([pageX, pageY]);
      }
    };
    setPos();
    window.addEventListener("resize", setPos);
    return () => {
      window.removeEventListener("resize", setPos);
    };
  }, [setClashPositions]);
  return (
    <Box pos="relative">
      <Box
        maxW="1200px"
        mx="auto"
        px="4"
        pt={{ base: "0px", md: "100px" }}
        pb="70px"
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
          <Box h="full" pl="100px">
            <Box ref={cardRef}></Box>
          </Box>
          <Box>
            <Heading lineHeight={1} fontSize={"6xl"}>
              Clash <br />{" "}
              <Box as="span" color="rgba(255,255,255,0.4)">
                Of
              </Box>{" "}
              Tiles{" "}
            </Heading>
            <Text pt="15px" fontSize={"sm"} color="#ffffffbb">
              {t("clash-section-description")}
            </Text>

            <SimpleGrid columns={{ base: 1 }} mt="5">
              {features.map((feature, index) => (
                <Box key={index} title={feature.title} maxW="270px" p="2">
                  <Text fontWeight="bold" fontSize="lg" color="white">
                    {t(feature.title)}
                  </Text>
                  <Text color="#ffffffbb">{t(feature.description)}</Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Box>
      <BrandsYellow />
    </Box>
  );
}
