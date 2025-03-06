import React, { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { token, truncatedToken } from "@/config/contract-config";
import toast from "react-hot-toast";
import { BsCopy } from "react-icons/bs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { formatTruncateAddress } from "@/utils/formatTruncateAddress";
import { campaign } from "@/hooks/useCampaignManager";
import useRegisterUser from "@/hooks/useRegisterUser";
import useCheckProfile from "@/hooks/useLogin";
import { useFirebaseSignIn } from "@/hooks/firebase";
const WalletConnect: React.FC<{ currency: string }> = ({ currency }) => {
  const { address, isDisconnected, isConnected, isConnecting, connector } =
    useAccount();

  const { open } = useWeb3Modal();
  const { mutateAsync: registerUser, isLoading: isPending3 } =
    useRegisterUser();
  const { mutateAsync: checkProfile, isLoading: isPending1 } =
    useCheckProfile();
  const { mutate: signIn, isLoading: isPending2 } = useFirebaseSignIn();
  const params = useSearchParams();
  const { disconnect } = useDisconnect();
  const [isWalletConnecting, setIsWalletConnecting] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations();
  const createLeadSuccess = async () => {
    try {
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (isConnecting) {
      setIsWalletConnecting(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnecting]);

  useEffect(() => {
    if (isConnected) {
      setTimeout(() => {
        campaign.logAction({
          action: "VISIT",
          isCompleted: true,
          ref: address,
        });
      }, 7000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  useEffect(() => {
    if (isWalletConnecting && isConnected) {
      createLeadSuccess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWalletConnecting, isConnected]);
  useEffect(() => {
    if (isDisconnected && !isConnecting) {
      disconnect();
      localStorage.removeItem("wagmi.store");
      localStorage.removeItem("wagmi.wallet");
      localStorage.removeItem("wagmi.cache");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisconnected, isConnecting]);
  useEffect(() => {
    if (connector) {
      console.log(
        `%c You're conected with ${connector?.name}`,
        "color:#009900"
      );
    } else {
      console.log("%c Disconnected", "color:#990000");
    }
  }, [connector]);
  const connectButton =
    currency === "upi" ? (
      <Button
        w="full"
        px="12"
        fontSize={"sm"}
        color="#74708E"
        bg="red"
        fontWeight="bold"
        cursor="pointer"
       className="walletbtn"
        onClick={() => {
          open && open();
        }}
      >
        {t("Connect Wallet")}
      </Button>
    ) : (
      <Button
        h="20"
        w="100%"
        bg="rgba(37, 89, 112, 1)"
        _hover={{
          bg: "linear-gradient(90deg,rgb(241, 21, 131) 0%, #FF3737 30%,rgb(29, 118, 51) 100%)",
        }}
        _active={{
          bg: "rgba(37, 89, 112, 1)",
        }}
        px={{ base: "6", sm: "8", md: "12" }}
        fontSize={"35px"}
        fontFamily={"Rajdhani"}
        color="white"
         className="walletbtn "
        rounded="25px"
        fontWeight="bold"
        cursor="pointer"
        onClick={() => {
          open && open();
        }}
      >
        {t("Connect Wallet ")}
      </Button>
    );
  return !isConnected ? (
    connectButton
  ) : (
    <Stack>
      <HStack justify="center">
        <Button
          h="fit-content"
          py="0"
          w="full"
          variant="unstyled"
          textDecor="underline"
          fontSize={"md"}
          color={currency === "upi" ? "#74708E" : "#E8E7F6"}
          fontWeight="medium"
          cursor="pointer"
          className="walletbtn"
          onClick={() => {
            open && open();
          }}
        >
          {t("Disconnect")}{" "}
          <Text fontSize="sm" as="span" className="donot">
            [{formatTruncateAddress(address || "")}]
          </Text>
        </Button>
      </HStack>
    </Stack>
  );
};

export function Des() {
  const t = useTranslations();
  const onCopyAddress = () => {
    const address = token;
    navigator.clipboard.writeText(`${address}`);
    toast.dismiss();
    toast.success(t("Copied"));
  };

  return (
    <Stack mt="10" gap="0" alignItems={"center"} rounded={"md"}>
      <HStack justify="center" fontSize={"14px"}>
        <Text color="yellow"   className="donot">MEDOPACE Token : [{truncatedToken}]</Text>
        <IconButton
          aria-label=""
          icon={<Icon as={BsCopy} />}
          onClick={() => onCopyAddress()}
          variant="link"
          size="md"
          color="white"
          className="donot"
        />
        {/* <IconButton
          variant="link"
          size="sm"
          aria-label=""
          icon={<Icon as={MetaIcon} />}
          onClick={() => addTokenInMetamask()}
        /> */}
      </HStack>
      {/* <Text fontSize={"16px"} color="white" className="donot">
        [Do not send funds to this address]
      </Text> */}
    </Stack>
  );
}

export function UseFulLinks({ currency }: { currency: string }) {
  const t = useTranslations();

  return (
    <HStack
      justify="center"
      color="#74708E"
      fontSize={"12px"}
      justifyContent={"center"}
      spacing={{ base: "4", lg: "6" }}
    >
      <Button
        as={Link}
        href={"/wallet"}
        aria-label=""
        variant="link"
        size="sm"
        fontWeight="semibold"
        textTransform="uppercase"
        color="brand.creamy"
        
        fontSize={"14px"}
      >
        Virtupace {t("Wallet")}
      </Button>
    </HStack>
  );
}

export default WalletConnect;
