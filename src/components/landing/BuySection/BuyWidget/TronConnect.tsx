import React, { useEffect } from "react";
import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { formatTruncateAddress } from "@/utils/formatTruncateAddress";
import { useWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { WalletActionButton } from "@tronweb3/tronwallet-adapter-react-ui";
import { campaign } from "@/hooks/useCampaignManager";
import { EventType, trackFBConversion } from "@/utils/trackFBConversion";
import useGetInfo from "@/hooks/useGetInfo";
import useCreateUser from "@/hooks/useCreateUser";
import { useMaincontext } from "@/context/main";

const TronConnect: React.FC = () => {
  const t = useTranslations();
  const { connected, disconnect, address } = useWallet();
  const { data: info } = useGetInfo();
  const { mutate } = useCreateUser();
  const { setUser } = useMaincontext();
  useEffect(() => {
    if (connected && !!address) {
      trackFBConversion({
        event_type: EventType.CompleteRegistration,
        email: address?.toLowerCase() || "",
        country: info?.name || "",
      });
      setTimeout(() => {
        campaign.logAction({
          action: "VISIT",
          isCompleted: true,
          ref: address?.toLowerCase() || "",
          wallet_address: address?.toLowerCase() || "",
        });
        try {
          (window as any).plausible("wallet-connect", {
            revenue: {
              currency: "USD",
              amount: 0,
            },
          });
        } catch (e) {}
      }, 2000);
      mutate(
        {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          userType: "wallet",
          wallet_address: address?.toLowerCase(),
        },
        {
          onSuccess: (data) => {
            localStorage.setItem("token", data?.data?.token);
          },
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected, address]);
  const connectButton = (
    <Box 
      sx={{
        ".adapter-react-button": {
          justifyContent: "center",
          h: "14",
          w: "full",
          textAlign: "center",
          bg: "#0DEC96",
          _hover: {
            bg: "#0DEC96CC",
          },
          _active: {
            bg: "#0DEC96CC",
          },
          px: { base: "6", sm: "8", md: "12" },
          fontSize: { base: "md", md: "lg" },
          color: "black",
          rounded: "full",
          fontWeight: "bold",
          cursor: "pointer",
        },
      }}
    >
      <Button 
        onClick={() => {
          campaign.logAction({
            action: "VISIT",
            isInitiated: true,
          });
        }}
        as={WalletActionButton}
      >
        {t("Connect Wallet")}
      </Button>
    </Box>
  );
  return !connected ? (
    connectButton
  ) : (
    <Stack>
      <HStack justify="center">
        <Button
          h="fit-content"
          py="0"
          w="fit-content"
          variant="unstyled"
          textDecor="underline"
          fontSize={"md"}
          color={"#E8E7F6"}
          fontWeight="normal"
          cursor="pointer"
          onClick={() => {
            disconnect();
            localStorage.clear();
            setUser(undefined);
          }}
        >
          {t("Disconnect")}{" "}
          <Text fontSize="sm" as="span" className="font-space-grotesk">
            [{formatTruncateAddress(address || "")}]
          </Text>
        </Button>
      </HStack>
    </Stack>
  );
};

export default TronConnect;
