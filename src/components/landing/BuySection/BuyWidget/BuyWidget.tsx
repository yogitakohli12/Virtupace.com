import { CURRENCY_TYPE } from "@/@types/enum";
import { GoogleIcon } from "@/data";
import useGetPrices from "@/hooks/useGetPrices";
import useHandleBuy from "@/hooks/useHandleBuy";
import { useRouter } from 'next/router';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Skeleton,
  SimpleGrid,
  Icon,
  Avatar,
  border,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
const BuyButton = dynamic(() => import("./BuyButton"), { ssr: false });
import { currencyImageMapper } from "./BuyButtons";
import WalletConnect, { Des } from "./WalletConnect";
import { useTranslations } from "next-intl";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { useDappStore } from "@/store/useDapp";
import WertCardPayment from "@/components/global/WertCardPayment";
import { MM_DEEPLINK, TRUST_DEEPLINK } from "@/config/url";
import WalletSelectModal from "@/components/global/WalletSelectModal";
import { chainId } from "@/config/chainId";
import { useSearchParams } from "next/navigation";
import CurrencyChooseModal from "./CurrencyChooseModal";
import SolanaConnect from "./SolonaConnect";
import { useWallet } from "@solana/wallet-adapter-react";
import TronConnect from "./TronConnect";
import { useWallet as useTronWallet } from "@tronweb3/tronwallet-adapter-react-hooks";
import { currencyToChainMapper } from "@/utils/currencyChainMapper";
import { useMaincontext } from "@/context/main";
import {
  FaArrowUpLong,
  FaArrowDownLong,
  FaChevronDown,
  FaCaretUp,
  FaArrowRight,
} from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import CustomButton from "./CustomButton";
import useGetBalance from "@/hooks/useGetBalance";
import { EventType, trackFBConversion } from "@/utils/trackFBConversion";
import useGetInfo from "@/hooks/useGetInfo";
import { Bonus, BuyingMessage } from "./BuyingMessage";
import AuthModal from "@/components/global/AuthModal";
import { formatTruncateAddress } from "@/utils/formatTruncateAddress";
import { queryClient } from "@/utils/queryClient";
import { ProgressBar } from "@/components/ui/progress-bar";
import Link from "next/link";
import CountDownTimer from "./CountDownTimer";
import { isEvmWallet } from "@/utils/isEvmWallet";
import CardPreInform from "./CardPreInform";
const BuyWidget: React.FC<BoxProps & { isUPIFirst?: boolean }> = ({
  children,
  isUPIFirst = false,
  ...rest
}) => {
  const searchParams = useSearchParams();
  const widgetSize = useMaincontext().widgetSize;
  const t = useTranslations();
  // const { d, h, m, s, isExpired } = useCountdownTimer(
  //   new Date(2024, 0, 10, 0, 0)
  // );
  const [isOpenAuthModal, setIsOpenAuthModal] = useState<boolean>(false);
  const [bonuses, setBonuses] = useState<Bonus[]>([]);
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [isNative, setIsNative] = useState<boolean>(true);
  const [showCurrencyModal, setShowCurrencyModal] = useState<boolean>(false);
  const { connector } = useAccount();
  const {
    isBuyingWithWert,
    setIsBuyingWithWert,
    isBuyingWithPaybis,
    setIsBuyingWithPaybis,
    clickId,
  } = useDappStore();
  const { address } = useAccount();
  const [currency, setCurrency] = useState<keyof typeof CURRENCY_TYPE>("eth");
  const [budget, setBudget] = useState<number>(1000);
  const [switchedCurrency, setSwitchedCurrency] =
    useState<keyof typeof CURRENCY_TYPE>("eth");
  const [inputState, setInputState] = useState<string>("");
  const { pricesPerUnit } = useGetPrices();
  const [isWalletSelectOpen, setIsWalletSelectOpen] = useState<boolean>(false);
  const getEquivalentUSDT = () => {
    if (!isNative) return +inputState;
    switch (switchedCurrency) {
      case CURRENCY_TYPE.bnb: {
        return +inputState * pricesPerUnit.bnb;
      }
      case CURRENCY_TYPE.eth: {
        return +inputState * pricesPerUnit.eth;
      }
      case CURRENCY_TYPE.matic: {
        return +inputState * pricesPerUnit.matic;
      }
      case CURRENCY_TYPE.upi: {
        return +inputState * pricesPerUnit.inr;
      }
      case CURRENCY_TYPE.sol: {
        return +inputState * pricesPerUnit.sol;
      }
      case CURRENCY_TYPE.trx: {
        return +inputState * pricesPerUnit.trx;
      }
      case CURRENCY_TYPE.usdt:
      case CURRENCY_TYPE.card: {
        return +inputState;
      }
      default:
        return 0;
    }
  };
  const { round, isLoadingRound, user, setUser } = useMaincontext();
  const router = useRouter();
  const {
    data: balance,
    isLoading: isLoadingBalance,
    refetch,
  } = useGetBalance();
  const {
    handleBuy,
    checkError,
    handleBuyWithUPI,
    isBuying,
    error,
    tokenAmount: actualTokenAmount,
    setIsBuying,
    buyWithPaybis,
    setIsLoadingPaybis,
    isLoadingPaybis,
  } = useHandleBuy({
    currency,
    pricesPerUnit,
    inputState,
    round,
    switchedCurrency,
    handleRefetch: () => {
      refetch();
    },
    isNative,
    getEquivalentUSDT,
    bonuses,
  });
  const tokenAmount = actualTokenAmount;
  const handleDeeplink = () => {
    const searchParams = new URLSearchParams({
      currency,
      amount: inputState,
    });
    const suffix = `?${searchParams.toString()}`;
    if (
      connector &&
      (connector?.name === "MetaMask" || connector?.name?.includes("MetaMask"))
    ) {
      const url = MM_DEEPLINK + encodeURI(suffix);
      window.location.assign(url);
      return;
    } else if (
      connector &&
      (connector?.name === "Trust Wallet" ||
        connector?.name == "Injected" ||
        connector?.name.includes("Trust Wallet"))
    ) {
      const url = TRUST_DEEPLINK + encodeURI(suffix);
      window.location.assign(url);
      return;
    } else {
      setIsWalletSelectOpen(true);
    }
  };
  const connectWallet = async () => {
    return (window as any)?.ethereum.request({
      method: "eth_requestAccounts",
    });
  };
  const handleCheckWeb3Injected = async () => {
    if (!(window as any).ethereum) {
      // handleDeeplink();
      setIsWalletSelectOpen(true);
    } else {
      try {
        // To check if ethereum is installed in injcected wallet
        await connectWallet();
        handleBuy();
      } catch (e) {
        // handleDeeplink();
        setIsWalletSelectOpen(true);
      }
    }
  };
  const onBuyClick = async () => {
    if (checkError()) {
      return;
    }
    return handleBuy();
  };

  const handleInputState = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (+value && (+value > 50000 || +value < 0)) {
      return;
    }
    if (+value >= 5000) {
      setBudget(+value);
    }
    setInputState(value);
  };

  const token_evaluation_at_listing =
    +tokenAmount * (1 / pricesPerUnit.inr) * 0.01;
  const gain_percentage = +inputState
    ? token_evaluation_at_listing / +inputState
    : 0;
  useEffect(() => {
    const amount = searchParams.get("amount");
    const currencyParams = searchParams.get("currency") as CURRENCY_TYPE;
    if (amount && currencyParams) {
      if (
        Object.values(CURRENCY_TYPE).includes(currencyParams) &&
        currencyParams !== currency
      ) {
        setCurrency(currencyParams);
        setSwitchedCurrency(currencyParams);
      }
      if (!isNaN(+amount)) {
        setInputState(amount);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const getConvertedPrice = (amount: number) => {
    return amount;
  };
  const { data: info } = useGetInfo();
  const handleCurrency = (currency: CURRENCY_TYPE) => {
    setCurrency(currency);
    setSwitchedCurrency(currency);
    trackFBConversion({
      event_type: EventType.AddPaymentInfo,
      email: address,
      country: info?.name || "",
    });
  };
  const { publicKey, connected } = useWallet();
  const { connected: tronConnected, address: tronAddress } = useTronWallet();
  const evmCurrencies = [
    CURRENCY_TYPE.eth,
    CURRENCY_TYPE.bnb,
    CURRENCY_TYPE.matic,
    CURRENCY_TYPE.card,
  ];
  const selectedNetworkId =
    chainId[currencyToChainMapper[currency as CURRENCY_TYPE]];

  const switchToSelectedNetwork = () => {
    if (selectedNetworkId) {
      switchNetwork?.(selectedNetworkId);
    }
  };
  const progress = round.funds_raised_cumulative
    ? (+round.funds_raised_cumulative / +round.round_target) * 100
    : 0;
  return (
    <>
      <div >
        <WalletSelectModal
          isOpen={isWalletSelectOpen}
          currency={currency}
          inputState={inputState}
          onClose={() => setIsWalletSelectOpen(false)}
        />
        <AuthModal
          isOpen={isOpenAuthModal}
          onClose={() => setIsOpenAuthModal(false)}
        />
        <CurrencyChooseModal
          activeCurrency={currency as CURRENCY_TYPE}
          isOpen={showCurrencyModal}
          onSelect={handleCurrency}
          onClose={() => setShowCurrencyModal(false)}
          isNative={isNative}

          setIsNative={(isNative) => setIsNative(isNative)}
        />
        {/* <SuccessModal
        revenue={tokenAmount * round.price}
        isOpen={isConversion}
        onClose={() => setIsConversion(false)}
      /> */}
        <Stack
          {...rest}
          h="fit-content"
          py={{ base: "2", md: "4", lg: "6" }}
          px={{ base: isBuyingWithWert ? "0" : "2", md: "4", lg: "6" }}
          position="relative"
          bgGradient={
            true
              ? "#2622378C"
              : "linear-gradient(33.86deg, rgba(11, 9, 22, 0.6) 63.82%, rgba(65, 49, 124, 0.198) 142.54%)"
          }
          _before={{
            content: '""',
            position: "absolute",
            top: 0,
            left: "50%",
            right: 0,
            bgGradient:
              "radial-gradient(81.22% 62.18% at 2.75% 10.53%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.22) 100%)",
            h: "200px",
            filter: "blur(100px)",
            zIndex: -1,
          }}
        // px={
        //   isBuyingWithWert
        //     ? { base: "16px", md: "24px" }
        //     : { base: "22px", md: "42px" }
        // }
        // pt={{ base: "20px", md: "35px" }}
        // pb={{ base: "20px", md: "25px" }}
        // overflow={"hidden"}
        // {...(isBuyingWithWert && {
        //   width: { base: "full", md: "527px" },
        // })}
        >
          {isBuyingWithWert ? (
            <>
              <Box w={{ base: "full", md: "500px" }} mx="auto">
                <WertCardPayment
                  inputUSD={+inputState || 0}
                  onSuccess={() => { }}
                  tokenAmount={tokenAmount}
                  value={Number(
                    Math.ceil((+inputState / pricesPerUnit.bnb) * 1000) / 1000
                  )}
                />
              </Box>
              <HStack justify="center" mt="4">
                <Button
                  h="fit-content"
                  py="0"
                  w="fit-content"
                  variant="unstyled"
                  textDecor="underline"
                  fontSize="md"
                  color="#E8E7F6"
                  fontWeight="semibold"
                  cursor="pointer"
                  onClick={() => {
                    setIsBuyingWithWert(false);
                    setIsBuying(false);
                  }}
                >
                  {t("Cancel Transaction")}
                </Button>
              </HStack>
            </>
          ) : (
            <>
              {isBuyingWithPaybis && (
                <Box>
                  <Button
                    display="flex"
                    alignItems="center"
                    variant="unstyled"
                    leftIcon={<IoMdArrowBack size={20} />}
                    onClick={() => {
                      setIsBuyingWithPaybis(false);
                    }}
                  >
                    Back
                  </Button>
                </Box>
              )}
              <HStack
                my="4"
                justify="space-between"
                spacing={{ base: "4", md: "6" }}
              >
                <HStack>
                  <div
                  >
                    {/* <Avatar
                    src="/image/token-symbol.webp"
                    boxSize={
                      widgetSize === "sm"
                        ? "40px"
                        : { base: "40px", md: "60px", lg: "66px" }
                    }
                    rounded="full"
                    objectFit="contain"
                  /> */}
                  </div>
                  <Box
                    fontSize={
                      widgetSize === "sm"
                        ? { base: "md", md: "lg", lg: "2xl" }
                        : { base: "md", sm: "lg", md: "2xl", lg: "30px" }
                        
                    }
                  
                  >
                    {/* <Text fontWeight="normal" lineHeight="normal">
                    Buy
                  </Text> */}
                    {/* <Text
                    fontWeight="bold"
                    whiteSpace="nowrap"
                    lineHeight="normal"
                  >
                    MEDO Coin
                  </Text> */}
                  </Box>
                </HStack>
                <CountDownTimer />
              </HStack>

              {isBuyingWithPaybis ? (
                <CardPreInform />
              ) : (
                <>
                  {isLoadingRound ? (
                    <Skeleton
                      h="48px"
                      startColor="#2f32417f"
                      endColor="#212024CC"
                      borderRadius="12px"
                    />
                  ) : (
                    <Box >
                      <Box
                        display="flex"
                        w="100%"
                        mt="2%"
                        fontFamily="Rajdhani"
                        justifyContent="center"
                        alignItems="center"
                        h="50px"
                        gap="20px"
                        className="presalewallet"
                      >
                        <Box 
                        className="presalelive" 
                        display={"flex"} 
                        gap={"10px"} 
                        lineHeight={"50px"} 
                        >
                        <Text 
                        className="dot" 
                        border={"2px solid rgb(0,255,0)"} 
                        width={"30px"} 
                        height={"30px"}
                        borderRadius={"50%"}
                        display={"flex"}
                        alignSelf={"center"}
                        background={"rgb(0,255,0)"}
                        >
                        </Text>
                        <Text fontSize="45px" fontWeight="700" className="presale"> Presale is LIVE</Text>
                        </Box>
                       
                        <Box
                          display="flex"
                          alignItems="center"
                          alignContent="center"
                          textAlign="center"
                          alignSelf="center"
                          height="60px"
                          gap="5px"
                          pl="2%"
                          className="price"
                        >
                          <Text
                            height="60px"
                            alignItems="center"
                            textAlign="center"
                            fontSize="20px"
                            fontWeight="bold"
                            lineHeight="59.98px"
                            className="pricetxt"
                          >
              // {t(`Next price increase by`)}
                          </Text>
                          <Text
                            color="green.500"
                            letterSpacing="0px"
                            lineHeight="1px"
                            fontSize="35px"
                            fontWeight="bold"
                            textAlign="left"
                            className="pricetxt"
                          >
                            ^ {+round.percent_increase_next_round}%
                          </Text>
                          <Text
                            fontWeight="700"
                            ml="50px"
                            fontSize="25px"
                            className="pricetxt"
                          >
                            {Number(round.funds_raised_cumulative).toLocaleString(
                              "en-US"
                            )}{" "}
                            <Text
                              as="span" color="#9B94B5" className="pricetxt">
                              / {Number(round.round_target).toLocaleString("en-US")}
                            </Text></Text>
                          {/* <Text
                      textAlign="right"
                      fontSize={{ base: "md", lg: "lg" }}
                     
                    >
                      {Number(round.funds_raised_cumulative).toLocaleString(
                        "en-US"
                      )}{" "}
                      <Text as="span" color="#9B94B5">
                        / {Number(round.round_target).toLocaleString("en-US")}
                      </Text>
                    </Text> */}
                        </Box>
                      </Box>
                    </Box>
                  )}
                  {isLoadingRound ? (
                    <Skeleton

                      mt="2"
                      h="44px"
                      startColor="#2f32417f"
                      endColor="#212024CC"
                      borderRadius="12px"
                    />
                  ) :
                    <Box mt="1">
                      <ProgressBar percent={progress} ml={8} h="40px" color="red" width={"86%"} className="progressbar" /
                      >
                      <HStack
                        className="priceconatiner "
                        justify="center"
                        mt="2"
                        gap={{ base: "4", md: "6" }}
                        flexWrap={"wrap"}
                      >
                        <Text fontWeight="semibold" color="white" fontSize="lg" className="currentprice" >
                          {t(`Current Price`)} ={" "}
                          <Text as="span" >
                            ${+round.price_per_token}
                          </Text>
                        </Text>
                        <Text
                          fontWeight="semibold"
                          display="flex"
                          alignItems="center"
                          gap="2"
                          color="white"
                          fontSize="lg"
                          className="currentprice"
                        >
                          {t(`Listing Price`)} ={" "}
                          <Text
                            as="span"
                            display="flex"
                            alignItems="center"
                            gap="1"
                          >
                            $0.05
                            <Text
                              display="flex"
                              alignItems="center"
                              gap="1"

                              lineHeight="normal"
                              color="#0DEC96"
                            >
                              <FaCaretUp />{" "}
                              {+round.percent_difference_to_listing_price}%
                            </Text>
                          </Text>
                        </Text>
                      </HStack>
                    </Box>
                  }
                  <Box mt="6" >
                    {/* <Text fontWeight="normal" fontSize="md">
                    {t(`Select a payment method`)}
                  </Text> */}
                    <HStack
                      mt="4"
                      className="dropcontainer "
                      display={{ base: "flex", md: "none" }}
                      onClick={() => setShowCurrencyModal(true)}
                      py={"12px"}
                      gap={"4"}
                      px={"4"}
                      border={"10px solid black"}
                      rounded="4px"
                      bg="black"
                      cursor="pointer"
                      justify="space-between"
                      _hover={{
                        bg: "black",
                      }}
                      _active={{
                        bg: "black",
                      }}
                    >
                      <HStack w="100%" h="110px" ml="-10%" >
                        <Image
                          minW={{ base: "18px", md: "20px", lg: "24px" }}
                          boxSize={{ base: "18px", md: "20px", lg: "24px" }}
                          src={
                            isNative
                              ? currencyImageMapper[currency]
                              : currencyImageMapper["usdt"]
                          }
                          alt={currency}
                          className="dropimage"
                          w="90px !important"
                          h="120px !important"
                          bg="black"


                        />
                        <Text
                          as="span"
                          color={"gray"}
                          textTransform="uppercase"
                          fontSize="60px"

                        >
                          {isNative ? currency : "USDT"}
                        </Text>
                      </HStack>
                      <FaChevronDown fontSize={"70px"} />
                    </HStack>
                    <SimpleGrid
                      columns={3}
                      mt="4"
                      gap={
                        widgetSize === "sm"
                          ? { base: "2" }
                          : { base: "2", md: "3" }
                      }
                      display={{ base: "none", md: "grid" }}
                    >
                      {[
                        { label: "ETH", currency: CURRENCY_TYPE.eth },
                        { label: "BNB", currency: CURRENCY_TYPE.bnb },
                        { label: "MATIC", currency: CURRENCY_TYPE.matic },
                        // { label: "CARD", currency: CURRENCY_TYPE.card },
                      ].map(({ label, currency: itemCurrency }) => (
                        <PaymentMethod
                          key={label}
                          label={label}
                          image={currencyImageMapper[itemCurrency]}
                          onClick={() => {
                            handleCurrency(itemCurrency);
                            setIsNative(true);
                          }}
                          isActive={currency === itemCurrency && isNative}
                        />
                      ))}
                      {/* <PaymentMethod
                      label={"other"}
                      
                      image={"/image/icon/other-currency.svg"}
                      onClick={() => setShowCurrencyModal(true)}
                      isActive={false}
                    /> */}
                    </SimpleGrid>
                  </Box>
                  <HStack justify={"space-between"} my="4">
                    <HStack gap="2">
                      {/* <FaArrowUpLong fontSize="md" /> */}
                      {/* <Text textTransform="uppercase">{t(`You pay`)}</Text> */}
                    </HStack>
                    <HStack gap="2">
                      {/* <Text textTransform="uppercase">{t(`You get`)}</Text> */}
                      {/* <FaArrowDownLong fontSize="md" /> */}
                    </HStack>
                  </HStack>
                  <HStack
                    rounded="4px"
                    color="black"
                    fontSize="50px"
                    bg="rgba(255, 255, 255, 1)"
                    py={{ base: "2", md: "4" }}
                    px={{ base: "4", lg: "6" }}
                    className="inputfield "
                    flexDir={{ base: "column", md: "row" }}
                    justify={"space-between"}
                    align={{ base: "flex-start", md: "center" }}
                  >
                    <InputGroup flex="1" position="relative"  >
                      <InputLeftAddon
                        borderTopLeftRadius="12px"
                        borderBottomLeftRadius="12px"
                        border="none"
                        bg="none"
                        h="2.5rem"
                        pl={{ base: "0", md: "2px" }}
                        pr="2"
                      >

                        <Text
                          as="span"
                          textTransform="uppercase"
                          color="black"
                          fontSize={"30px"}
                          className="inputtextleft"
                        >
                          {isNative ? currency : "USDT"}
                        </Text>
                      </InputLeftAddon>
                      <Input

                        h="2.5rem"
                        rounded="12px"
                        bg="none"
                        color="black"
                        fontWeight="medium"
                        type="number"

                        fontSize={{ base: "lg", md: "3xl", lg: "30px" }}
                        pl="4"
                        pr="10"
                        _hover={{
                          bg: {
                            base: "none",
                            md: "#212024",
                            border: "1px solid #ffffff26",
                          },
                        }}
                        _focus={{
                          bg: {
                            base: "none",
                            md: "#212024",
                            border: "1px solid #ffffff26",
                          },
                        }}
                        appearance="none"
                        variant="unstyled"
                        outline="none"
                        autoFocus
                        min={0}
                        letterSpacing="1px"
                        w="full"
                        max={50000}
                        value={inputState}
                        onWheel={(e: any) => {
                          e.target.blur();
                        }}
                        onChange={handleInputState}
                        placeholder="00.00"
                        className="inputtextleft"

                      />
                      {!!inputState && (
                        <Text
                          position="absolute"
                          top="50%"
                          right="4"
                          className="inputtext"
                          transform="translateY(-50%)"
                          fontSize="lg"
                          color="black"
                          as="span"
                        >
                          ${getEquivalentUSDT().toFixed(2)}
                        </Text>
                      )}
                    </InputGroup>
                    <HStack
                      w="fit-content"
                      display={{ base: "none", md: "flex" }}
                    >
                      <Icon as={FaArrowRight} lineHeight="0" fontSize="54px" />
                    </HStack>
                    <HStack
                      display={{ base: "none", md: "flex" }}
                      flex="1"
                      gap="4"
                      w={{ base: "full", md: "auto" }}
                      justify={{ base: "flex-start", md: "flex-end" }}

                    >
                      <Text
                        as="span"
                        fontSize={{ base: "lg", md: "2xl", lg: "30px" }}
                      >
                        {tokenAmount}
                      </Text>
                      <Text
                        as="span"
                        textTransform="uppercase"
                        color="black"
                        fontSize={"lg"}
                      >
                        MEDOPACE
                      </Text>
                    </HStack>
                  </HStack>
                  <HStack
                    mt="4"
                    h="58px"
                    border="1px solid #FFFFFF0F"
                    rounded="4px"
                    bg="rgba(255, 255, 255, 1)"
                    display={{ base: "flex", md: "none" }}
                    py={{ base: "2", md: "4" }}
                    px={{ base: "4", lg: "6" }}
                    align="center"
                    gap="4"
                    className="inputfield "
                  >
                    <Text
                      as="span"
                      textTransform="uppercase"
                      color="#9B94B5"
                      fontSize={"md"}
                      className="inputtext"
                    >
                      MEDOPACE
                    </Text>
                    <Text
                      as="span"
                      className="inputtext"
                      fontSize={{ base: "lg", md: "2xl", lg: "30px" }}
                    >
                      {tokenAmount}
                    </Text>
                  </HStack>
                  <HStack
                    px={{ base: "0", md: "6", lg: "10" }}
                    mt="6"
                    gap="4"
                    flexDir={{ base: "column", md: "row" }}
                    divider={
                      <Box
                        display={{ base: "none", md: "block" }}
                        h="40px"
                        borderWidth="0.5px"
                        borderColor="white"
                      />
                    }
                  >
                    {/* <HStack
                gap="4"
                flex="1"
                w={{ base: "full", md: "auto" }}
                justify={{ base: "space-between", md: "flex-end" }}
                >
                <Text as="span" color="#FFFFFF" fontSize="md">
                Your Staked MEDO
                </Text>
                <Text
                as="span"
                fontSize={{ base: "lg", md: "22px" }}
                fontWeight=""
                >
                0
                </Text>
                </HStack> */}
                  </HStack>
                  <BuyingMessage
                    value={Number(inputState)}
                    pricesPerUnit={pricesPerUnit}
                    currency={switchedCurrency as CURRENCY_TYPE}
                    setInput={(value: string) => {
                      handleInputState({ target: { value } } as any);
                    }}
                    bonuses={bonuses}
                    isNative={isNative}
                    setBonuses={setBonuses}
                  />
                  {widgetSize === "md" && (
                    <HStack justifyContent={"end"}>
                      <Link passHref href="/how-to-buy">
                        <Box _hover={{ textDecoration: "underline" }}>
                          {/* {t("how_to_buy_title")}? */}
                        </Box>
                      </Link>
                    </HStack>
                  )}

                  {!!balance && (
                    <HStack
                      gap="4"
                      flex="1"
                      mt="4"
                      w={{ base: "full", md: "auto" }}
                      justify={{ base: "space-between", md: "flex-start" }}
                    >
                      <Text
                        as="span"
                        color="#FFFFFF"
                        fontWeight="semibold"
                        fontSize="md"
                      >
                        Your MEDOPACE Balance
                      </Text>
                      {isLoadingBalance ? (
                        <Skeleton
                          h="48px"
                          startColor="#2f32417f"
                          endColor="#212024CC"
                          borderRadius="12px"
                        />
                      ) : (
                        <Text

                          as="span"
                          fontSize={{ base: "lg", md: "22px" }}
                          fontWeight=""
                        >
                          {Number(balance).toFixed(0) || 0}
                        </Text>
                      )}
                    </HStack>
                  )}
                  {error.show && (
                    <Box mt="6">
                      <Alert
                        status="error"
                        mb="4"
                        rounded="md"
                        bg="#1A0D2D"
                        color="red.500"
                      >
                        <AlertIcon />
                        <AlertDescription>{error.message}</AlertDescription>
                      </Alert>
                    </Box>
                  )}
                </>
              )}
              {isBuyingWithPaybis ? (
                <Box mt="6">
                  <BuyButton
                    mb="4"
                    onClick={() => {
                      buyWithPaybis(clickId, Number(inputState));
                      setIsLoadingPaybis(true);
                    }}
                    isLoading={isLoadingPaybis}
                  >
                    Continue
                  </BuyButton>
                </Box>
              ) : (
                <HStack mt="6" justify="space-between">
                  <Box w={"full"}>
                    {evmCurrencies.includes(currency as CURRENCY_TYPE) && (
                      <>
                        {(!!address ||
                          (currency === CURRENCY_TYPE.card &&
                            !!user &&
                            isEvmWallet(user.wallet_address))) && (
                            <>
                              {currency !== CURRENCY_TYPE.card &&
                                selectedNetworkId !== chain?.id ? (
                                <BuyButton
                                  mb="4"
                                  onClick={() => switchToSelectedNetwork()}
                                  className="walletbtn"
                                >
                                  {t("Switch Network")} (
                                  <Text as="span" textTransform="uppercase">
                                    {
                                      currencyToChainMapper[
                                      currency as CURRENCY_TYPE
                                      ]
                                    }
                                    )
                                  </Text>
                                </BuyButton>
                              ) : (
                                <BuyButton
                                  mb="4"
                                  w="full"
                                  className="walletbtn"
                                  isLoading={isBuying}
                                  isDisabled={isBuying || !inputState}
                                  onClick={onBuyClick}
                                />
                              )}
                            </>
                          )}
                        {!user ||
                          currency !== CURRENCY_TYPE.card ||
                          !!address ||
                          (!!user && !isEvmWallet(user.wallet_address)) ? (
                          <>
                            <Box >
                              <WalletConnect currency={currency} />
                              {!address && (
                                <Box 
                                width={"60%"}
                                >
                                  <Box
                                    display="flex"
                                    gap="20px"
                                    mt="-3%"
                                    w="100%"
                                  >
                                    {/* <div >
                                    <p>Your balance</p>
                                    <p>0 MedoPace</p>
                                  </div> */}
                                    {/* <div >
                                  <i ></i> 
                                      <p>How to buy</p>
                                  </div> */}
                                  </Box>
                                </Box>
                              )}
                              {/* {
                            !address &&
                              (!user ||
                                (!!user &&
                                  !isEvmWallet(user.wallet_address))) && (
                                <CustomButton
                                  variant="light"
                                  leftIcon={
                                    <HStack
                                      boxSize={{ base: "38px", lg: "34px" }}
                                      rounded="full"
                                      border="1px solid #FFFFFF0F"
                                      justify="center"
                                      bg="#26203D"
                                    >
                                      <GoogleIcon boxSize="6" />
                                    </HStack>
                                  }
                                  px="0"
                                  mt="10px"
                                  bg="none"
                                  _hover={{
                                    bg: "none",
                                  }}
                                  _active={{
                                    bg: "none",
                                  }}
                                  color="white"
                                  fontWeight={"normal"}
                                  onClick={() => {
                                    setIsOpenAuthModal(true);
                                  }}
                                >
                                  Login with gmail
                                </CustomButton>
                              )
                          } */}

                            </Box>
                            <Des />
                          </>
                        ) : (
                          !!user &&
                          isEvmWallet(user.wallet_address) && (
                            <Button
                              h="fit-content"
                              py="0"
                              w="full"
                              variant="unstyled"
                              textDecor="underline"
                              fontSize={"md"}
                              color={"#E8E7F6"}
                              fontWeight="medium"
                              cursor="pointer"
                              onClick={() => {
                                localStorage.removeItem("token");
                                queryClient.invalidateQueries(["user-profile"]);
                                setUser(undefined);
                              }}
                            >
                              {t("Disconnect")}{" "}
                              <Text
                                fontSize="sm"
                                as="span"

                              >
                                [
                                {formatTruncateAddress(user.wallet_address || "")}
                                ]
                              </Text>
                            </Button>
                          )
                        )}
                      </>
                    )}
                    {currency === CURRENCY_TYPE.sol && (
                      <>
                        {connected && publicKey && (
                          <BuyButton
                            mb="4"
                            w="full"
                            isLoading={isBuying}
                            isDisabled={isBuying || !inputState}
                            onClick={onBuyClick}
                          />
                        )}
                        <SolanaConnect />
                      </>
                    )}
                    {currency === CURRENCY_TYPE.trx && (
                      <>
                        {tronConnected && tronAddress && (
                          <BuyButton
                            mb="4"
                            isLoading={isBuying}
                            isDisabled={isBuying || !inputState}
                            onClick={onBuyClick}
                          />
                        )}
                        <TronConnect />
                      </>
                    )}
                  </Box>
                </HStack>
              )}
            </>
          )}
        </Stack>
      </div>

      {!router.pathname.includes("/dashboard") && (
        <Box className="whyvirtucontainer" display="flex" flexDirection="column" gap="40px" mt="140%" fontFamily="Rajdhani" width={"1200px"} ml={"-10%"} >
          <Box className="whyvirtue" >
            <Text className="virtuhead" display={"flex"} lineHeight={"100px"} fontWeight="bold" fontSize="40px"
              _hover={{
                color: "rgb(217, 17, 93)",
                cursor: "pointer"
              }}
            >
              Why VIRTUEPACE ??
              <Text fontSize={"70px"} className="virtuhead1" >?</Text>
              <Text fontSize={"70px"} className="virtuhead2">?</Text>
            </Text>
            <Text
              className="virtupara"
              color="rgb(124, 123, 123)"
              mt="1.5%"
              fontSize="40px"
              lineHeight="40px"
              width={"80%"}
              _hover={{
                color: "white"
              }}
            >
              virtupace is the blockchain built for the next generation of gaming and metaverse projects. Here’s why MEDOPACE is your key to this revolution
            </Text>
          </Box>
          <Box display="flex" gap="30px" width="100%" mt="3%" className="virtucards">
            <Box
              border="2px solid rgba(67, 67, 67, 1)"
              width="300px"
              height="340px"
              display="flex"
              flexDirection="column"
              padding="1%"
              justifyContent="center"
              gap="40px"
              borderRadius="40px"
              className="virtucard"

            >
              <Image src="zero-fees.webp" alt="zero-gas-fee" mt="5%" boxSize="60px" className="virtucardimg" />
              <Text
                color="rgba(67, 67, 67, 1)"
                fontWeight="700"
                fontSize="29px"
                display="flex"
                textAlign="center"
                justifyContent="center"
                height="70px"
                textTransform="uppercase"
                className="virtucardhead"
              >
                Zero Gas FEE
              </Text>
              <Text mb="10px"
                className="virtucardpara"
                fontSize="20px"
                textAlign="center">Play more, Pay less</Text>
            </Box>
            <Box border="2px solid rgba(67, 67, 67, 1)"
              width="300px"
              height="340px"
              className="virtucard"
              display="flex"

              flexDirection="column"
              padding="1%"
              justifyContent="center"
              gap="40px"
              borderRadius="40px">
              <Image src="rocket.webp" alt="rocket" mt="5%" boxSize="60px" className="virtucardimg" />
              <Text color="rgba(67, 67, 67, 1)"
                fontWeight="700"
                fontSize="29px"
                display="flex"
                textAlign="center"
                justifyContent="center"
                className="virtucardhead"
                height="70px"
                textTransform="uppercase">Lighting - Fast Transactions</Text>
              <Text mb="10px"
                className="virtucardpara"
                fontSize="20px"
                textAlign="center">Speed matters in gaming.</Text>
            </Box>
            <Box border="2px solid rgba(67, 67, 67, 1)"
              width="300px"
              height="340px"
              display="flex"
              flexDirection="column"
              padding="1%"
              justifyContent="center"
              gap="40px"
              className="virtucard"
              borderRadius="40px">
              <Image src="globee.webp" alt="globe" mt="5%" boxSize="60px" className="virtucardimg" />
              <Text color="rgba(67, 67, 67, 1)"
                fontWeight="700"
                fontSize="29px"
                display="flex"
                className="virtucardhead"
                justifyContent="center"
                height="70px"
                textTransform="uppercase" textAlign="left">
                Built for gaming <br /> & metaverse
              </Text>
              <Text mb="10px"
                fontSize="20px"
                className="virtucardpara"
                textAlign="center">Specifically designed for tomorrow’s digital worlds.</Text>
            </Box>
            <Box border="2px solid rgba(67, 67, 67, 1)"
              width="300px"
              height="340px"
              display="flex"
              flexDirection="column"
              padding="1%"
              className="virtucard"
              justifyContent="center"
              gap="40px"

              borderRadius="40px">
              <Image src="diamond.webp" alt="diamond" mt="5%" boxSize="60px" className="virtucardimg" />
              <Text color="rgba(67, 67, 67, 1)"
                fontWeight="700"
                fontSize="29px"
                display="flex"
                textAlign="center"
                className="virtucardhead"
                justifyContent="center"
                height="70px"
                textTransform="uppercase">Early access</Text>
              <Text color="rgba(255, 255, 255, 0.667)"
                mb="10px"
                fontSize="20px"
                className="virtucardpara"
                textAlign="center"
              >Buy MEDOPACE now at the best price!</Text>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default BuyWidget;

const LeftAddOn: React.FC<
  ButtonProps & {
    currency: string;
    switchedCurrency: string;
    handleSwitchCurrency: (currency: CURRENCY_TYPE) => void;
  }
> = ({
  currency,
  children,
  handleSwitchCurrency,
  switchedCurrency,
  ...rest
}) => {
    switch (currency) {
      case "card":
      case "usdt":
        return (
          <Button
            display="flex"
            justifyContent="center"
            variant="unstyled"
            color="brand.creamy"
            _hover={{ color: "#ffffff" }}
            {...rest}
          >
            <Image
              boxSize="24px"
              src={currencyImageMapper[currency]}
              alt={currency}
            />
          </Button>
        );

      case "upi":
        return (
          <Button
            display="flex"
            justifyContent="center"
            variant="unstyled"
            color="brand.creamy"
            _hover={{ color: "#ffffff" }}
            {...rest}
          >
            ₹
          </Button>
        );
      case "matic":
      case "bnb":
      case "eth":
      case "trx":
      case "sol":
        return (
          <Menu placement="top-start">
            <MenuButton
              as={Button}
              display="flex"
              justifyContent="center"
              variant="unstyled"
              color="brand.creamy"
              _hover={{ color: "#ffffff" }}
              rightIcon={<IoChevronDown />}
            >
              <Image
                boxSize="20px"
                src={currencyImageMapper[switchedCurrency]}
                alt={currency}
              />
            </MenuButton>
            <MenuList
              // position="relative"
              color="white"
              bg="#090311"
              borderRadius="md"
              w="100px"
              zIndex={10}
            >
              <MenuItem
                bg="transparent"
                onClick={() => {
                  handleSwitchCurrency(
                    switchedCurrency !== "usdt"
                      ? CURRENCY_TYPE.usdt
                      : (currency as CURRENCY_TYPE)
                  );
                }}
                textTransform="uppercase"
                _hover={{ bg: "#212024" }}
                key={currency}
              >
                <Image
                  boxSize="20px"
                  src={
                    switchedCurrency !== "usdt"
                      ? currencyImageMapper["usdt"]
                      : currencyImageMapper[currency]
                  }
                  alt={switchedCurrency}
                />
              </MenuItem>
            </MenuList>
          </Menu>
        );
      default:
        return <></>;
    }
  };

export const PaymentMethod: React.FC<{
  label: string;
  onClick: () => void;
  isActive: boolean;
  image: string;
}> = ({ label, onClick, isActive, image }) => {
  const t = useTranslations();
  const widgetSize = useMaincontext().widgetSize;
  return (
    <HStack
      onClick={onClick}
      py={{ base: "8px", md: "10px", lg: "12px" }}
      gap={
        widgetSize === "sm" ? { gap: "1.5" } : { base: "1", md: "3", lg: "4" }
      }
      px={widgetSize === "sm" ? "2" : { base: "1", md: "3", lg: "4" }}
      border={isActive ? "1px solid #ffffff" : "1px solid #FFFFFF0F"}
      rounded="4px"
      bg="rgba(255, 255, 255, 1)"
      cursor="pointer"
      _hover={{
        bg: "#16122570",
      }}
    >
      <HStack
        boxSize={
          widgetSize === "sm"
            ? { base: "20px" }
            : { base: "24px", md: "48px", lg: "54px" }
        }
        rounded="full"
        border={widgetSize === "sm" ? "" : "1px solid #FFFFFF0F"}
        justify="center"
      >
        <Image
          minW={
            widgetSize === "sm"
              ? { base: "20px" }
              : { base: "18px", md: "20px", lg: "24px" }
          }
          boxSize={
            widgetSize === "sm"
              ? { base: "20px" }
              : { base: "18px", md: "20px", lg: "24px" }
          }
          src={image}
          alt={label}
        />
      </HStack>
      <Text
        as="span"
        color={isActive ? "black" : "#9B94B5"}
        textTransform="uppercase"
        fontSize={widgetSize === "sm" ? "sm" : { base: "sm", lg: "md" }}
      >
        {t(label)}
      </Text>
    </HStack>
  );
};
