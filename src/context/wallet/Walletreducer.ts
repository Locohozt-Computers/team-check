import { InitialStateTypes, WalletType } from "types/walletTypes";
import {
  GET_ALL_WALLET,
  FUND_WALLET,
  WALLET_TRANSFER_TO_BANK,
  LOAD_MORE_TRANSACTIONS,
  ADD_TO_WALLET,
  REMOVE_FROM_WALLET,
  WALLET,
} from "./WalletProvider";

type State = InitialStateTypes<WalletType>;

const walletReducer = (state: State, action: any) => {
  switch (action.type) {
    case GET_ALL_WALLET:
      return {
        ...state,
        transactions: action.payload?.data,
        nextUrl: action.payload?.nextUrl,
      };
    case LOAD_MORE_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.payload?.data, ...state.transactions],
        nextUrl: action.payload?.nextUrl,
      };
    case FUND_WALLET:
      return {
        ...state,
      };
    case WALLET_TRANSFER_TO_BANK:
      return {
        ...state,
      };
    case WALLET:
      return {
        ...state,
        walletBalance: action.payload,
      };
    case ADD_TO_WALLET:
      return {
        ...state,
        walletBalance: action.payload,
      };
    case REMOVE_FROM_WALLET:
      return {
        ...state,
        walletBalance: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
