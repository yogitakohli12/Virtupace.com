import {
  Box,
  Heading,
  SimpleGrid,
  Text,
  Image,
  Center,
} from "@chakra-ui/react";
import { useScrollEffectState } from "./ecosystem";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { TextStroke } from "../ui/text-stroke";
import { useIsAds } from "@/pages/ads";

const features = [
  {
    title: "True Digital Ownership",
    description: `true-digital-ownership-description`,
  },
  {
    title: "Monetization",
    description: `monetization-description`,
  },
  {
    title: "Collaborative World-Building",
    description: `collaborative-world-building-description`,
  },
];


export function DarklumeMetaverse() {
  
  const t = useTranslations("");
  const setDarklumePositions = useScrollEffectState(
    (s) => s.setDarklumePositions
  );
  const cardRef = useRef<HTMLDivElement>(null);
  const { isAds } = useIsAds();

  useEffect(() => {
    const setPos = () => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const pageX = rect.left + window.scrollX;
        const pageY = rect.top + window.scrollY;
        setDarklumePositions([pageX, pageY]);
      }
    };
    setPos();
    window.addEventListener("resize", setPos);
    return () => {
      window.removeEventListener("resize", setPos);
    };
  }, [setDarklumePositions]);

  return (
    <Box className="metaversecontainer">
      <Image
        src="image 4.webp"
        alt="metverse image"
        position="relative"
        mt="0%"
        w="93%"
        h="1000px"
        display={{base:"none", md:"block"}}
        
      />
      <Image
        src="image 4.webp"
        alt="metverse image"
        position="relative"
        mt="0%"
        w="93%"
        h="1000px"
        display={{base:"block",md:"none"}}
        className="metaverseimage"
      />
      <Box
        border="1px solid rgba(255, 255, 255, 1)"
        position="absolute"
        display="flex"
        mt="-80%"
        flexDirection="column"
        fontFamily="'Rajdhani'"
        w="93%"
         className="metaversehead"
      >
         
        <Box
          w="900px"
          pt="1.5%"
          pb="3.5%"
          display="flex"
          flexDirection="column"
          pl="5%"
         
          border="1px solid rgba(255, 255, 255, 1)"
        >
          <Heading
            textTransform="uppercase"
            width="510px"
            className= "metaverseanimation  "
            fontSize="83px"
            fontWeight="700"
            color="rgba(217, 217, 217, 1)"
            textShadow="65px 0px 5px grey, 100px 0px 10px rgb(77, 75, 75)"
          >
           VIRTUPACE
          </Heading>
          <Heading
            color="rgba(244, 202, 22, 1)"
            fontSize="53px"
            mt="10px"
            textShadow="65px 0px 5px grey, 100px 0px 10px rgb(77, 75, 75)"
            className="meraversesubhead  "
          >
            Metaverse
          </Heading>
          <Text
            color="white"
            fontSize="21px"
            lineHeight="25px"
            className="metaverparagraph  "
          >
            A rich and expensive virtual world where Ownership Matters. metaverse lets users build, <br />
            trade, and interact in a limitless digital universe. From land ownership to immersive <br />
            experiences, the possibilities are endless.
          </Text>
        </Box>
        <SimpleGrid  className="metaverserow1" columns={{ base: 1, md: 3 }} spacing={4}  display="flex" fontSize="15px" border="1px solid rgba(255, 255, 255, 1)">
          <Box
            w="50%"
            p="2%"
            pl="3%"
            className=""
            border="1px solid rgba(255, 255, 255, 1)"
          >
            <Text color="white" fontSize="30px" fontWeight="500"  className="metaverrowheading  ">True Digital Ownership</Text>
            <Text fontSize="28px"  className="metaverparagraph  " style={{animationDelay:"1s"}}>Own land and assets in a fully decentralized metaverse.</Text>
          </Box>
          <Box  w="50%"
            border="1px solid rgba(255, 255, 255, 1)"
            p="2%"
            pl="3%">
            <Text  color="white" fontSize="30px" fontWeight="500" className="metaverrowheading  ">Monetization</Text>
            <Text fontSize="28px"  className="metaverparagraph  " style={{animationDelay:"1s"}}>Turn creativity and in-game assets into real-world value.</Text>
          </Box>
          <Box  w="50%"
           border="1px solid rgba(255, 255, 255, 1)"
            p="2%"
            pl="3%">
            <Text  color="white" fontSize="30px" fontWeight="500" className="metaverrowheading ">Collaborative World-Building</Text>
            <Text fontSize="28px"  className="metaverparagraph  " style={{animationDelay:"1s"}}>Join forces with other players to shape entire cities.</Text>
          </Box>
        </SimpleGrid>
        <Box
          borderLeft="1px solid rgba(255, 255, 255, 1)"
          pl="2%"
          w="60%"
          ml="38%"
          display="flex"
          flexDirection="column"
        >
          <Heading
            fontSize="108px"
            fontWeight="bold"
            display={"flex"}
            textShadow="60px 0px 10px grey, 90px 0px 10px rgb(71, 70, 70), 120px 0px 10px rgb(36, 35, 35)" className=" "
          >
              Clash <Box  color="rgba(244, 202, 22, 1)"
              >Of</Box> Tiles
            
          </Heading>
          <Text fontSize="21px" textAlign="right" display="flex"  className="metaverparagraph ">
            Enter a competitive, strategic game where you Deploy Your Favorite Cryptocurrencies, <br />
            Meme Coins, or Stocks on tiles to wage battle for <br /> dominance.
          </Text>
        </Box>
        <SimpleGrid className="metaverserow1" columns={{ base: 1, md: 3 }} spacing={4} display="flex" fontSize="15px" border="1px solid rgba(255, 255, 255, 1)">
          <Box  w="50%"
             border="1px solid rgba(255, 255, 255, 1)"
            p="2%"
            pl="3%">
            <Text  color="white" fontSize="30px" fontWeight="500" className="metaverrowheading  ">Tile-based Warfare</Text>
            <Text fontSize="28px"  className="metaverparagraph  " style={{animationDelay:"2s"}}>Conquer tiles based on real-world price movements.</Text>
          </Box>
          <Box  w="50%"
            border="1px solid rgba(255, 255, 255, 1)"
            p="2%"
            pl="3%">
            <Text  color="white" fontSize="30px" fontWeight="500" className="metaverrowheading  ">Dynamic Battles</Text>
            <Text fontSize="28px"  className="metaverparagraph  " style={{animationDelay:"2s"}}>Gain MEDO points through strategic deployment and price tracking.</Text>
          </Box>
          <Box  w="50%"
            border="1px solid rgba(255, 255, 255, 1)"
            p="2%"
            pl="3%">
            <Text  className="metaverrowheading  " color="white" fontSize="30px" fontWeight="500">Earn & Expand</Text>
            <Text fontSize="28px"  className="metaverparagraph  " style={{animationDelay:"2s"}}>Increase your territory by earning MEDO and expanding your empire.</Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>


  );
}
