import { InitialStateTypes, WalletType } from "types/walletTypes";
import { GET_ALL_WALLET, FUND_WALLET, WALLET_TRANSFER_TO_BANK } from "./WalletProvider";

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
    case WALLET_TRANSFER_TO_BANK:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default walletReducer;
