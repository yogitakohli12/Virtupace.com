import { OWNER_EVM_WALLET } from "@/config/mainnet/owner.address";
import {
  Box,
  Button,
  Divider,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import toast from "react-hot-toast";
import { BsCopy } from "react-icons/bs";

const CardPreInform = () => {
  const onCopyAddress = () => {
    const address = OWNER_EVM_WALLET;
    navigator.clipboard.writeText(`${address}`);
    toast.dismiss();
    toast.success("Copied");
  };
  return (
    <Box
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        bottom: "0",
        top: "0",
        left: "50%",
        width: "100%",
        transform: "translateX(-50%)",
        bg: "#2622378D",
        zIndex: -1,
        filter: "blur(100px)",
        rounded: "full",
      }}
    >
      <Text fontSize="xl" fontWeight="semibold">
        Pay with Card
      </Text>
      <Divider mt="6" mb="4" border="1px solid #ffffff10" />
      <Box
        bg="#18132A"
        color="#FFFFFF"
        borderWidth="1.4px"
        borderColor="#00000024"
        borderStyle="solid"
        p="4"
        backdropFilter="blur(53.83000183105469px)"
        boxShadow="0px -2.1px 15.26px 9.8px #00000033 inset"
      >
        {
          "You'll redirected to payment gateway screen, where you'll provide your card details. Your card will be charged and ETH will be purchased and sent to VirtuPace Card Wallet immediately."
        }
      </Box>
      <Box
        mt="4"
        pt={{ base: "4", md: "6", lg: "8" }}
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          bottom: "0",
          top: "0",
          left: "0",
          right: "30%",
          bg: "url(/image/dot-pattern.webp)",
          bgSize: "cover",
          zIndex: -1,
        }}
        _after={{
          content: '""',
          position: "absolute",
          bottom: "0",
          top: "0",
          right: "0",
          left: "30%",
          bg: "url(/image/dot-pattern.webp)",
          bgSize: "cover",
          zIndex: -1,
          transform: "rotateY(180deg)",
        }}
      >
        <Image
          src="/image/wallet.webp"
          h={{ base: "150px", md: "189px" }}
          w="full"
          alt="Wallet"
          objectFit="contain"
          objectPosition="center"
        />
        <Text mt="2" fontSize={{ base: "sm", md: "md" }}>
          Meta Droom Card Wallet
        </Text>
      </Box>
      <HStack
        justify="space-between"
        rounded={{ base: "50px", sm: "full" }}
        border="1px solid #FFFFFF21"
        background="#16122566"
        spacing={{ base: "1", sm: "2", md: "4" }}
        px={{ base: "2", sm: "3" }}
        py="3"
        mt="4"
        flexWrap="wrap"
      >
        <Text
          className="font-space-grotesk"
          fontSize={{ base: "xs", sm: "sm", lg: "md" }}
          ml={{ base: "0", md: "2" }}
        >
          {OWNER_EVM_WALLET}
        </Text>
        <IconButton
          bg="#002FFF"
          _hover={{
            bg: "#002FFFDD",
          }}
          _active={{
            bg: "#002FFFDD",
          }}
          rounded="full"
          px={{ base: "4", md: "6" }}
          h="40px"
          color="white"
          onClick={onCopyAddress}
          icon={<BsCopy />}
          w="fit-content"
          aria-label="Copy Button"
        />
      </HStack>
      <HStack spacing="2" mt={{ base: "8", md: "10", lg: "12" }}>
        <Box as="span" w="18px">
          <InfoIcon />
        </Box>
        <Text fontSize="sm" color="#ffffff60">
          Please make sure the wallet address in next screen matches with aureal
          one wallet address to avoid any loss of funds. Upon successful payment
          MEDO tokens will be allocated to your wallet
        </Text>
      </HStack>
    </Box>
  );
};

export default CardPreInform;

const InfoIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.0011 15.7528H5.99863C3.92702 15.7528 2.24707 14.0729 2.24707 12.0013V5.99875C2.24707 3.92714 3.92702 2.24719 5.99863 2.24719H12.0011C14.0727 2.24719 15.7527 3.92714 15.7527 5.99875V12.0013C15.7527 14.0729 14.0727 15.7528 12.0011 15.7528Z"
      fill="#FFCA28"
      stroke="#FFCA28"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.99892 5.99874C8.89538 5.99874 8.81134 6.08277 8.81209 6.18631C8.81209 6.28986 8.89613 6.37389 8.99967 6.37389C9.10321 6.37389 9.18725 6.28986 9.18725 6.18631C9.18725 6.08277 9.10321 5.99874 8.99892 5.99874"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.18732 12.1393V8.57532H8.43701"
      stroke="black"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
