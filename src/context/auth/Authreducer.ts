import { SigninUserType, SignupUserType } from "types/authTypes";
import { InitialStateTypes, SIGNIN, SIGNUP } from "./AuthProvider";

type State = InitialStateTypes<SigninUserType | SignupUserType>;

const authReducer = (state: State, action: any) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
      };
    case SIGNUP:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
