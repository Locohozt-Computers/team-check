import React, { createContext, useEffect, useReducer } from "react";
import { createHttp, getHttp, updateHttp } from "utils/api/createHttp";
import AdminReducer from "./AdminReducer";

export type CommissionType = {
  registration: number;
  warranty: number;
};

export type WarrantyPeriodType = {
  warranty_offset_period: number;
  warranty_validity: number;
};

export type InviteAdminType = {
  username: string;
  email: string;
};

export type PhoneBrandType = {
  operating_system_id: number;
  name: string;
  prefix: string;
};

export type PhoneModelType = {
  name: string;
  category_id: number;
  brand_id: number;
  warranty_fee: number;
  storage: string[];
  display_type: string[];
  resolution: string[];
  sim: string[];
  card_slot: string[];
  main_camera: string[];
  selfie_camera: string[];
  battery: string[];
};

export type InitialStateTypes = {
  commission: any;
  warrantyPeriod: any;
  users: any;
  agents: any;
  users_total: number;
  agents_total: number;
  agents_next_url: string;
  users_next_url: string;
};

const initialState = {
  commission: null,
  warrantyPeriod: null,
  users: [],
  agents: [],
  users_total: 0,
  agents_total: 0,
  agents_next_url: "",
  users_next_url: "",
};

export const COMMISSION = "COMMISSION";
export const WARRANTY_PERIOD = "WARRANTY_PERIOD";
export const ALL_AGENTS = "ALL_AGENTS";
export const INVITE_ADMIN = "INVITE_ADMIN";
export const ALL_USERS = "ALL_USERS";
export const DEACTIVATE_USER = "DEACTIVATE_USER";

type ContextType = {
  commission: any;
  warrantyPeriod: any;
  users: any;
  agents: any;
  users_total: number;
  agents_total: number;
  agents_next_url: string;
  users_next_url: string;
  setupWarrantyPeriod: (payload: any) => void;
  setupCommission: (payload: any) => void;
  getCommissions: () => void;
  getWarrantyPeriods: () => void;
  getUsers: (page: number) => void;
  getAgents: (page: number) => void;
  inviteAdmin: (payload: any) => void;
  deactivateUser: (id: string) => void;
  addPhoneModel: (payload: PhoneModelType) => void;
  updatePhoneModel: (payload: PhoneModelType) => void;
  updatePhoneBrand: (payload: PhoneBrandType) => void;
  addPhoneBrand: (payload: PhoneBrandType) => void;
};

export const AdminContext = createContext<ContextType>({
  commission: null,
  warrantyPeriod: null,
  users: [],
  agents: [],
  users_total: 0,
  agents_total: 0,
  agents_next_url: "",
  users_next_url: "",
  setupWarrantyPeriod: (payload: any) => {},
  setupCommission: (payload: any) => {},
  getWarrantyPeriods: () => {},
  getCommissions: () => {},
  getUsers: (page: number) => {},
  getAgents: (page: number) => {},
  inviteAdmin: (payload: any) => {},
  deactivateUser: (id: string) => {},
  addPhoneModel: (payload: PhoneModelType) => {},
  updatePhoneModel: (payload: PhoneModelType) => {},
  updatePhoneBrand: (payload: PhoneBrandType) => {},
  addPhoneBrand: (payload: PhoneBrandType) => {},
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

  const getUsers = async (page: number = 1) => {
    try {
      const response = await getHttp(`/admin/all-users?page=${page}`);
      dispatch({ type: ALL_USERS, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const getAgents = async (page: number = 1) => {
    try {
      const response = await getHttp(`/admin/all-agents?page=${page}`);
      dispatch({ type: ALL_AGENTS, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const deactivateUser = async (id: string) => {
    try {
      const response = await updateHttp(
        `/admin/deactivate-activate-user/${id}`,
        {}
      );
      dispatch({ type: DEACTIVATE_USER, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const inviteAdmin = async (payload: InviteAdminType) => {
    try {
      const response = await createHttp(`/admin/invite-admin`, payload);
      dispatch({ type: INVITE_ADMIN, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const addPhoneModel = async (payload: PhoneModelType) => {
    console.log(payload);
    try {
      const response = await createHttp(`/admin/phone-model`, payload);
      dispatch({ type: INVITE_ADMIN, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const updatePhoneModel = async (payload: PhoneModelType) => {
    try {
      const response = await updateHttp(`/admin/phone-model`, payload);
      dispatch({ type: INVITE_ADMIN, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const addPhoneBrand = async (payload: PhoneBrandType) => {
    try {
      const response = await createHttp(`/admin/brand`, payload);
      dispatch({ type: INVITE_ADMIN, payload: response });
    } catch (error) {
      throw error;
    }
  };

  const updatePhoneBrand = async (payload: Partial<PhoneBrandType>) => {
    try {
      const response = await updateHttp(`/admin/brand`, payload);
      dispatch({ type: INVITE_ADMIN, payload: response });
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
    agents_total: state.agents_total,
    users_total: state.users_total,
    agents_next_url: state.agents_next_url,
    users_next_url: state.users_next_url,
    setupWarrantyPeriod,
    setupCommission,
    getCommissions,
    getWarrantyPeriods,
    getUsers,
    getAgents,
    inviteAdmin,
    deactivateUser,
    addPhoneModel,
    updatePhoneModel,
    updatePhoneBrand,
    addPhoneBrand,
  };

  return (
    <AdminContext.Provider value={values}>{children}</AdminContext.Provider>
  );
};

export default AdminProvider;
