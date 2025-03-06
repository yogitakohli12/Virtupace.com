interface UpiUser {
  upi_id: string;
  password: string;
}

interface ConnectedWallet {
  wallet_address: string;
  is_default: boolean;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  user_type: string;
  created_at: string;
  userId: number;
  wallet_address: string;
  wallet_type: string;
  token:string;
}
interface WalletAddress {
  created_at: string;
  id: number;
  userId: number;
  wallet_address: string;
  wallet_type: string;
}

