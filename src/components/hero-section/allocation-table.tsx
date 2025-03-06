import { Accordion, Box, Flex, Text, Heading, SimpleGrid, Image } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { ProgressBar } from "../ui/progress-bar";
import { Chart } from 'react-google-charts'
import { ChevronDown, ChevronUp } from "@/data";
import { useBreakpointValue } from "@chakra-ui/react";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
// const data = [
//   {
//     allocatedTo: "Presale",
//     percent: "65",
//     tokens: "23,364,579,865",
//   },
//   {
//     allocatedTo: "Development",
//     percent: "15",
//     tokens: "593,182,623",
//   },
//   {
//     allocatedTo: "Marketing",
//     percent: "10",
//     tokens: "3,594,550,748",
//   },
//   {
//     allocatedTo: "Liquidity",
//     percent: "10",
//     tokens: "3,594,550,748",
//   },
// ];

const presales = [
  {
    heading: `Presale, Launch Community Development and Trailer (Cage Conquest)`,
    content: `Phase 1 sets the foundation for the Cage Conquest journey, beginning with an exciting presale event that offers early supporters a chance to secure exclusive deals, special pricing, and access to premium features before the official launch. This stage is crucial for building a strong, dedicated community from the outset, allowing those who believe in the project to get involved early and be rewarded for their trust. In parallel, our focus will be on launch community development, where we aim to cultivate a vibrant and engaged user base. Through regular interactions, transparent communication, and exclusive events, we’ll foster a sense of belonging and loyalty among our early adopters. We believe that community is the heart of Cage Conquest, and their feedback and engagement will play a significant role in shaping the project’s future. To further excite and captivate our audience, we’ll release the Cage Conquest trailer, a cinematic experience designed to showcase the intensity, action, and story that will unfold within the game. With gripping visuals, thrilling sequences, and a taste of the world we’ve built, this trailer will spark anticipation and set the stage for the next phases. Together, these initiatives will lay the groundwork for a successful and exciting journey ahead.`,
    btn: `Q1/2025`
  },

  {
    heading: `Cage Conquest (Release), Community Growth and Trailer (Epic Arena)`,
    content: `Phase 2 of our journey is all about taking Cage Conquest to the next level with the official release of the game, marking the beginning of an exhilarating adventure for players worldwide. As we launch, we’ll be immersing our community in a world of fierce battles, compelling characters, and strategic gameplay, all designed to captivate and engage. Alongside the release, we’re focused on community growth, ensuring that the heart of Cage Conquest lies in a passionate, engaged, and supportive player base. We’ll provide continuous support through regular updates, exclusive events, and interactive platforms to create a space where players can connect, share experiences, and provide feedback. Our aim is to build a thriving ecosystem around the game, where the community’s input helps shape the future of the game. To fuel this excitement, we’re also unveiling the Epic Arena trailer, a visually stunning and action-packed preview that showcases the high-energy, strategic battles that players can expect in the game. With breathtaking graphics, jaw-dropping combat sequences, and a sneak peek into the world of Epic Arena, this trailer will set the tone for the intense and competitive gameplay ahead. Together, these initiatives will propel Phase 2 into a successful and dynamic phase of growth and engagement.`,
    btn: `Q2/2025`
  },
  {
    heading: `Trailer (Immersive Kick Off), Centipede Trailer (Horror Survival) and 100M Giveaway Launch`,
    content: `Phase 3 of our journey kicks off with the highly anticipated Immersive Kick Off Trailer, setting the stage for an unforgettable experience. This trailer will offer players a captivating introduction to the world of Cage Conquest, with cinematic visuals, intense action, and a deep dive into the story that unfolds. It’s designed to pull players right into the heart of the adventure, building excitement for the full launch. Alongside this, we’ll release the Centipede Trailer (Horror Survival), a spine-chilling preview of our upcoming horror survival game. Featuring dark, eerie atmospheres, terrifying creatures, and heart-pounding moments, this trailer promises to give horror fans a taste of the suspense and thrill they can expect when they step into the terrifying world of Centipede. To top off the excitement, we’re announcing the 100M Giveaway Launch, an extraordinary event designed to reward our community for their support and involvement. This massive giveaway will offer incredible prizes, including exclusive game assets, special edition items, and a chance to win significant rewards. With these three powerful initiatives, Phase 3 will deliver a wave of excitement and anticipation, propelling our community and projects to new heights.`,
    btn: `Q3/2025`
  },
  {
    heading: `Centipede (Release), Private Funding, Trailer (Archery Master) and Trailer (Thrust Hunter)`,
    content: `Phase 4 marks a pivotal stage in our journey, with multiple exciting initiatives set to drive our project forward. First, we will unveil the release of Centipede, our highly anticipated horror survival game that promises to deliver a spine-tingling experience. Players will dive into a dark, intense world where survival is key, and every decision can mean the difference between life and death. Alongside this, we’re launching private funding, a critical move to secure additional investment and resources that will support the growth and expansion of our projects. This will help fuel future developments, ensuring we can continue to deliver high-quality experiences for our community. To further ignite excitement, we’re releasing two action-packed trailers: Archery Master and Thrust Hunter. The Archery Master trailer will showcase the precision, skill, and strategy required in this thrilling archery-focused game, where players can hone their skills in competitive, fast-paced environments. Meanwhile, the Thrust Hunter trailer will give fans a preview of the high-octane, adrenaline-fueled action in this dynamic hunting game, featuring intense combat and strategic gameplay. With these initiatives in place, Phase 4 will elevate the project to new heights, delivering thrilling content and securing the resources needed to push our vision forward.`,
    btn: `Q4/2025`
  },
  {
    heading: `Token Listing, CMC, Coin Gecko Listing and Release of Other Games`,
    content: `Phase 5 is a significant milestone, as we move toward expanding the reach and visibility of our project. First, we will focus on token listing, making our project’s token available on major exchanges to increase liquidity and accessibility for our growing community. Alongside this, we’ll be listing on prominent platforms like CMC (CoinMarketCap) and CoinGecko, two of the most trusted sources for cryptocurrency market data. These listings will not only boost the visibility of our token but also help build credibility and attract more investors and users to our ecosystem. As part of this phase, we will also release other games in our portfolio, expanding the scope of our offerings and providing our community with more immersive experiences. Each new game will bring fresh excitement, unique gameplay mechanics, and new opportunities for engagement. With these key steps, Phase 5 will propel the project into a new era of growth and mainstream recognition.`,
    btn: `Q1/2026`
  }
]


const PresaleItem: React.FC<{ heading: string; content: string; btn: string }> = ({
  heading,
  content,
  btn
}) => {
  const t = useTranslations();
  return (
    <AccordionItem border={"none"}>
      {({ isExpanded }) => (
        <Box
          borderBottom="2px solid rgba(255, 255, 255, 1)"
          borderBottomLeftRadius="40px"
          borderBottomRightRadius="40px"
        >
          <AccordionPanel
            pt="5"
            px="12"
            pb={{ base: "4", md: "6" }}
            as="p"
          // lineHeight="150%"
          // fontWeight="normal"
          >
            <Box
              flex="1"
              fontSize="50px"
              fontWeight="700"
              fontFamily="'Rajdhani'"
              color="rgb(211, 211, 211)"
               className="qhead"
            >
              {t(heading)}
            </Box>
            <Box
            fontSize="30px"
            lineHeight="40px"
            fontFamily="'Rajdhani'"
            className="qcontainer"
          >
              {t(content)}
            </Box>

          </AccordionPanel>
          <AccordionButton
            px={{ base: "12", md: "12" }}
            py={{ base: "8", md: "8" }}
            _hover={{ bg: "transparent" }}
            w={"full"}
            justifyContent={"space-between"}
          >
            <Box
              {...(isExpanded && {
                color: "transparent",
              })}
            fontSize="30px"
            fontWeight="500 !important"
            fontFamily="'Rajdhani'"
             className="qcontainer"
          >
              {(() => {
                return t(heading).split(" ").slice(0, 6).join(" ") + (heading.length > 6 ? "..." : "");
              })()}
            </Box>
            {isExpanded ? (
              <Text
                borderRadius="60px"
                w="200px"
                h="85px"
                alignItems="center"
                bg="rgba(255, 255, 255, 1)"
                color="black"
                fontWeight="bold"
                fontFamily="'Rajdhani'"
                fontSize="40px"
                lineHeight="80px"
                mt="2%"
                mb="2%"
                justifyContent="center"
                mr="2%"
              >
                {t(btn)}
              </Text>
            ) : (
              <Text borderRadius="60px"
              w="200px"
              h="85px"
              alignItems="center"
              bg="rgba(255, 255, 255, 1)"
              color="black"
              fontWeight="bold"
              fontFamily="'Rajdhani'"
              fontSize="40px"
              lineHeight="80px"
              mt="2%"
              mb="2%"
              justifyContent="center"
              mr="2%"> {t(btn)}</Text>
            )}
          </AccordionButton>
        </Box>
      )}
    </AccordionItem>
  );
};



export function AllocationTable() {
  
const chartdata = [
  ["Task", "Hours per Day"],
  ["Presale", 21364579865],
  ["Development", 6131826235],
  ["Marketing", 3594550748],
  ["Liquidity", 3594550748],
];

const chartWidth = useBreakpointValue({ base: "1200px", md: "905px" }); 
  const chartHeight = useBreakpointValue({ base: "1200px", md: "905px" });
  const fontSize = useBreakpointValue({ base: 50, md: 17 });

// Chart options
const options = {
  // title: "My Daily Activities",
  // is3D: true, // Optional: makes the pie chart 3D
  backgroundColor: "none", // Set background color to black
  legend: { position: "none" }, // Remove the legend (side data options)
  titleTextStyle: { color: "red" }, // Set the title text color to white
  pieSliceTextStyle: { color: "#ffffff" }, // Set the slice text color to white
  fontSize: fontSize,
  slices: {
    0: { color: "#00EB90" }, // Color and offset for the first slice (Presale)
    1: { color: "#22466E",offset: 0.1 }, // Color and offset for the second slice (Development)
    2: { color: "#FFC107" ,offset: 0.1}, // Color and offset for the third slice (Marketing)
    3: { color: "#4299E1",offset: 0.1 }, // Color and offset for the fourth slice (Liquidity)
  },
};
  const t = useTranslations();
  return (
    <>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="20px"
        mt="7%"
        className="developmentconatiner"
      >
        <Box 
          _before={{
            content: `'{'`,
            mr: "50px",
            fontSize: "200px",
            lineHeight: "140px",
            color: "rgba(255, 193, 7, 1)"
          }}
          _after={{
            content: `'}'`,
            ml: "100px",
            fontSize: "200px",
            lineHeight: "140px",
            color: "rgba(255, 193, 7, 1)"
          }}
          display={"flex"}
        >
          <Heading
          fontWeight="bold"
          fontFamily="Rajdhani"
          fontSize="120px"
          lineHeight="90px"
          textShadow="50px 0px 0px grey, 90px 0px 0px rgb(52, 49, 49), 120px 0px 0px rgb(23, 21, 21)"
          >
            DEVELOPMENT <Text 
            color="rgba(255, 193, 7, 1) !important" textShadow= "50px 0px 0px rgb(93, 78, 35), 90px 0px 0px rgb(60, 49, 15), 120px 0px 0px rgb(39, 33, 13)"
          >PHASES</Text>
          </Heading>
        </Box>
       <Box display={"flex"} justifyContent={"center"}>
       <Image src="image 5.webp" alt="chartback image"  style={{ marginLeft: "0%" }} position={"relative"} />
        <Chart
          chartType="PieChart" 
          data={chartdata}
          options={options}
          width={chartWidth}
        height={chartHeight}
          style={{display: "flex", justifyContent: "center", marginTop: "-0%", marginLeft: "0%" , position:"absolute"}}
         className="chart"

        />
       </Box>
        <Image src="image 6.webp" alt="presalepack image"  />
        <Box
          w="82%"
          borderBottom="1px solid rgba(255, 255, 255, 1)"
          bg="rgba(37, 37, 37, 0.5)"
          borderRadius="40px"
          mt="-76%">
          <Accordion
            defaultIndex={0}
            allowToggle
            w={"full"}
            border="2px solid rgba(255, 255, 255, 1) !important"
            borderBottom="none !important"
            borderRadius="40px"
            bg="rgba(37, 37, 37, 0.5)"
          //  className=" animate__animated  animate__infinite animate__flipInY"
          >
            {presales.map((item, index) => (
              <PresaleItem {...item} key={`${item.heading}-${index}`}  />
            ))}
          </Accordion>
        </Box>
      </Box>
    </>
  );
}
