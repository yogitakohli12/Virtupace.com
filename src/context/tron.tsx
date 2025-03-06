"use client";
const WalletProvider = dynamic(
  async () =>
    (await import("@tronweb3/tronwallet-adapter-react-hooks")).WalletProvider,
  { ssr: false }
);
const WalletModalProvider = dynamic(
  async () =>
    (await import("@tronweb3/tronwallet-adapter-react-ui")).WalletModalProvider,
  { ssr: false }
);
import React, { useMemo } from "react";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapter-tronlink";
import { TokenPocketAdapter } from "@tronweb3/tronwallet-adapter-tokenpocket";
import dynamic from "next/dynamic";
import "@tronweb3/tronwallet-adapter-react-ui/style.css";
const TronProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const adapters = useMemo(function () {
    if (typeof window === "undefined" || !window.tronWeb) {
      return [];
    }
    const tronLinkAdapter = new TronLinkAdapter();
    const tokenPocketAdapter = new TokenPocketAdapter();
    return [tronLinkAdapter, tokenPocketAdapter];
  }, []);
  return (
    <WalletProvider adapters={adapters} disableAutoConnectOnLoad={true}>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  );
};

export default TronProvider;
