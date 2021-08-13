import {
  ALL_CATEGORIES,
  ALL_REGISTER_PHONES,
  COLORS,
  CONDITION,
  DESTRICT,
  DEVICE_DETAIL,
  InitialStateTypes,
  LOADING,
  OPERATING_SYSTEM,
  OTHERS,
  PHONE_BRANDS,
  PHONE_MODELS,
  RAMS,
  REGISTER_PHONE,
  REG_FEE,
  REG_USER,
  SCREEN_SIZE,
  SEARCH_PHONE,
  STATES,
  SUBSCRIPTION_PLANS,
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
    case RAMS:
      return {
        ...state,
        rams: action.payload,
      };
    case REG_FEE:
      return {
        ...state,
        reg_fee: action.payload,
      };
    case REG_USER:
      return {
        ...state,
        reg_user: action.payload,
      };
    case OPERATING_SYSTEM:
      return {
        ...state,
        operating_system: action.payload,
      };
    case OTHERS:
      return {
        ...state,
        others: action.payload,
      };
    case REGISTER_PHONE:
      return {
        ...state,
        all_register_phones: [action.payload, ...state.all_register_phones],
      };
    case ALL_REGISTER_PHONES:
      return {
        ...state,
        all_register_phones: action.payload,
      };
    case DEVICE_DETAIL:
      return {
        ...state,
        device_detail: action.payload,
      };
    case SEARCH_PHONE:
      return {
        ...state,
        searchedPhones: action.payload,
      };
    case SUBSCRIPTION_PLANS:
      return {
        ...state,
        subscription_plans: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};

export default registerPhoneReducer;
