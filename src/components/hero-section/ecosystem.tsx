import { Box, Heading, Text, Image, BoxProps, HStack } from "@chakra-ui/react";
import { ClashOfTiles } from "./clash-of-tiles";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { create } from "zustand";
import { motion, Variants } from "framer-motion";

import { DarklumeMetaverse } from "./darklume-metaverse";
import { LogoIcon } from "./icons";

export const cards = [
  {
    title: "virtupace-card-title",
    description: ``,
    image: "/assets/m-player.webp",
  },
  {
    title: "Clash of Tiles",
    description: `clash-description`,
    image: "/assets/clash-of-tiles.webp",
  },
  {
    title: "1000s more to come!",
    description: `more-description`,
    image: "/assets/1000 Plus.webp",
  },
];

export const useScrollEffectState = create<{
  darklumePositions?: [number, number];
  clashPositions?: [number, number];
  setDarklumePositions: (darklumePositions: [number, number]) => void;
  setClashPositions: (clashPositions: [number, number]) => void;
}>((set) => ({
  setDarklumePositions: (darklumePositions: [number, number]) =>
    set({ darklumePositions }),
  setClashPositions: (clashPositions: [number, number]) =>
    set({ clashPositions }),
}));

export function Ecosystem() {
  const t = useTranslations();
  const locale = useLocale();
  const { darklumePositions, clashPositions } = useScrollEffectState((s) => s);
  const [animate, setAnimate] = useState<"initial" | "metaverse" | "clash">(
    "initial"
  );
  const cardsRef = useRef<HTMLDivElement>(null);
  const clashRef = useRef<HTMLDivElement>(null);
  const darklumeRef = useRef<HTMLDivElement>(null);
  const [variants, setVariants] = useState<Record<
    "metaverse" | "clash" | "more",
    Variants
  > | null>(null);

  useEffect(() => {
    if (!darklumePositions || !clashPositions || !cardsRef.current) return;
    const rect = cardsRef.current?.getBoundingClientRect();
    const x = rect.left + window.scrollX;
    const y = rect.top + window.scrollY;
    const metaverseVariants: Variants = {
      initial: {
        rotateZ: 0,
        x: 0,
        y: 0,
        transition: {
          type: "linear",
        },
      },
      metaverse: {
        rotateZ: 0,
        zIndex: 100,
        x: darklumePositions[0] - x,
        y: darklumePositions[1] - y,
        boxShadow: "0 0 10px 4px rgba(0, 0, 0, 0.2)",
        transition: {
          type: "linear",
          delay: 0.03,
        },
      },
      clash: {
        rotateZ: 6,
        x: 46,
        y: clashPositions[1] - y + 5,
        boxShadow: "0 0 10px 4px rgba(0, 0, 0, 0.2)",
        transition: {
          type: "linear",
        },
      },
    };
    const clashVarients = {
      initial: {
        rotateZ: 0,
        x: 0,
        y: 0,
        transition: {
          type: "linear",
        },
      },
      metaverse: {
        rotateZ: 6,
        x: darklumePositions[0] - x - 285,
        y: darklumePositions[1] - y + 5,
        boxShadow: "0 0 10px 4px rgba(0, 0, 0, 0.2)",
        origin: "center",
        transition: {
          type: "linear",
        },
      },
      clash: {
        rotateZ: 0,
        zIndex: 100,
        x: -300,
        y: clashPositions[1] - y,
        origin: "center",
        boxShadow: "0 0 10px 4px rgba(0, 0, 0, 0.2)",
        transition: {
          type: "linear",
          delay: 0.03,
        },
      },
    };
    const moreVarients = {
      initial: {
        rotateZ: 0,
        x: 0,
        y: 0,
        transition: {
          type: "linear",
        },
      },
      metaverse: {
        rotateZ: 12,
        x: darklumePositions[0] - x - 568,
        y: darklumePositions[1] - y + 10,
        zIndex: -100000,
        origin: "center",
        transition: {
          type: "linear",
        },
      },
      clash: {
        rotateZ: 12,
        zIndex: -1000,
        x: -555,
        y: clashPositions[1] - y + 10,
        origin: "center",
        transition: {
          type: "linear",
        },
      },
    };
    setVariants({
      metaverse: metaverseVariants,
      clash: clashVarients,
      more: moreVarients,
    });
  }, [darklumePositions, clashPositions]);

  useEffect(() => {
    const handleScroll = () => {
      const darklumeRect = darklumeRef.current?.getBoundingClientRect();
      const clashRect = clashRef.current?.getBoundingClientRect();
      if (darklumeRect && clashRect) {
        const darklumeY = darklumeRect.top + window.scrollY;
        const clashY = clashRect.top + window.scrollY;
        if (window.scrollY > darklumeY - 400 && window.scrollY < clashY - 400) {
          setAnimate("metaverse");
        } else if (window.scrollY > clashY - 400) {
          setAnimate("clash");
        } else {
          setAnimate("initial");
        }
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Image
        src="image 3.webp"
        alt="echo system"
        position="relative"
        marginTop="40%"
        width="100%"
        height="1000px"
        display={{base:"none",md:"block"}}
      />
      <Box
        position="absolute"
        width="100%"
        backgroundSize="100%"
        height="0px"
        marginTop="-90%"
        display="flex"
        flexDirection="column"
        gap="5px"
        fontFamily="Rajdhani"
       className="echosystemconrainer"
      >
 <Image
        src="image 3.webp"
        alt="echo system image"
        position="relative"
        marginTop="40%"
        width="100%"
        height="1000px"
        display={{base:"block" , md:"none"}}
        className="echosystem"
      />
        <Box
          border="none"
          marginTop="22%"
          className="capitalecho"
        >
          <Text
            lineHeight="200px"
            fontWeight="500"
            fontSize="170px"
            fontFamily="Rajdhani"
            color="transparent"
            style={{ WebkitTextStroke: "1.5px rgb(44, 42, 42)" }}
          >
            virtupace
          </Text>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          textAlign="center"
          alignSelf="center"
          gap="0px"
          lineHeight="80px"
          justifyContent="center"
         className="echosystempara"
        >
          <Text
            textTransform="uppercase"
            fontSize="35px"
            className="echohead"
         >The virtupace</Text>
          <Heading
            color="rgba(0, 235, 144, 1)"
            textTransform="uppercase"
            fontSize="110px"
            fontWeight="bold"
            fontFamily={"Rajdhani"}
            _hover={{
              color: "rgb(42, 162, 42)",
              textShadow: "0 0 7px white",
            }}
            className="echosubhead"
          >
            Ecosystem
          </Heading>
          <Text
            fontWeight="700"
            width="650px"
            textAlign="center"
            fontSize="18px"
            lineHeight="21px"
            marginLeft="5%"
            marginTop="0%"
            className="echoparagraph"
          >
            The Virtu Pace Blockchain is the foundation for an ambitious ecosystem, showcasing its <br />
            capabilities through two groundbreaking projects. Together, they serve as a demonstration of what
            our blockchain can achieve, setting the stage for the next era of gaming and virtual worlds.</Text>
        </Box>


      </Box>




      <Box ref={darklumeRef}>
        <DarklumeMetaverse />
      </Box>
      <Box ref={clashRef}>
        {/* <ClashOfTiles /> */}
      </Box>
    </>
  );
}

export const FeatureCard = ({
  title,
  description,
  image,
  ...props
}: BoxProps & {
  title: string;
  description: string;
  image: string;
}) => {
  const t = useTranslations();
  return (
    <>

    </>
  );
};
