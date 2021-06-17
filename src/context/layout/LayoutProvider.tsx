import React, { createContext, useEffect, useReducer } from "react";
import { useWindowSize } from "utils/useWindowResize";
import layoutReducer from "./LayoutReducer";

export type InitialStateTypes = {
  isMobile: boolean;
};

const initialState = {
  isMobile: false,
};

export const MOBILE_LAYOUT = "MOBILE_LAYOUT";

type ContextType = {
  isMobile: boolean;
};

export const LayoutContext = createContext<ContextType>({
  isMobile: false,
});

const LayoutProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(layoutReducer, initialState);

  const [width] = useWindowSize();

  const isMobile = width <= 768;

  const isMobileLayout = () => {
    dispatch({ type: MOBILE_LAYOUT, payload: isMobile });
  };


  useEffect(() => {
    isMobileLayout();
    // eslint-disable-next-line
  }, [isMobile]);

  const values = {
    isMobile: state?.isMobile
  };
  return (
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
