import {
  ALL_AGENTS,
  ALL_USERS,
  COMMISSION,
  CommissionType,
  InitialStateTypes,
  WarrantyPeriodType,
  WARRANTY_PERIOD,
} from "./AdminProvider";

type State = InitialStateTypes;

type ActionType<T> = {
  type: string;
  payload: T;
};

const layoutReducer = (
  state: State,
  action: ActionType<WarrantyPeriodType | CommissionType | any>
) => {
  switch (action.type) {
    case WARRANTY_PERIOD:
      return {
        ...state,
        warrantyPeriod: action.payload,
      };
    case COMMISSION:
      return {
        ...state,
        commission: action.payload,
      };
    case ALL_USERS:
      return {
        ...state,
        users: action.payload?.data,
        users_total: action.payload?.total,
        users_next_url: action.payload?.next_page_url,
      };
    case ALL_AGENTS:
      return {
        ...state,
        agents: action.payload?.data,
        agents_total: action.payload?.total,
        agents_next_url: action.payload?.next_page_url,
      };

    default:
      return state;
  }
};

export default layoutReducer;
