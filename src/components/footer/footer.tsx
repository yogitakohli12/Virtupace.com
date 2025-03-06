import {
  Box,
  Image,
  Stack,
  Divider,
  HStack,
  Flex,
  Text,
  Icon,
  Center,
  Button,
  SimpleGrid,
  Link as CLink,
} from "@chakra-ui/react";
import Link from "next/link";
import { navItems, Social } from "../hero-section/hero";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "../hero-section/language-switcher";
import { useIsAds } from "@/pages/ads";

import {
  DiscordIcon,
  InstagramIcon,
  TelegramIcon,
  XIcon,
  YoutubeIcon,
} from "@/data";
import { RiMenu3Fill } from "react-icons/ri";
import React from "react";

const pages = [
  { label: "About Us", url: "/about-us" },
  { label: "Terms and Conditions", url: "/terms-and-conditions" },
  { label: "Privacy Policy", url: "/privacy-policy" },
  { label: "Refund Policy", url: "/refund-policy" },
  { label: "Disclaimer", url: "/disclaimer" },
];

export function Footer() {
  const t = useTranslations();
  const { text, href } = useIsAds();
  return (
    <Box >
      <Box className="footer" bg="rgb(22, 22, 22)" mt={60} width={"92%"} ml={"4%"} mb={"4%"} borderRadius={"30px"} >
        <Box maxW="1240px" mx="auto" pb="20px" pt="180px" px="4" pl="35px">
          <Box  >
          
          <SimpleGrid
            gap={{ base: "5px", md: "5" }}
            rowGap={"20"}
            columns={{ base: 2, lg: 4 }}
            gridTemplateAreas={{
              base: `"a d" "b c"`,
              lg: `"a b c d"`,
            }}
            className="footerinner"
            
          >
            <Stack
             
              mt="15%"
            className="footerleft"
              maxW="200px"
              
              gridArea={"a"}
            >
              <Link href={"/"} legacyBehavior passHref>
                <Box
                  as="a"
                  cursor={"pointer"}
                  display={"flex"}
                  color="white"
                  alignItems={"center"}
                  gap="3"
                  fontFamily={"Rubik Glitch"}
                 
                >
                  <Image src="logo.webp" alt="Virtupace Logo" w={12} rounded={"full"} 
                 className="footerlogo"
                  /  >
                  <Box fontSize={"2xl"} className="footerpara">Virtupace</Box>
                </Box>
              </Link>
              <Box py="10px" fontSize={"sm"} color="white" width={"300px"} fontFamily={"Rajdhani"} className="footerparagraph">
               
                Join a movement where every voice fuels innovation.  Collaborate with creators, strategize with visionaries, and shape the future of play-to-earn gaming and the metaverse.
              </Box>
              <Box pb="10px" className="footercontact">{t("Contact")}: &nbsp;
                <Box as="a" color={"yellow"} href="mailto:team@virtupace.com" >
                  team@virtupace.com
                </Box>{" "}
              </Box>
              <br />
            </Stack>
           
            <Box
            className="footerright"
              display="flex"
              justifySelf="center"
              alignItems="right"
              width="100px"
              textAlign="right"
              justifyContent="right"
              justifyItems="right"
              marginLeft="86vw"
              gap="105px"
              marginTop="15%"
              fontFamily={"Rajdhani"}
            >

              <Box  display={"flex"} flexDirection={"column"} gap={3} >
                <Link href="/" className="footerbtn">Home</Link>
                <Text className="footerbtn">*</Text>
                <Link href="https://virtupace.s3.us-east-1.amazonaws.com/virtupace-whitepaper.pdf"  className="footerbtn">Whitepaper</Link>
                <Text className="footerbtn">*</Text>
                <Link href="/"  className="footerbtn">Explorer</Link>
                <Text className="footerbtn">*</Text>
                <Link href="/" className="footerbtn">Dashboard</Link>
              </Box>
              <Box display={"flex"} flexDirection={"column"} gap={3} >
                <Link href="/about-us" className="footerbtn">About Us</Link>
                <Text className="footerbtn">*</Text>
                <Link href="/terms-and-conditions" className="footerbtn">Terms and Conditions</Link>
                <Text className="footerbtn">*</Text>
                <Link href="/privacy-policy" className="footerbtn">Privacy Policy</Link>
                <Text className="footerbtn">*</Text>
                <Link href="/refund-policy" className="footerbtn">Refund Policy</Link>
              </Box>
              <Box display={"flex"} flexDirection={"column"} gap={3} >
                
                <Text className="footerbtn">Disclaimer</Text>
                <Text className="footerbtn">*</Text>
                <Box >
                  <LanguageSwitcher  />
                </Box>

                <Text className="footerbtn">*</Text>
                <Link href={href} className="footerbuybtn"><Button
                 className="buybtn"
                 _hover={{
                  backgroundColor: "rgba(255, 105, 180, 1)",
                  border: "2px solid white",
                  boxShadow:"0 0 10px white",
                  color:"white"
                }}
                >
                  {t(text)}
                </Button></Link>
              </Box>

            </Box>
            </SimpleGrid>
            </Box>
        
      
          <Divider my="10" borderColor="#9B94B5" />
          <HStack
            justify="space-between"
            flexDir={{ base: "column", md: "row" }}
            
          >
            <HStack spacing={4} >
                <Link
                  target="_blank"
                  aria-label="Instagram link"
                  href="https://www.instagram.com/virtupace/"
                 className="iconbeckground"
                >
                  <Icon as={InstagramIcon} boxSize="50px"   />
                </Link>
                <Link
                  target="_blank"
                  aria-label="Youtube link"
                  className="iconbeckground"
                  href="https://youtube.com/@virtupace?si=4iGDNSJKnxvTZ_u-"
                >
                  <Icon as={YoutubeIcon} boxSize="50px" />
                </Link>
                <Link
                  target="_blank"
                  className="iconbeckground"
                  aria-label="Telegram link"
                  href="https://t.me/+Pq7V1nlvo8Q1MDk1"
                >
                  <Icon as={TelegramIcon} boxSize="50px" />
                </Link>
               
                <Link
                  target="_blank"
className="iconbeckground"
                  aria-label="Twitter link"
                  href="https://x.com/Virtupace_?t=BH6Uwe_mDC8EJvLwY7zN7Q&s=09"
                >
                  <Center
                    boxSize="50px"

                    bg="rgb(41, 41, 41)"
                    color="white"
                    rounded="full"
                    className="iconbeckground"
                  >
                    <Icon as={XIcon} boxSize="35px" p={2} />
                  </Center>
                </Link>

              </HStack>
              <HStack>
              <Box className="footercopyright" fontSize={"sm"} pt="15px" color="white" >
                {t("Copyright © 2025, All Right Reserved")}
              </Box>
              </HStack>
          </HStack>
              
        </Box>
      </Box>

    </Box>
  );
}
