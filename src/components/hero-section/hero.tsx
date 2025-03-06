/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Text,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  useDisclosure,
  Link as CLink,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  DiscordIcon,
  InstagramIcon,
  TelegramIcon,
  XIcon,
  YoutubeIcon,
} from "@/data";
import { RiMenu3Fill } from "react-icons/ri";
import React from "react";
import { Brands } from "./banner";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { useIsAds } from "@/pages/ads";

export const HeroSection = () => {
  return (
    <Box
      width="92%"
      margin="4% 4%"
      borderRadius="45px"
      className="homepage"
      boxShadow="0px 4px 55.3px 0px rgba(255, 255, 255, 0.25)"
    >
      <Box h="2px" />
      <Navbar />
      <Hero />
    </Box>
  );
};
export const navItems = [
  {
    label: "*",
    url: "/",
  },
  {
    label: "Home",
    url: "/",
  },
  {
    label: "*",
    url: "/",
  },
  {
    label: "Explorer",
    url: "/",
  },
  {
    label: "*",
    url: "/",
  },
  {
    label: "Whitepaper",
    url: "https://virtupace.s3.us-east-1.amazonaws.com/virtupace-whitepaper.pdf",
  },
  {
    label: "*",
    url: "/",
  },
  { label: "Dashboard", url: "/dashboard" },
];
export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const t = useTranslations("");
  const btnRef = React.useRef<any>();
  const { text, href } = useIsAds();
  const drawer = (
    <>
      <>
        <Box
          mt={70}
          display={{ base: "block", md: "none" }}>
          <LanguageSwitcher />
        </Box>
        <IconButton
          ref={btnRef}
          variant="unstyled"
          onClick={onOpen}
          mt={70}
         ml={9}
          icon={<Icon boxSize={"80px"} as={RiMenu3Fill} pr={9} />}
          aria-label="Open menu"
          color="white"
          h="7"
          alignItems="center"
          _hover={{ color: "black" }}
          _active={{ bg: "white" }}
          display={{ base: "flex", md: "none" }}
        />
        <Drawer
          size={"lg"}
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay width={"500px"} />
          <DrawerContent
            bg="rgb(125,125,125) !important"
            display="flex !important"
            gap="50px !important"
            h="100% !important"
            maxH="400vh !important"
            width={"50%"}
          >
            <DrawerCloseButton fontSize={"30px"} pr={"70px"} mt={"70px"} />
            {/* <DrawerHeader> </DrawerHeader> */}
            <DrawerBody >
              <Stack spacing="20px">
                <Link href={"/"}>
                  <Box
                    cursor={"pointer"}
                    display={"flex"}
                    alignItems={"center"}
                    gap="5"
                    ml={"50px"}
                    mt={"50px"}
                  >
                    <Image src="/logo.webp" alt="virtupace Logo" w={"60px"} />
                    <Box fontSize={"50px"} fontFamily={"Rajdhani"}>Virtupace</Box>
                  </Box>
                </Link>
                <Box h="30px" color="white" />
                {navItems.map(({ label, url }) => (
                  <Link href={url} key={label} legacyBehavior passHref>
                    <CLink
                      lineHeight="60px"
                      fontSize="40px"
                      ml="50px"
                      fontFamily="'Rajdhani'"
                      fontWeight={500}
                    >
                      {t(label)}
                    </CLink>
                  </Link>
                ))}
              </Stack>
              <DrawerFooter>
                <HStack spacing={{ base: "3", md: "8", lg: "9" }} mt={50}>
                  
                  <Social />
                </HStack>
              </DrawerFooter>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={"80px"}
        mx="auto"
        px="4"
        maxW={"1440px"}
        className="homenav"

      >
        <Link href={"/"} legacyBehavior passHref>
          <Box
            as="a"
            cursor={"pointer"}
            display={"flex"}
            alignItems={"center"}
            gap="3"
            className="homeconatiner"
          >
            <Image src="logo.webp" alt="Virtupacelogo Logo" w={10}  className="homelogo" />
            <Box fontSize={"2xl"} fontFamily={"Rubik Glitch"} className="homepara">Virtupace</Box>
          </Box>
        </Link>
        <Box
          display={{ base: "none", md: "flex" }}
          gap="2"
          lineHeight="0px"
          fontFamily="'Rajdhani'"
        >
          {navItems.map(({ label, url }) => (
            <Link href={url} key={label} legacyBehavior passHref>
              <CLink >{t(label)}</CLink>
            </Link>
          ))}
        </Box>
        <HStack>

          <Link href={href}>
            <Button
              display={{ base: "none", md: "block" }}
              variant={"primary"}
              bg="white"
              color="black"
              fontFamily="'Rajdhani'"
              fontSize="25px"
              width={170}
              _hover={{
                backgroundColor: "rgba(255, 105, 180, 1)",
                border: "2px solid white",
                boxShadow:"0 0 10px white",
                color:"white"
              }}
              height={"43px"}
            >
              {text}
            </Button>
          </Link>

          {drawer}
        </HStack>
      </Box>
      <Box >
        <Box
          display={{ base: "none", md: "flex" }}
          justifyContent={"right"}
          marginRight="17px" >
          <LanguageSwitcher />
        </Box>
      </Box>
    </>
  );
}

export const Social = () => (
  <Box position="absolute" display="flex" left="25vw" gap="4vw" height="0.6vh">
    <Link
      target={"_blank"}
      aria-label="Instagram link"

      href="https://www.instagram.com/virtupace/"
    >
      <InstagramIcon boxSize={"120px"} className="iconbeckground"/>
    </Link>
    <Link
      target={"_blank"}
      aria-label="Youtube link"
      
      href="https://youtube.com/@virtupace?si=4iGDNSJKnxvTZ_u-"
    >
      <YoutubeIcon boxSize={"120px"} className="iconbeckground"/>
    </Link>
    <Link
      target={"_blank"}
      aria-label="Telegram link"
      href="https://t.me/+Pq7V1nlvo8Q1MDk1"
    >
      <Icon as={TelegramIcon} boxSize={"120px"} className="iconbeckground"/>
    </Link>
   
    <Link
      target={"_blank"}

      aria-label="Twitter link"
      href="https://x.com/Virtupace_?t=BH6Uwe_mDC8EJvLwY7zN7Q&s=09"
    >
      <Center
        boxSize={"120px"}
className="iconbeckground"
        bg={"rgb(41, 41, 41)"}
        color="white"
        rounded={"full"}
      >
        <XIcon boxSize={"70px"} pt={3}  />
      </Center>
    </Link>
  </Box>
);

function Hero() {
  const t = useTranslations();
  const { text, href } = useIsAds();
  return (
    <>
      <Box pt={{ base: "50px", md: "250px" }} pos="relative"  >
        <Image
          alt="homeback image"
          pos="absolute"
          top="-140px"
          left={"0"}
          w="full"
          src="/image 1.webp"
          zIndex={-1}
          dropShadow={"xl"}
          display={{ base: "none", md: "block" }}
          filter="brightness(0.6)"
          objectFit="cover"

        />
        <Box >
          <Box
            w="70%"
            h="123px"
            mt="-13%"
            fontFamily="'Rubik Glitch'"
            ml="27px"
            display="flex"
            fontSize="80px"
            fontWeight="100"
            lineHeight="71px"
            textAlign="left"
            _hover={{
              filter: "drop-shadow(0px 0px 5px rgb(236, 236, 236))",
              textShadow: "0 0 1px rgb(236, 236, 236)",
            }}
            className="homecontant" style={{transformOrigin:"left"}}
          >
            Pioneering the future of gaming
          </Box>
          <Box>
            <Box
              w="80%"
              mt="4%"
              ml="27px"
              display="flex"
              gap="0px"
              fontFamily="'Rajdhani'"
              fontSize="35px"
              fontWeight="700"
              lineHeight="35px"
              textAlign="left"

              className="homesubcontant  "
              style={{animationDelay:"1s",transformOrigin:"left"}}
              color="rgba(255, 255, 255, 0.8)"
            >
              The first metaverse blockchain network built for the next decade.
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              mt="9%"
              className="homebottom"
              pb="2%"
            >
              <Box
                display="flex"
                gap="15px"
              >
                <Box
                  w="152px"
                  h="152px"
                  ml="3%"
                  gap="0px"
                  borderRadius="90px"
                  backgroundColor="rgb(79, 75, 75)"
                  display={{base:"none",md:"flex"}}
                  backdropFilter="blur(4.918032646179199px)"
                >
                  <Box
                    w="140px"
                    h="141px"
                    mt="4.5px"
                    ml="3.5px"
                    display="flex"
                    gap="0px"
                    borderRadius="96px"
                    bg="rgba(0, 0, 0, 1)"
                    border="0.75px solid rgba(255, 255, 255, 1)"
                  >
                    <Image src="https://virtupace.s3.us-east-1.amazonaws.com/logo.png" alt="homelgo"
                      w="85px"
                      h="85.61px"
                      mt="23.5px"
                     
                      className=" "
                      ml="27.5px"
                      display="flex"
                      gap="0px"
                    />
                  </Box>
                </Box>
                <Box
                  display={{ base: "none", md: "flex" }}
                  width="471px"
                  fontFamily="Rajdhani"
                  fontSize="13.63px"
                  fontWeight="200"
                  lineHeight="30px"
                  letterSpacing="0.5px"
                  textAlign="left"
                  mt="-1%">
                  <Text as="p" className=" ">
                    With near zero gas fees and  <br /> lightning-fast transactions, <br />
                    Virtu Pace will power a whole new <br /> generation of <br />
                    games where performance matters.
                  </Text>
                </Box>
              </Box>
              <Box
                h="135px"
                mr="20px"
                display="flex"
               className="listingcontainer"
                flexDirection="column"
                p="20px"
                fontFamily="Rajdhani"
                gap="15px"
                borderRadius="23px"
                bg="rgba(255, 255, 255, 0.1)"
                backdropFilter="blur(50px)"
                boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.25)"
              >
                <Box width="254.63px"
                  height="24px"
                  gap="5px"
                  pr="10px"
                  className="row  "
                  display="flex">
                  <Text as="p"
                    width="187px"
                    className="rowhead"
                    textTransform="uppercase"
                    fontWeight="500"
                    fontSize="19px"
                    color="rgba(255, 255, 255, 0.5)"
                  >
                  // Listing Price
                  </Text>
                  <Text as="p" height="24px"
                    gap="5px"
                    display="flex"
                    justifyContent="space-between"
                    color="rgb(230, 230, 230)" >
                    $0.05
                    <Text
                      fontStyle="normal"
                      textTransform="none"
                      ml="10px"
                      color="rgb(84, 232, 84)"
                    >
                      (1000%)
                    </Text>
                  </Text>
                </Box>

                <Box width="254.63px"
                  height="24px"
                  gap="5px"
                  pr="10px"
                   className="row  " style={{animationDelay:"1s"}}
                  display="flex">
                  <Text as="p"
                    width="187px"
                     className="rowhead"
                    textTransform="uppercase"
                    fontWeight="500"
                    fontSize="19px"
                    color="rgba(255, 255, 255, 0.5)"
                  >
                  // next Price
                  </Text>
                  <Text as="p" height="24px"
                    gap="5px"
                    display="flex"
                    justifyContent="space-between"
                    color="rgb(230, 230, 230)">
                    $0.0007
                    <Text
                      fontStyle="normal"
                      textTransform="none"
                      ml="10px"
                      color="rgb(84, 232, 84)">
                      (+40%)
                    </Text>
                  </Text>
                </Box>
                <Box
                  width="254.63px"
                  height="24px"
                  gap="5px"
                  pr="10px"
                   className="row  " style={{animationDelay:"2s"}}
                  display="flex"
                >
                  <Text as="p"
                    width="187px"
                     className="rowhead"
                    textTransform="uppercase"
                    fontWeight="500"
                    fontSize="19px"
                    color="rgba(169, 130, 236, 1)"
                  >
                    // Price now
                  </Text>
                  <Box
                    height="24px"
                    gap="5px"
                    display="flex"
                    justifyContent="space-between"
                    color="rgb(230, 230, 230)"
                  >
                    <Text as="p">$0.0005</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box display={{ base: "flex", md: "none" }} >
          <Image
            alt="homeback image"
            display={{ base: "block", md: "none" }}
            w="100%"
            height={"400px"}
            src="image 1.webp"
            zIndex={-10}
            position={"absolute"}
            mt={-12}
          />

        </Box>

        <Box
        className="enterbtn"
          cursor="pointer"
          position="absolute"
          width="180px"
          _hover={{
            backgroundColor: "rgba(255, 105, 180, 1)",
            border: "2px solid white",
            boxShadow:"0 0 10px white",
            color:"white"
          }}
          height="180px"
          marginTop="-70px"
          left="50%"
          transform="translateX(-50%)"
          display="flex"
          borderRadius="120px"
          border="0px solid black"
          zIndex="999"
          backgroundColor="rgba(255, 255, 255, 1)"
          backdropFilter="blur(4.918032646179199px)"
        >
          <Text
            cursor="pointer"
            width="120px"
            marginLeft="30px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            fontWeight="normal"
            fontFamily="'Rajdhani'"
            _hover={{
              
              color:"white"
            }}
            fontSize="32px"
            color="rgba(0, 0, 0, 1)"
          >
            ENTER
          </Text>
        </Box>
      </Box>

    </>
  );
}
