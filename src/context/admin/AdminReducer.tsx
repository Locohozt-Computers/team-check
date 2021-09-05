import {
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

    default:
      return state;
  }
};

export default layoutReducer;
