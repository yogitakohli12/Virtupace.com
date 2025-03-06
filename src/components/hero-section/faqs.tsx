import { Accordion, Box, Heading, Image, Stack } from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "@/data";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import React from "react";
import { TextStroke } from "../ui/text-stroke";
const faqs = [
  {
    question: `What is Virtu Pace?`,
    answer: `Virtu Pace is a next-generation blockchain network specifcally designed for the gaming and metaverse sectors, ofering lightning-fast transaction speeds and minimal gas fees.`,
  },
  {
    question: `What is MEDOPACE?`,
    answer: `MEDOPACE is the native currency of the VirtuPace network, facilitating transactions within our ecosystem and serving as an in-game currency for various projects.`,
  },
  {
    question: `How can I participate in the presale?`,
    answer: `To participate in the presale, users can purchase BSC tokens during the ICO phase. After the launch of the VirtuPace blockchain, these tokens will be swappable for MEDOPACE coins.`,
  },
  {
    question: `What games are being developed on Virtu Pace?`,
    answer: `Our first official game is Clash of Tiles, with plans for additional projects like METADROOM in the pipeline, showcasing the capabilities of the Virtu Pace blockchain.`,
  },
  {
    question: `How does staking work?`,
    answer: `MEDOPACE holders can stake their coins to earn rewards and participate in governance decisions within the Virtu Pace ecosystem.`,
  },
  {
    question: `What makes Virtu Pace unique?`,
    answer: `Our platform utilizes Zero-Knowledge Rollups to achieve high scalability and low fees, making it specifically optimized for gaming applications in the metaverse.`,
  },
];

const FAQItem: React.FC<{ question: string; answer: string }> = ({
  question,
  answer,
}) => {
  const t = useTranslations();
  return (
    <AccordionItem borderColor={"black"}>
      {({ isExpanded }) => (
        <Box  w={"full"}>
          <AccordionButton
            px={{ base: "4", md: "6" }}
            py={{ base: "6", md: "8" }}
            _hover={{ bg: "transparent" }}
            w={"full"}
          >
            <Box
              flex="1"
              textAlign={"left"}
              fontSize={{ base: "lg", md: "xl", xl: "2xl" }}
              fontWeight={"semibold"}
              lineHeight={"1.75rem"}
              {...(isExpanded && {
               
                color: "transparent",
              })}
              className="faqhead"
            >
              {t(question)}
            </Box>
            {isExpanded ? (
              <ChevronUp color="white" boxSize="10" />
            ) : (
              <ChevronDown color="white" boxSize="10" />
            )}
          </AccordionButton>
          <AccordionPanel
            pt="0"
            px="6"
            pb={{ base: "4", md: "6" }}
            as="p"
            lineHeight="150%"
            fontWeight="normal"
            className="faqanswer"
          >
            {t(answer)}
          </AccordionPanel>
        </Box>
      )}
    </AccordionItem>
  );
};

export const FAQs = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <Box maxW="800px" mx="auto" pt="100px" px="4" pos="relative" className="faqcontainer">
      <TextStroke
        pos="absolute"
        color="red.500"
        left="50%"
        transform={"translateX(-50%)"}
        fontSize={{ base: "100px", md: "120px", lg: "150px" }}
      >
        {/* {t("Frequently Asked Question")} */}
        <Box
          fontFamily="Rajdhani"
          height={"130px"}
        >
        <Heading
          fontSize="100px"
          fontFamily={"Rajdhani"}
          color="white"
          fontWeight="700"
         
          textShadow="40px 0px 0px rgba(146, 144, 144, 0.5), 70px 0px 0px rgba(82, 77, 77, 0.5)"
        >
          FAQs
        </Heading>
        </Box>

      </TextStroke>
      <Stack
        justify={"center"}
        mx="auto"
        w={{ base: "full", md: "650px" }}
        pos="relative"
      >
      </Stack>
      <Accordion defaultIndex={0} allowToggle w={"full"} pt="100px" >
        {faqs.map((item, index) => (
          <FAQItem {...item} key={`${item.question}-${index}`} />
        ))}
      </Accordion>
    </Box>
  );
};


