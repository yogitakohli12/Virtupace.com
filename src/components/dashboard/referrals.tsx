import {
  Avatar,
  Box,
  Center,
  HStack,
  Stack,
  Image,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { MedalIcon } from "./icon";
import { ChevronDown, ChevronUp } from "@/data";
import { useDashboardAccordian } from "./accordian";

const transactions = [
  {
    wallet: "0x1234",
    amount: 3333330,
    chain: "eth",
    dollarsAmount: 44,
  },
  {
    wallet: "0x123a4",
    amount: 3333330,
    chain: "eth",
    dollarsAmount: 44,
  },
  {
    wallet: "0x12aa34",
    amount: 3333330,
    chain: "eth",
    dollarsAmount: 44,
  },
  {
    wallet: "0x12aa34",
    amount: 3333330,
    chain: "eth",
    dollarsAmount: 44,
  },
];

export const Referrals = () => {
  const t = useTranslations("dashboard");
  const isExpanded = useDashboardAccordian((s) => s.active === "referral");
  const setActive = useDashboardAccordian((s) => s.setActive);
  const getMedal = (rank: number) => {
    if (rank === 1) {
      return <MedalIcon color="#FFD54B" />;
    }
    if (rank === 2) {
      return <MedalIcon color="#E1E1E2" />;
    }
    if (rank === 3) {
      return <MedalIcon color="#F6B191" />;
    }
    return <Center boxSize={"40px"}>{rank.toLocaleString()}</Center>;
  };

  return (
    <>
      <Box border="2px solid #00000024">
        <Box
          bg="#26223730"
          backdropFilter="blur(40.29999923706055px)"
          border="1px solid #ffffff12"
        >
          <HStack px="4" py="6" gap="3" pos="relative">
            <Image boxSize="40px" alt="dashboardimg" src="/dashboard/search-normal.webp" />
            <Box>
              {t("your_referrals")
                .split(" ")
                .map((word, index) => (
                  <Box
                    mb="-1"
                    key={index}
                    fontWeight={
                      index > 0 ? { base: "bold" } : { base: "normal" }
                    }
                  >
                    {word}
                  </Box>
                ))}
            </Box>
            <Spacer />
            <IconButton
              onClick={() => {
                setActive(isExpanded ? undefined : "referral");
              }}
              aria-label=""
              variant={"unstyled"}
              _hover={{ bg: "#19122D" }}
              icon={
                isExpanded ? (
                  <ChevronUp color="white" boxSize="6" />
                ) : (
                  <ChevronDown color="white" boxSize="6" />
                )
              }
            />
            <Image
              pt="1.5"
              pr="1.5"
              alt="dashboardimg"
              w="full"
              h="full"
              top="0"
              right="0"
              bottom={"0"}
              pos="absolute"
              objectFit="cover"
              src="/dashboard/card-bg.webp"
              zIndex={-1}
            />
          </HStack>
          {isExpanded && (
            <Stack gap="0">
              {transactions.map((transaction, index) => (
                <HStack
                  key={transaction.wallet}
                  gap="3"
                  bg={index % 2 != 0 ? "#110D1D" : "#19122D"}
                  py="3"
                  px="4"
                >
                  <Avatar src="/dashboard/avatar.webp" boxSize="40px" />
                  <Box flexGrow={1} maxW="140px">
                    <Box fontWeight={"semibold"}>{transaction.wallet}</Box>
                    <Box fontSize={"xs"} color="#ffffffaa">
                      Address QTY
                    </Box>
                  </Box>
                  <Box>
                    <Box fontWeight={"semibold"} textTransform={"uppercase"}>
                      {transaction.chain}
                    </Box>
                    <Box fontSize={"xs"} color="#ffffffaa">
                      USD
                    </Box>
                  </Box>
                  <Stack flexGrow={1} justifySelf={"end"} alignItems={"end"}>
                    <Box fontWeight={"semibold"}>
                      {transaction.amount.toLocaleString()} MEDO
                    </Box>
                    <Box fontSize={"xs"} color="#ffffffaa">
                      ${transaction.dollarsAmount}
                    </Box>
                  </Stack>
                </HStack>
              ))}
            </Stack>
          )}
        </Box>
      </Box>
    </>
  );
};
