/* eslint-disable react/no-unescaped-entities */
import "@/styles/globals.css";
import { theme } from "@/utils/theme";
import { Box, ChakraProvider, HStack, Icon } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import { QueryClientProvider } from "@tanstack/react-query";
import { MainProvider } from "@/context/main";
import { queryClient } from "@/utils/queryClient";
import Head from "next/head";

import { Web3Modal } from "@/context/web3.modal";
import { locales } from "@/locales";
import { MdDangerous } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import Chatbot from "@/components/global/Chatbot";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const checkIP = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();

        const BLOCKED_IP = "152.59.48.34";
        const BLOCKED_IP2 = "103.156.26.215";
        const BLOCKED_IP3 = "103.163.182.49";
        const BLOCKED_IP4 = "103.156.26.206";
        const BLOCKED_IP6 = "157.90.13.116";

        if (data.ip === BLOCKED_IP || data.ip === BLOCKED_IP2 || data.ip === BLOCKED_IP3 || data.ip === BLOCKED_IP4 || data.ip === BLOCKED_IP6) {
          document.body.innerHTML = "<span>Hey Buddy .... You Can't Access This Site</span>";
        }
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    };

    checkIP();
  }, []);
  const router = useRouter();
  return (
    <NextIntlClientProvider
      locale={router.locale}
      timeZone="Europe/Vienna"
      messages={pageProps.messages}
      onError={() => {}}
    >
      <Web3Modal>
        <MetaTags />
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <MainProvider>
              
              <Component {...pageProps} />
            </MainProvider>
            <Toaster
              position="top-center"
              toastOptions={{
                loading: {
                  style: {
                    border: "0.5px solid #ffffff",
                  },
                },
                success: {
                  style: {
                    border: "0.5px solid #00FF7E",
                  },
                },
                error: {
                  style: {
                    border: "0.5px solid #ea5959",
                  },
                },
                style: {
                  fontSize: 14,
                  background: "#06001d",
                  padding: "10px 12px",
                  color: "#ffffff",
                  borderRadius: "2px",
                },
              }}
              reverseOrder={false}
            />
          </ChakraProvider>
        </QueryClientProvider>
      </Web3Modal>
      <Chatbot />
    </NextIntlClientProvider>
  );
}

function MetaTags() {
  const t = useTranslations();
  const pageTitle = t("page_title");
  const pageDescription = t("page_description");
  return (
    <Head>
      <title>
        {pageTitle === 
        // "page_title"
        "Virtu Pace Presale Live – Ultra-Fast Blockchain Network!"
          ? "Virtu Pace Presale Live – Ultra-Fast Blockchain Network!"
          : pageTitle}
      </title>
      <meta
        name="description"
        content={
          pageDescription === 
          // "page_description"
          "Enter Virtu Pace  a boundless metaverse to explore  play and own land. Dive into endless adventures where imagination knows no limits!"
            ? "Enter Virtu Pace  a boundless metaverse to explore  play and own land. Dive into endless adventures where imagination knows no limits!"
            : pageDescription
        }
      />
      {locales.map((locale) => (
        <link
          key={locale}
          rel="alternate"
          href={`https://virtupace.com/${locale}`}
          {...{
            hreflang: locale,
          }}
        />
      ))}
      <link
        rel="alternate"
        href="https://virtupace.com"
        {...{
          hreflang: "x-default",
        }}
      />
    </Head>
  );
}
