import HtmlParser from "@/components/global/HtmlParser";
import { Navbar } from "@/components/hero-section/hero";
import { Box } from "@chakra-ui/react";
import deepmerge from "deepmerge";
import dynamic from "next/dynamic";
const Footer = dynamic(() =>
  import("@/components/footer/footer").then((mod) => mod.Footer)
);

const content = `
    <span>Privacy Policy</span>
    <p>At Virtu Pace, we are committed to safeguarding your privacy. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our services, including accessing our platform, purchasing tokens, participating in the presale, and engaging with our metaverse games. By using Virtu Pace services, you consent to the collection and use of your personal data as outlined in this policy.</p>
    <heading>Collecting and Using Your Personal Data</heading>
    <p>Types of Data Collected</p>
    <p>Personal Data</p>
    <p>While using our Service, we may ask you to provide certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:</p>
    <ul>
        <li>Email address</li>
        <li>First name and last name</li>
        <li>Usage Data</li>
    </ul>

    <p>Use of Your Personal Data</p>
    <p>The Company may use your Personal Data for the following purposes:</p>
    <ul>
        <li><strong>To provide and maintain our Service:</strong> Including monitoring usage and ensuring the proper functioning of the Service.</li>
        <li><strong>To manage your Account:</strong> Facilitating your registration and providing access to different functionalities available to registered users.</li>
        <li><strong>To fulfill contracts:</strong> This includes the performance of contracts related to your purchase of products, services, or items through the Service.</li>
        <li><strong>To contact you:</strong> We may send you updates or informative communications regarding changes in our services, security updates, or similar notices.</li>
        <li><strong>To provide you with promotional materials:</strong> Unless you have opted out, we may send you information about goods, services, or events similar to those you have previously purchased or inquired about.</li>
        <li><strong>To manage your requests:</strong> Handling any inquiries, complaints, or requests you may have.</li>
        <li><strong>For business transfers:</strong> Your Personal Data may be transferred during mergers, acquisitions, or other business transactions.</li>
        <li><strong>For other purposes:</strong> We may use your data for other lawful purposes, such as data analysis, improving our service, and marketing.</li>
    </ul>

    <heading>Sharing Your Personal Data</heading>
    <p>Virtu Pace may share your personal information in the following circumstances:</p>
    <ul>
        <li><strong>With Service Providers:</strong> To assist with the operation of our Service.</li>
        <li><strong>For business transfers:</strong> In connection with a merger, sale, or other transfer of assets.</li>
        <li><strong>With Affiliates:</strong> Affiliates are required to follow this Privacy Policy when handling your data.</li>
        <li><strong>With business partners:</strong> To provide you with offers, products, or promotions.</li>
        <li><strong>With other users:</strong> When you publicly share information, it may be visible to others.</li>
        <li><strong>With your consent:</strong> In any other situation where you have provided explicit consent.</li>
    </ul>

    <heading>Retention of Your Personal Data</heading>
    <p>We retain your Personal Data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. This includes retaining data to meet legal obligations, resolve disputes, and enforce agreements. Usage Data is retained for shorter periods unless required for security, legal, or functional improvements.</p>

    <heading>Transfer of Your Personal Data</heading>
    <p>Your information may be processed at our operating offices and in any locations where third parties involved in processing are located. This may involve transferring your data to countries with different data protection laws. We take appropriate measures to ensure your data remains secure, even when transferred internationally.</p>

    <heading>Delete Your Personal Data</heading>
    <p>You have the right to request the deletion of your Personal Data. You may update, amend, or delete your information by logging into your account or contacting us directly. Please note that we may need to retain certain data if required by law.</p>

    <heading>Disclosure of Your Personal Data</heading>
    <p>We may disclose your Personal Data:</p>
    <ul>
        <li><strong>In a business transaction:</strong> During mergers, acquisitions, or asset sales.</li>
        <li><strong>To law enforcement:</strong> If required by law or in response to legal requests.</li>
        <li><strong>For other legal reasons:</strong> To protect the rights, safety, or property of the Company or others.</li>
    </ul>

    <heading>Security of Your Personal Data</heading>
    <p>We strive to use commercially reasonable security measures to protect your Personal Data. However, no method of transmission over the Internet or electronic storage is entirely secure, and we cannot guarantee absolute security.</p>

    <heading>Changes to this Privacy Policy</heading>
    <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date. You will be notified by email or through a prominent notice on our website prior to the changes taking effect.</p>

    <heading>Contact Us</heading>
    <p>If you have any questions about this Privacy Policy, you can contact us at <a href="mailto:team@virtupace.com">team@virtupace.com</a>.</p>

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
