import HtmlParser from "@/components/global/HtmlParser";
import { Navbar } from "@/components/hero-section/hero";
import { Box } from "@chakra-ui/react";
import deepmerge from "deepmerge";
import dynamic from "next/dynamic";
const Footer = dynamic(() =>
  import("@/components/footer/footer").then((mod) => mod.Footer)
);

const content = `
    <span>Refund Policy</span>
    <p>At Virtu Pace, all sales are final. We do not offer refunds for any purchases made on our platform, including, but not limited to, the purchase of MEDO tokens, virtual land, Tiles, or any other virtual assets (collectively referred to as "Assets"). By making a purchase, you acknowledge and agree to the following terms:</p>

    <heading>1. No Refunds</heading>
    <p>All transactions are non-refundable, and there will be no reimbursement, return, or exchange for any virtual assets or services once the purchase is complete.</p>

    <heading>2. Final Sale Acknowledgement</heading>
    <p>You are responsible for reviewing your purchases carefully before completing any transaction. By proceeding with the payment, you agree that the sale is final and no refunds will be provided under any circumstances, including dissatisfaction with the virtual assets or changes in market conditions.</p>

    <heading>3. Platform or Service Disruptions</heading>
    <p>Virtu Pace is not responsible for any disruptions to the platform or services, such as system maintenance, technological issues, or third-party service failures. Such interruptions do not entitle users to refunds or compensation.</p>

    <heading>4. User Responsibility</heading>
    <p>Users are responsible for ensuring that their purchases comply with any local laws or regulations. Failure to do so does not qualify for a refund or compensation.</p>

    <heading>5. Modifications to the Policy</heading>
    <p>Virtu Pace reserves the right to modify this Refund Policy at any time. Any changes will be posted on our website, and continued use of the platform after such changes signifies acceptance of the revised policy.</p>

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
