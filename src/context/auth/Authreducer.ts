import { SigninUserType, SignupUserType, UserType } from "types/authTypes";
import { GET_PROFILE, InitialStateTypes, SIGNIN, SIGNUP } from "./AuthProvider";

type State = InitialStateTypes<SigninUserType | SignupUserType | UserType>;

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
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
