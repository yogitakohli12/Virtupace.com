"use client";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";

import { WagmiConfig } from "wagmi";
import { bsc, mainnet, polygon } from "viem/chains";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID!;

// 2. Create wagmiConfig
const metadata = {
  name: "Meta Droom",
  description: "Meta Droom",
  url: "https://virtupace.com",
  icons: ["https://virtupace.com/favicon.webp"],
};

const chains = [mainnet, polygon, bsc];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

export function Web3Modal({ children }: any) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
