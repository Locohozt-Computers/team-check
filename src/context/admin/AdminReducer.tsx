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
  action: ActionType<WarrantyPeriodType | CommissionType>
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
        users: action.payload,
      };
    case ALL_AGENTS:
      return {
        ...state,
        agents: action.payload,
      };

    default:
      return state;
  }
};

export default layoutReducer;
