import {
  Box,
  Heading,
  HStack,
  Text,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { Card } from "./why-section";
import { useTranslations } from "next-intl";
import { TextStroke } from "../ui/text-stroke";

const features = [
  {
    title: "Scalability",
    description: "scalability-description",
    icon: "/assets/blockchain/scalability.svg",
  },
  {
    title: "Gaming Optimized",
    description: `gaming-optimized-description`,
    icon: "/assets/blockchain/gaming-optimized.svg",
  },
  {
    title: "Cost Efficiency",
    description: "scalability-description",
    icon: "/assets/blockchain/cost-efficiency.svg",
  },
  {
    title: "Instant Finality",
    description: `instant-finality-description`,
    icon: "/assets/blockchain/instant.svg",
  },
];

export function AurealoneBlockchain() {
  const t = useTranslations();
  return (
    <Box className="metablockchain">
      <Image src="half-globe.webp" alt="half-globe"  position={"relative"}  />

      <Box
        position="absolute"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        width="100%"
        marginTop="-90%"
        className="metablockchaincontainer"
        fontFamily="'Rajdhani'"
        height="1100px"
      >
        <Box height="276px" ml="11%" className="blocktophead">
          <Box
            fontSize="110px"
            fontWeight="700"
            width="600px"
            display="flex"
            flexDirection="column"
            gap="25px"
          >
            <Heading
              fontSize="65px"
              textShadow="60px 0px 0px rgba(137, 135, 135, 0.5), 90px 0px 0px rgba(92, 92, 92, 0.5), 120px 0px 0px rgba(60, 59, 59, 0.5)"
            >Meta Verse
            </Heading>
            <Text 
              color="rgba(255, 193, 7, 1)" 
              mt="-70px" 
              textShadow="60px 0px 0px rgba(122, 100, 31, 0.5), 90px 0px 10px rgba(85, 65, 6, 0.5), 120px 0px 0px rgba(42, 33, 4, 0.5)"
            >
              Blockchain
            </Text>
          </Box>
          <Box className="blockparacontainer">
            <Text 
              pr="30%" 
              fontSize="16px" 
              mt="-1%" 
              lineHeight="18px"
              className="blockparagraph"
            >
              Meta Verse is built on advanced blockchain technology designed specifically for the gaming and metaverse sectors. Our platform utilizes Zero Knowledge Rollups (ZK-Rollups) to provide lightning-fast transaction speeds and minimal gas fees, ensuring a seamless gaming experience.
            </Text>
          </Box>
        </Box>
        <SimpleGrid display="flex" padding="6%" marginTop="3%" gap="35px" className="blockcards">
          <Box
            className="blockchaincard"
            
            display="flex"
            alignItems="center"
            flexDirection="column"
            gap="20px"
            width="260px"
            height="340px"
            padding="1%"
            background="radial-gradient(circle, transparent, rgb(30, 29, 29))"
          >
            <Image src="gaming-optimized.webp" alt="blockgamingimg"  boxSize="50px" className="blockimg" />
            <Heading  color="rgba(255, 255, 255, 1)" fontSize="20px" fontWeight="bold" className="blockhead">Gaming Optimized</Heading>
            <Text
            className="blockpara"
              padding="13%"
              color="rgba(255, 255, 255, 1)"
              fontSize="15px"
              background="#000000b8"
            >
              Our architecture is designed specifcally for
              gaming applications, enabling rich and
              dynamic environments within the metaverse.</Text>
          </Box>
          <Box  display="flex"
           className="blockchaincard"
            alignItems="center"
            flexDirection="column"
            gap="20px"
            width="260px"
            height="340px"
            padding="1%"
            background="radial-gradient(circle, transparent, rgb(30, 29, 29))">
            <Image src="cost-efficiency.webp" alt="blockcostimg"  boxSize="50px" className="blockimg" />
            <Heading color="rgba(255, 255, 255, 1)" fontSize="25px" fontWeight="bold" className="blockhead">Cost Efficiency</Heading>
            <Text  padding="13%"
              color="rgba(255, 255, 255, 1)"
              fontSize="15px"
              background="#000000b8"
              className="blockpara">Supports thousands of transactions per second (TPS), accommodating the demands of complex gaming interactions.</Text>
          </Box>
          <Box  display="flex"
            alignItems="center"
             className="blockchaincard"
            flexDirection="column"
            gap="20px"
            width="260px"
            height="340px"
            padding="1%"
            background="radial-gradient(circle, transparent, rgb(30, 29, 29))">
            <Image src="instant.webp" alt="blockinstantimg"  boxSize="50px" className="blockimg" />
            <Heading color="rgba(255, 255, 255, 1)" fontSize="25px" fontWeight="bold" className="blockhead">Instant Finality</Heading>
            <Text  padding="13%"
              color="rgba(255, 255, 255, 1)"
              fontSize="15px"
              background="#000000b8"
              className="blockpara">Transactions are confrmed within seconds, providing a responsive and fuid user experience.</Text>
          </Box>
          <Box  display="flex"
            alignItems="center"
             className="blockchaincard"
            flexDirection="column"
            gap="20px"
            width="260px"
            height="340px"
            padding="1%"
            background="radial-gradient(circle, transparent, rgb(30, 29, 29))">
            <Image src="scalability.webp" alt="blockscaleimg" boxSize="50px" className="blockimg" />
            <Heading color="rgba(255, 255, 255, 1)" fontSize="25px" fontWeight="bold" className="blockhead">Scalability</Heading>
            <Text  padding="13%"
              color="rgba(255, 255, 255, 1)"
              fontSize="15px"
              background="#000000b8"
              className="blockpara">Supports thousands of transactions per second (TPS), accommodating the demands of complex gaming interactions.</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
