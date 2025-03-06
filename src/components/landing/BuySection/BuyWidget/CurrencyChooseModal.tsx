import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Avatar,
  Text,
  HStack,
  Box,
  Divider,
  Menu,
  MenuButton,
  Button,
  Image,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { CURRENCY_TYPE } from "@/@types/enum";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";
import { useNetwork, useSwitchNetwork } from "wagmi";
import { chainId } from "@/config/chainId";
import { size } from "viem";

// -1 for not known
const init_tokens2 = [
  {
    title: "ETH",
    subtitle: "Ethereum",
    image: "/image/icon/eth-round.webp",
    currency: CURRENCY_TYPE.eth,
    isEVM: true,
    chain: "eth",
    chainId: chainId.eth,
  },
 
  {
    title: "Matic",
    subtitle: "Polygon",
    image: "/image/icon/matic-round.webp",
    currency: CURRENCY_TYPE.matic,
    isEVM: true,
    chain: "polygon",
    chainId: chainId.polygon,
  },
  {
    title: "BNB",
    subtitle: "Binance",
    image: "/image/icon/bnb-round.webp",
    currency: CURRENCY_TYPE.bnb,
    isEVM: true,
    chain: "bsc",
    chainId: chainId.bsc,
  },
];
const CurrencyChooseModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  activeCurrency: CURRENCY_TYPE;
  onSelect: (currency: CURRENCY_TYPE) => void;
  isNative: boolean;
  setIsNative: (isNative: boolean) => void;
}> = ({ isOpen, onClose, onSelect, activeCurrency, isNative, setIsNative }) => {
  const t = useTranslations();
  const [tokens, setTokens] = useState<typeof init_tokens2>(init_tokens2);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  // useEffect(() => {
  //   if (locale === LOCALE.INDIA) {
  //     const new_tokens = moveUPIToFirst();
  //     setTokens(new_tokens);
  //     onSelect(CURRENCY_TYPE.upi);
  //   } else {
  //     const new_tokens = init_tokens.filter(
  //       (item) => item.currency !== CURRENCY_TYPE.upi
  //     );
  //     setTokens(new_tokens);
  //     onSelect(CURRENCY_TYPE.eth);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [locale]);
  const USDT_TOKEN = tokens.find(
    (item) => item.currency === CURRENCY_TYPE.usdt
  );
  const activeChain = tokens.find(
    (token) =>
      token.currency === activeCurrency &&
      !["card", "usdt", "solana"].includes(token.chain)
  );
  return (
    <Modal size={"xl"}   onClose={onClose} isOpen={isOpen} isCentered >
      <ModalOverlay className="css-wl0d9u" />
      <ModalContent
        bg="#161225"
        className="mobilewallet"
        borderRadius={"30px"}
        border="1px solid rgba(100,100,100,0.5)"
        overflow="hidden"
        pb="4"
        
      >
        <ModalHeader className="modalheader">{t("Select a Payment Method")}</ModalHeader>
        <ModalCloseButton color="white" fontSize={"20px"} className="modelclode"/>
        <Divider bg="#2D244D"  />
        <ModalBody p="0" pb="6" >
          {tokens.slice(0, 6).map((item) => (
            <HStack
              key={item.title}
              cursor="pointer"
              onClick={() => {
                onSelect(item.currency);
                setIsNative(true);
                if (item.isEVM) {
                  switchNetwork?.(item.chainId);
                }
                onClose();
              }}
              spacing="10"
              px="4"
              py="2"
              bg={
                activeCurrency === item.currency && isNative
                  ? "#2D244D"
                  : undefined
              }
              _hover={{
                bg: "#2D244D",
              }}
              _active={{
                bg: "#2D244D",
              }}
            >
              <Avatar ignoreFallback boxSize="50px" src={item.image} className="cardimage" />
              <Box>
                <Text fontSize="3xl" color="white" className="cardtitle">
                  {item.title}
                </Text>
                <Text fontSize="2xl" color="brand.creamy" className="cardsubtitle">
                  {item.subtitle}
                </Text>
              </Box>
            </HStack>
          ))}
          {/* <Divider borderColor="gray.100" my="4"  />
          <HStack
            cursor="pointer"
            justify="space-between"
            onClick={() => {
              setIsNative(false);
              if (!activeChain) {
                const token = tokens.find((item) => item.chainId === chain?.id);
                if (token) {
                  onSelect(token.currency);
                }
              }
              onClose();
            }}
            px="3"
            py="1"
            bg={!isNative ? "#2D244D" : undefined}
            _hover={{
              bg: "#2D244D",
            }}
            _active={{
              bg: "#2D244D",
            }}
          >
            <HStack spacing="4">
              <Avatar ignoreFallback boxSize="120px" src={USDT_TOKEN?.image}  className="cardimage"/>
              <Box>
                <Text fontSize="60px" color="white" className="cardtitle">
                  {USDT_TOKEN?.title}
                </Text>
                <Text fontSize="60px" color="brand.creamy" className="cardsubtitle">
                  {USDT_TOKEN?.subtitle}
                </Text>
              </Box>
            </HStack>
            <Menu placement="top-start">
              <MenuButton
                as={Button}
                display="flex"
                justifyContent="center"
                variant="unstyled"
                border="1px solid #ffffff10"
                borderRadius="8px"
                px="4"
                width={"100px"}
                height={"40px"}
                bg="#161225"
                className="bottomcard"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                color="brand.creamy"
                _hover={{ color: "#ffffff" }}
                rightIcon={<IoChevronDown fontSize={"20px"} className="modelclode"/>}
              >
                {activeChain && (
                  <Image
                    boxSize="20px"
                    src={activeChain?.image}
                    className="bottomimages"
                    alt={activeCurrency}
                  />
                )}
              </MenuButton>
              <MenuList
                color="white"
                bg="#090311"
                borderRadius="md"
                w="50px"
                className="bottomcardcontainer"
                h={"150px"}
                zIndex={10}
              >
                {tokens
                  .filter(
                    (token) => !["card", "usdt", "sol"].includes(token.currency)
                  )
                  .map((token) => (
                    <MenuItem
                      bg="transparent"
                      onClick={() => {
                        setIsNative(false);
                        onSelect(token.currency);
                        if (token.isEVM) {
                          switchNetwork?.(token.chainId);
                        }
                        onClose();
                      }}
                      textTransform="uppercase"
                      _hover={{ bg: "#212024" }}
                      
                      key={token.title}
                    >
                      <HStack>
                        <Image
                          boxSize="20px"
                          src={token.image}
                          alt={token.title}
                          className="subcardimage"
                        />
                        <Text fontSize={"15px"} className="subcardtitle">{token.subtitle}</Text>
                      </HStack>
                    </MenuItem>
                  ))}
              </MenuList>
            </Menu>
          </HStack> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CurrencyChooseModal;
