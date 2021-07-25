import { DType } from "components/ui/CustomDropdown";
import { RegisterValueType } from "pages/RegisteredPhonesPage/RegisterPhoneFormPage";
import React, { createContext, useReducer } from "react";
import { createHttp, getHttp } from "utils/api/createHttp";
import registerPhoneReducer from "./RegisterPhoneReducer";

export type InitialStateTypes = {
  all_categories: DType[];
  brands: DType[];
  models: DType[];
  states: DType[];
  destrict: DType[];
  screen_size: DType[];
  condition: DType[];
  colors: DType[];
  rams: DType[];
  reg_fee: any;
  reg_user: any;
  operating_system: null | any;
  others: null | any;
};

const initialState: InitialStateTypes = {
  all_categories: [],
  brands: [],
  models: [],
  states: [],
  destrict: [],
  screen_size: [],
  condition: [],
  colors: [],
  rams: [],
  reg_fee: null,
  reg_user: null,
  operating_system: null,
  others: null,
};

export const ALL_CATEGORIES = "ALL_CATEGORIES";
export const PHONE_BRANDS = "PHONE_BRANDS";
export const PHONE_MODELS = "PHONE_MODELS";
export const STATES = "STATES";
export const DESTRICT = "DESTRICT";
export const CONDITION = "CONDITION";
export const SCREEN_SIZE = "SCREEN_SIZE";
export const COLORS = "COLORS";
export const RAMS = "RAMS";
export const REG_FEE = "REG_FEE";
export const REG_USER = "REG_USER";
export const OPERATING_SYSTEM = "OPERATING_SYSTEM";
export const OTHERS = "OTHERS";
export const REGISTER_PHONE = "REGISTER_PHONE";

type ContextType = {
  all_categories: DType[];
  brands: DType[];
  models: DType[];
  states: DType[];
  destrict: DType[];
  screen_size: DType[];
  condition: DType[];
  colors: DType[];
  rams: DType[];
  reg_fee: any;
  reg_user: any;
  operating_system: null | any;
  others: null | any;
  getCategories: () => void;
  getBrands: () => void;
  getStates: () => void;
  getCondition: () => void;
  getScreenSize: () => void;
  getColors: () => void;
  getRams: () => void;
  getRegFee: () => void;
  getRegUser: (email: string) => void;
  getModels: (id: number) => void;
  getDestrict: (id: number) => void;
  getOperatingSystem: (os: any) => void;
  getOthers: (id: number) => void;
  registerPhone: (values: RegisterValueType) => void;
};

export const RegisterPhoneContext = createContext<ContextType>({
  all_categories: [],
  brands: [],
  models: [],
  states: [],
  destrict: [],
  screen_size: [],
  condition: [],
  colors: [],
  rams: [],
  reg_fee: null,
  reg_user: null,
  operating_system: null,
  others: null,
  getCategories: () => {},
  getBrands: () => {},
  getModels: (id: number) => {},
  getStates: () => {},
  getCondition: () => {},
  getScreenSize: () => {},
  getColors: () => {},
  getRams: () => {},
  getRegFee: () => {},
  getRegUser: (email: string) => {},
  getDestrict: (id: number) => {},
  getOperatingSystem: (os: any) => {},
  getOthers: (id: number) => {},
  registerPhone: (values: RegisterValueType) => {},
});

const RegisterPhoneProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(registerPhoneReducer, initialState);

  const getCategories = async () => {
    dispatch({ type: ALL_CATEGORIES, payload: [] });
  };

  const getBrands = async () => {
    try {
      const results = await getHttp("/device/brands");
      const brands = results?.data?.map((brand: any) => ({
        id: brand?.id,
        osId: brand?.operating_system_id,
        value: brand?.name,
        label: brand?.name,
        os: brand?.os,
      }));
      dispatch({ type: OPERATING_SYSTEM, payload: brands });
      dispatch({ type: PHONE_BRANDS, payload: brands });
    } catch (error) {}
  };

  const getOperatingSystem = async (operatingSystem: any) => {
    try {
      dispatch({
        type: OPERATING_SYSTEM,
        payload: {
          ...operatingSystem,
          label: operatingSystem?.name,
          value: operatingSystem?.name,
          id: operatingSystem?.id,
        },
      });
    } catch (error) {}
  };

  const getModels = async (id: number) => {
    try {
      const results = await getHttp(`/phone-brands/${id}`);
      const models = results?.map((model: any) => ({
        id: model?.id,
        value: model?.name,
        label: model?.name,
      }));
      dispatch({ type: PHONE_MODELS, payload: models });
    } catch (error) {}
  };

  const getStates = async () => {
    try {
      const results = await getHttp("location/states");
      const models = results?.map((model: any) => ({
        id: model?.id,
        value: model?.name,
        label: model?.name,
      }));
      dispatch({ type: STATES, payload: models });
    } catch (error) {}
  };

  const getDestrict = async (id: number) => {
    try {
      const results = await getHttp(`/location/states/${id}`);
      const models = results?.map((model: any) => ({
        id: model?.id,
        value: model?.name,
        label: model?.name,
      }));
      dispatch({ type: DESTRICT, payload: models });
    } catch (error) {}
  };

  const getOthers = async (id: number) => {
    try {
      const results = await getHttp(`/phone-models/${id}`);
      dispatch({ type: OTHERS, payload: results });
    } catch (error) {}
  };

  const getCondition = async () => {
    try {
      const results = await getHttp("/condition");
      const models = results?.map((model: any) => ({
        id: model?.id,
        value: model?.name,
        label: model?.name,
      }));
      dispatch({ type: CONDITION, payload: models });
    } catch (error) {}
  };

  const getScreenSize = async () => {
    try {
      const results = await getHttp("/screen-size");
      const models = results?.map((model: any) => ({
        id: model?.id,
        value: model?.name,
        label: model?.name,
      }));
      dispatch({ type: SCREEN_SIZE, payload: models });
    } catch (error) {}
  };

  const getColors = async () => {
    try {
      const results = await getHttp("/colors");
      const models = results?.map((model: any) => ({
        id: model?.id,
        value: model?.name,
        label: model?.name,
      }));
      dispatch({ type: COLORS, payload: models });
    } catch (error) {}
  };

  const getRams = async () => {
    try {
      const results = await getHttp("/device/rams");
      const rams = results?.map((ram: any) => ({
        id: ram?.id,
        value: ram?.name,
        label: ram?.name,
      }));
      dispatch({ type: RAMS, payload: rams });
    } catch (error) {}
  };

  const getRegFee = async () => {
    try {
      const results = await getHttp("/device/reg-fee");
      dispatch({ type: REG_FEE, payload: results });
    } catch (error) {}
  };

  const getRegUser = async (email: string) => {
    try {
      const results = await getHttp(`/user/${email}`);
      dispatch({ type: REG_USER, payload: results });
      return results?.username;
    } catch (error) {
      return "error";
    }
  };

  const registerPhone = async (values: RegisterValueType) => {
    try {
      const results = await createHttp(`/device/register-phone`, values);
      dispatch({ type: REGISTER_PHONE, payload: results });
    } catch (error) {
      throw error;
    }
  };

  const values = {
    all_categories: state?.all_categories,
    brands: state.brands,
    models: state.models,
    states: state.states,
    destrict: state.destrict,
    screen_size: state.screen_size,
    condition: state.condition,
    colors: state.colors,
    rams: state.rams,
    reg_fee: state.reg_fee,
    reg_user: state.reg_user,
    operating_system: state.operating_system,
    others: state.others,
    getCategories,
    getBrands,
    getModels,
    getStates,
    getDestrict,
    getCondition,
    getColors,
    getRams,
    getRegFee,
    getRegUser,
    getScreenSize,
    getOperatingSystem,
    getOthers,
    registerPhone,
  };
  return (
    <RegisterPhoneContext.Provider value={values}>
      {children}
    </RegisterPhoneContext.Provider>
  );
};

export default RegisterPhoneProvider;