import React, { createContext, useEffect, useReducer } from "react";
import { BankType, WalletType } from "types/walletTypes";
import {
  createHttp,
  createHttpWithMessage,
  getHttp,
} from "utils/api/createHttp";
import { authErrorHandler } from "utils/CatchErrors";
import { errorNotify, successNotify } from "utils/errorMessage";
import walletReducer from "./Walletreducer";

const initialState = {
  transactions: [],
  nextUrl: null,
  walletBalance: 0,
};

export const GET_ALL_WALLET = "GET_ALL_WALLET";
export const WALLET = "WALLET";
export const ADD_TO_WALLET = "ADD_TO_WALLET";
export const REMOVE_FROM_WALLET = "REMOVE_FROM_WALLET";
export const LOAD_MORE_TRANSACTIONS = "LOAD_MORE_TRANSACTIONS";
export const FUND_WALLET = "FUND_WALLET";
export const ADD_BANK = "ADD_BANK";
export const GET_BANKS = "GET_BANKS";
export const WALLET_TRANSFER_TO_BANK = "WALLET_TRANSFER_TO_BANK";
export const WALLET_TRANSFER_TO_WALLET = "WALLET_TRANSFER_TO_WALLET";

type ContextType = {
  transactions: Partial<WalletType>[];
  nextUrl: null | string;
  walletBalance: number;
  fundWalletContext: (wallet: Partial<WalletType>) => void;
  getAllWalletTransactions: () => void;
  addBank: (bank: Partial<BankType>) => void;
  walletTransferToBank: (amount: number) => void;
  walletTransferToWallet: (wallet: { email: string; amount: number }) => void;
  loadMoreTransaction: (nextUrl: any) => void;
  getWalletBalance: (amount: number) => void;
  addToWalletBalance: (amount: number) => void;
  removeFromWalletBalance: (amount: number) => void;
};

export const WalletContext = createContext<ContextType>({
  transactions: [],
  nextUrl: null,
  walletBalance: 0,
  fundWalletContext: (wallet: Partial<WalletType>) => {},
  getAllWalletTransactions: () => {},
  addBank: (bank: Partial<BankType>) => {},
  walletTransferToBank: (amount: number) => {},
  walletTransferToWallet: (wallet: { email: string; amount: number }) => {},
  loadMoreTransaction: (nextUrl: any) => {},
  getWalletBalance: (amount: number) => {},
  addToWalletBalance: (amount: number) => {},
  removeFromWalletBalance: (amount: number) => {},
});

const WalletProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(walletReducer, initialState);

  const getAllWalletTransactions = async () => {
    try {
      const data = await getHttp("/wallet/transactions");
      dispatch({
        type: GET_ALL_WALLET,
        payload: {
          data: data?.data,
          nextUrl: data?.next_page_url,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  const loadMoreTransaction = async (nextUrl: any) => {
    const path = nextUrl?.split("?")[1];
    try {
      if (nextUrl) {
        const data = await getHttp(`/wallet/transactions?${path}`);
        dispatch({
          type: LOAD_MORE_TRANSACTIONS,
          payload: {
            data: data?.data,
            nextUrl: data?.next_page_url,
          },
        });
      }
    } catch (error) {
      throw error;
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

  const walletTransferToBank = async (amount: number) => {
    try {
      const data = await createHttpWithMessage("/wallet/transfer-to-bank", {
        amount,
      });
      dispatch({ type: WALLET_TRANSFER_TO_BANK, payload: data });
      successNotify(data);
    } catch (error) {
      if (!error?.response) {
        errorNotify("Network went wrong!!!");
      }
      authErrorHandler(error);
    }
  };

  const walletTransferToWallet = async (wallet: {
    email: string;
    amount: number;
  }) => {
    try {
      const data = await createHttpWithMessage(
        "/wallet/transfer-to-wallet",
        wallet
      );
      dispatch({ type: WALLET_TRANSFER_TO_WALLET, payload: data });
      successNotify(data);
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

  const getWalletBalance = (amount: number) => {
    dispatch({ type: WALLET, payload: amount });
  };

  const addToWalletBalance = (amount: number) => {
    const balance = state?.walletBalance + amount;
    dispatch({ type: ADD_TO_WALLET, payload: balance });
  };

  const removeFromWalletBalance = (amount: number) => {
    const balance = state?.walletBalance - amount;
    dispatch({ type: REMOVE_FROM_WALLET, payload: balance });
  };

  useEffect(() => {
    getAllWalletTransactions();
  }, []);

  const values = {
    transactions: state?.transactions,
    nextUrl: state?.nextUrl,
    walletBalance: state.walletBalance,
    getAllWalletTransactions,
    loadMoreTransaction,
    fundWalletContext,
    addBank,
    walletTransferToBank,
    walletTransferToWallet,
    addToWalletBalance,
    removeFromWalletBalance,
    getWalletBalance,
  };
  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  );
};

export default WalletProvider;
