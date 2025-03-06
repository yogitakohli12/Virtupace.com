import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { all } from "@/locales";

export function ClaimModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const t = useTranslations();

  return (
    <>
      <Button
        onClick={onOpen}
        aria-label=""
        // icon={<Icon as={IoIosInformationCircleOutline} />}
        size="xs"
        bgGradient="linear-gradient(355deg, #D248F4 13.84%, #5348F4 106.23%)"
        _hover={{
          bgGradient:
            "linear-gradient(355deg, #c652e3 13.84%, #655ce4 106.23%)",
        }}
        _active={{
          bgGradient:
            "linear-gradient(355deg, #c652e3 13.84%, #655ce4 106.23%)",
        }}
        color="#E8E7F6"
        rounded="full"
        cursor="pointer"
        w={{ base: "full", md: "auto" }}
      >
        {t("Claim")}
      </Button>
      <Modal onClose={onClose} isOpen={isOpen} isCentered size="xl">
        <ModalOverlay />
        <ModalContent bg="#130A1A" borderColor={"#5348F4"} borderWidth={"1px"}>
          <ModalHeader>{t("How to claim?")}</ModalHeader>
          <ModalCloseButton color="#5348F4" />
          <ModalBody>
            <Text>
              {t(all["210"])}
              {t(all["211"])}
              <br />
              <br />
              {t(all["212"])}
              {t(all["213"])}
            </Text>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
