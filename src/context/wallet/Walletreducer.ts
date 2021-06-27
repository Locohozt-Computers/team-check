import { InitialStateTypes, WalletType } from "types/walletTypes";
import { GET_ALL_WALLET, FUND_WALLET } from "./WalletProvider";

type State = InitialStateTypes<WalletType>;

const walletReducer = (state: State, action: any) => {
  switch (action.type) {
    case GET_ALL_WALLET:
      return {
        ...state,
        transactions: action.payload,
      };
    case FUND_WALLET:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default walletReducer;
