import {
  Avatar,
  Box,
  HStack,
  Stack,
  Image,
  Spacer,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp } from "@/data";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "@/config/url";
import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { getUUID } from "@/utils/getUUID";

export const useSwaps = () => {
  const token = useToken((s) => s.token);
  const { address } = useAccount();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["swaps", address],
    enabled: !!address,
    queryFn: async () => {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/get-paid-orders`,
        {
          wallet_address: address,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data.res.map((a: any) => ({ ...a, id: getUUID() })) as Array<{
        chain: string;
        purchase_usd_amount: number;
        token_quantity: string;
        value: string;
        id: string;
      }>;
    },
  });

  useEffect(() => {
    refetch();
  }, [token, refetch]);

  return {
    data,
    isLoading,
  };
};
export const Swaps = () => {
  const t = useTranslations("dashboard");
  const [isExpanded, setIsExpanded] = useState(true);
  const { data, isLoading } = useSwaps();
  const { address } = useAccount();

  let content = <></>;

  if (!address) {
    content = (
      <Box h="200px" display="flex" justifyContent="center" alignItems="center">
        Wallet not connected
      </Box>
    );
  } else if (isLoading) {
    content = (
      <>
        <Box
          h="200px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner size="lg" />
        </Box>
      </>
    );
  } else if (data?.length === 0) {
    content = (
      <Box h="200px" display="flex" justifyContent="center" alignItems="center">
        No swaps
      </Box>
    );
  } else if (data && data?.length > 0) {
    content = (
      <Stack gap="0">
        {data?.map((transaction, index) => (
          <HStack
            key={transaction.id}
            gap="3"
            bg={index % 2 != 0 ? "#110D1D" : "#19122D"}
            py="3"
            px="4"
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
            <Box>
              <Box fontWeight={"semibold"} textTransform={"uppercase"}>
                {transaction.chain}
              </Box>
              {/* <Box fontSize={"xs"} color="#ffffffaa">
            Paid on
          </Box> */}
            </Box>
            <Spacer />
            <Stack gap="0" alignItems={"flex-end"}>
              <Box fontWeight={"semibold"}>
                {Number(transaction.token_quantity).toLocaleString()} MEDO
              </Box>
              <Box fontSize={"xs"} color="#ffffffaa">
                ${Number(transaction.purchase_usd_amount).toLocaleString()}
              </Box>
            </Stack>
            <Spacer />
          </HStack>
        ))}
      </Stack>
    );
  }

  return (
    <>
      <Box border="2px solid #00000024">
        <Box
          bg="#26223730"
          backdropFilter="blur(40.29999923706055px)"
          border="1px solid #ffffff12"
        >
          <HStack px="4" py="6" gap="3" pos="relative">
            <Image boxSize="40px" alt="dashboardimg" src="/dashboard/rocket.webp" />
            <Box>
              {t("your_swaps")
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
              alt="cardimg"
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
          {isExpanded && content}
        </Box>
      </Box>
    </>
  );
};
