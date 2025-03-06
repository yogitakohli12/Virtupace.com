import { CURRENCY_TYPE } from "@/@types/enum";
import { useMaincontext } from "@/context/main";
import { CheckmarkIcon, CrossIcon } from "@/data";
import { IPrices } from "@/hooks/useGetPrices";
import {
  Alert,
  AlertDescription,
  Box,
  Checkbox,
  HStack,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { FC, useEffect, useState } from "react";

type BonusType = "A" | "B" | "C" | "D" | "a";
export interface Bonus {
  name: string;
  amount: number;
  value: BonusType;
  checked: boolean;
  net_amount: number;
  display: boolean;
}

const bonusList: Bonus[] = [
  {
    name: "+20,000 MEDOPACE as Bonus 🎁",
    amount: 100,
    value: "a",
    checked: false,
    net_amount: 100,
    display: false,
  },
  {
    name: "$25 Worth of Bonus MEDOPACE 🎁",
    amount: 500,
    value: "A",
    checked: false,
    net_amount: 500,
    display: false,
  },
  {
    name: "Clash of Tiles (10 free tiles) & VirtuPace Access 🪐",
    amount: 1000,
    value: "B",
    checked: false,
    net_amount: 1500,
    display: false,
  },
  {
    name: "VirtuPace Launchpad Passes 🔑",
    amount: 1000,
    value: "C",
    checked: false,
    net_amount: 2500,
    display: false,
  },
  {
    name: "VirtuPace Telegram Admin Group Access 😎",
    amount: 2500,
    value: "D",
    checked: false,
    net_amount: 5000,
    display: false,
  },
];
function findLastCheckedIndex(arr: Bonus[]): number {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i].checked) {
      return i;
    }
  }
  return -1; // Return -1 if no object with checked set to true is found
}
interface Props {
  value: number;
  pricesPerUnit: IPrices;
  currency: CURRENCY_TYPE;
  setInput: (value: string) => void;
  bonuses: Bonus[];
  setBonuses: React.Dispatch<React.SetStateAction<Bonus[]>>;
  isNative: boolean;
}
export const BuyingMessage: FC<Props> = ({
  value,
  pricesPerUnit,
  currency,
  setInput,
  bonuses,
  setBonuses,
  isNative,
}) => {
  const { round } = useMaincontext();
  const t = useTranslations();
  const [includedBonus, setIncludedBonus] = useState<Bonus[]>([]);
  const usd = (function () {
    switch (currency) {
      case "card": {
        return Number(value);
      }
      case "matic": {
        return isNative
          ? Number(pricesPerUnit.matic) * Number(value)
          : Number(value);
      }
      case "usdt": {
        return Number(value);
      }
      case "eth": {
        return isNative
          ? Number(pricesPerUnit.eth) * Number(value)
          : Number(value);
      }
      case "bnb": {
        return isNative
          ? Number(pricesPerUnit.bnb) * Number(value)
          : Number(value);
      }
      case "upi": {
        return Number(pricesPerUnit.inr) * Number(value);
      }
      case "sol": {
        return isNative
          ? Number(pricesPerUnit.sol) * Number(value)
          : Number(value);
      }
      case "trx": {
        return isNative
          ? Number(pricesPerUnit.trx) * Number(value)
          : Number(value);
      }
      default:
        return 0;
    }
  })();

  const getAmountWithUnit = (amount: number) => {
    if (currency === "card" || currency === "usdt" || !isNative)
      return `$${amount.toFixed(2)}`;
    if (currency === "upi")
      return `₹${(amount / pricesPerUnit.inr).toFixed(2)}`;
    if (currency === "matic")
      return `${Math.ceil((amount * 1000) / pricesPerUnit.matic) / 1000} MATIC`;
    if (currency === "eth")
      return `${Math.ceil((amount * 1000) / pricesPerUnit.eth) / 1000} ETH`;
    if (currency === "bnb")
      return `${Math.ceil((amount * 1000) / pricesPerUnit.bnb) / 1000} BNB`;
    if (currency === "sol")
      return `${Math.ceil((amount * 1000) / pricesPerUnit.sol) / 1000} SOL`;
    if (currency === "trx")
      return `${Math.ceil((amount * 1000) / pricesPerUnit.trx) / 1000} SOL`;
  };

  const getAmount = (amount: number) => {
    if (currency === "card" || currency === "usdt") return amount;
    if (currency === "upi") return Math.ceil(amount / pricesPerUnit.inr);
    if (currency === "matic") return amount / pricesPerUnit.matic;
    if (currency === "eth") return amount / pricesPerUnit.eth;
    if (currency === "bnb") return amount / pricesPerUnit.bnb;
    return 0;
  };
  const lastCheckedIndex = findLastCheckedIndex(includedBonus);
  const [addMoreConfig, setAddMoreConfig] = useState<{
    amount_with_unit: string;
    show: boolean;
    name: string;
  }>({
    amount_with_unit: "",
    name: "",
    show: false,
  });

  const bonus = bonusList.find((item) => usd < item.net_amount);
  useEffect(() => {
    if (usd) {
      setBonuses((prev_bonuses) => {
        const newBonuses = bonusList.map((item) => {
          if (usd >= item.net_amount && !item.checked) {
            return { ...item, checked: true, display: true };
          }
          return { ...item, display: item.display ? item.display : false };
        });
        setIncludedBonus(newBonuses);
        return newBonuses;
      });
    } else {
      setBonuses([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usd]);

  if (usd <= 0) {
    return <> </>;
  }

  const unCheckBonus = (bonus_value: BonusType) => {
    const newBonus = bonuses.map((item) => {
      if (item.value === bonus_value) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setIncludedBonus(
      includedBonus.map((item) => {
        if (item.value === bonus_value) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );
    const index = newBonus.findIndex((item) => item.value === bonus_value);
    if (index !== -1) {
      const bonus = newBonus[index];
      const new_value = bonus.checked
        ? getAmount(bonus.net_amount + 1)
        : index > 0
        ? getAmount(newBonus[index - 1].net_amount + 1)
        : 0;
      setInput(new_value.toFixed(4));
    }
    setBonuses(newBonus);
  };

  return !!includedBonus || !!bonus ? (
    <Box fontSize={"14px"} mt="4" >
      {!!includedBonus.length && (
        <Stack mb="2" fontWeight={600}  >
          <Box className="bonus"> {t("Bonus Included:")} </Box>
          {includedBonus
            .filter((item, index) => item.display)
            .map((item, index) => (
              <HStack
                key={item.name}
                w="fit-content"
                cursor={lastCheckedIndex < index ? "pointer" : "default"}
                onClick={() =>
                  lastCheckedIndex < index && unCheckBonus(item.value)
                }
               className="bonustext"
              >
                <Box
                  boxSize={"18px"}
                  borderRadius="sm"
                  borderWidth="1px"
                  borderColor={item.checked ? "transparent" : "gray.500"}
                  borderStyle="solid"
                  bg={item.checked ? "#A982EC33" : "#A982EC10"}
                  color={item.checked ? "#A982EC" : "gray.800"}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  lineHeight="100%"
                >
                  {item.checked && <CheckmarkIcon boxSize="16px"  />}
                </Box>
                <Box>
                  {item.value === "A" ? (
                    <Text as="span" >
                      {Number(25 / +round.price_per_token).toFixed(0)} Bonus
                      MEDOPACE Tokens 🎁
                    </Text>
                  ) : (
                    t(item.name)
                  )}{" "}
                  ({item.checked && t("Free")}{" "}
                  <Text
                    color={item.checked ? "#A982EC" : "#141414"}
                    textDecoration={item.checked ? "line-through" : "none"}
                    as="span"
                    className="font-space-grotesk "
                  >
                    ${item.amount}
                  </Text>
                  )
                </Box>
                {lastCheckedIndex === index &&
                  currency !== CURRENCY_TYPE.upi && (
                    <IconButton
                      aria-label="Cross Button"
                      variant="unstyled"
                      boxSize={"16px"}
                      p="0"
                      h="fit-content"
                      minW="fit-content"
                      w="fit-content"
                      icon={<CrossIcon />}
                      cursor="pointer"
                      onClick={() => unCheckBonus(item.value)}
                      _hover={{ color: "red.400" }}
                    />
                  )}
              </HStack>
            ))}
        </Stack>
      )}
      {bonus &&
        ((currency === CURRENCY_TYPE.upi && usd < 500) ||
          currency !== CURRENCY_TYPE.upi) && (
          <Alert px="0" fontSize={"14px"} status="info" mb="2" bg="transparent">
            <Checkbox
              size="lg"
              
              borderColor="#A982EC44"
              colorScheme="purple"
              isChecked={false}
              onChange={() => {
                setInput(
                  getAmount(
                    currency === CURRENCY_TYPE.card ||
                      currency === CURRENCY_TYPE.upi
                      ? bonus.net_amount
                      : bonus.net_amount + 1
                  ).toFixed(4)
                );
              }}
            >
              <AlertDescription fontSize={"14px"}>
                <HStack spacing="0">
                  <Box as="span" mx="2" fontWeight={600} className="font-space-grotesk">
                    {t("Add")}{" "}
                    <Text
                      as="span"
                      color="#A982EC"
                      className="font-space-grotesk "
                    >
                      {getAmountWithUnit(bonus.net_amount - usd)}
                    </Text>{" "}
                    {t("more to get")}{" "}
                    <Text
                      as="span"
                      className="font-space-grotesk "
                      color="#0DEC96"
                    >
                      {bonus.value === "A" ? (
                        <Text as="span">
                          {Number(25 / +round.price_per_token).toFixed(0)} Bonus
                          MEDOPACE Tokens 🎁
                        </Text>
                      ) : (
                        t(bonus.name)
                      )}
                    </Text>
                  </Box>
                </HStack>
              </AlertDescription>
            </Checkbox>
          </Alert>
        )}
    </Box>
  ) : null;
};
