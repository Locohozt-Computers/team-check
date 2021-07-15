import { DType } from "components/ui/CustomDropdown";
import React, { createContext, useReducer } from "react";
import { getHttp } from "utils/api/createHttp";
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
};

export const ALL_CATEGORIES = "ALL_CATEGORIES";
export const PHONE_BRANDS = "PHONE_BRANDS";
export const PHONE_MODELS = "PHONE_MODELS";
export const STATES = "STATES";
export const DESTRICT = "DESTRICT";
export const CONDITION = "CONDITION";
export const SCREEN_SIZE = "SCREEN_SIZE";
export const COLORS = "COLORS";

type ContextType = {
  all_categories: DType[];
  brands: DType[];
  models: DType[];
  states: DType[];
  destrict: DType[];
  screen_size: DType[];
  condition: DType[];
  colors: DType[];
  getCategories: () => void;
  getBrands: () => void;
  getStates: () => void;
  getCondition: () => void;
  getScreenSize: () => void;
  getColors: () => void;
  getModels: (id: number) => void;
  getDestrict: (id: number) => void;
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
  getCategories: () => {},
  getBrands: () => {},
  getModels: (id: number) => {},
  getStates: () => {},
  getCondition: () => {},
  getScreenSize: () => {},
  getColors: () => {},
  getDestrict: (id: number) => {},
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
        value: brand?.name,
        label: brand?.name,
      }));
      dispatch({ type: PHONE_BRANDS, payload: brands });
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

  const values = {
    all_categories: state?.all_categories,
    brands: state.brands,
    models: state.models,
    states: state.states,
    destrict: state.destrict,
    screen_size: state.screen_size,
    condition: state.condition,
    colors: state.colors,
    getCategories,
    getBrands,
    getModels,
    getStates,
    getDestrict,
    getCondition,
    getColors,
    getScreenSize,
  };
  return (
    <RegisterPhoneContext.Provider value={values}>
      {children}
    </RegisterPhoneContext.Provider>
  );
};

export default RegisterPhoneProvider;
