import {
  ALL_CATEGORIES,
  COLORS,
  CONDITION,
  DESTRICT,
  InitialStateTypes,
  PHONE_BRANDS,
  PHONE_MODELS,
  SCREEN_SIZE,
  STATES,
} from "./RegisterPhoneProvider";

type State = InitialStateTypes;

type ActionType<T> = {
  type: string;
  payload: T;
};

const registerPhoneReducer = (state: State, action: ActionType<any>) => {
  switch (action.type) {
    case ALL_CATEGORIES:
      return {
        ...state,
        all_categories: action.payload,
      };
    case PHONE_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };
    case PHONE_MODELS:
      return {
        ...state,
        models: action.payload,
      };
    case STATES:
      return {
        ...state,
        states: action.payload,
      };
    case DESTRICT:
      return {
        ...state,
        destrict: action.payload,
      };
    case CONDITION:
      return {
        ...state,
        condition: action.payload,
      };
    case SCREEN_SIZE:
      return {
        ...state,
        screen_size: action.payload,
      };
    case COLORS:
      return {
        ...state,
        colors: action.payload,
      };

    default:
      return state;
  }
};

export default registerPhoneReducer;
