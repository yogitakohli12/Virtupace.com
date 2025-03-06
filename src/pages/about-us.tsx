import HtmlParser from "@/components/global/HtmlParser";
import { Navbar } from "@/components/hero-section/hero";
import { Box } from "@chakra-ui/react";
import deepmerge from "deepmerge";
import dynamic from "next/dynamic";
const Footer = dynamic(() =>
  import("@/components/footer/footer").then((mod) => mod.Footer)
);

const content = `
    <span>About Us – Virtu Pace</span>
    <p>Welcome to Virtu Pace, where we are revolutionizing the future of blockchain gaming and the metaverse. Our mission is to provide a high-performance blockchain infrastructure specifically designed to meet the unique demands of gaming and virtual worlds. By leveraging cutting-edge technology, Virtu Pace is setting a new standard for scalability, transaction efficiency, and player-driven ownership within the gaming ecosystem.</p>

    <heading>Who We Are</heading>
    <p>At Virtu Pace, we are a team of visionaries, engineers, and gaming enthusiasts dedicated to creating a seamless and immersive experience for gamers and developers alike. Our platform is built with a singular goal: to become the default blockchain network for all gaming projects in the coming decade.</p>
    <p>As the gaming industry continues to evolve, we recognize the immense potential of blockchain technology in transforming the way games are played, owned, and interacted with. However, many blockchain solutions today are hindered by high fees and slow transaction speeds—limitations that can undermine the gaming experience. Virtu Pace aims to solve these challenges by developing a next-generation blockchain optimized for high-speed transactions and near-zero gas fees.</p>

    <heading>Our Vision</heading>
    <p>Virtu Pace is more than just a blockchain—it's a vibrant ecosystem designed to empower gamers, developers, and creators in the virtual world. We envision a platform that serves as the foundation for all blockchain-based gaming projects, where players can truly own their digital assets and enjoy smooth, lag-free gaming experiences. Our platform will allow developers to easily build, scale, and monetize their games, while providing players with new ways to interact, compete, and create in the metaverse.</p>

    <heading>Join Us</heading>
    <p>Virtu Pace is poised to lead the way in the next generation of gaming and the metaverse. With our innovative approach to blockchain, a growing community of passionate gamers and developers, and a platform designed for scalability, speed, and player ownership, we are creating a world where gaming and blockchain converge seamlessly.</p>
    <p>We invite you to be part of this exciting journey. Whether you’re a gamer, developer, or investor, Virtu Pace offers endless opportunities for growth and participation in a world where digital ownership and immersive gameplay are at the forefront.</p>

    <heading>Contact Us</heading>
    <p>For inquiries, partnerships, or further information, please reach out to us at <a href="mailto:team@virtupace.com">team@virtupace.com</a>.</p>
`;

export const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <Box mx="auto" maxW={"1200px"} px="4" py="12" bg="#06001d">
        <HtmlParser content={content} />
      </Box>
      <Footer />
    </>
  );
};
export async function getStaticProps(context: any) {
  let messages: any = (await import(`../locales/output/en.json`)).default;
  try {
    const userMessages = (
      await import(`../locales/output/${context.locale}.json`)
    ).default;
    messages = deepmerge(messages, userMessages);
  } catch (error) {}
  return {
    props: {
      messages,
    },
  };
}
export default TermsAndConditions;
