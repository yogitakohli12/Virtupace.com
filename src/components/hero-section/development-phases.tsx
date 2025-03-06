import {
  Box,
  HStack,
  Image,
  Heading,
  Text,
  Stack,
  Icon,
  SimpleGrid,
  Link,
  Center
} from "@chakra-ui/react";
import {
  DiscordIcon,
  InstagramIcon,
  TelegramIcon,
  XIcon,
  YoutubeIcon,
} from "@/data";
import { Social } from "../hero-section/hero";
import { useLocale, useTranslations } from "next-intl";
import { BsBox } from "react-icons/bs";

const phases = [
  {
    date: "Q4/2025",
    desc: `q4-2025-description`,
  },
  {
    date: "Q1/2025",
    desc: `q1-2025-description`,
  },
  {
    date: "Q2/2025",
    desc: `q2-2025-description`,
  },
  {
    date: "Q3/2025",
    desc: `q3-2025-description`,
  },
  {
    date: "2026",
    desc: `2026-description`,
  },
];

export function DevelopmentPhases() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap="150px"
        justifyContent="center"
        justifyItems="center"
        alignSelf="center"
        mt="10%"
        className="visioncontainer"
      >
        <Box display="flex" flexDirection="column" textAlign="center">
          <Heading className="visionhead " fontWeight="700" fontFamily="Rajdhani" fontSize="34px" lineHeight="17px" color="rgba(255, 255, 255, 1)" display={"flex"} alignSelf={"center"} gap={"7px"}>
            A <Text color="rgba(255, 193, 7, 1)" >Vision</Text> without Limits
          </Heading>
          <Text
            fontFamily="Rajdhani"
            display="flex"
            justifyContent="center"
            textAlign="center"
            width="100% !important"
            color="rgba(255, 255, 255, 1)"
            mt="2%"
            fontSize="25px"
            alignSelf={"center !important"}
            className="visionpara"
          >
            The journey doesn’t stop here. Future horizons include:
          </Text>
          <Box
            mt="1%"
            display="flex"
            textAlign="left"
            justifyContent="center"
            gap="40px"
            fontFamily="Rajdhani"
            className="visioncardscontainer"
          >
            <Box className="visioncard">
              <Image src="vision1.webp" className="visioncardimg  " alt="vision crd image" position="relative"
                boxShadow="0px -20px 20px rgba(62, 60, 60, 0.5)"
                clipPath="polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%, 0% 100%)" />

              <Text
                w="300px"
                position="absolute"
                mt="-41%"
                p="1%"
                fontWeight="bold"
                className="visionheading  " style={{ animationDelay: "2s" }}
              >
                AI-Driven Worlds
              </Text>
              <Text
                w="220px"
                position="absolute"
                mt="-38%"
                p="1%"
                bg="#000000b8"
                className="visionparagraph  " style={{ animationDelay: "2s" }}
              >
                Integrate generative AI for dynamic storytelling, NPC interactions,
                and personalized gameplay.
              </Text>
            </Box>
            <Box className="visioncard" >
              <Image src="vision2.webp" position="relative" className="visioncardimg "
                style={{ animationDelay: "1s" }}
                boxShadow="0px -20px 20px rgba(62, 60, 60, 0.5)"
                clipPath="polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%, 0% 100%)" alt="vision image" />
              <Text w="300px"
                position="absolute"
                mt="-41%"
                p="1%"
                className="visionheading  " style={{ animationDelay: "2s" }}
                fontWeight="bold">Physical-Digital Hybrids</Text>
              <Text w="220px"
                position="absolute"
                mt="-38%"
                p="1%"
                className="visionparagraph  " style={{ animationDelay: "2s" }}
                bg="#000000b8">
                Merge augmented reality (AR) with blockchain for real-world quests
                and location-based rewards.
              </Text>
            </Box>
            <Box className="visioncard">
              <Image src="vision3.webp" position="relative" className="visioncardimg  " style={{ animationDelay: "2s" }}
                boxShadow="0px -20px 20px rgba(62, 60, 60, 0.5)"
                clipPath="polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%, 0% 100%)" alt="vision imge" />
              <Text w="300px"
                position="absolute"
                mt="-41%"
                className="visionheading  " style={{ animationDelay: "2s" }}
                p="1%"
                fontWeight="bold">Global Esports Leagues</Text>
              <Text w="220px"
                position="absolute"
                mt="-38%"
                className="visionparagraph  " style={{ animationDelay: "2s" }}
                p="1%"
                bg="#000000b8">
                Host tournaments with million-dollar prize pools, streamed live in
                immersive 3D environments.
              </Text>
            </Box>
          </Box>
          <Text width={"90%"} mt={8} fontSize={"26px"} fontFamily={"Rajdhani"} display={"flex"} textAlign={"center"} justifySelf={"center"} alignSelf={"center"} className="visionbottompara">
            Virtu Pace is committed to pushing the boundaries of blockchain
            technology, gaming, and decentralized communities—forever redefining how
            the world plays, earns, and connects.
          </Text>
        </Box>
        <Box
          w="100%"
          display="flex"
          flexDirection="column"
          gap="50px"
          fontFamily="Rajdhani"
          justifyContent="center"
          textAlign="center"
        >
          <Heading fontSize="37px" fontWeight="700" className="visionbottomparavision">
            At Virtu Pace, You Are the Architects of Tomorrow
          </Heading>
          <Text w="81%" display="flex" justifyContent="center" justifySelf="center" alignSelf="center" textAlign="center" alignItems="center" justifyItems="center" fontWeight="400" fontFamily="Rajdhani" fontSize="21px" lineHeight="38px" className="visionbottom">
            Join a movement where every voice fuels innovation. Collaborate with
            creators, strategize with visionaries, and shape the future of
            play-to-earn gaming and the metaverse. Dive into our channels to spark
            ideas, steer development, and claim your stake in a world where community
            isn’t just heard—it’s the blueprint. Let’s build, earn, and conquer…
            together.
          </Text>
        </Box>
        <Box w="100%"
          display="flex"
          flexDirection="column"
          gap="50px"
          fontFamily="Rajdhani"
          justifyContent="center"
          textAlign="center">
          <Heading fontSize="37px" fontWeight="700" className="visionbottomparavision">
            Calling All Innovators: Build the Future of Gaming With Virtu Pace
          </Heading>
          <Text w="81%" display="flex" justifyContent="center" justifySelf="center" alignSelf="center" textAlign="center" alignItems="center" justifyItems="center" fontWeight="400" fontFamily="Rajdhani" fontSize="21px" lineHeight="38px" className="visionbottom">
            Are you a developer? Transform your blockchain game vision into reality by
            partnering with Virtu Pace. We’re not just creating a platform—we’re
            forging a decentralized gaming frontier, and your code could be its
            backbone.
          </Text>
        </Box>
        <Box
          mt="11%"
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          justifySelf="center"
          alignItems="center"
        >
          <Heading
            fontSize="130px"
            color="grey"
            style={{ WebkitTextStroke: '2px white' }}
            zIndex="999"
            fontWeight="700"
            fontFamily="Rajdhani"
           
            sx={{
              ':hover': {
                color: 'pink',
                WebkitTextStroke: '10px pink'
              }
            }}
          >
            Why Build With Us?
          </Heading>
          <Image src="build.webp" alt="build image" mt="-20%" w="90%" />
          <Box
            display="flex"
            gap="30px"
            width="88%"
            justifySelf={"center"}
            alignSelf={"center"}
            justifyContent="center"
            className="buildcontainer"

          >
            <Box className="visioncard">
              <Image src="build1.webp " position="relative" className="visioncardimg " style={{ animationDelay: "2s" }}
                boxShadow="0px -20px 20px rgba(62, 60, 60, 0.5)"
                clipPath="polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%, 0% 100%)" alt="build image1" />
              <Text w="300px"
                position="absolute"
                mt="-41%"
                className="visionheading"
                fontSize={"25px"}
                p="1%"
                fontWeight="700" fontFamily={"Rajdhani"}>Empowerment</Text>
              <Text w="220px"
                position="absolute"
                mt="-38%"
                className="visionparagraph"
                p="1%"
                bg="#000000b8" fontFamily={"Rajdhani"}>
                Leverage Virtu Pace’s high-speed blockchain, NFT tools, and cross-chain
                bridges to launch games faster, cheaper, and with limitless
                scalability.
              </Text>
            </Box>
            <Box >
              <Image src="build2.webp" position="relative" className="visioncardimg " style={{ animationDelay: "2s" }}
                boxShadow="0px -20px 20px rgba(62, 60, 60, 0.5)"
                clipPath="polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%, 0% 100%)" alt="build image 2" />
              <Text w="300px"
                position="absolute"
                mt="-41%"
                className="visionheading"
                fontSize={"25px"}
                p="1%"
                fontWeight="700" fontFamily={"Rajdhani"}>Rewards</Text>
              <Text w="220px"
                className="visionparagraph"
                position="absolute"
                mt="-38%"
                p="1%"
                bg="#000000b8" fontFamily={"Rajdhani"}>
                Earn from shared ecosystem revenue, token incentives, and exclusive
                grants for groundbreaking projects.
              </Text>
            </Box>
            <Box >
              <Image src="build3.webp" position="relative" className="visioncardimg"
                boxShadow="0px -20px 20px rgba(62, 60, 60, 0.5)"
                clipPath="polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%, 0% 100%)" alt="build image 3" />
              <Text w="300px"
                position="absolute"
                mt="-41%"
                className="visionheading"
                fontSize={"25px"}
                p="1%"
                fontWeight="700" fontFamily={"Rajdhani"}>Community Impact</Text>
              <Text w="220px"
                position="absolute"
                mt="-38%"
                className="visionparagraph"
                p="1%"
                bg="#000000b8" fontFamily={"Rajdhani"}>
                Collaborate with 50,000+ early adopters hungry for fresh gameplay,
                play-to-earn mechanics, and metaverse experiences.
              </Text>
            </Box>
            <Box >
              <Image src="build4.webp" position="relative" className="visioncardimg"
                boxShadow="0px -20px 20px rgba(62, 60, 60, 0.5)"
                clipPath="polygon(0% 0%, 100% 0%, 100% 50%, 0% 100%, 0% 100%)" alt="build image 4" />
              <Text w="300px"
                position="absolute"
                mt="-41%"
                className="visionheading"
                fontSize={"25px"}
                p="1%"
                fontWeight="700" fontFamily={"Rajdhani"}>Future-Proof Tech</Text>
              <Text w="220px"
                position="absolute"
                mt="-38%"
                p="1%"
                className="visionparagraph"
                bg="#000000b8"
                fontFamily={"Rajdhani"}>
                Integrate AI-driven features, VR/AR compatibility, and our Proof-of-Play
                consensus to reward player engagement.
              </Text>
            </Box>
          </Box>
          <Box
            mt="11%"
            w="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            justifySelf="center"
            alignItems="center"
            gap={"150px"}
          >
            <Box display={"flex"} flexDirection={"column"} textAlign={"center"} alignItems="center" justifyContent="center" gap={12}>
              <Heading fontSize="55px" fontFamily="Rajdhani" fontWeight="700" lineHeight="48px" className="visionbottomparavision">
                Join the Rebellion Against Ordinary Gaming
              </Heading>
              <Text display="flex" justifyContent="center" fontSize="28px" fontFamily="Rajdhani" fontWeight="400" className="visionbottom">
                Help us dismantle the status quo. Whether you’re crafting
                hyper-competitive esports titles, story-driven RPGs, or social
                metaverse hubs, your work will define the next decade of decentralized
                entertainment.
              </Text>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="20px"
            >
              <Heading fontFamily={"Rajdhani"} fontSize={"45px"} className="visionbottomparavision">
                Ready to <span style={{ color: "rgba(255, 226, 2, 1)", fontWeight: 700 }}>#Code</span> the Impossible?
              </Heading>
              <Text fontSize="28px" fontFamily="Rajdhani" fontWeight="400" display="flex" flexDirection="column" textAlign="center" className="visionbottom">
                Pitch your concept, join our developer DAO, and let’s turn pixels into
                legacy.
                <br />
                <br />
                The metaverse is a blank canvas—grab your brush.
                <Text style={{ color: "rgba(255, 226, 2, 1)", fontWeight: 700 }}>#BuildWithDroom</Text>
              </Text>
            </Box>
            <Image src="image 7.webp" alt="footer image" />
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              textAlign="center"
              gap="70px"
              mt="-120%"

            >
              <Heading fontFamily={"Rajdhani"} fontSize={"45px"} className="visionbottomparavision">
                <span>Join The VirtuPace Community!</span>
              </Heading>

              <Box display="flex" gap="50px" className="links">
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
                  href="https://x.com/VirtuPace"
                >
                  <Center
                    boxSize={"100px"}
className="iconbeckground"
                    bg={"rgb(41, 41, 41)"}
                    color="white"
                    rounded={"full"}
                  >
                    <XIcon boxSize={"70px"} p={2} />
                  </Center>
                </Link>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
