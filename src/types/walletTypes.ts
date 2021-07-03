export type WalletType = {
  trxref: string;
  amount: number;
  reference: string;
  created_at: string;
  description: string;
  status: boolean;
  trans_type: {
    id: number;
    name: string;
  };
  transaction_type_id: number;
  transfer_code: any;
  updated_at: string;
  user_id: string;
};

export type InitialStateTypes<T> = {
  transactions: T[];
  nextUrl: string;
  walletBalance: number;
};

export type BankType = {
  bank_code: string;
  bank_name: string;
  account_number: string;
  account_name: string;
};

export type WalletTransferToBankType = {
  trxref: string;
  amount: number;
  reference: string;
};
