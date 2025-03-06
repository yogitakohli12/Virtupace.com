import { CURRENCY_TYPE } from "@/@types/enum";
import { BNBIcon, CardIcon, EthereumIcon, MaticIcon, USDTIcon } from "@/data";
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdMoreVert } from "react-icons/md";

export const currencyIconMapper: Record<string, JSX.Element> = {
  eth: <EthereumIcon boxSize={{ base: "4", md: "5" }} />,
  bnb: <BNBIcon boxSize={{ base: "4", md: "5" }} />,
  matic: <MaticIcon boxSize={{ base: "4", md: "5" }} />,
  card: <CardIcon boxSize={{ base: "4", md: "5" }} />,
  usdt: <USDTIcon boxSize={{ base: "4", md: "5" }} />,
  sol: (
    <Image
      src="/image/icon/solana.svg"
      objectFit="contain"
      boxSize={{ base: 4, md: "5" }}
      alt="Solana Logo"
    />
  ),
  trx: (
    <Image
      src="/image/icon/tron.svg"
      objectFit="contain"
      boxSize="6"
      alt="Tron Logo"
    />
  ),
};

export const chainImageRoundMapper: Record<string, string> = {
  eth: "/image/icon/eth-round.webp",
  bnb: "/image/icon/bnb-round.webp",
  matic: "/image/icon/matic-round.webp",
  card: "/image/icon/card-round.webp",
  usdt: "/image/icon/usdt-round.webp",
  upi: "/image/icon/upi-round.webp",
  sol: "/image/icon/solana-round.webp",
  trx: "/image/icon/tron-round.webp",
};

export const currencyImageMapper: Record<string, string> = {
  eth: "/image/icon/eth-dark.webp",
  bnb: "/image/icon/bnb-dark.webp",
  matic: "/image/icon/matic-dark.webp",
  // card: "/image/icon/dollar-dark.webp",
  // usdt: "/image/icon/dollar.svg",
  // upi: "/image/icon/upi.svg",
  // sol: "/image/icon/solana.svg",
  // trx: "/image/icon/tron.svg",
  // other: "/image/icon/other-currency.svg",
};
const currencyImageTabMapper: Record<string, string> = {
  eth: "/image/icon/eth.webp",
  bnb: "/image/icon/bnb.webp",
  matic: "/image/icon/matic.webp",
  // card: "/image/icon/card1.svg",
  // usdt: "/image/icon/usdt.svg",
  // upi: "/image/icon/upi.svg",
  // sol: "/image/icon/solana.svg",
  // trx: "/image/icon/tron.svg",
};
export const currency_list = [
  "eth",
  "matic",
  // "card",
  "bnb",
  // "usdt",
  // "sol",
  // "trx",
];
const BuyButtons: React.FC<{
  currentCurrency: keyof typeof CURRENCY_TYPE;
  setCurrency: React.Dispatch<React.SetStateAction<keyof typeof CURRENCY_TYPE>>;
  isUPIFirst?: boolean;
}> = ({ currentCurrency, setCurrency, isUPIFirst = false }) => {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const [currencies, setCurreicies] = useState<string[]>(currency_list);
  const t = useTranslations();

  const moveToThird = (index: number) => {
    const newCurrencies = [...currencies];
    newCurrencies.splice(2, 0, currencies[index]);
    setCurreicies(Array.from(new Set(newCurrencies)));
  };

  useEffect(() => {
    const currency = searchParams.get("currency") as CURRENCY_TYPE;
    const currencyIndex = Object.values(currency_list).indexOf(currency);
    if (currencyIndex > 2) {
      moveToThird(currencyIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  return (
    <HStack spacing="4" justify="space-between">
      {currencies.slice(0, 3).map((currency) => (
        <TabButton
          key={currency}
          currency={currency}
          onClick={() => setCurrency(currency as CURRENCY_TYPE)}
          isActive={currency === currentCurrency}
        >
          {currency}
        </TabButton>
      ))}
      <Box position="relative">
        <Menu>
          <MenuButton
            as={TabButton}
            iconSpacing="1.5"
            rightIcon={<MdMoreVert fontSize={24} />}
          >
            {t("More")}
          </MenuButton>
          <MenuList color="white" bg="#090311" borderRadius="md">
            {currencies.slice(3).map((currency, index) => (
              <MenuItem
                bg="transparent"
                onClick={() => {
                  setCurrency(currency as CURRENCY_TYPE);
                  moveToThird(index + 3);
                }}
                as={Flex}
                textTransform="uppercase"
                _hover={{ bg: "#110226" }}
                key={currency}
                gap="1.5"
                align="center"
                cursor="pointer"
              >
                <Image
                  w="25px"
                  h="20px"
                  src={currencyImageTabMapper[currency]}
                  alt={currency}
                />
                {currency}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </HStack>
  );
};

export default BuyButtons;

const TabButton: React.FC<
  ButtonProps & { isActive?: boolean; currency?: string }
> = ({ children, isActive = false, currency, ...rest }) => (
  <Button
    size={{ base: "sm", md: "md" }}
    py="4"
    color={isActive ? "#ffffff" : "#ffffff70"}
    fontWeight="medium"
    px="8"
    role="group"
    bg={isActive ? "#110226" : "transparent"}
    _hover={{
      bg: "#110226",
      color: "#fff",
    }}
    _active={{
      bg: "#110226",
      color: "#fff",
    }}
    textTransform="uppercase"
    display={"flex"}
    alignItems="center"
    gap="1.5"
    borderRadius="12px"
    {...rest}
  >
    {currency && (
      <Image
        h="20px"
        w="25px"
        _groupHover={{ opacity: 1 }}
        opacity={isActive ? 1 : 0.7}
        src={currencyImageTabMapper[currency]}
        alt={currency}
      />
    )}
    {children}
  </Button>
);
