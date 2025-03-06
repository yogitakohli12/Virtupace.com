import HtmlParser from "@/components/global/HtmlParser";
import { Navbar } from "@/components/hero-section/hero";
import { Box } from "@chakra-ui/react";
import deepmerge from "deepmerge";
import dynamic from "next/dynamic";
const Footer = dynamic(() =>
  import("@/components/footer/footer").then((mod) => mod.Footer)
);

const content = `
    <span>Disclaimer</span>

    <heading>Virtual Experience, Asset Growth, and Blockchain Gaming</heading>
    <p>Virtu Pace operates as a virtual metaverse and blockchain gaming platform where users can engage with digital assets, including but not limited to the MEDO token, tiles, and other in-game assets. These assets, while valuable within The Virtu Pace ecosystem, are subject to market volatility, user activity, and external factors beyond our control. The performance and value of these assets are not guaranteed and may fluctuate significantly. Virtu Pace does not provide any assurances regarding the future value, profitability, or success of virtual assets or in-game purchases.</p>

    <heading>No Financial Advice</heading>
    <p>Virtu Pace's services, including the purchase and use of MEDO tokens, tiles, and other digital assets, do not constitute financial or investment advice. Users should conduct their own due diligence and consult with a qualified financial professional before making any decisions related to virtual assets or investments on the platform.</p>

    <heading>Third-Party Content</heading>
    <p>Virtu Pace may feature links to third-party content, platforms, or services. We do not endorse, verify, or assume responsibility for the accuracy, reliability, or legality of such third-party resources. Use of third-party services or content is at the user's own risk. Any transactions conducted through third-party platforms are not covered by Virtu Pace's policies or protections.</p>

    <heading>Technological Risks</heading>
    <p>Virtu Pace operates on blockchain and digital technologies, including Zero-Knowledge Rollups (ZK-Rollups), which provide scalability and transaction efficiency. However, as with any emerging technology, these systems are vulnerable to potential risks, including but not limited to system failures, security breaches, and hacking attempts. While we implement industry-standard security measures, we cannot guarantee uninterrupted service or protection from all technological risks, including unauthorized access or data breaches.</p>

    <heading>Market Volatility</heading>
    <p>The value of digital assets within The Virtu Pace ecosystem, including MEDO tokens and virtual land tiles, may experience significant volatility. The price of these assets can rise or fall dramatically due to market conditions, demand, and other external factors. Virtu Pace is not responsible for any losses resulting from fluctuations in asset values, and users should be aware of the inherent risks in virtual asset trading and investment.</p>

    <heading>Regulatory Changes</heading>
    <p>The regulatory landscape for blockchain, cryptocurrency, and virtual assets is constantly evolving. Virtu Pace operates in compliance with applicable regulations, but changes in laws or governmental policies could impact the operation of the platform, the legality of virtual assets, or the functionality of The Virtu Pace ecosystem. Virtu Pace makes no guarantees regarding the continuity of services in the event of regulatory changes.</p>

    <heading>User Responsibility</heading>
    <p>Users are responsible for ensuring that their participation in The Virtu Pace ecosystem complies with local laws and regulations. Virtu Pace disclaims any liability for users' failure to adhere to legal obligations, including but not limited to tax reporting or compliance with financial regulations. If users are unsure about their legal responsibilities, they are encouraged to seek legal counsel.</p>

    <heading>Virtual Assets and Gaming Participation</heading>
    <p>Participation in Virtu Pace’s metaverse and gaming ecosystem, including the purchase and use of MEDO tokens, tiles, and in-game assets, is intended for entertainment purposes. Users should understand that virtual assets may not have real-world value outside of The Virtu Pace ecosystem and that participation in games like Clash of Tiles or virtupace carries inherent risks, including but not limited to financial loss, asset depreciation, and market fluctuations.</p>

    <p>If you have any questions about this disclaimer, you can contact us at <a href="mailto:team@virtupace.com">team@virtupace.com</a>.</p>
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
