import { AVATAR_LAYOUT, InitialStateTypes, MOBILE_LAYOUT } from "./LayoutProvider";

type State = InitialStateTypes;

type ActionType<T> = {
  type: string;
  payload: T;
};

const layoutReducer = (state: State, action: ActionType<boolean>) => {
  switch (action.type) {
    case MOBILE_LAYOUT:
      return {
        ...state,
        isMobile: action.payload,
      };
    case AVATAR_LAYOUT:
      return {
        ...state,
        avatarMenu: action.payload,
      };

    default:
      return state;
  }
};

export default layoutReducer;
