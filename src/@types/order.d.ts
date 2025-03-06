interface OrderInterface {
  ref: number;
  value: string;
  currency: string;
  address: string;
  chain: string;
  ypred: string;
  token_quantity: number;
  status: string;
  datetime: string;
  _from: string;
  email: string;
  comment: string;
  balance: number;
  other_balance: number;
  campaign: string;
  country: string;
  source: string;
  affID: string;
  click_id: string;
  fx_click_id: string | null;
  txn_hash: string;
  purchase_usd_amount: number;
  round_value: number;
  round_number: number | null;
  created_at: string;
  updated_at: string;
}

type TopSale = Pick<
  OrderInterface,
  | "_from"
  | "country"
  | "created_at"
  | "purchase_usd_amount"
  | "status"
  | "token_quantity"
>;
