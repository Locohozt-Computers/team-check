import React, { createContext, useReducer, useEffect, useContext } from "react";
import { DType } from "components/ui/CustomDropdown";
import { RegisterValueType } from "pages/RegisteredPhonesPage/RegisterPhoneFormPage";
import { createHttp, deleteHttp, getHttp } from "utils/api/createHttp";
import registerPhoneReducer from "./RegisterPhoneReducer";
import { AuthContext } from "context/auth/AuthProvider";

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
  all_register_phones: any;
  device_detail: any;
  searchedPhones: any;
  subscription_plans: any;
  phone_advert_lists: any;
  loading: boolean;
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
  all_register_phones: [],
  device_detail: null,
  searchedPhones: null,
  subscription_plans: [],
  phone_advert_lists: [],
  loading: false,
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
export const DELETE_PHONE = "DELETE_PHONE";
export const REGISTER_PHONE = "REGISTER_PHONE";
export const ALL_REGISTER_PHONES = "ALL_REGISTER_PHONES";
export const DEVICE_DETAIL = "DEVICE_DETAIL";
export const SEARCH_PHONE = "SEARCH_PHONE";
export const SUBSCRIPTION_PLANS = "SUBSCRIPTION_PLANS";
export const PHONE_ADVERTLISTS = "PHONE_ADVERTLISTS";
export const LOADING = "LOADING";

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
  all_register_phones: any;
  device_detail: any;
  searchedPhones: any;
  subscription_plans: any;
  phone_advert_lists: any;
  loading: boolean;
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
  allRegisterPhonesUsers: () => void;
  allRegisterPhonesAgent: () => void;
  getADevice: (id: string) => void;
  deleteRegisterPhone: (id: string) => void;
  searchADevice: (deviceId: string) => void;
  subscriptionPlans: () => void;
  phoneAdvertLists: () => void;
  clearADevice: () => void;
  subscribePhoneForAdvert: (payload: any) => void;
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
  all_register_phones: [],
  device_detail: null,
  searchedPhones: null,
  subscription_plans: [],
  phone_advert_lists: [],
  loading: false,
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
  allRegisterPhonesUsers: () => {},
  allRegisterPhonesAgent: () => {},
  getADevice: (id: string) => {},
  deleteRegisterPhone: (id: string) => {},
  searchADevice: (deviceId: string) => {},
  subscriptionPlans: () => {},
  phoneAdvertLists: () => {},
  clearADevice: () => {},
  subscribePhoneForAdvert: (payload: any) => {},
});

const RegisterPhoneProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(registerPhoneReducer, initialState);

  const loadingState = (state: boolean, type: string = LOADING) => {
    dispatch({ type, payload: state });
  };

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

  const deleteRegisterPhone = async (id: string) => {
    try {
      const results = await deleteHttp(`/device/register-phone/${id}`);
      dispatch({ type: DELETE_PHONE, payload: results });
    } catch (error) {
      throw error;
    }
  };

  const allRegisterPhonesUsers = async () => {
    try {
      loadingState(true);
      const results = await getHttp(`/users/all-devices`);
      loadingState(false);
      dispatch({ type: ALL_REGISTER_PHONES, payload: results });
    } catch (error) {
      loadingState(false);
      throw error;
    }
  };

  const allRegisterPhonesAgent = async () => {
    try {
      loadingState(true);
      const results = await getHttp(`/agent/all-devices`);
      loadingState(false);
      dispatch({ type: ALL_REGISTER_PHONES, payload: results });
    } catch (error) {
      loadingState(false);
      throw error;
    }
  };

  const getADevice = async (id: string) => {
    try {
      loadingState(true);
      const results = await getHttp(`/device/register-phone/${id}`);
      loadingState(false);
      dispatch({ type: DEVICE_DETAIL, payload: results });
    } catch (error) {
      loadingState(false);
      throw error;
    }
  };

  const searchADevice = async (deviceId: string) => {
    try {
      const results = await getHttp(`/devices/${deviceId}`);
      dispatch({ type: SEARCH_PHONE, payload: results });
    } catch (error) {
      throw error;
    }
  };

  const clearADevice = async () => {
    try {
      dispatch({ type: SEARCH_PHONE, payload: null });
    } catch (error) {
      throw error;
    }
  };

  const subscriptionPlans = async () => {
    try {
      const results = await getHttp(`/users/subscriptions`);
      dispatch({ type: SUBSCRIPTION_PLANS, payload: results });
    } catch (error) {
      throw error;
    }
  };

  const phoneAdvertLists = async () => {
    try {
      const results = await getHttp(`/subscribed/adverts`);
      dispatch({ type: PHONE_ADVERTLISTS, payload: results?.data });
    } catch (error) {
      throw error;
    }
  };

  const subscribePhoneForAdvert = async (payload: any) => {
    try {
      await createHttp(`/users/subscribe`, payload);
    } catch (error) {
      throw error;
    }
  };

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.user_type === "USER") {
      subscriptionPlans();
      phoneAdvertLists();
    }

    // eslint-disable-next-line
  }, []);

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
    all_register_phones: state?.all_register_phones,
    device_detail: state?.device_detail,
    searchedPhones: state?.searchedPhones,
    subscription_plans: state?.subscription_plans,
    phone_advert_lists: state?.phone_advert_lists,
    loading: state?.loading,
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
    allRegisterPhonesUsers,
    allRegisterPhonesAgent,
    getADevice,
    searchADevice,
    deleteRegisterPhone,
    subscriptionPlans,
    phoneAdvertLists,
    subscribePhoneForAdvert,
    clearADevice,
  };
  return (
    <RegisterPhoneContext.Provider value={values}>
      {children}
    </RegisterPhoneContext.Provider>
  );
};

export default RegisterPhoneProvider;
