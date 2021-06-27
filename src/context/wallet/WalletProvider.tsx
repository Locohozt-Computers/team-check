import React, { createContext, useEffect, useReducer } from "react";
import { WalletType } from "types/walletTypes";
import { createHttp, getHttp } from "utils/api/createHttp";
import { authErrorHandler } from "utils/CatchErrors";
import { errorNotify } from "utils/errorMessage";
import walletReducer from "./Walletreducer";

const initialState = {
  transactions: [],
};

export const GET_ALL_WALLET = "GET_ALL_WALLET";
export const FUND_WALLET = "FUND_WALLET";

type ContextType = {
  transactions: Partial<WalletType>[];
  fundWalletContext: (wallet: WalletType) => void;
  getAllWalletTransactions: () => void;
};

export const WalletContext = createContext<ContextType>({
  transactions: [],
  fundWalletContext: (wallet: WalletType) => {},
  getAllWalletTransactions: () => {},
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

  const fundWalletContext = async (wallet: WalletType) => {
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

  useEffect(() => {
    getAllWalletTransactions();
  }, []);

  const values = {
    transactions: state?.transactions,
    getAllWalletTransactions,
    fundWalletContext,
  };
  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  );
};

export default WalletProvider;
