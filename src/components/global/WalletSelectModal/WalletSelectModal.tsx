import { MM_DEEPLINK, TRUST_DEEPLINK } from "@/config/url";
import {
  Box,
  Center,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";

const WalletSelectModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currency: string;
  inputState: string;
}> = ({ isOpen, onClose, currency, inputState }) => {
  const handleOpen = (deeplink: string) => {
    const searchParams = new URLSearchParams({
      currency,
      amount: inputState,
    });
    const suffix = `?${searchParams.toString()}`;
    const url = deeplink + encodeURI(suffix);
    window.location.assign(url);
  };
  return (
    <Modal size="xl" isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        p="24px"
        maxW="360px"
        maxH="300px"
        bg="#161616"
        borderRadius="12px"
        border="none"
      >
        <ModalCloseButton />
        <ModalHeader>Please choose your wallet</ModalHeader>
        <ModalBody>
          <HStack
            onClick={() => handleOpen(MM_DEEPLINK)}
            _hover={{ bg: "#404040" }}
            _active={{ bg: "#505050" }}
            spacing="3"
            bg="#383838"
            borderRadius="lg"
            py="3"
            px="5"
          >
            <Box boxSize="8" position="relative">
              <Image src="/image/svg/metamask-icon.svg" alt="metamskimg" boxShadow="4" />
            </Box>
            <Text fontSize="lg" fontWeight="semibold" color="white">
              Metamask
            </Text>
          </HStack>
          <HStack
            onClick={() => handleOpen(TRUST_DEEPLINK)}
            mt="3"
            spacing="3"
            bg="#383838"
            _hover={{ bg: "#404040" }}
            _active={{ bg: "#505050" }}
            borderRadius="lg"
            py="3"
            px="5"
          >
            <Box boxSize="8" position="relative">
              <Image
                src="/image/svg/trust-wallet-icon.svg"
                alt="trustwalletimg"
                boxShadow="4"
              />
            </Box>
            <Text fontSize="lg" fontWeight="semibold" color="white">
              Trust Wallet
            </Text>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WalletSelectModal;
