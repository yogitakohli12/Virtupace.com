import { useConnection, useWallet } from "@solana/wallet-adapter-react";
const useSolTransaction = () => {
  const { connection } = useConnection();
  const wallet = useWallet();

  return { wallet, connection };
};

export default useSolTransaction;
