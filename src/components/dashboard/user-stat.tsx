import { Box, Center, HStack, Skeleton, Stack } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useLeaderboard } from "./leaderboard";

export const UserStat = () => {
  const t = useTranslations("dashboard");
  const { data } = useLeaderboard();
  if (!data) {
    return null;
  }
  const totalHolders = Number(data?.totalHolder) ?? 0;
  const totalSold = Number(data?.totalSold) ?? 0;
  const rank = Number(data?.user_data?.rank ?? 0);
  let rankDigits: Array<string | null> = String(rank).split("");
  rankDigits = [...rankDigits, null, null, null, null, null, null, null, null];
  rankDigits.length = 6;
  const balance = Number(data?.user_data?.total_tokens ?? 0);

  return (
    <>
      <Box border="2px solid #00000024">
        <Box
          p="2"
          bg="rgba(38,34,55,0.55)"
          backdropFilter="blur(40.29999923706055px)"
          border="1px solid #ffffff12"
        >
          <HStack justify={"space-between"} pt="4" px="4">
            <Stack>
              <Box fontSize={"sm"} color="#ffffffbb">
                {t("your_balance")}{" "}
              </Box>
              <Box fontWeight={"bold"}> {balance?.toLocaleString()} MEDO </Box>
            </Stack>
            <Stack>
              <Box fontSize={"sm"} color="#ffffffbb">
                {t("total_holders")}{" "}
              </Box>
              <Box fontWeight={"bold"}> {totalHolders.toLocaleString()} </Box>
            </Stack>
            <Stack>
              <Box fontSize={"sm"} color="#ffffffbb">
                {t("total_sold")}{" "}
              </Box>
              <Box fontWeight={"bold"}>
                {" "}
                {totalSold.toLocaleString()} MEDO{" "}
              </Box>
            </Stack>
          </HStack>
          {rank > 0 && (
            <Box p="3" mt="4" px="4" bg="rgba(11,9,22,0.6)">
              <Box fontSize={"xs"} color="#ffffffbb">
                {t("holding_rank")}
              </Box>
              <HStack
                gap="1"
                justify={"space-between"}
                fontWeight={"bold"}
                fontSize={"2xl"}
                pt="4"
              >
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"end"}
                  boxSize="12"
                  mr="2"
                  transform={"rotate(-4deg)"}
                >
                  #
                </Box>
                {rankDigits.map((digit, index) => (
                  <Center
                    key={index}
                    p="3"
                    borderColor={!!digit ? "white" : "#ffffff32"}
                    borderWidth={"1px"}
                    boxSize="12"
                    rounded={"md"}
                  >
                    {digit}
                  </Center>
                ))}
              </HStack>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};
