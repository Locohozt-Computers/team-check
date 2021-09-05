import React, { createContext, useEffect, useReducer } from "react";
import { createHttp, getHttp } from "utils/api/createHttp";
import AdminReducer from "./AdminReducer";

export type CommissionType = {
  registration: number;
  warranty: number;
};

export type WarrantyPeriodType = {
  warranty_offset_period: number;
  warranty_validity: number;
};

export type InitialStateTypes = {
  commission: any;
  warrantyPeriod: any;
  users: any;
  agents: any;
};

const initialState = {
  commission: null,
  warrantyPeriod: null,
  users: [],
  agents: [],
};

export const COMMISSION = "COMMISSION";
export const WARRANTY_PERIOD = "WARRANTY_PERIOD";
export const ALL_AGENTS = "ALL_AGENTS";
export const ALL_USERS = "ALL_USERS";
export const DEACTIVATE_USER = "DEACTIVATE_USER";

type ContextType = {
  commission: any;
  warrantyPeriod: any;
  users: any;
  agents: any;
  setupWarrantyPeriod: (payload: any) => void;
  setupCommission: (payload: any) => void;
  getCommissions: () => void;
  getWarrantyPeriods: () => void;
};

export const AdminContext = createContext<ContextType>({
  commission: null,
  warrantyPeriod: null,
  users: [],
  agents: [],
  setupWarrantyPeriod: (payload: any) => {},
  setupCommission: (payload: any) => {},
  getWarrantyPeriods: () => {},
  getCommissions: () => {},
});

const AdminProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AdminReducer, initialState);

  const setupCommission = async (payload: CommissionType) => {
    try {
      const response = await createHttp("/admin/commission", payload);
      dispatch({ type: COMMISSION, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const setupWarrantyPeriod = async (payload: WarrantyPeriodType) => {
    try {
      const response = await createHttp("/admin/warranty-period", payload);
      dispatch({ type: WARRANTY_PERIOD, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const getCommissions = async () => {
    try {
      const response = await getHttp("/admin/commission");
      dispatch({ type: COMMISSION, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const getWarrantyPeriods = async () => {
    try {
      const response = await getHttp("/admin/warranty-period");
      dispatch({ type: WARRANTY_PERIOD, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const getUsers = async () => {
    try {
      const response = await getHttp("/admin/all-users");
      dispatch({ type: ALL_AGENTS, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const getAgents = async () => {
    try {
      const response = await getHttp("/admin/all-agents");
      dispatch({ type: ALL_AGENTS, payload: response });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getCommissions();
    getWarrantyPeriods();
    getUsers();
    getAgents();
  }, []);

  const values = {
    commission: state?.commission,
    warrantyPeriod: state.warrantyPeriod,
    users: state.users,
    agents: state.agents,
    setupWarrantyPeriod,
    setupCommission,
    getCommissions,
    getWarrantyPeriods,
  };

  return (
    <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;
