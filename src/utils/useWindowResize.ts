import { useLayoutEffect, useState } from "react";

export const useWindowSize = (): number[] => {
  const [size, setSize] = useState([0, 0]);

  const updateSize = () => {
    setSize([document.documentElement.clientWidth, window.innerHeight]);
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
};
