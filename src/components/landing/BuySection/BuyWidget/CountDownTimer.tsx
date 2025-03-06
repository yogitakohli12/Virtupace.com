import { useMaincontext } from "@/context/main";
import useCountdownTimer from "@/hooks/useCountDownTimer";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { addDays } from "date-fns";
import { useTranslations } from "next-intl";
import React from "react";

const CountDownTimer = () => {
  const t = useTranslations();
  const { round } = useMaincontext();
  const deadline = addDays(
    new Date("2025-03-05").toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }),
    19 * (round.round - 1)
  );
  const { isExpired, h, m, d, s } = useCountdownTimer(deadline);
  return isExpired() ? null : (
    <HStack
      mt="1"
      rounded="md"
      spacing={{ base: "1", md: "4" }}
      justify="center"
    >
      <ItemCard item={d} suffix={"Days"} />
      <ItemCard item={h} suffix={"Hours"} />
      <ItemCard item={m} suffix={"Minutes"} />
      <ItemCard item={s} suffix={"Seconds"} />
    </HStack>
  );
};

export default CountDownTimer;

const ItemCard: React.FC<{ item: number; suffix: string }> = ({
  item,
  suffix,
}) => {
  const [first, second] = item.toString().padStart(2, "0").split("");
  return (
    <VStack spacing={{ base: "1", md: "2" }} >
      <HStack
        fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
        spacing="1"
        fontWeight="bold"
        className="font-space-grotesk "
      >
        <Box
          as="span"
          width={{ base: "20px", sm: "24px", md: "38px" }}
          bg="#070316"
          rounded="4px"
          py={{ base: "1.5", md: "2" }}
          textAlign="center"
className="countdown"
          
        >
          {first}
        </Box>
        <Box
          as="span"
          width={{ base: "20px", sm: "24px", md: "38px" }}
          bg="#070316"
          rounded="4px"
          py={{ base: "1.5", md: "2" }}
          textAlign="center"
          className="countdown"
        >
          {second}
        </Box>
      </HStack>
      <Text
        lineHeight="normal"
        fontSize={{ base: "10px", sm: "xs", md: "sm" }}
        textTransform="uppercase"
        className="fontcountdown"
      >
        {suffix}
      </Text>
    </VStack>
  );
};
