export type WalletType = {
  trxref: string;
  amount: number;
  reference: string;
};

export type InitialStateTypes<T> = {
  transactions: T[];
};
