import {
  Avatar,
  Box,
  Center,
  HStack,
  Stack,
  Image,
  Spacer,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { MedalIcon } from "./icon";
import { ChevronDown, ChevronUp } from "@/data";
import { useQuery } from "@tanstack/react-query";
import { useToken } from "@/config/url";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const useLeaderboard = () => {
  const token = useToken((s) => s.token);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: useCallback(async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/user-dashboard`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data as {
        totalHolder: number;
        totalSold: number;
        ranks: Array<{
          _from: string;
          total_usd: string;
          total_tokens: string;
          rank: string;
        }>;
        status: boolean;
        user_data?: {
          _from: string;
          total_usd: string;
          total_tokens: string;
          rank: string;
        };
      };
    }, [token]),
  });

  useEffect(() => {
    refetch();
  }, [token, refetch]);

  return {
    data,
    isLoading,
  };
};

export const LeaderBoard = () => {
  const t = useTranslations("dashboard");
  const [isExpanded, setIsExpanded] = useState(true);
  const { data, isLoading } = useLeaderboard();
  const { address } = useAccount();

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
    return <Center boxSize={"40px"}>{zeroPad(rank, 2)}</Center>;
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
            <Image boxSize="40px" alt="dashboardimg" src="/dashboard/crown.webp" />
            <Box>
              {t("top_leaderboard")
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
                setIsExpanded(!isExpanded);
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
              alt="deashbordimg"
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
              {data?.ranks?.map((transaction, index) => (
                <HStack
                  key={transaction._from}
                  gap="3"
                  bg={index % 2 != 0 ? "#110D1D" : "#19122D"}
                  py="3"
                  px="4"
                >
                  <Avatar src="/dashboard/avatar.webp" boxSize="40px" />
                  <Box flexGrow={1} maxW="140px">
                    <Box fontWeight={"semibold"}>
                      {transaction._from.slice(0, 6)}...
                      {transaction._from.slice(-4)}
                    </Box>
                    <Box fontSize={"xs"} color="#ffffffaa">
                      Address QTY
                    </Box>
                  </Box>
                  {/* <Box>
                    <Box fontWeight={"semibold"} textTransform={"uppercase"}>
                      {transaction.chain}
                    </Box>
                    <Box fontSize={"xs"} color="#ffffffaa">
                      USD
                    </Box>
                  </Box> */}
                  <Spacer />
                  <Stack gap="0" alignItems={"flex-end"}>
                    <Box fontWeight={"semibold"}>
                      {Number(transaction.total_tokens).toLocaleString()} MEDO
                    </Box>
                    <Box fontSize={"xs"} color="#ffffffaa">
                      ${Number(transaction.total_usd).toLocaleString()}
                    </Box>
                  </Stack>
                  <Spacer />
                  <Box fontWeight={"semibold"}>
                    {getMedal(+transaction.rank)}
                  </Box>
                </HStack>
              ))}
              {data?.user_data && (
                <HStack
                  gap="3"
                  bg={"#19122D11"}
                  rounded={"sm"}
                  py="3"
                  px="4"
                  borderColor={"#0DEC96"}
                  borderWidth={"1px"}
                >
                  <Avatar src="/dashboard/avatar.webp" boxSize="40px" />
                  <Box flexGrow={1} maxW="140px">
                    <Box fontWeight={"semibold"}>
                      {address?.slice(0, 6)}...
                      {address?.slice(-4)}
                    </Box>
                    <Box fontSize={"xs"} color="#ffffffaa">
                      Address QTY
                    </Box>
                  </Box>
                  {/* <Box>
                    <Box fontWeight={"semibold"} textTransform={"uppercase"}>
                      {transaction.chain}
                    </Box>
                    <Box fontSize={"xs"} color="#ffffffaa">
                      USD
                    </Box>
                  </Box> */}
                  <Spacer />
                  <Stack gap="0" alignItems={"flex-end"}>
                    <Box fontWeight={"semibold"}>
                      {Number(data?.user_data?.total_tokens).toLocaleString()}{" "}
                      MEDO
                    </Box>
                    <Box fontSize={"xs"} color="#ffffffaa">
                      ${Number(data?.user_data?.total_usd).toLocaleString()}
                    </Box>
                  </Stack>
                  <Spacer />
                  <Box fontWeight={"semibold"}>
                    {getMedal(+data?.user_data?.rank)}
                  </Box>
                </HStack>
              )}
              {isLoading && (
                <Box
                  h="200px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Spinner size="lg" />
                </Box>
              )}
            </Stack>
          )}
        </Box>
      </Box>
    </>
  );
};

function zeroPad(num: number, places: number) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
