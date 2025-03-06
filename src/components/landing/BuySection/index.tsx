const BuyWidget = dynamic(
  () => import("@/components/landing/BuySection/BuyWidget/BuyWidget"),
  {
    ssr: false,
  }
);
import LayoutContainer from "@/layout/Layout/LayoutContainer";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import React from "react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import TronProvider from "@/context/tron";
import { useMaincontext } from "@/context/main";
const endpoint =
  "https://rough-sparkling-knowledge.solana-mainnet.quiknode.pro/ec67f069181b6a6a8b1b6d5b8cdce14e06302225/";
// "https://mainnet.helius-rpc.com/?api-key=0aaf81c2-2c4a-40f2-9168-c3ebd7539138";
const SolanaWalletProvider = dynamic(
  () => import("@/components/global/SolanaWalletProvider"),
  {
    ssr: false,
  }
);

const BuySection = () => {
  const size = useMaincontext().widgetSize;
  const t = useTranslations();
  return (
    <>
      <Image src="image 2.webp" alt="walletimg" marginLeft={"2%"} className="walletimage"
     display={{base:"none",md:"block"}} />
      <TronProvider >
        <ConnectionProvider endpoint={endpoint}>
          <SolanaWalletProvider>
            <Box
             width={"100%"}
              zIndex={1111}
              display="flex"
              justifyContent="center"
              className="walletcontiner"
            >
                <Image src="image 2.webp" alt="walletbackimg" marginLeft={"2%"} className="walletbackimage" display={{base:"block",md:"none"}}
      />
                  <Box
                    w="1000px"
                    h="610px"
                    gap="0px"
                    borderRadius="60px"
                    border="0.5px"
                    backdropFilter="blur(60px)"
                    mt="-150%"
                    id="buy-now"
                    className="walletbackcontainer"
                  >
                    {/* {size == "md" && (
                            <Image
                              src="/image/blur-box-bottom.webp"
                              position="absolute"
                              w="79px"
                              alt="Circular wireframe"
                              top="-14"
                              right="-6"
                            />
                          )} */}
                    <BuyWidget />
                  </Box>
                </Box>
              
          </SolanaWalletProvider>
        </ConnectionProvider>
      </TronProvider>
    </>
  );
};

export default BuySection;
