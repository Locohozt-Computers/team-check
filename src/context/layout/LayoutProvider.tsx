import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useWindowSize } from "utils/useWindowResize";
import layoutReducer from "./LayoutReducer";

export type InitialStateTypes = {
  isMobile: boolean;
  avatarMenu: boolean;
};

const initialState = {
  isMobile: false,
  avatarMenu: false,
};

export const MOBILE_LAYOUT = "MOBILE_LAYOUT";
export const AVATAR_LAYOUT = "AVATAR_LAYOUT";

type ContextType = {
  isMobile: boolean;
  avatarMenu: boolean;
  openAvatarMenu: () => void;
  closeAvatarMenu: () => void;
};

export const LayoutContext = createContext<ContextType>({
  isMobile: false,
  avatarMenu: false,
  openAvatarMenu: () => {},
  closeAvatarMenu: () => {},
});

export const useLayout = () => useContext(LayoutContext);

const LayoutProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(layoutReducer, initialState);

  const [width] = useWindowSize();

  const isMobile = width <= 768;

  const isMobileLayout = () => {
    dispatch({ type: MOBILE_LAYOUT, payload: isMobile });
  };

  const openAvatarMenu = () => {
    dispatch({ type: AVATAR_LAYOUT, payload: true });
  };

  const closeAvatarMenu = () => {
    dispatch({ type: AVATAR_LAYOUT, payload: false });
  };

  useEffect(() => {
    isMobileLayout();
    // eslint-disable-next-line
  }, [isMobile]);

  const values = {
    isMobile: state?.isMobile,
    avatarMenu: state.avatarMenu,
    openAvatarMenu,
    closeAvatarMenu,
  };
  return (
    <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;
