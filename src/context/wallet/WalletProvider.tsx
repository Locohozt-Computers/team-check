import React, { createContext, useEffect, useReducer } from "react";
import {
  BankType,
  WalletTransferToBankType,
  WalletType,
} from "types/walletTypes";
import { createHttp, getHttp } from "utils/api/createHttp";
import { authErrorHandler } from "utils/CatchErrors";
import { errorNotify, successNotify } from "utils/errorMessage";
import walletReducer from "./Walletreducer";

const initialState = {
  transactions: [],
};

export const GET_ALL_WALLET = "GET_ALL_WALLET";
export const FUND_WALLET = "FUND_WALLET";
export const ADD_BANK = "ADD_BANK";
export const GET_BANKS = "GET_BANKS";
export const WALLET_TRANSFER_TO_BANK = "WALLET_TRANSFER_TO_BANK";

type ContextType = {
  transactions: Partial<WalletType>[];
  fundWalletContext: (wallet: Partial<WalletType>) => void;
  getAllWalletTransactions: () => void;
  addBank: (bank: Partial<BankType>) => void;
  walletTransferToBank: (bank: Partial<WalletTransferToBankType>) => void;
};

export const WalletContext = createContext<ContextType>({
  transactions: [],
  fundWalletContext: (wallet: Partial<WalletType>) => {},
  getAllWalletTransactions: () => {},
  addBank: (bank: Partial<BankType>) => {},
  walletTransferToBank: (bank: Partial<WalletTransferToBankType>) => {},
});

const WalletProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const getAllWalletTransactions = async () => {
    try {
      const data = await getHttp("/wallet/transactions");
      dispatch({ type: GET_ALL_WALLET, payload: data?.data });
    } catch (error) {
      if (!error?.response) {
        errorNotify("Network went wrong!!!");
      }
      authErrorHandler(error);
    }
  };

  const fundWalletContext = async (wallet: Partial<WalletType>) => {
    try {
      const data = await createHttp("/wallet/fund", wallet);
      dispatch({ type: FUND_WALLET, payload: data });
    } catch (error) {
      if (!error?.response) {
        errorNotify("Network went wrong!!!");
      }
      authErrorHandler(error);
    }
  };

  const walletTransferToBank = async (
    transfer: Partial<WalletTransferToBankType>
  ) => {
    try {
      const data = await createHttp("/wallet/transfer-to-bank", transfer);
      dispatch({ type: WALLET_TRANSFER_TO_BANK, payload: data });
      successNotify("Bank added successfully!!");
    } catch (error) {
      if (!error?.response) {
        errorNotify("Network went wrong!!!");
      }
      authErrorHandler(error);
    }
  };

  const addBank = async (bank: Partial<BankType>) => {
    try {
      const data = await createHttp("/bank-details", bank);
      dispatch({ type: ADD_BANK, payload: data });
      successNotify("Bank added successfully!!");
    } catch (error) {
      if (!error?.response) {
        errorNotify("Network went wrong!!!");
      }
      authErrorHandler(error);
    }
  };

  useEffect(() => {
    getAllWalletTransactions();
  }, []);

  const values = {
    transactions: state?.transactions,
    getAllWalletTransactions,
    fundWalletContext,
    addBank,
    walletTransferToBank,
  };
  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  );
};

export default WalletProvider;
